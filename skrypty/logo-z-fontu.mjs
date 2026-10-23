// Zamienia plik logo od grafika (eksport CorelDRAW z fontami SVG) na czyste SVG bez <text> i <font>.
// Przeglądarki nie renderują fontów SVG, więc napis "ROBERT DĘBICKI" trzeba zamienić na ścieżki:
// każdy glif z <font> dostaje transformację translate(x, y) scale(s, -s) (font: oś y w górę, 1000 jednostek na em),
// a transformacja jest wpisywana bezpośrednio we współrzędne.
// Użycie: node skrypty/logo-z-fontu.mjs [plik-źródłowy]   (domyślnie docs/logo/zrodlo-grafik.svg)
// Wynik: src/assets/logo/{znak,logo-pelne}.svg, te same pliki w docs/logo/ oraz public/favicon.svg.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const ZRODLO = process.argv[2] ?? 'docs/logo/zrodlo-grafik.svg';
const POMARANCZ = '#EF7F1A';
const JEDNOSTKI_EM = 1000;
const svg = readFileSync(ZRODLO, 'utf8');

const atrybut = (tag, nazwa) => tag.match(new RegExp(`\\s${nazwa}="([^"]*)"`))?.[1];

// Fonty: rodzina -> { unicode -> { adv, d } }
const fonty = {};
for (const [, blok] of svg.matchAll(/<font\b([\s\S]*?)<\/font>/g)) {
  const rodzina = blok.match(/font-family="([^"]+)"/)[1];
  const domyslnyAdv = Number(blok.match(/^[^>]*horiz-adv-x="([^"]+)"/)[1]);
  const glify = {};
  for (const [, tag, d] of blok.matchAll(/<glyph\b([^>]*)>(?:<path d="([^"]*)"\/>)?<\/glyph>/g)) {
    glify[atrybut(tag, 'unicode')] = { adv: Number(atrybut(tag, 'horiz-adv-x') ?? domyslnyAdv), d: d ?? '' };
  }
  fonty[rodzina] = glify;
}

// Klasy CSS: .fntN -> { rodzina, rozmiar }, .filN -> kolor
const klasy = {};
for (const [, nazwa, cialo] of svg.matchAll(/\.(\w+)\s*\{([^}]*)\}/g)) klasy[nazwa] = cialo;
const stylFontu = (klasa) => {
  const cialo = klasy[klasa];
  return { rodzina: cialo.match(/font-family:'([^']+)'/)[1], rozmiar: Number(cialo.match(/font-size:([\d.]+)/)[1]) };
};

// Ścieżka: parser poleceń M m L l H h V v C c Z z -> polecenia absolutne po transformacji.
function sciezkaPoTransformacji(d, tx, ty, s) {
  const tokeny = d.match(/[MmLlHhVvCcZz]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g) ?? [];
  const wynik = [];
  let i = 0, x = 0, y = 0, startX = 0, startY = 0, polecenie = '';
  const liczba = () => Number(tokeny[i++]);
  const T = (px, py) => [tx + s * px, ty - s * py];
  while (i < tokeny.length) {
    if (/[A-Za-z]/.test(tokeny[i])) polecenie = tokeny[i++];
    const wzgl = polecenie === polecenie.toLowerCase();
    const P = polecenie.toUpperCase();
    if (P === 'Z') { wynik.push({ c: 'Z', p: [] }); x = startX; y = startY; continue; }
    if (P === 'M' || P === 'L') {
      let nx = liczba(), ny = liczba();
      if (wzgl) { nx += x; ny += y; }
      x = nx; y = ny;
      if (P === 'M') { startX = x; startY = y; wynik.push({ c: 'M', p: [T(x, y)] }); polecenie = wzgl ? 'l' : 'L'; }
      else wynik.push({ c: 'L', p: [T(x, y)] });
    } else if (P === 'H') { x = wzgl ? x + liczba() : liczba(); wynik.push({ c: 'L', p: [T(x, y)] }); }
    else if (P === 'V') { y = wzgl ? y + liczba() : liczba(); wynik.push({ c: 'L', p: [T(x, y)] }); }
    else if (P === 'C') {
      const pkt = [];
      for (let k = 0; k < 3; k++) { let px = liczba(), py = liczba(); if (wzgl) { px += x; py += y; } pkt.push([px, py]); }
      [x, y] = pkt[2];
      wynik.push({ c: 'C', p: pkt.map(([px, py]) => T(px, py)) });
    } else throw new Error(`Nieobsługiwane polecenie ścieżki: ${polecenie}`);
  }
  return wynik;
}

