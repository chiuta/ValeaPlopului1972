// ValeaPlopului1972 — anonimizare (2.1.0): nicio apariție a numelor de familie ale persoanelor reale în fișierele text.
// Lista numelor NU este păstrată în depozit: doar amprente SHA-256 ale token-urilor normalizate (litere mici, fără diacritice).
// Rulare: node tests/anonimizare.test.mjs   (fără browser)
import fs from "fs";
import path from "path";
import crypto from "crypto";
import {ROOT, check, summary} from "./_lib.mjs";

const BLOCKED = new Set([
  "26896d8efd87de515c8913a30932d8c28f41e416cba5099ef644f7f9721441fb",
  "ebc6adc3bd6fc0a1f29ce919842ae8590cb5374625caf46c420fda92ef0f31ea",
  "c6cd3494650dc72bbbfd2bdbab28fea9eec33aa7623237d34303c37c34037393",
  "54678f51534132b9aaab3735b1a13156341b5f21608d6b449581d6f5c2a610c2",
  "bed942d84bc9476c9c5505a0f6586d5f750104506e271ad9c8f6586937e17f40",
]);
const EXT = /\.(html?|md|mjs|js|json|webmanifest|txt|css|svg|yml|yaml)$/i;
const norm = s => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
const sha = s => crypto.createHash("sha256").update(s).digest("hex");
function walk(d, out = []) {
  for (const e of fs.readdirSync(d, {withFileTypes: true})) {
    if (e.name === ".git" || e.name === "node_modules") continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out); else if (EXT.test(e.name) || e.name === "CNAME" || e.name === "LICENSE") out.push(p);
  }
  return out;
}
const files = walk(ROOT);
check("există fișiere de scanat", files.length >= 10, files.length);
const hits = [];
for (const f of files) {
  let t = fs.readFileSync(f, "utf8");
  t = t.replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
  for (const w of new Set(norm(t).match(/\p{L}+/gu) || [])) if (BLOCKED.has(sha(w))) hits.push(path.relative(ROOT, f));
}
check("niciun nume original în fișierele text (token-uri normalizate, hash)", hits.length === 0, [...new Set(hits)]);
// inițialele sunt prezente în cele trei pagini (anonimizarea nu a șters conținutul)
for (const f of ["index.html", "ValeaPlopului_Model3D_Tehnic.html", "ValeaPlopului_Interior3D.html"]) {
  const h = fs.readFileSync(path.join(ROOT, f), "utf8");
  check(`${f}: conține inițialele C.T. și J.C.`, h.includes("C.T.") && h.includes("J.C."));
  check(`${f}: nota de anonimizare în 8 limbi`, ["NOTĂ: numele", "NOTE: the names", "NOTE : les noms", "NOTA: i nomi", "NOTA: los nombres", "NOTA: os nomes", "HINWEIS: Namen", "MEGJEGYZÉS: a valós"].every(s => h.includes(s)));
}
summary();
