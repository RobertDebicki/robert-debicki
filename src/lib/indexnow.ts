/** IndexNow (Bing i inne): klucz strony i odczyt mapy witryny. Plik klucza: public/<KLUCZ>.txt. */
export const KLUCZ = 'd9bb7b1cd4a874f455321b207af337d9';

/** Adresy z <url><loc> (zwykła mapa) i <sitemap><loc> (indeks map). Pomija <xhtml:link>. */
export function czytajMape(xml: string): { mapy: string[]; adresy: string[] } {
  const loc = (tag: string) => [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g'))]
    .map((m) => m[1].match(/<loc>([^<]+)<\/loc>/)?.[1].trim().replaceAll('&amp;', '&'))
    .filter((a): a is string => !!a);
  return { mapy: loc('sitemap'), adresy: loc('url') };
}
