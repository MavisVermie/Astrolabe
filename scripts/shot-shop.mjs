// Shop page verification pass (uses cached Playwright Chromium).
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.SHOT_URL || "http://localhost:5173/#/shop";
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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
await page.screenshot({ path: "shots/shop-top.png" });

// Assertions
const cards = await page.locator("article").count();
console.log("product cards (All):", cards);
console.log(
  "shop nav active:",
  await page
    .locator("nav a", { hasText: "Shop" })
    .first()
    .evaluate((el) => el.className.includes("text-[#CF9E58]"))
);

// Filter to Tea
await page.getByRole("button", { name: "Tea", exact: true }).click();
await page.waitForTimeout(900);
console.log("product cards (Tea):", await page.locator("article").count());
await page.screenshot({ path: "shots/shop-tea.png" });

// Back to All, add items to cart
await page.getByRole("button", { name: "All", exact: true }).click();
await page.waitForTimeout(600);
await page.getByRole("button", { name: /Add El Salvador/ }).click();
await page.getByRole("button", { name: /Add El Salvador/ }).click();
await page.getByRole("button", { name: /Add Pottery Mug/ }).click();
await page.waitForTimeout(400);
console.log(
  "cart badge:",
  await page.locator('button[aria-label^="Open cart"] span').last().innerText()
);

// Open drawer
await page.locator('button[aria-label^="Open cart"]').click();
await page.waitForTimeout(800);
await page.screenshot({ path: "shots/shop-cart.png" });
console.log(
  "cart total shown:",
  await page
    .locator('[aria-label="Shopping cart"]')
    .getByText(/JOD/)
    .last()
    .innerText()
);

// Increase qty, then close with Escape
await page
  .locator('button[aria-label="Increase Pottery Mug quantity"]')
  .click();
await page.waitForTimeout(300);
await page.keyboard.press("Escape");
await page.waitForTimeout(600);
console.log(
  "drawer closed:",
  await page
    .locator('[aria-label="Shopping cart"]')
    .evaluate((el) => el.parentElement.className.includes("opacity-0"))
);

// Navigate back to landing via Menu link
await page.locator("nav a", { hasText: "Menu" }).first().click();
await page.waitForTimeout(1500);
console.log("back on landing, url:", page.url());
console.log(
  "menu section visible:",
  await page
    .locator("#menu")
    .evaluate((el) => el.getBoundingClientRect().top < 900)
);
await page.screenshot({ path: "shots/shop-back-landing.png" });

// Mobile pass
const mpage = await browser.newPage({ viewport: { width: 390, height: 844 } });
mpage.on("pageerror", (e) => logs.push(`[m-pageerror] ${e.message}`));
await mpage.goto(BASE, { waitUntil: "networkidle" });
await mpage.waitForTimeout(1500);
await mpage.screenshot({ path: "shots/shop-mobile.png" });

await browser.close();
console.log("---console logs---");
console.log(logs.join("\n") || "(none)");
console.log("done");
