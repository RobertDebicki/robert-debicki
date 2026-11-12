// Zrzuty grafik i miniaturek z podglad.html do src/assets/wpisy/ (PNG, kolumna 600 px, skala 2, tryb jasny).
// Wąska kolumna: na telefonie obraz zmniejsza się mniej, więc tekst w grafice zostaje czytelny.
// Grafika bez podpisu i linii ALT: podpis trafia do treści wpisu jako tekst, ALT do opisu obrazka.
// Uruchom z katalogu projektu: node docs/blog-szkice/podglad/zrzuty.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const podglad = new URL('./podglad.html', import.meta.url).href;
const cel = fileURLToPath(new URL('../../../src/assets/wpisy/', import.meta.url));

const przegladarka = await chromium.launch();
const strona = await przegladarka.newPage({ viewport: { width: 600, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light' });
await strona.goto(podglad, { waitUntil: 'networkidle' });
await strona.evaluate(() => document.fonts.ready);
await strona.addStyleTag({ content: '.top{position:static} .graf .alt, .graf figcaption{display:none} .graf{box-shadow:none; margin:0}' });

for (const wpis of await strona.locator('article.wpis').all()) {
  const adres = await wpis.getAttribute('id');
  const grafiki = await wpis.locator('figure.graf').all();
  for (const [i, g] of grafiki.entries()) await g.screenshot({ path: `${cel}${adres}-${i + 1}.png` });
  await strona.locator(`.karta a.mini[href="#${adres}"] svg`).screenshot({ path: `${cel}${adres}-miniatura.png` });
  console.log(adres, grafiki.length, 'grafik i miniatura');
}
await przegladarka.close();
