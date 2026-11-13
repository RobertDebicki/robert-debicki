import { pobierzPary, type Para } from './tresc';
import { widocznaWJezyku, type Jezyk } from './jezyki';

/** Początek adresu stron usług w danym języku. */
export const prefiksUslug = (jezyk: Jezyk) => (jezyk === 'pl' ? '/uslugi/' : '/en/services/');

/** Adres strony usługi (bez prefiksu). W PL nazwa folderu, w EN pole `adresEn` z en.md, a gdy go nie ma, też nazwa folderu. */
export function adresUslugi(para: Para, jezyk: Jezyk): string {
  return jezyk === 'en' ? (para.en?.data.adresEn ?? para.adres) : para.adres;
}

/**
 * Czysta funkcja: usługi widoczne w danym języku, posortowane polem `kolejnosc`. W EN tylko z en.md.
 * Dwie usługi pod jednym adresem zatrzymują build z komunikatem (inaczej jedna strona nadpisałaby drugą).
 */
export function ulozUslugi<W extends { id: string; data: { kolejnosc: number } }>(pary: Para[], wpisy: W[], jezyk: Jezyk) {
  const lista = pary
    .filter((p) => widocznaWJezyku(p, jezyk))
    .map((para) => ({ para, adres: adresUslugi(para, jezyk), entry: wpisy.find((w) => w.id === `${para.adres}/${jezyk}`)! }))
    .sort((a, b) => a.entry.data.kolejnosc - b.entry.data.kolejnosc);
  const zajete = new Set<string>();
  for (const u of lista) {
    if (zajete.has(u.adres)) {
      throw new Error(`Usługi: adres ${prefiksUslug(jezyk)}${u.adres}/ ma więcej niż jedna usługa. Zmień pole adresEn w uslugi/${u.para.adres}/en.md.`);
    }
    zajete.add(u.adres);
  }
  return lista;
}

/** Usługi w danym języku z kolekcji Astro. */
export async function uslugiWJezyku(jezyk: Jezyk) {
  const { getCollection } = await import('astro:content');
  const [pary, wpisy] = await Promise.all([pobierzPary('uslugi'), getCollection('uslugi')]);
  return ulozUslugi(pary, wpisy, jezyk);
}

/** Lista usług, link w menu i sekcja na stronie głównej istnieją tylko wtedy, gdy w tym języku jest choć jedna usługa. */
export async function maUslugi(jezyk: Jezyk): Promise<boolean> {
  return (await uslugiWJezyku(jezyk)).length > 0;
}
