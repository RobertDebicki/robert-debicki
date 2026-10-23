import { pobierzPary } from './tresc';
import type { Jezyk } from './jezyki';

/**
 * Pozycje kolekcji w danym języku, posortowane polem `kolejnosc`.
 * Parowanie po folderze (`pobierzPary`), wartości z `data` wpisu kolekcji (po walidacji Zod).
 * W EN pozycja bez `en.md` nie występuje.
 */
export async function pozycje<K extends 'wdrozenia' | 'projekty'>(kolekcja: K, jezyk: Jezyk) {
  const { getCollection } = await import('astro:content');
  const [pary, wpisy] = await Promise.all([pobierzPary(kolekcja), getCollection(kolekcja)]);
  return pary
    .map((p) => wpisy.find((w) => w.id === `${p.adres}/${jezyk}`))
    .filter((w) => w !== undefined)
    .map((w) => w.data)
    .sort((a, b) => a.kolejnosc - b.kolejnosc);
}

/** Ustawienia strony głównej w danym języku. Brak pliku zatrzymuje build z komunikatem. */
export async function ustawienia(jezyk: Jezyk) {
  const { getEntry } = await import('astro:content');
  const wpis = await getEntry('ustawienia', jezyk);
  if (!wpis) throw new Error(`Brak pliku src/content/ustawienia/${jezyk}.md`);
  return wpis.data;
}
