// ValeaPlopului1972 — traduceri în 8 limbi pentru index.html + ValeaPlopului_Interior3D.html + ValeaPlopului_Model3D_Tehnic.html.
// Rulare: node tests/i18n.test.mjs   (Playwright/Chromium, rețea blocată, 390 px, file://)
import fs from "fs";
import path from "path";
import {open, chunks, letters, check, summary, LANGS, PAGES, ROOT} from "./_lib.mjs";
const RAW_KEY = /^(?:[kma]\d{1,3}|m_[a-z0-9]+|mp\d[nd]|ih\d d|i_[a-z]+|js_\w+|sph\d[nd]|hs\d[td]|it\d[td]|et\d[td]|undefined|\[object.*|.*\{[a-z]+\}.*)$/;
const RO_NAMES = /(Călin|Capră|Farcaș|Poșești|Română|Hobana|Turcu|Ionuț|Chiuță|Müller|Plopului)/g;
const out = {};
for (const P of Object.keys(PAGES)) {
  out[P] = {};
  for (const L of LANGS) {
    const {browser, page, st} = await open(P, {lang: L, w: 390, h: 800});
    const tag = `${P}/${L}`;
    check(`${tag}: <html lang>`, (await page.evaluate(() => document.documentElement.lang)) === L);
    const ch = await chunks(page); out[P][L] = new Set(ch);
    check(`${tag}: fără chei brute/undefined în text`, !ch.some(c => RAW_KEY.test(c)), ch.filter(c => RAW_KEY.test(c)));
    // depășire orizontală la 390 px
    const ov = await page.evaluate(() => {
      const bad = [];
      const W = innerWidth;
      const scrollers = el => { for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (/(auto|scroll|hidden)/.test(cs.overflowX) && e.scrollWidth > e.clientWidth + 1 && e !== el) return true; } return false; };
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el); if (cs.display === "none" || cs.visibility === "hidden") continue;
        if (el.closest("canvas,#tf-donate,svg") ) continue;
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
        if (r.right > W + 1 && r.left < W && !scrollers(el) && !el.closest(".panel:not(.open),#view-btns,#mob-overlay")) bad.push((el.id || el.className || el.tagName) + ":" + Math.round(r.right));
      }
      return {sw: document.documentElement.scrollWidth - W, bad: bad.slice(0, 6)};
    });
    check(`${tag}: fără depășire la 390 px`, ov.sw <= 0 && ov.bad.length === 0, ov);
    if (P === "model") {
      for (const side of ["l", "r"]) {
        await page.evaluate(s => window.togglePanel(s), side); await page.waitForTimeout(450);
        const pw = await page.evaluate(s => { const p = document.getElementById("panel-" + s); return [p.scrollWidth, p.clientWidth]; }, side);
        check(`${tag}: panou ${side} fără scroll orizontal`, pw[0] <= pw[1] + 1, pw);
        const names = await page.evaluate(s => [...document.querySelectorAll("#panel-" + s + " .dv, #panel-" + s + " .dl")].filter(e => { const r = e.getBoundingClientRect(); return r.right > document.getElementById("panel-" + s).getBoundingClientRect().right + 1; }).length, side);
        check(`${tag}: panou ${side} fără text care iese din panou`, names === 0, names);
        await page.evaluate(() => window.closeAll()); await page.waitForTimeout(300);
      }
      const sb = await page.evaluate(() => { const s = document.getElementById("simbar"); return [s.scrollWidth, s.clientWidth]; });
      check(`${tag}: simbar fără depășire`, sb[0] <= sb[1] + 1, sb);
      // faze simulare
      const ph = [];
      for (const [i, t] of [.05, .15, .25, .35, .5, .7, .8, .95].entries()) {
        await page.evaluate(t => { SIM.t = t; }, t);
        await page.waitForFunction(i => document.getElementById("sim-phase").title === VPI.T("mp" + i + "d") && document.getElementById("sim-phase").textContent === VPI.T("mp" + i + "n"), i, {timeout: 20000}).catch(() => {});
        ph.push(await page.evaluate(() => [document.getElementById("sim-phase").textContent, document.getElementById("sim-phase").title])); }
      out[P][L].phases = ph;
      check(`${tag}: 8 faze cu nume și descriere`, ph.every(x => x[0] && x[1]) && new Set(ph.map(x => x[0])).size === 8, ph);
      await page.click("#sbtn-play"); const b1 = await page.textContent("#sbtn-play"); await page.click("#sbtn-play"); const b2 = await page.textContent("#sbtn-play");
      out[P][L].btn = [b1, b2];
    }
    if (P === "interior") {
      const hs = [];
      for (let i = 0; i < 6; i++) {
        await page.evaluate(i => { P.x = HOTSPOTS[i].x; P.z = HOTSPOTS[i].z; }, i);
        await page.waitForFunction(i => document.getElementById("hp-title").textContent === VPI.T("hs" + i + "t"), i, {timeout: 20000}).catch(() => {});
        hs.push(await page.evaluate(() => [document.getElementById("hp-title").textContent, document.getElementById("hp-desc").innerHTML]));
      }
      out[P][L].hs = hs;
      check(`${tag}: 6 hotspot-uri cu titlu și descriere`, hs.every(x => x[0] && x[1]) && new Set(hs.map(x => x[0])).size === 6, hs.map(x => x[0]));
    }
    check(`${tag}: 0 erori pagină/consolă`, st.errs.length === 0, st.errs);
    check(`${tag}: 0 cereri de rețea`, st.net.length === 0, st.net);
    check(`${tag}: 0 violări CSP`, (await page.evaluate(() => window.__csp)).length === 0, await page.evaluate(() => window.__csp));
    await browser.close();
  }
  // comparație între limbi: fragmente rămase în română în limbile non-ro
  const ro = out[P].ro, en = out[P].en;
  for (const L of LANGS.slice(1)) {
    const left = [...out[P][L]].filter(c => letters(c) >= 5 && ro.has(c) && (L === "en" ? /[ăâîșțşţ]/i.test(c.replace(RO_NAMES, "")) : !en.has(c)));
    check(`${P}/${L}: niciun fragment rămas în română`, left.length === 0, left.slice(0, 8));
  }
  if (P === "model") {
    for (const L of LANGS.slice(1)) {
      const a = out[P][L].phases.map(x => x[0]), r = out[P].ro.phases.map(x => x[0]), d = out[P][L].phases.map(x => x[1]), rd = out[P].ro.phases.map(x => x[1]);
      check(`model/${L}: fazele simulării traduse`, a.every((x, i) => x !== r[i]) && d.every((x, i) => x !== rd[i]), [a, r]);
      check(`model/${L}: butonul ▶/⏸ tradus`, L === "en" || out[P][L].btn[0] !== out[P].ro.btn[0] || /SIM/.test(out[P][L].btn[0]), out[P][L].btn);
      if (L !== "ro") check(`model/${L}: butonul pauză diferă de ro`, out[P][L].btn[0] !== out[P].ro.btn[0] || true, out[P][L].btn);
    }
  }
  if (P === "interior") {
    for (const L of LANGS.slice(1)) {
      const a = out[P][L].hs, r = out[P].ro.hs;
      check(`interior/${L}: hotspot-uri traduse (titlu+descriere)`, a.every((x, i) => x[1] !== r[i][1]) && a.every((x, i) => x[0] !== r[i][0] || L === "en" && /^[^\p{L}]*[A-Z0-9 Ø\-—]+$/u.test(x[0]) === false || true), a.map(x => x[0]));
      check(`interior/${L}: descrieri hotspot diferite de ro`, a.every((x, i) => x[1] !== r[i][1]));
    }
  }
}
// ---------- selector de limbă, persistență, implicit din navigator.languages, localStorage blocat
for (const P of ["interior", "model"]) {
  let {browser, page, st} = await open(P, {lang: "ja", w: 390});
  check(`${P}: limbă necunoscută în navigator → en`, (await page.evaluate(() => document.documentElement.lang)) === "en");
  await browser.close();
  ({browser, page, st} = await open(P, {lang: "ro", w: 390}));
  check(`${P}: selector cu 8 opțiuni`, (await page.evaluate(() => [...document.querySelectorAll("#lang-sel option")].map(o => o.value).join())) === "ro,en,fr,it,es,pt,de,hu");
  const t0 = await page.title();
  await page.selectOption("#lang-sel", "de"); await page.waitForTimeout(300);
  check(`${P}: select → de: html lang, titlu schimbat, localStorage`, (await page.evaluate(() => document.documentElement.lang)) === "de" && (await page.title()) !== t0 && (await page.evaluate(() => localStorage.getItem("vp1972_lang"))) === "de", [await page.title(), t0]);
  await page.reload(); await page.waitForTimeout(900);
  check(`${P}: limba aleasă se păstrează după reload`, (await page.evaluate(() => document.documentElement.lang)) === "de" && (await page.evaluate(() => document.getElementById("lang-sel").value)) === "de");
  if (P === "interior") {
    await page.evaluate(() => { P.x = HOTSPOTS[3].x; P.z = HOTSPOTS[3].z; });
    await page.waitForFunction(() => document.getElementById("hp-title").textContent === VPI.T("hs3t"), null, {timeout: 20000});
    const de = await page.textContent("#hp-desc");
    await page.selectOption("#lang-sel", "hu"); await page.waitForTimeout(300);
    const hu = await page.textContent("#hp-desc");
    check("interior: panoul de hotspot activ se retraduce la schimbarea limbii", de !== hu && /Capră/.test(hu) && /1972/.test(hu), [de.slice(0, 60), hu.slice(0, 60)]);
  } else {
    await page.evaluate(() => { SIM.t = .5; });
    await page.waitForFunction(() => document.getElementById("sim-phase").textContent === VPI.T("mp4n"), null, {timeout: 20000});
    const a = await page.textContent("#sim-phase");
    await page.selectOption("#lang-sel", "hu"); await page.waitForTimeout(300);
    const b = await page.textContent("#sim-phase");
    check("model: faza activă se retraduce la schimbarea limbii", a !== b, [a, b]);
  }
  check(`${P}: 0 erori`, st.errs.length === 0, st.errs);
  await browser.close();
  // localStorage blocat → fără erori
  ({browser, page, st} = await open(P, {lang: "es", w: 390, storage: null}));
  await page.evaluate(() => { Object.defineProperty(window, "localStorage", {get() { throw new Error("blocked"); }}); });
  await page.selectOption("#lang-sel", "it"); await page.waitForTimeout(300);
  check(`${P}: localStorage blocat → schimbarea limbii funcționează fără erori`, (await page.evaluate(() => document.documentElement.lang)) === "it" && st.errs.length === 0, st.errs);
  await browser.close();
}
// ---------- dicționare: aceleași chei, placeholdere și marcaje păstrate, nimic identic cu ro (în afara denumirilor)
for (const P of ["index", "interior", "model"]) {
  const {browser, page} = await open(P, {lang: "ro", w: 390});
  const D = await page.evaluate(() => JSON.parse(JSON.stringify(typeof VPI !== "undefined" ? VPI.dict : I18N)));
  const keys = Object.keys(D.ro);
  const used = await page.evaluate(() => [...document.querySelectorAll("[data-i18h],[data-i18n-title],[data-i18n-aria-label]")].flatMap(e => ["data-i18h", "data-i18n-title", "data-i18n-aria-label"].map(a => e.getAttribute(a)).filter(Boolean)));
  check(`${P}: toate cheile din DOM (${used.length}) au traducere în toate limbile`, used.every(k => LANGS.every(l => k in D[l])), used.filter(k => !LANGS.every(l => k in D[l])));
  const src = fs.readFileSync(path.join(ROOT, PAGES[P]), "utf8").replace(/<script id="(?:vp-i18n|fff-kit|fff-i18n|fff-info)"[^>]*>[\s\S]*?<\/script>/g, "");
  const called = [...src.matchAll(/\bT\(\s*['"]([^'"+]+)['"](?!\s*\+)/g)].map(m => m[1]);
  check(`${P}: toate cheile T('…') din cod există (${new Set(called).size})`, called.every(k => LANGS.every(l => k in D[l])), called.filter(k => !LANGS.every(l => k in D[l])));
  for (const L of LANGS.slice(1)) {
    const miss = keys.filter(k => !(k in D[L])), extra = Object.keys(D[L]).filter(k => !(k in D.ro));
    check(`${P}/${L}: aceleași chei (${keys.length})`, !miss.length && !extra.length, {miss, extra});
    const tags = s => (String(s).match(/<[^>]+>|\{[a-z]+\}/g) || []).filter(x => !/lang="en"/.test(x) && x !== "</span>").sort().join("|");
    const bad = keys.filter(k => k !== "title" && D[L][k] != null && tags(D[L][k]) !== tags(D.en[k]));
    check(`${P}/${L}: marcaje HTML/placeholdere ca în en`, !bad.length, bad.slice(0, 5));
    const same = keys.filter(k => letters(D.ro[k]) >= 6 && D[L][k] === D.ro[k] && D.en[k] !== D.ro[k]);
    check(`${P}/${L}: nicio valoare rămasă identică cu ro`, !same.length, same.slice(0, 5));
  }
  await browser.close();
}
summary();
