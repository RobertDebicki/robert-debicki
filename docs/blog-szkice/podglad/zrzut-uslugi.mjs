// Zrzuty grafik stron usług z uslugi-grafiki.html do src/assets/uslugi/ (PNG, skala 2).
// Uruchom z katalogu projektu: node docs/blog-szkice/podglad/zrzut-uslugi.mjs [en]
// Z argumentem `en`: angielskie grafiki z uslugi-grafiki-en.html, pliki z `-en-`.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const en = process.argv[2] === 'en';
if (process.argv[2] && !en) throw new Error('Nieznany argument: użyj bez argumentu (PL) albo z "en".');
const strona = new URL(en ? './uslugi-grafiki-en.html' : './uslugi-grafiki.html', import.meta.url).href;
const cel = fileURLToPath(new URL('../../../src/assets/uslugi/', import.meta.url));
mkdirSync(cel, { recursive: true });
const przegladarka = await chromium.launch();
const karta = await przegladarka.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light' });
await karta.goto(strona, { waitUntil: 'networkidle' });
await karta.evaluate(() => document.fonts.ready);
const id = await karta.locator('figure.graf').evaluateAll((f) => f.map((e) => e.id));
for (const n of id) await karta.locator(`#${n}`).screenshot({ path: `${cel}${n}.png` });
await przegladarka.close();
console.log(id.length, 'plików w', cel);
