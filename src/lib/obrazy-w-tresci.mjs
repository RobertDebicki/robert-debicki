// Panel (Sveltia) wstawia obraz w treść wpisu ścieżką od korzenia repozytorium, np. `/src/assets/wpisy/grafika.png`
// (media_folder i public_folder w panel.ts). Astro traktuje ścieżkę z `/` jako plik z public/ i nie optymalizuje go,
// więc wtyczka Sätteri (procesor Markdown w Astro 7) zamienia ją na ścieżkę względną od pliku .md.
// Wtedy Astro robi z niej obraz z wymiarami i WebP. Wtyczka działa przed zbieraniem obrazów przez Astro.
import { existsSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const KORZEN = fileURLToPath(new URL('../..', import.meta.url));

function odkoduj(url) {
  try {
    return decodeURI(url);
  } catch {
    return url; // błędna sekwencja %: traktujemy adres dosłownie
  }
}

/**
 * Ścieżka względna od pliku .md do obrazu, zakodowana jak adres (Astro robi na niej decodeURI), albo null,
 * gdy adresu nie zmieniamy (zewnętrzny, względny, spoza dozwolonych folderów). Brak pliku w dozwolonym folderze
 * zatrzymuje build: inaczej na stronie zostałby obrazek z adresem, którego serwer nie zna.
 */
export function sciezkaWzgledna(url, plikMd, dozwolone, korzen = KORZEN) {
  const sciezka = odkoduj(url);
  if (!sciezka.startsWith('/') || sciezka.startsWith('//')) return null;
  if (!dozwolone.some((d) => sciezka.startsWith(d))) return null;
  const cel = join(korzen, sciezka);
  if (!existsSync(cel)) throw new Error(`Wpis ${plikMd}: nie znaleziono obrazu ${sciezka} wstawionego w treść. Sprawdź nazwę pliku.`);
  const wzgledna = relative(dirname(plikMd), cel).split(sep).join('/');
  return encodeURI(wzgledna.startsWith('.') ? wzgledna : `./${wzgledna}`);
}

/**
 * Fabryka wtyczki mdast dla Sätteri: dostaje adres pliku .md (`fileURL`) przed parsowaniem.
 * @param {{ dozwolone: string[] }} opcje foldery (od korzenia, z `/` na końcu), z których obrazy wolno przepisać
 */
export default function obrazyWTresci({ dozwolone }) {
  return ({ fileURL }) => {
    if (!fileURL || fileURL.protocol !== 'file:') return null;
    const plikMd = fileURLToPath(fileURL);
    return {
      name: 'obrazy-w-tresci',
      image(wezel, ctx) {
        const nowa = wezel.url && sciezkaWzgledna(wezel.url, plikMd, dozwolone);
        if (nowa) ctx.setProperty(wezel, 'url', nowa);
      },
    };
  };
}
