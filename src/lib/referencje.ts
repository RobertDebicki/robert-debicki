import { pobierzPary } from './tresc';
import { widocznaWJezyku, type Jezyk } from './jezyki';
import { maStroneGlownaEn } from './pozycje';

/** Referencje w danym języku, najnowsze pierwsze. W EN tylko z en.md. */
export async function referencjeWJezyku(jezyk: Jezyk) {
  const { getCollection } = await import('astro:content');
  const [pary, wpisy] = await Promise.all([pobierzPary('referencje'), getCollection('referencje')]);
  return pary
    .filter((p) => widocznaWJezyku(p, jezyk))
    .map((para) => ({ para, adres: para.adres, entry: wpisy.find((w) => w.id === `${para.adres}/${jezyk}`)! }))
    .sort((a, b) => b.entry.data.data.getTime() - a.entry.data.data.getTime());
}

/** Lista PL istnieje, gdy jest choć jedna referencja. Lista EN dodatkowo wymaga angielskiej strony głównej (jak lista wpisów). */
export async function maListeReferencji(jezyk: Jezyk): Promise<boolean> {
  if ((await referencjeWJezyku('pl')).length === 0) return false;
  return jezyk === 'pl' || (await maStroneGlownaEn());
}

/** Skan w formacie PDF nie wyświetla się jako obraz, tylko jako link. */
export const czyPdf = (url: string) => new URL(url).pathname.toLowerCase().endsWith('.pdf');