// Ramka ścieżki z dokładnymi ekstremami krzywych Béziera.
function rozszerzRamke(r, [px, py]) { r[0] = Math.min(r[0], px); r[1] = Math.min(r[1], py); r[2] = Math.max(r[2], px); r[3] = Math.max(r[3], py); }
function ramkaPolecen(polecenia, r) {
  let biezacy = null;
  for (const { c, p } of polecenia) {
    if (c === 'M' || c === 'L') { rozszerzRamke(r, p[0]); biezacy = p[0]; }
    else if (c === 'C') {
      const [p0, p1, p2, p3] = [biezacy, ...p];
      rozszerzRamke(r, p3);
      for (const os of [0, 1]) {
        const [a0, a1, a2, a3] = [p0[os], p1[os], p2[os], p3[os]];
        const a = -a0 + 3 * a1 - 3 * a2 + a3, b = 2 * (a0 - 2 * a1 + a2), cc = a1 - a0;
        const pierwiastki = Math.abs(a) < 1e-12 ? (Math.abs(b) < 1e-12 ? [] : [-cc / b])
          : (() => { const delta = b * b - 4 * a * cc; if (delta < 0) return []; const q = Math.sqrt(delta); return [(-b + q) / (2 * a), (-b - q) / (2 * a)]; })();
        for (const t of pierwiastki.filter((t) => t > 0 && t < 1)) {
          const u = 1 - t;
          const punkt = [0, 1].map((o) => u ** 3 * p0[o] + 3 * u * u * t * p1[o] + 3 * u * t * t * p2[o] + t ** 3 * p3[o]);
          rozszerzRamke(r, punkt);
        }
      }
      biezacy = p3;
    }
  }
}
const zaokr = (n) => String(Math.round(n));
const doD = (polecenia) => polecenia.map(({ c, p }) => c + p.map(([px, py]) => `${zaokr(px)} ${zaokr(py)}`).join(' ')).join('');

// Znak: dwa wielokąty.
const wielokaty = [...svg.matchAll(/<polygon\b[^>]*>/g)].map(([tag]) => ({
  klasa: atrybut(tag, 'class'),
  punkty: atrybut(tag, 'points').trim().split(/\s+/).map((para) => para.split(',').map(Number)),
}));
const kolorKlasy = (k) => klasy[k].match(/fill:([^;}\s]+)/)[1];
const ramkaZnaku = [Infinity, Infinity, -Infinity, -Infinity];
for (const w of wielokaty) w.punkty.forEach((p) => rozszerzRamke(ramkaZnaku, p));
const znakSvg = wielokaty.map((w) => {
  const pomaranczowy = kolorKlasy(w.klasa).toUpperCase() === POMARANCZ;
  const atrybuty = pomaranczowy ? `class="logo-pomarancz" fill="${POMARANCZ}"` : 'class="logo-czern" fill="currentColor"';
  return `<polygon ${atrybuty} points="${w.punkty.map((p) => p.join(' ')).join(' ')}"/>`;
}).join('');

// Napis: każdy znak <text> na ścieżkę.
const polecenia = [];
for (const [, tag, tresc] of svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)) {
  const klasaFontu = atrybut(tag, 'class').split(/\s+/).find((k) => k.startsWith('fnt'));
  const { rodzina, rozmiar } = stylFontu(klasaFontu);
  const s = rozmiar / JEDNOSTKI_EM;
  let x = Number(atrybut(tag, 'x'));
  const y = Number(atrybut(tag, 'y'));
  for (const znak of tresc) {
    const glif = fonty[rodzina][znak];
    if (!glif) throw new Error(`Brak glifu "${znak}" w foncie ${rodzina}`);
    if (glif.d) polecenia.push(...sciezkaPoTransformacji(glif.d, x, y, s));
    x += glif.adv * s;
  }
}
const ramkaPelna = [...ramkaZnaku];
ramkaPolecen(polecenia, ramkaPelna);

const viewBox = ([x0, y0, x1, y1]) => [x0, y0, x1 - x0, y1 - y0].map((n, i) => (i < 2 ? Math.floor(n) : Math.ceil(n))).join(' ');
const plikZnaku = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox(ramkaZnaku)}">${znakSvg}</svg>\n`;
const plikPelny = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox(ramkaPelna)}">${znakSvg}<path class="logo-napis" fill="currentColor" d="${doD(polecenia)}"/></svg>\n`;

// Favicon: znak na kwadratowym polu, czarny w jasnym motywie karty, biały w ciemnym.
const [zx0, zy0, zx1, zy1] = ramkaZnaku;
const bok = Math.max(zx1 - zx0, zy1 - zy0);
const kwadrat = [zx0 - (bok - (zx1 - zx0)) / 2, zy0 - (bok - (zy1 - zy0)) / 2, bok, bok].map(Math.round).join(' ');
const plikFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${kwadrat}"><style>.logo-czern{fill:#000}@media (prefers-color-scheme: dark){.logo-czern{fill:#fff}}</style>${znakSvg.replace('fill="currentColor"', 'fill="#000"')}</svg>\n`;

for (const katalog of ['src/assets/logo', 'docs/logo']) {
  mkdirSync(katalog, { recursive: true });
  writeFileSync(`${katalog}/znak.svg`, plikZnaku);
  writeFileSync(`${katalog}/logo-pelne.svg`, plikPelny);
}
writeFileSync('public/favicon.svg', plikFavicon);
console.log(`znak: viewBox ${viewBox(ramkaZnaku)}; pełne: viewBox ${viewBox(ramkaPelna)}; glify: ${polecenia.filter((p) => p.c === 'M').length} konturów`);
