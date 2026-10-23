import { pobierzPary } from './tresc';
import { widocznaWJezyku, type Jezyk } from './jezyki';
import { maStroneGlownaEn } from './pozycje';

/** Zdjęcia wpisów: pole `plik` to ścieżka od korzenia repozytorium, np. `/src/assets/wpisy/foto.jpg`. */
const OBRAZY = import.meta.glob<{ default: ImageMetadata }>(['/src/assets/**/*.{jpg,jpeg,png,webp,avif}', '/testy/fikstury/**/*.{jpg,jpeg,png,webp,avif}']);

export async function obraz(plik: string, wpis: string) {
  const wczytaj = OBRAZY[plik];
  if (!wczytaj) throw new Error(`Wpis ${wpis}: nie znaleziono zdjęcia ${plik}. Sprawdź pole zdjecia.plik.`);
  return (await wczytaj()).default;
}

/** Wpis w danym języku, posortowany po dacie malejąco (najnowsze pierwsze). W EN tylko z en.md. */
export async function wpisyWJezyku(jezyk: Jezyk) {
  const { getCollection } = await import('astro:content');
  const [pary, wpisy] = await Promise.all([pobierzPary('wpisy'), getCollection('wpisy')]);
  return pary
    .filter((p) => widocznaWJezyku(p, jezyk))
    .map((para) => ({ para, adres: para.adres, entry: wpisy.find((w) => w.id === `${para.adres}/${jezyk}`)! }))
    .sort((a, b) => b.entry.data.data.getTime() - a.entry.data.data.getTime());
}

/** Lista PL istnieje, gdy jest choć jeden wpis. Lista EN dodatkowo wymaga angielskiej strony głównej (tam prowadzi przełącznik z wpisu tylko po polsku). */
export async function maListe(jezyk: Jezyk): Promise<boolean> {
  if ((await wpisyWJezyku('pl')).length === 0) return false;
  return jezyk === 'pl' || (await maStroneGlownaEn());
}

export const dataIso = (d: Date) => d.toISOString().slice(0, 10);
export const dataCzytelna = (d: Date, jezyk: Jezyk) =>
  d.toLocaleDateString(jezyk === 'pl' ? 'pl-PL' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
