// Screenshot review helper (uses cached Playwright Chromium).
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.SHOT_URL || "http://localhost:5173/";
const EXE = path.join(
  process.env.LOCALAPPDATA,
  "ms-playwright",
  "chromium_headless_shell-1228",
  "chrome-headless-shell-win64",
  "chrome-headless-shell.exe"
);

fs.mkdirSync("shots", { recursive: true });

const browser = await chromium.launch({ executablePath: EXE });
const logs = [];

// Desktop pass
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
await page.screenshot({ path: "shots/hero.png" });
await page.locator("#menu").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: "shots/features.png" });
await page.locator("#story").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: "shots/story.png" });
await page.locator("#branches").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: "shots/branches.png" });
await page.locator("#visit").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: "shots/footer.png" });

// Mobile pass + menu open
const mpage = await browser.newPage({ viewport: { width: 390, height: 844 } });
mpage.on("pageerror", (e) => logs.push(`[m-pageerror] ${e.message}`));
await mpage.goto(BASE, { waitUntil: "networkidle" });
await mpage.waitForTimeout(1500);
await mpage.screenshot({ path: "shots/mobile-hero.png" });
await mpage.getByRole("button", { name: "Open menu" }).click();
await mpage.waitForTimeout(700);
await mpage.screenshot({ path: "shots/mobile-menu.png" });

await browser.close();
console.log("---console logs---");
console.log(logs.join("\n") || "(none)");
console.log("done");
