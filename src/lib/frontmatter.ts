import { parse } from 'yaml';

/** Rozdziela plik Markdown na frontmatter (obiekt) i treść. */
export function rozdziel(surowy: string): { dane: Record<string, unknown>; tresc: string } {
  const tekst = surowy.replace(/\r\n/g, '\n');
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(tekst);
  if (!m) return { dane: {}, tresc: tekst };
  const dane = parse(m[1]);
  return { dane: dane && typeof dane === 'object' ? (dane as Record<string, unknown>) : {}, tresc: m[2] };
}
