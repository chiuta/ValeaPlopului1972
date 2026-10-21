// Ajutoare pentru testele Playwright ale ValeaPlopului1972 (rețea blocată, CSP real, file://).
import {createRequire} from "module";
import path from "path";
import {fileURLToPath} from "url";
const require = createRequire("/opt/node-tools/package.json");
export const {chromium} = require("playwright");
export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, "..");
export const PAGES = {index: "index.html", interior: "ValeaPlopului_Interior3D.html", model: "ValeaPlopului_Model3D_Tehnic.html"};
export const LANGS = ["ro", "en", "fr", "it", "es", "pt", "de", "hu"];
export const LOCALE = {ro: "ro-RO", en: "en-US", fr: "fr-FR", it: "it-IT", es: "es-ES", pt: "pt-PT", de: "de-DE", hu: "hu-HU"};
let fails = 0, passes = 0;
export function check(name, cond, extra) { if (cond) { passes++; console.log("  ok  " + name); } else { fails++; console.log("FAIL  " + name + (extra !== undefined ? "  -> " + JSON.stringify(extra).slice(0, 600) : "")); } }
export function summary() { console.log(`\n${passes} reușite, ${fails} eșuate`); process.exit(fails ? 1 : 0); }
export async function open(pageKey, {lang = "ro", w = 390, h = 800, storage = null, touch = false} = {}) {
  const browser = await chromium.launch({executablePath: "/opt/pw-browsers/chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]});
  const ctx = await browser.newContext({viewport: {width: w, height: h}, locale: LOCALE[lang], hasTouch: touch});
  await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage();
  const st = {errs: [], net: []};
  page.on("pageerror", e => st.errs.push(String(e)));
  page.on("console", m => { if (m.type() === "error") st.errs.push("console:" + m.text()); });
  page.on("request", r => { if (/^https?:/.test(r.url())) st.net.push(r.url()); });
  await page.addInitScript(() => { window.__csp = []; document.addEventListener("securitypolicyviolation", e => window.__csp.push(e.violatedDirective + " " + e.blockedURI)); });
  if (storage) await page.addInitScript(s => { try { localStorage.setItem(s[0], s[1]); } catch (e) {} }, storage);
  await page.goto("file://" + path.join(ROOT, PAGES[pageKey]));
  await page.waitForTimeout(1500);
  return {browser, ctx, page, st};
}
/** Fragmente de text (noduri text + title/aria-label/placeholder) din tot DOM-ul, inclusiv ascuns. */
export async function chunks(page) {
  return page.evaluate(() => {
    const out = new Set();
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) { const p = n.parentElement; if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.tagName)) continue; const t = n.nodeValue.replace(/\s+/g, " ").trim(); if (t) out.add(t); }
    document.querySelectorAll("[title],[aria-label],[placeholder]").forEach(e => { for (const a of ["title", "aria-label", "placeholder"]) { const v = e.getAttribute(a); if (v) out.add(v.replace(/\s+/g, " ").trim()); } });
    return [...out];
  });
}
export function letters(s) { return (s.match(/\p{L}/gu) || []).length; }
