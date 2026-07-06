#!/usr/bin/env node
/**
 * Sora 2 Pro video generation helper.
 * Dependency-free: uses Node 18+ global fetch/FormData/Blob.
 *
 * Usage:
 *   node scripts/gen-video-sora.mjs --prompt "..." --output public/hero/video.mp4 \
 *     [--reference ref.png] [--size 1792x1024] [--seconds 8]
 *   node scripts/gen-video-sora.mjs --resume video_abc123 --output out.mp4
 *
 * Flags:
 *   --prompt, -p      Video prompt (required unless --resume)
 *   --model, -m       sora-2 | sora-2-pro (default: env OPENAI_VIDEO_MODEL or sora-2-pro)
 *   --draft           Cheap preview mode: sora-2 @ 1280x720, 4s (~10x cheaper)
 *   --resume          Existing video job id to poll/download instead of creating
 *   --output, -o      Output mp4 path (default: generated_video.mp4)
 *   --reference, -r   Optional input reference image (must match --size exactly)
 *   --size, -s        1280x720 | 720x1280 | 1792x1024 | 1024x1792 (default: 1792x1024)
 *   --seconds         4 | 8 | 12 (default: 8)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(__dirname, "..", ".env"));

const API = "https://api.openai.com/v1";

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#") && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

function parseArgs(argv) {
  const args = { size: "1792x1024", seconds: "8", output: "generated_video.mp4" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--prompt" || a === "-p") args.prompt = argv[++i];
    else if (a === "--model" || a === "-m") args.model = argv[++i];
    else if (a === "--draft") args.draft = true;
    else if (a === "--resume") args.resume = argv[++i];
    else if (a === "--output" || a === "-o") args.output = argv[++i];
    else if (a === "--reference" || a === "-r") args.reference = argv[++i];
    else if (a === "--size" || a === "-s") args.size = argv[++i];
    else if (a === "--seconds") args.seconds = argv[++i];
  }
  return args;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const key = process.env.OPENAI_API_KEY;
  if (!args.prompt && !args.resume) throw new Error("--prompt (or --resume) is required");
  if (!key) throw new Error("OPENAI_API_KEY is not set (check .env)");

  if (args.draft) {
    // Cheap preview: ~10x less cost than sora-2-pro at 1792x1024/8s.
    args.model = args.model || "sora-2";
    if (args.size === "1792x1024") args.size = "1280x720";
    if (args.seconds === "8") args.seconds = "4";
  }
  const model = args.model || process.env.OPENAI_VIDEO_MODEL || "sora-2-pro";
  const auth = { Authorization: `Bearer ${key}` };
  let job;

  if (args.resume) {
    job = { id: args.resume, status: "in_progress" };
    console.log(`Resuming job ${job.id}...`);
  } else {
    const form = new FormData();
    form.append("model", model);
    form.append("prompt", args.prompt);
    form.append("size", args.size);
    form.append("seconds", args.seconds);
    if (args.reference) {
      form.append(
        "input_reference",
        new Blob([fs.readFileSync(args.reference)], { type: "image/png" }),
        path.basename(args.reference)
      );
    }

    console.log(`Creating ${model} video job (${args.size}, ${args.seconds}s)...`);
    const res = await fetch(`${API}/videos`, { method: "POST", headers: auth, body: form });
    job = await res.json();
    if (!res.ok) throw new Error(`Create failed ${res.status}: ${JSON.stringify(job)}`);
    console.log(`Job ${job.id} -> ${job.status}`);
  }

  const started = Date.now();
  let pollErrors = 0;
  while (job.status === "queued" || job.status === "in_progress") {
    await sleep(10000);
    try {
      const res = await fetch(`${API}/videos/${job.id}`, { headers: auth });
      const body = await res.json();
      if (!res.ok) {
        // Transient server hiccups (5xx / 429): keep polling, up to 30 in a row.
        if ((res.status >= 500 || res.status === 429) && ++pollErrors <= 30) {
          console.log(`[poll retry ${pollErrors}] transient ${res.status}, still waiting...`);
          continue;
        }
        throw new Error(`Poll failed ${res.status}: ${JSON.stringify(body)}`);
      }
      pollErrors = 0;
      job = body;
    } catch (err) {
      if (err instanceof TypeError && ++pollErrors <= 30) {
        console.log(`[poll retry ${pollErrors}] network error, still waiting...`);
        continue;
      }
      throw err;
    }
    const mins = ((Date.now() - started) / 60000).toFixed(1);
    console.log(`[${mins}m] status=${job.status} progress=${job.progress ?? "?"}`);
  }

  if (job.status !== "completed") {
    throw new Error(`Job ended with status=${job.status}: ${JSON.stringify(job.error ?? job)}`);
  }

  console.log("Downloading video content...");
  const res = await fetch(`${API}/videos/${job.id}/content`, { headers: auth });
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${await res.text()}`);
  fs.mkdirSync(path.dirname(path.resolve(args.output)), { recursive: true });
  fs.writeFileSync(args.output, Buffer.from(await res.arrayBuffer()));
  console.log(`Video saved to ${args.output}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
