# Valea Plopului 1972 · UAP Explorer

> **Ficțiune / speculație.** Reconstrucție 3D ilustrativă a unui caz UAP raportat (Valea Plopului, Prahova, 1972). Nu constituie dovadă științifică. Interiorul obiectului este imaginat; procentele atașate „teoriilor” sunt estimări ale autorului, fără metodologie publicată. Afirmațiile din pagină (inclusiv „caz neexplicat”) nu sunt verificate independent aici.

Trei pagini HTML cu randare 3D (three.js r128, inclus local, licență MIT):
- `index.html` — meniu, dosar (date tehnice, analiză și teorii), scena exterioară cu simulare, interior explorabil, tururi ghidate, export video;
- `ValeaPlopului_Model3D_Tehnic.html` — model tehnic exterior la scară 1:1;
- `ValeaPlopului_Interior3D.html` — interior explorabil (reconstrucție speculativă).

## Utilizare
Deschide `index.html` într-un browser cu WebGL (desktop sau mobil). Comenzi: `H` ajutor, `T` tur ghidat, `SPACE` simulare; panoul de accesibilitate permite mișcare redusă, contrast ridicat și text mai mare.

## Surse și limitări
- Dimensiunile exterioare provin, conform paginii, din schița tehnică atribuită prof. Călin Turcu / RUFOR; investigatorii menționați sunt Călin Turcu, Ion Hobana și Justin Capră. Nu există bibliografie în aplicație, iar drepturile asupra schiței și imaginilor nu sunt precizate.
- Cazurile „comparabile” (Valensole, Trans-en-Provence, Socorro) sunt rezumate fără trimiteri la surse.
- Pagina poartă marca ASFAN-România / Enciclopedia FAN.

## Date și confidențialitate
Fără cereri de rețea (CSP cu `connect-src 'self'`, verificat: 0 cereri externe la încărcare). Fonturile și three.js sunt incluse. Linkurile de sprijin voluntar se deschid doar la click. Exportul video se face local în browser; partajarea folosește `navigator.share` dacă există.

## Licență
CC0 1.0 (domeniu public) pentru codul autorului, conform antetelor; three.js este MIT (notă păstrată în fișiere). Vezi `LICENSE`.

Audit: 2026-10-10
