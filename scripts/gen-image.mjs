#!/usr/bin/env node
/**
 * OpenAI image generation helper (gpt-image-2 / chatgpt-image-latest).
 * Dependency-free: uses Node 18+ global fetch/FormData/Blob.
 *
 * Usage:
 *   node scripts/gen-image.mjs --prompt "..." --output out.png
 *   node scripts/gen-image.mjs --prompt "edit ..." --images logo.png --output out.png
 *
 * Flags:
 *   --prompt, -p   Text prompt or edit instructions (required)
 *   --output, -o   Output file path (default: generated_image.png)
 *   --images, -i   One or more input image paths -> uses the edit endpoint
 *   --size,   -s   1024x1024 | 1536x1024 | 1024x1536 | auto (default: 1536x1024)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(__dirname, "..", ".env"));

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#") && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

function parseArgs(argv) {
  const args = { images: [], size: "1536x1024", output: "generated_image.png" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--prompt" || a === "-p") args.prompt = argv[++i];
    else if (a === "--output" || a === "-o") args.output = argv[++i];
    else if (a === "--size" || a === "-s") args.size = argv[++i];
    else if (a === "--model" || a === "-m") args.model = argv[++i];
    else if (a === "--images" || a === "-i") {
      while (argv[i + 1] && !argv[i + 1].startsWith("--")) args.images.push(argv[++i]);
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const key = process.env.OPENAI_API_KEY;
  if (!args.prompt) throw new Error("--prompt is required");
  if (!key) throw new Error("OPENAI_API_KEY is not set (check .env)");

  const model = args.model || process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
  console.log(`Generating image with ${model} (${args.size})...`);

  let res;
  if (args.images.length > 0) {
    const form = new FormData();
    form.append("model", model);
    form.append("prompt", args.prompt);
    form.append("size", args.size);
    for (const img of args.images) {
      const ext = path.extname(img).toLowerCase();
      form.append("image[]", new Blob([fs.readFileSync(img)], { type: MIME[ext] || "image/png" }), path.basename(img));
    }
    res = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form,
    });
  } else {
    res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt: args.prompt, size: args.size }),
    });
  }

  const json = await res.json();
  if (!res.ok) throw new Error(`API error ${res.status}: ${JSON.stringify(json)}`);

  fs.mkdirSync(path.dirname(path.resolve(args.output)), { recursive: true });
  fs.writeFileSync(args.output, Buffer.from(json.data[0].b64_json, "base64"));
  console.log(`Image saved to ${args.output}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
