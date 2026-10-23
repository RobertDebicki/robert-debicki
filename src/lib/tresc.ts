import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { skrotTresci } from './skrot';
import { rozdziel } from './frontmatter';

export type Jezyk = 'pl' | 'en';
export type StanEn = 'brak' | 'ai' | 'sprawdzone' | 'do-aktualizacji';

export interface Wpis {
  /** Nazwa folderu pozycji, np. `przewozy`. */
  adres: string;
  jezyk: Jezyk;
  data: Record<string, any>;
  /** Treść Markdown bez frontmattera. */
  tresc: string;
  /** Cały plik tak, jak leży w repozytorium (do skrótu). */
  surowy: string;
}

export interface Para {
  adres: string;
  pl: Wpis;
  en?: Wpis;
  stanEn: StanEn;
}

/** Czysta funkcja: grupuje wpisy po adresie i liczy stan angielskiej wersji. Foldery bez pl.md są pomijane. */
export function zbudujPary(wpisy: Wpis[]): Para[] {
  const grupy = new Map<string, { pl?: Wpis; en?: Wpis }>();
  for (const w of wpisy) {
    const g = grupy.get(w.adres) ?? {};
    g[w.jezyk] = w;
    grupy.set(w.adres, g);
  }
  const pary: Para[] = [];
  for (const [adres, { pl, en }] of grupy) {
    if (!pl) continue;
    let stanEn: StanEn = 'brak';
    if (en) {
      if (en.data.zrodlo !== skrotTresci(pl.surowy)) stanEn = 'do-aktualizacji';
      else stanEn = en.data.tlumaczenie === 'sprawdzone' ? 'sprawdzone' : 'ai';
    }
    pary.push({ adres, pl, en, stanEn });
  }
  return pary.sort((a, b) => a.adres.localeCompare(b.adres));
}

function wpisZPliku(adres: string, jezyk: Jezyk, surowy: string): Wpis {
  const { dane, tresc } = rozdziel(surowy);
  return { adres, jezyk, data: dane, tresc, surowy };
}

/** Wczytuje folder pozycji (pl.md, en.md). `nadpisania` podmienia treść pliku, gdy test potrzebuje wariantu. */
export function wczytajFiksture(folder: string, adres: string, nadpisania: Partial<Record<'pl.md' | 'en.md', string>> = {}): Wpis[] {
  const wynik: Wpis[] = [];
  for (const jezyk of ['pl', 'en'] as const) {
    const nazwa = `${jezyk}.md` as const;
    const sciezka = join(folder, nazwa);
    const surowy = nadpisania[nazwa] ?? (existsSync(sciezka) ? readFileSync(sciezka, 'utf8') : undefined);
    if (surowy !== undefined) wynik.push(wpisZPliku(adres, jezyk, surowy));
  }
  return wynik;
}

/** Cienka nakładka na kolekcje Astro. Id wpisu z loadera glob ma postać `adres/pl` lub `adres/en`. */
export async function pobierzPary(kolekcja: 'wdrozenia' | 'projekty' | 'referencje' | 'wpisy'): Promise<Para[]> {
  const { getCollection } = await import('astro:content');
  const wpisy = await getCollection(kolekcja);
  return zbudujPary(
    wpisy.map((w) => {
      const [adres, jezyk] = [w.id.slice(0, w.id.lastIndexOf('/')), w.id.slice(w.id.lastIndexOf('/') + 1)] as [string, Jezyk];
      return wpisZPliku(adres, jezyk, readFileSync(w.filePath!, 'utf8'));
    }),
  );
}
