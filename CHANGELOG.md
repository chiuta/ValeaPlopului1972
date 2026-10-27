# Jurnal de modificări — ValeaPlopului1972

## 2.1.0 — 2026-10-27 (anterior: 2.0.1)

Anonimizarea numelor persoanelor reale (tura 2 a recenziei).

- **Anonimizare** în `index.html`, `ValeaPlopului_Model3D_Tehnic.html`, `ValeaPlopului_Interior3D.html` (toate cele 8 limbi), în README și traducerile lui: numele s-au înlocuit cu inițiale (investigatorii: C.T., I.H., J.C., D.D.F.; polițistul din comparația Socorro 1964: L.Z.). Regula: inițiala fiecărei părți a numelui + punct. Sensul textului, locurile și organizațiile (RUFOR, ASFAN) sunt neschimbate; nu s-a șters conținut.
- Avertizarea de la intrare a fost păstrată și adaptată în 8 limbi („numele au fost anonimizate”; afirmațiile atribuite rămân neverificate independent). Traducerile fr/it/es/pt/de/hu: traducere automată.
- `VP1972_og_image.png` (conținea numele în subtitlu) și toate cele 9 capturi de ecran (`screenshot*.png`) au fost refăcute fără nume.
- În paginile Model3D și Interior3D nota de anonimizare este acum pliată implicit (se vede rândul-titlu, se deschide cu un clic): caseta deschisă acoperea butoanele de pe ecrane mici și bloca `tests/i18n.test.mjs` (clic interceptat de casetă), cauza timpului depășit raportat în tura 1.
- Corecție de aspect: meniul de start (`#menu`) tăia sus avertizarea la ferestre mai joase de conținut (centrare flex cu defilare); acum conținutul începe de sus și rămâne defilabil.
- Test nou `tests/anonimizare.test.mjs`: nicio apariție a numelor originale în fișierele text; folosește doar amprente SHA-256 ale token-urilor normalizate, nu lista numelor. `tests/i18n.test.mjs` adaptat.
- Hash-urile CSP, `app.json`, `sw.js` regenerate cu fff-kit.

Nu implementat:

- **Istoricul git păstrează versiunea veche** (commit-uri, PR #2 cu descrierea lui, cache-ul GitHub Pages). Rescrierea istoricului (de exemplu `git filter-repo`) rămâne decizia autorului.
- Fișierele din arhiva pe care nu o controlăm (copii externe, cache-uri de browser/CDN) pot păstra numele.

## 2.0.1 — 2026-10-27 (anterior: 2.0.0)

Doar texte/avertizare, fără funcții noi.

- Avertizare vizibilă la intrare (meniul de start din `index.html`, casetă pliabilă în paginile Model3D și Interior3D), în 8 limbi: aplicația conține nume de persoane reale folosite fără acordul lor; recomandare ca autorul să anonimizeze sau să obțină acordul înainte de distribuire amplă.
- README: secțiunea „Avertizare: nume de persoane reale”, „Stare” și „Offline” (8 limbi).

Nu implementat:

- Anonimizarea numelor: NU s-a făcut (decizia aparține autorului; conținutul nu a fost șters sau modificat).

Istoricul anterior (1.x–2.0.0) este în secțiunea „History” din README.md.
