import { pobierzPary, type Para } from './tresc';
import { widocznaWJezyku, type Jezyk } from './jezyki';
import { ustawienia } from './pozycje';

/** Adres podstrony dla rekrutera w danym języku. */
export const adresRekrutera = (jezyk: Jezyk) => (jezyk === 'pl' ? '/dla-rekruterow/' : '/en/for-recruiters/');

const NAZWA = { wdrożenia: 'wdrożenia', projekty: 'projektu' } as const;

/**
 * Czysta funkcja: dane pozycji wybranych na podstronę rekrutera, w kolejności z ustawień. W EN pozycja bez en.md
 * jest pominięta (jak na stronie głównej). Nazwa folderu, którego nie ma, zatrzymuje build z komunikatem.
 */
export function wybierzPozycje<D>(pary: Para[], wpisy: { id: string; data: D }[], nazwy: string[], jezyk: Jezyk, rodzaj: keyof typeof NAZWA): D[] {
  return nazwy.flatMap((nazwa) => {
    const para = pary.find((p) => p.adres === nazwa);
    if (!para) throw new Error(`Podstrona rekrutera: nie ma ${NAZWA[rodzaj]} "${nazwa}".`);
    if (!widocznaWJezyku(para, jezyk)) return [];
    return [wpisy.find((w) => w.id === `${nazwa}/${jezyk}`)!.data];
  });
}

/** Teksty podstrony z ustawień danego języka albo `undefined`, gdy ustawienia nie mają bloku `rekruter` (wtedy podstrony nie ma). */
export async function rekruter(jezyk: Jezyk) {
  const { getEntry } = await import('astro:content');
  return (await getEntry('ustawienia', jezyk))?.data.rekruter;
}

/** Wybrane wdrożenia i projekty z kolekcji Astro. */
export async function wybranePrace(jezyk: Jezyk) {
  const { getCollection } = await import('astro:content');
  const r = (await ustawienia(jezyk)).rekruter!;
  const [paryW, wpisyW, paryP, wpisyP] = await Promise.all([pobierzPary('wdrozenia'), getCollection('wdrozenia'), pobierzPary('projekty'), getCollection('projekty')]);
  return {
    wdrozenia: wybierzPozycje(paryW, wpisyW, r.wdrozenia, jezyk, 'wdrożenia'),
    projekty: wybierzPozycje(paryP, wpisyP, r.projekty, jezyk, 'projekty'),
  };
}
