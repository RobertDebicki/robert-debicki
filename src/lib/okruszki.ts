import type { Jezyk } from './jezyki';
import { etykiety } from './jezyki';

const MARKA = ' | Robert Dębicki';
/** Pierwszy segment adresu, pod którym jest lista, a pod nią strony pozycji. */
const SEKCJE: Record<string, 'wpisy' | 'uslugi'> = { wpisy: 'wpisy', posts: 'wpisy', uslugi: 'uslugi', services: 'uslugi' };

/**
 * Schema.org BreadcrumbList dla strony poniżej głównej: Strona główna, (sekcja z listą,) bieżąca strona.
 * Strona główna w danym języku nie ma okruszków, więc zwraca null. Nazwa bieżącej strony to tytuł bez marki.
 */
export function okruszki(jezyk: Jezyk, sciezka: string, tytul: string, site: URL | string) {
  const segmenty = sciezka.split('/').filter(Boolean);
  if (jezyk === 'en' && segmenty[0] === 'en') segmenty.shift();
  if (segmenty.length === 0) return null;
  const e = etykiety(jezyk);
  const adres = (s: string) => new URL(s, site).href;
  const poczatek = jezyk === 'pl' ? '/' : '/en/';
  const sekcja = SEKCJE[segmenty[0]];
  const elementy: { name: string; item: string }[] = [{ name: e.okruszkiStart, item: adres(poczatek) }];
  if (segmenty.length >= 2 && sekcja) {
    elementy.push({ name: e[sekcja], item: adres(`${poczatek}${segmenty[0]}/`) });
  }
  elementy.push({ name: tytul.endsWith(MARKA) ? tytul.slice(0, -MARKA.length) : tytul, item: adres(sciezka) });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: elementy.map((el, i) => ({ '@type': 'ListItem', position: i + 1, name: el.name, item: el.item })),
  };
}
