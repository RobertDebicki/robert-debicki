// Zakazane znaki i słowa w treści strony i kodzie źródłowym (src/). AGENTS.md, docs/ i testy/ są pominięte,
// bo wymieniają zakazane wzorce celowo. Jedyna lista wzorców w repozytorium: importuje ją też test treści startowej.
import { readdirSync, readFileSync } from 'node:fs';
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

const KATALOGI = ['src'];
const TEKSTOWE = /\.(md|mdx|astro|ts|js|mjs|css|json|ya?ml|html|txt|svg)$/i;

function pliki(katalog: string): string[] {
  let wpisy;
  try {
    wpisy = readdirSync(katalog, { withFileTypes: true });
  } catch {
    return [];
  }
  return wpisy.flatMap((w) => {
    if (w.name === 'node_modules' || w.name === '.astro') return [];
    const sciezka = join(katalog, w.name);
    return w.isDirectory() ? pliki(sciezka) : TEKSTOWE.test(w.name) ? [sciezka] : [];
  });
}

export interface Trafienie { plik: string; wiersz: number; nazwa: string }

export function znajdzZakazane(korzen: string): Trafienie[] {
  const wynik: Trafienie[] = [];
  for (const k of KATALOGI) {
    for (const sciezka of pliki(join(korzen, k))) {
      const plik = relative(korzen, sciezka).split('\\').join('/');
      readFileSync(sciezka, 'utf8').split('\n').forEach((linia, i) => {
        for (const [nazwa, wzor] of ZAKAZANE) if (wzor.test(linia)) wynik.push({ plik, wiersz: i + 1, nazwa });
      });
    }
  }
  return wynik;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const trafienia = znajdzZakazane(resolve(process.argv[2] ?? '.'));
  for (const t of trafienia) console.error(`${t.plik}:${t.wiersz}: zakazany wzorzec "${t.nazwa}". Usuń go lub zastąp (lista zasad: AGENTS.md).`);
  console.log(`Zakazanych wzorców w treści i kodzie: ${trafienia.length}`);
  process.exit(trafienia.length ? 1 : 0);
}
