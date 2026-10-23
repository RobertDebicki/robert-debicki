import { readFileSync } from 'node:fs';
import { rozdziel } from './frontmatter';
import { SCHEMATY, type NazwaKolekcji } from './schematy';

/** Waliduje frontmatter pliku względem schematu kolekcji. Błędy po polsku, każdy z przedrostkiem ścieżki pliku. */
export function walidujPlik(sciezka: string, kolekcja: NazwaKolekcji): string[] {
  let dane: Record<string, unknown>;
  try {
    dane = rozdziel(readFileSync(sciezka, 'utf8')).dane;
  } catch (e) {
    return [`${sciezka}: nie udało się odczytać frontmattera (${(e as Error).message})`];
  }
  const wynik = SCHEMATY[kolekcja].safeParse(dane);
  if (wynik.success) return [];
  return wynik.error.issues.map((i) => {
    const pole = i.path.length ? i.path.join('.') : '(całość)';
    return `${sciezka}: pole ${pole}: ${i.message}`;
  });
}
