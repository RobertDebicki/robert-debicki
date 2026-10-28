// Obraz podglądu linku (Open Graph) 1200 x 630: public/og.png. Uruchamiać ręcznie po zmianie logo albo roli:
// node skrypty/obraz-og.mjs
// Fonty i znak te same co na stronie (node_modules/@fontsource-variable, src/assets/logo/znak.svg).
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

// CSS z Fontsource (wszystkie podzbiory znaków z unicode-range), pliki wpisane jako data URI, rodzina przemianowana.
const fonty = (pakiet, css, rodzina) => {
  const katalog = `node_modules/@fontsource-variable/${pakiet}`;
  return readFileSync(`${katalog}/${css}`, 'utf8')
    .replace(/font-family: '[^']+'/g, `font-family: ${rodzina}`)
    .replace(/url\(\.\/files\/([^)]+)\)/g, (_, plik) => `url(data:font/woff2;base64,${readFileSync(`${katalog}/files/${plik}`).toString('base64')})`);
};
const znak = readFileSync('src/assets/logo/znak.svg', 'utf8').replace('<svg ', '<svg class="znak" ');
const pasek = ['#EF7F1A', '#d0201a', '#ffc400', '#131412'].map((k) => `<i style="background:${k}"></i>`).join('');

const html = `<!doctype html><meta charset="utf-8"><style>
${fonty('anybody', 'wdth.css', 'A')}
${fonty('spline-sans-mono', 'index.css', 'M')}
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #f4f5f1; color: #131412; position: relative; overflow: hidden;
  background-image: radial-gradient(circle, rgba(239,127,26,.22) 3px, transparent 3.5px); background-size: 22px 22px; background-position: 640px 0; }
.pasek { position: absolute; inset: 0 0 auto; height: 16px; display: grid; grid-template-columns: repeat(4, 1fr); }
.tresc { position: absolute; left: 80px; top: 92px; right: 80px; }
.znak { height: 64px; width: auto; color: #131412; }
h1 { font: 850 128px/0.9 A; font-variation-settings: "wdth" 125; letter-spacing: -0.02em; margin-top: 40px; }
p { font: 500 40px/1.2 A; margin-top: 30px; }
b { background: #ffc400; padding: 0 8px; font-weight: 800; }
.dane { position: absolute; left: 80px; bottom: 56px; font: 600 26px M; color: #555850; }
</style><div class="pasek">${pasek}</div><div class="tresc">${znak}<h1>Robert<br>Dębicki</h1>
<p>Automation Developer <b>/ AI</b></p></div><div class="dane">n8n · Make.com · Claude Code · Wrocław</div>`;

const przegladarka = await chromium.launch();
const strona = await przegladarka.newPage({ viewport: { width: 1200, height: 630 } });
await strona.setContent(html);
await strona.evaluate(() => document.fonts.ready);
await strona.screenshot({ path: 'public/og.png' });
await przegladarka.close();
console.log('public/og.png gotowe');
