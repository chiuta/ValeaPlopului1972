# Jurnal de modificări — ValeaPlopului1972

## 2.2.3 — 2026-11-20

- fff-kit 1.8.1: când `localStorage`/`sessionStorage` aruncă sau lipsesc (cookie-uri și date de site blocate, WebView fără stocare, `<iframe sandbox>`), kitul pune în loc o stocare în memorie, iar pagina pornește în loc să se oprească; datele nu se păstrează după închiderea paginii
- fff-kit 1.8.1: ghidajul care mărește controalele mici la 44 px măsoară acum și lățimea corpului paginii și a părintelui, deci un rând de butoane nu mai poate ieși din ecran (grupul rămâne neatins când mărirea l-ar depăși)

## 2.2.2 — 2026-11-17

- Compatibilitate cu browsere mai vechi (Chrome/Edge 55+, Firefox 52+, Safari 10.1+/iOS 10.3+): kitul 1.8.0 aduce stratul de compatibilitate (rezerve pentru API-urile care lipsesc în motoarele vechi), iar sintaxa JavaScript mai nouă decât ES2017 a fost înlocuită cu forme echivalente acolo unde exista; expresiile regulate noi și `import()` trec prin rezerve. Fără modificări de funcționalitate intenționate. Verificat cu parser ES2017 și într-un motor vechi simulat, nu pe dispozitive reale.

## 2.2.1 — 2026-11-15

- Nou: butoane de distribuire pe rețele sociale (vertical, pe marginea din stânga; fără scripturi externe, doar linkuri deschise la clic); bara de zoom cu lupă și „potrivire ecran” revine pe marginea din dreapta, centrată pe verticală; corectat afișarea suprapusă la zoom mare (panourile cu înălțimi în vh/vw nu mai ies din ecran).

## 2.2.0 — 2026-11-15

- Nou: accesibilitate pe toate ecranele — butonul „Aa” (mărimea textului, contrast ridicat, fără animații, text lizibil, linkuri subliniate, citire cu voce), săgeata „Înapoi sus” și „Sari la conținut”; fereastra se potrivește mereu ecranului; zoom-ul cu lupă și „potrivire ecran” stau acum pe marginea din stânga (fff-kit 1.6.0).

## 2.1.8 — 2026-11-15

- Nou: texturi fractale hiper-detaliate (fff-texturi 1.1.2) — fundalul și suprafețele mari (carduri, panouri, antete, butoane; filele și dialogurile ascunse la încărcare, când se deschid) primesc un material generat local (WebGL2, fără rețea și fără imagini), care se repetă fără cusătură; culorile aplicației rămân ale ei. Se oprește din dialogul „Transparență” sau cu `?notex=1`.

## 2.1.3 — 2026-11-08

- Panou de ajutor (H): legendă pe trei niveluri — din mărturie (atribuită), reconstrucție, imaginat (8 limbi).

## 2.1.0 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

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
