// ValeaPlopului1972 — regresii din auditul adversarial (octombrie 2026): pictogramă în paginile 3D, ținte tactile pe ecrane tactile.
// Rulare: node tests/audit-2026-10.test.mjs
import fs from "fs";
import path from "path";
import {chromium, ROOT, PAGES, check, summary} from "./_lib.mjs";

console.log("1. pictogramă (fără cerere implicită /favicon.ico) în toate paginile");
for (const [k, f] of Object.entries(PAGES)) {
  const h = fs.readFileSync(path.join(ROOT, f), "utf8");
  check(`${k}: <link rel="icon" href="icon-192.png">`, /<link rel="icon"[^>]*href="icon-192\.png"/.test(h));
}

console.log("2. ținte tactile ≥ 44 px (pointer: coarse)");
const sel = {
  index: ["#menu-lang"],
  interior: ["#lang-sel", "#rights summary"],
  model: ["#lang-sel", "#mbtn-l", "#mbtn-r", "#sbtn-play", "#sbtn-rst", "#v0", "#v1", "#v2", "#v3", "#v4", "#v5"],
};
const browser = await chromium.launch({executablePath: "/opt/pw-browsers/chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--no-sandbox"]});
for (const [k, list] of Object.entries(sel)) {
  const ctx = await browser.newContext({viewport: {width: 390, height: 800}, hasTouch: true, isMobile: true});
  await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage();
  await page.goto("file://" + path.join(ROOT, PAGES[k]));
  await page.waitForTimeout(1200);
  const sizes = await page.evaluate(l => l.map(s => { const e = document.querySelector(s); if (!e) return [s, -1, -1]; const r = e.getBoundingClientRect(); return [s, r.width, r.height]; }), list);
  check(`${k}: ${list.join(", ")}`, sizes.every(([, w, h]) => h >= 43.5 && w >= 43.5), sizes.filter(([, w, h]) => !(h >= 43.5 && w >= 43.5)));
  await ctx.close();
}
await browser.close();
summary();
