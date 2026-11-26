// Zrzuty grafik wpisu „Agenci AI w firmie” z agenci-ai.html do src/assets/wpisy/ (PNG, skala 2).
// Uruchom z katalogu projektu: node docs/blog-szkice/podglad/zrzut-agenci-ai.mjs [en]
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

// Bez argumentu: polskie grafiki. Z argumentem `en`: angielskie z agenci-ai-en.html, pliki z `-en-`.
const en = process.argv[2] === 'en';
if (process.argv[2] && !en) throw new Error('Nieznany argument: użyj bez argumentu (PL) albo z "en".');
const adres = `agenci-ai-w-firmie${en ? '-en' : ''}`;
const strona = new URL(en ? './agenci-ai-en.html' : './agenci-ai.html', import.meta.url).href;
const cel = fileURLToPath(new URL('../../../src/assets/wpisy/', import.meta.url));

const przegladarka = await chromium.launch();
const karta = await przegladarka.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light' });
await karta.goto(strona, { waitUntil: 'networkidle' });
await karta.evaluate(() => document.fonts.ready);
for (const n of [1, 2, 3]) await karta.locator(`#g${n}`).screenshot({ path: `${cel}${adres}-${n}.png` });
// miniatura: 1128 x 636 px, jak w pozostałych wpisach
const mini = await przegladarka.newPage({ viewport: { width: 1128, height: 636 }, deviceScaleFactor: 1 });
await mini.goto(strona, { waitUntil: 'networkidle' });
await mini.evaluate(() => document.fonts.ready);
await mini.locator('#mini').screenshot({ path: `${cel}${adres}-miniatura.png` });
await przegladarka.close();
console.log('4 pliki w', cel);
