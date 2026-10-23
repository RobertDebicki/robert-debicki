// Lista par pl.md/en.md ze stanem angielskiej wersji (brak, ai, sprawdzone, do-aktualizacji).
// Skill /tlumacz-strone bierze z niej pozycje do przetłumaczenia. Użycie: npx tsx skrypty/stan-tlumaczen.ts [src/content]
import { existsSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { wczytajFiksture, zbudujPary, type StanEn } from '../src/lib/tresc';

export interface StanPary {
  /** Folder względem bazy treści, np. `wdrozenia/voice-bot` albo `ustawienia`. */
  folder: string;
  stanEn: StanEn;
}

/** Każdy folder z pl.md w bazie treści (kolekcja/adres albo sama kolekcja, jak ustawienia). */
export function stanTlumaczen(baza: string): StanPary[] {
  const wynik: StanPary[] = [];
  for (const kolekcja of readdirSync(baza, { withFileTypes: true }).filter((w) => w.isDirectory())) {
    const katalog = join(baza, kolekcja.name);
    const foldery = existsSync(join(katalog, 'pl.md'))
      ? [kolekcja.name]
      : readdirSync(katalog, { withFileTypes: true })
          .filter((w) => w.isDirectory() && existsSync(join(katalog, w.name, 'pl.md')))
          .map((w) => `${kolekcja.name}/${w.name}`);
    for (const folder of foldery) {
      const [para] = zbudujPary(wczytajFiksture(join(baza, folder), folder));
      wynik.push({ folder, stanEn: para.stanEn });
    }
  }
  return wynik.sort((a, b) => a.folder.localeCompare(b.folder));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const baza = resolve(process.argv[2] ?? 'src/content');
  for (const { folder, stanEn } of stanTlumaczen(baza)) console.log(`${stanEn.padEnd(16)} ${relative(process.cwd(), join(baza, folder))}`);
}
