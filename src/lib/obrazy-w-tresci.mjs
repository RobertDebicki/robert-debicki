// Panel (Sveltia) wstawia obraz w treść wpisu ścieżką od korzenia repozytorium, np. `/src/assets/wpisy/grafika.png`
// (media_folder i public_folder w panel.ts). Astro traktuje ścieżkę z `/` jako plik z public/ i nie optymalizuje go,
// więc wtyczka Sätteri (procesor Markdown w Astro 7) zamienia ją na ścieżkę względną od pliku .md.
// Wtedy Astro robi z niej obraz z wymiarami i WebP. Wtyczka działa przed zbieraniem obrazów przez Astro.
import { readdirSync, statSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const KORZEN = fileURLToPath(new URL('../..', import.meta.url));

/** Odkodowuje %XX; ciągi, których nie da się odkodować (np. dosłowny `%`), zostawia bez zmian zamiast odrzucać całość. */
function odkoduj(url) {
  return url.replace(/(?:%[0-9A-Fa-f]{2})+/g, (ciag) => {
    try {
      return decodeURIComponent(ciag);
    } catch {
      return ciag;
    }
  });
}

/** Czy `cel` to plik o dokładnie tej nazwie (z wielkością liter: macOS jej nie rozróżnia, Linux w CI tak). */
function plikDokladnie(cel) {
  try {
    return statSync(cel).isFile() && readdirSync(dirname(cel)).includes(basename(cel));
  } catch {
    return false;
  }
}

/**
 * Ścieżka względna od pliku .md do obrazu, zakodowana jak adres (Astro robi na niej decodeURI), albo null,
 * gdy adresu nie zmieniamy (zewnętrzny, względny, spoza dozwolonych folderów). Każdy inny problem zatrzymuje build
 * czytelnym komunikatem: inaczej na stronie zostałby obrazek z adresem, którego serwer nie zna.
 */
export function sciezkaWzgledna(url, plikMd, dozwolone, korzen = KORZEN) {
  const sciezka = odkoduj(url);
  if (!sciezka.startsWith('/') || sciezka.startsWith('//')) return null;
  const folder = dozwolone.find((d) => sciezka.startsWith(d));
  if (!folder) return null;
  const wpis = relative(korzen, plikMd).split(sep).join('/');
  const cel = join(korzen, sciezka);
  const wFolderze = relative(join(korzen, folder), cel);
  if (wFolderze.startsWith('..') || isAbsolute(wFolderze)) throw new Error(`Wpis ${wpis}: obraz ${url} wskazuje poza ${folder}.`);
  if (/[#?]/.test(sciezka)) throw new Error(`Wpis ${wpis}: nazwa obrazu ${sciezka} ma znak # albo ?, więc zmień nazwę pliku.`);
  if (!plikDokladnie(cel)) throw new Error(`Wpis ${wpis}: nie znaleziono obrazu ${sciezka} wstawionego w treść. Sprawdź nazwę pliku i wielkość liter.`);
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
