// Skany referencji nie wolno trzymać w repozytorium (leżą w R2, w repo jest tylko adres).
// Zgłasza obraz lub PDF w src/content/referencje/ (cokolwiek tam leży) oraz w public/, gdy ścieżka (katalogi i nazwa) zawiera "referenc" lub "skan".
import { readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROZSZERZENIA = /\.(jpe?g|png|webp|pdf)$/i;
const NAZWA_SKANU = /referenc|skan/i;

const pomijany = (nazwa: string) => nazwa === 'node_modules' || nazwa === '.git' || nazwa === '.astro' || nazwa.startsWith('dist');

function pliki(katalog: string): string[] {
  let wpisy;
  try {
    wpisy = readdirSync(katalog, { withFileTypes: true });
  } catch {
    return [];
  }
  return wpisy.flatMap((w) => {
    if (pomijany(w.name)) return [];
    const sciezka = join(katalog, w.name);
    return w.isDirectory() ? pliki(sciezka) : [sciezka];
  });
}

/** Ścieżki (względem korzenia, z ukośnikami) plików wyglądających na skan referencji. */
export function znajdzSkany(korzen: string): string[] {
  const wzgledna = (p: string) => relative(korzen, p).split('\\').join('/');
  const wszystkie = [
    ...pliki(join(korzen, 'src/content/referencje')).filter((p) => ROZSZERZENIA.test(p)),
    ...pliki(join(korzen, 'public')).filter((p) => ROZSZERZENIA.test(p) && NAZWA_SKANU.test(wzgledna(p))),
  ];
  return wszystkie.map(wzgledna);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const skany = znajdzSkany(resolve(process.argv[2] ?? '.'));
  for (const s of skany) console.error(`${s}: skan referencji nie może leżeć w repozytorium. Wgraj go do magazynu R2 i wpisz adres w polu skanUrl.`);
  console.log(`Skanów w repozytorium: ${skany.length}`);
  process.exit(skany.length ? 1 : 0);
}
