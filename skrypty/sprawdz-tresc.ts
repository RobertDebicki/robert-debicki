// Zakazane znaki i wzorce w treści strony i kodzie źródłowym (src/). AGENTS.md, docs/ i testy/ są pominięte.
// Osobna kontrola nazw klientów obejmuje też docs/ i AGENTS.md.
// Jedyna lista wzorców w repozytorium: importuje ją też test treści startowej.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Znaki zakazane jawnie: długi i krótki myślnik.
export const ZNAKI: [string, RegExp][] = [
  ['pauza (—)', /—/],
  ['półpauza (–)', /–/],
];

// Nazwy klientów i osób po stronie klienta. Repozytorium jest publiczne, więc lista nie może zawierać samych nazw:
// trzymamy skrót SHA-256 (16 znaków hex) rdzenia zapisanego małymi literami, bez spacji, i dozwolone końcówki
// odmiany (brak listy: dowolna końcówka). Rdzeń porównujemy z początkiem słowa albo 2-3 sąsiednich słów
// sklejonych razem ("Studio Dębów" daje "studiodębów"). Skrót nowego rdzenia: npx tsx skrypty/sprawdz-tresc.ts --skrot rdzen
export interface Klient { skrot: string; dlugosc: number; koncowki?: string[] }
export const KLIENCI: Klient[] = [
  { skrot: '95adae5a57a1e9be', dlugosc: 5, koncowki: ['a', 'ą', 'ę', 'y', 'o', 'om', 'ach', 'ami'] },
  { skrot: 'fdd59203f38a725c', dlugosc: 4, koncowki: ['cie'] },
  { skrot: 'ec124f90471bd382', dlugosc: 7 },
  { skrot: 'e8522fd87f748c38', dlugosc: 6 },
  { skrot: '01ff834490307305', dlugosc: 12 },
  { skrot: '7d3922b58d81dd0a', dlugosc: 8 },
  { skrot: '668161c59306a49e', dlugosc: 4 },
  { skrot: 'ba43c36bcddcfddb', dlugosc: 4, koncowki: ['a', 'y', 'ie', 'ę', 'ą'] },
  { skrot: '88851d622e7bbcff', dlugosc: 5 },
  { skrot: '8c8a73937218a1a9', dlugosc: 8 },
  { skrot: '0abaa5c492367535', dlugosc: 9 },
  { skrot: '637e93ec7a212fc4', dlugosc: 12 },
  { skrot: '1e5db0f6ad1b6ab2', dlugosc: 12 },
];

const pamiec = new Map<string, string>();
export function skrotRdzenia(rdzen: string): string {
  const klucz = rdzen.normalize('NFC').toLowerCase();
  let skrot = pamiec.get(klucz);
  if (skrot === undefined) {
    skrot = createHash('sha256').update(klucz, 'utf8').digest('hex').slice(0, 16);
    pamiec.set(klucz, skrot);
  }
  return skrot;
}

function pasuje(znaki: string[], k: Klient): boolean {
  if (znaki.length < k.dlugosc || skrotRdzenia(znaki.slice(0, k.dlugosc).join('')) !== k.skrot) return false;
  const reszta = znaki.slice(k.dlugosc).join('');
  return !k.koncowki || reszta === '' || k.koncowki.includes(reszta);
}

const slowaLinii = (linia: string) => linia.normalize('NFC').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];

/** Numery (od 1) pozycji z listy `klienci`, których rdzeń z dozwoloną końcówką występuje w linii. */
export function klienciWLinii(linia: string, klienci: Klient[] = KLIENCI): number[] {
  const slowa = slowaLinii(linia);
  const min = Math.min(...klienci.map((k) => k.dlugosc));
  const wynik = new Set<number>();
  for (let i = 0; i < slowa.length; i++) {
    for (let n = 1; n <= 3 && i + n <= slowa.length; n++) {
      const znaki = [...slowa.slice(i, i + n).join('')];
      if (znaki.length < min || znaki.length > 24) continue; // krótsze od najkrótszego rdzenia i dłuższe zlepki to nie nazwy
      klienci.forEach((k, nr) => {
        if (pasuje(znaki, k)) wynik.add(nr + 1);
      });
    }
  }
  return [...wynik];
}

// Wzorce spoza zakresu treści, zapisane tak samo jak nazwy klientów (skróty, nie słowa):
// `slowa` jak KLIENCI (słowo albo 2-3 sąsiednie słowa sklejone), `frazy` to dwa słowa, z których drugie stoi
// najwyżej dwa słowa za pierwszym, `kolory` to skróty zapisu `#rrggbb` albo `rgb(r,g,b)` bez spacji, małymi literami.
// Skrót nowego wzorca: npx tsx skrypty/sprawdz-tresc.ts --skrot rdzen
export interface Wzorce { slowa: Klient[]; frazy: [Klient, Klient][]; kolory: string[] }
const BYLY_PRACODAWCA = { skrot: 'd03ec45ab3013076', dlugosc: 10 };
export const WZORCE: Wzorce = {
  slowa: [
    { skrot: '37242106bee67850', dlugosc: 3, koncowki: [] },
    { skrot: 'd017f5c6aad25740', dlugosc: 3, koncowki: [] },
    { skrot: '02a43bc256935301', dlugosc: 7 },
    { skrot: '16bd7aea78c0f63b', dlugosc: 6, koncowki: ['u', 'em', 's', 'owy', 'owa', 'owe', 'owych', 'owym', 'owymi', 'ową', 'owego', 'owej', 'owemu'] },
    { skrot: 'df4ac416257333cf', dlugosc: 6 },
    { skrot: '77e5604feeaf6e01', dlugosc: 7 },
    { skrot: 'f80f374f6ccfffe2', dlugosc: 6, koncowki: ['nia', 'ni', 'nię', 'nią', 'nie', 'niach', 'niami', 'niom', 'ń', 'z', 'za', 'zem', 'zowi', 'ze', 'zy', 'zach', 'zami', 'zom', 'zu'] },
    { skrot: 'fe0c6f2f2b225546', dlugosc: 8 },
  ],
  frazy: [
    [{ skrot: 'c757efb049d40ff8', dlugosc: 6, koncowki: ['u', 'em', 'ie', 'y', 'ów', 'om', 'ami', 'ach', 'owi', 'owy', 'owa', 'owe', 'owych', 'owanie', 'owania', 'owaniu', 'owaniem'] }, { skrot: 'cc51b1536c92fc98', dlugosc: 9 }],
    [{ skrot: 'bbe1ab0d5ba51904', dlugosc: 5 }, BYLY_PRACODAWCA],
    [{ skrot: '401edaabe7eadc48', dlugosc: 6 }, BYLY_PRACODAWCA],
  ],
  kolory: ['1c98ee9db042e8e5', 'bc427ad94c385d91'],
};

