// Zakazane znaki i słowa w treści strony i kodzie źródłowym (src/). AGENTS.md, docs/ i testy/ są pominięte,
// bo wymieniają zakazane wzorce celowo. Osobna kontrola nazw klientów obejmuje też docs/ i AGENTS.md.
// Jedyna lista wzorców w repozytorium: importuje ją też test treści startowej.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ZAKAZANE: [string, RegExp][] = [
  ['pauza (—)', /—/],
  ['półpauza (–)', /–/],
  ['wzorzec', /\bNDA\b/i],
  ['wzorzec', /wzorzec/i],
  ['wzorzec', /wzorzec/i],
  ['wzorzec', /wzorzec/i],
  ['wzorzec', /wzorzec/i],
  ['wzorzec', /\bDTP\b/i],
  ['wzorzec', /wzorzec/i],
  ['wzorzec', /wzorzec/i],
  ['wzorzec', /wzorzec/i],
  ['wzorzec #wzorzec', /#wzorzec/i],
  ['wzorzec rgb(wzorzec)', /rgb\(\s*253\s*,\s*67\s*,\s*190\s*\)/i],
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

/** Numery (od 1) pozycji z listy `klienci`, których rdzeń z dozwoloną końcówką występuje w linii. */
export function klienciWLinii(linia: string, klienci: Klient[] = KLIENCI): number[] {
  const slowa = linia.normalize('NFC').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
  const wynik = new Set<number>();
  for (let i = 0; i < slowa.length; i++) {
    for (let n = 1; n <= 3 && i + n <= slowa.length; n++) {
      const znaki = [...slowa.slice(i, i + n).join('')];
      if (znaki.length < 4 || znaki.length > 24) continue; // najkrótszy rdzeń ma 4 znaki, dłuższe zlepki to nie nazwy
      klienci.forEach((k, nr) => {
        if (znaki.length < k.dlugosc || skrotRdzenia(znaki.slice(0, k.dlugosc).join('')) !== k.skrot) return;
        const reszta = znaki.slice(k.dlugosc).join('');
        if (!k.koncowki || reszta === '' || k.koncowki.includes(reszta)) wynik.add(nr + 1);
      });
    }
  }
  return [...wynik];
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

export function znajdzZakazane(korzen: string): Trafienie[] {
  return szukaj(korzen, KATALOGI, (linia) => ZAKAZANE.filter(([, wzor]) => wzor.test(linia)).map(([nazwa]) => nazwa));
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
  for (const t of trafienia) console.error(`${t.plik}:${t.wiersz}: zakazany wzorzec "${t.nazwa}". Usuń go lub zastąp (lista zasad: AGENTS.md).`);
  console.log(`Zakazanych wzorców w treści i kodzie: ${trafienia.length}`);
  const klienci = znajdzNazwyKlientow(korzen);
  for (const t of klienci) console.error(`${t.plik}:${t.wiersz}: nazwa klienta (${t.nazwa} z listy KLIENCI). Opisz klienta branżą (repozytorium jest publiczne).`);
  console.log(`Nazw klientów w src/, docs/, AGENTS.md, README.md, CHANGELOG.md: ${klienci.length}`);
  process.exit(trafienia.length || klienci.length ? 1 : 0);
}
