import { createHash } from 'node:crypto';
import { rozdziel } from './frontmatter';

/** Pola, które ustawia skill `/tlumacz-strone`; nie wchodzą do skrótu źródła. */
const POMIJANE = new Set(['tlumaczenie', 'zrodlo']);

/** JSON z kluczami obiektów posortowanymi rosnąco, bez spacji. Ten sam zapis daje Python (`json.dumps(sort_keys=True)`). */
export function kanonicznyJson(wartosc: unknown): string {
  if (Array.isArray(wartosc)) return `[${wartosc.map(kanonicznyJson).join(',')}]`;
  if (wartosc && typeof wartosc === 'object') {
    const klucze = Object.keys(wartosc).sort();
    return `{${klucze.map((k) => `${JSON.stringify(k)}:${kanonicznyJson((wartosc as Record<string, unknown>)[k])}`).join(',')}}`;
  }
  return JSON.stringify(wartosc ?? null);
}

/**
 * Skrót SHA-256 (hex) pliku pl.md liczony z treści, a nie z zapisu: kanoniczny JSON nagłówka (bez `tlumaczenie`
 * i `zrodlo`) plus treść z końcami linii LF, bez białych znaków na brzegach. Panel może inaczej sformatować YAML
 * (listy w nawiasach albo z myślnikami, inne cudzysłowy), a skrót zostaje ten sam. Implementacja bliźniacza:
 * `zrodlo_pl` w `narzedzia/tlumaczenie/kontrola_tlumaczenia.py`. Tylko w czasie budowania.
 */
export function skrotTresci(surowy: string): string {
  const { dane, tresc } = rozdziel(surowy);
  const naglowek = Object.fromEntries(Object.entries(dane).filter(([k]) => !POMIJANE.has(k)));
  const tekst = `${kanonicznyJson(naglowek)}\n${tresc.replace(/\r\n/g, '\n').replace(/^[ \t\n\r]+|[ \t\n\r]+$/g, '')}`;
  return createHash('sha256').update(tekst, 'utf8').digest('hex');
}