/** Nazwy zakazanych znaków i numery wzorców (bez ich treści) znalezionych w linii. */
export function zakazaneWLinii(linia: string, wzorce: Wzorce = WZORCE): string[] {
  const wynik = ZNAKI.filter(([, wzor]) => wzor.test(linia)).map(([nazwa]) => nazwa);
  for (const nr of klienciWLinii(linia, wzorce.slowa)) wynik.push(`wzorzec słowny nr ${nr}`);
  const slowa = slowaLinii(linia).map((s) => [...s]);
  wzorce.frazy.forEach(([a, b], nr) => {
    const jest = slowa.some((s, i) => pasuje(s, a) && slowa.slice(i + 1, i + 4).some((t) => pasuje(t, b)));
    if (jest) wynik.push(`fraza nr ${nr + 1}`);
  });
  const male = linia.toLowerCase();
  const kolory = [
    ...(male.match(/#[0-9a-f]{3,8}\b/g) ?? []),
    ...[...male.matchAll(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/g)].map((m) => `rgb(${m[1]},${m[2]},${m[3]})`),
  ];
  wzorce.kolory.forEach((skrot, nr) => {
    if (kolory.some((k) => skrotRdzenia(k) === skrot)) wynik.push(`kolor nr ${nr + 1}`);
  });
  return wynik;
}

const KATALOGI = ['src'];
const ZAKRES_KLIENCI = ['src', 'docs', 'AGENTS.md', 'README.md', 'CHANGELOG.md'];
const TEKSTOWE = /\.(md|mdx|astro|ts|js|mjs|css|json|ya?ml|html|txt|svg)$/i;

function pliki(katalog: string): string[] {
  let wpisy;
  try {
    wpisy = readdirSync(katalog, { withFileTypes: true });
  } catch {
    return existsSync(katalog) && statSync(katalog).isFile() ? [katalog] : [];
  }
  return wpisy.flatMap((w) => {
    if (w.name === 'node_modules' || w.name === '.astro') return [];
    const sciezka = join(katalog, w.name);
    return w.isDirectory() ? pliki(sciezka) : TEKSTOWE.test(w.name) ? [sciezka] : [];
  });
}

export interface Trafienie { plik: string; wiersz: number; nazwa: string }

function szukaj(korzen: string, zakres: string[], wLinii: (linia: string) => string[]): Trafienie[] {
  const wynik: Trafienie[] = [];
  for (const k of zakres) {
    for (const sciezka of pliki(join(korzen, k))) {
      const plik = relative(korzen, sciezka).split('\\').join('/');
      readFileSync(sciezka, 'utf8').split('\n').forEach((linia, i) => {
        for (const nazwa of wLinii(linia)) wynik.push({ plik, wiersz: i + 1, nazwa });
      });
    }
  }
  return wynik;
}

export function znajdzZakazane(korzen: string, wzorce: Wzorce = WZORCE): Trafienie[] {
  return szukaj(korzen, KATALOGI, (linia) => zakazaneWLinii(linia, wzorce));
}

export function znajdzNazwyKlientow(korzen: string, klienci: Klient[] = KLIENCI): Trafienie[] {
  return szukaj(korzen, ZAKRES_KLIENCI, (linia) => klienciWLinii(linia, klienci).map((nr) => `klient nr ${nr}`));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url) && process.argv[2] === '--skrot') {
  const rdzen = process.argv.slice(3).join('');
  console.log(`{ skrot: '${skrotRdzenia(rdzen)}', dlugosc: ${[...rdzen.normalize('NFC')].length} }`);
} else if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const korzen = resolve(process.argv[2] ?? '.');
  const trafienia = znajdzZakazane(korzen);
  for (const t of trafienia) console.error(`${t.plik}:${t.wiersz}: zakazany wzorzec (${t.nazwa}). Usuń go lub zastąp (zakres treści: AGENTS.md).`);
  console.log(`Zakazanych wzorców w treści i kodzie: ${trafienia.length}`);
  const klienci = znajdzNazwyKlientow(korzen);
  for (const t of klienci) console.error(`${t.plik}:${t.wiersz}: nazwa klienta (${t.nazwa} z listy KLIENCI). Opisz klienta branżą (repozytorium jest publiczne).`);
  console.log(`Nazw klientów w src/, docs/, AGENTS.md, README.md, CHANGELOG.md: ${klienci.length}`);
  process.exit(trafienia.length || klienci.length ? 1 : 0);
}
