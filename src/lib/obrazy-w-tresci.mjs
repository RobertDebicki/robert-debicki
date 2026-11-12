// Panel (Sveltia) wstawia obraz w treść wpisu ścieżką od korzenia repozytorium, np. `/src/assets/wpisy/grafika.png`
// (media_folder i public_folder w panel.ts). Astro traktuje ścieżkę z `/` jako plik z public/ i nie optymalizuje go,
// więc wtyczka Sätteri (procesor Markdown w Astro 7) zamienia ją na ścieżkę względną od pliku .md.
// Wtedy Astro robi z niej obraz z wymiarami i WebP. Wtyczka działa przed zbieraniem obrazów przez Astro.
import { existsSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const KORZEN = fileURLToPath(new URL('../..', import.meta.url));

/** Ścieżka względna od pliku .md do obrazu albo null, gdy adresu nie zmieniamy (zewnętrzny, spoza folderów, brak pliku). */
export function sciezkaWzgledna(url, plikMd, dozwolone, korzen = KORZEN) {
  if (!url.startsWith('/') || url.startsWith('//')) return null;
  if (!dozwolone.some((d) => url.startsWith(d))) return null;
  const cel = join(korzen, url);
  if (!existsSync(cel)) return null;
  const wzgledna = relative(dirname(plikMd), cel).split(sep).join('/');
  return wzgledna.startsWith('.') ? wzgledna : `./${wzgledna}`;
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
        const nowa = wezel.url && sciezkaWzgledna(decodeURI(wezel.url), plikMd, dozwolone);
        if (nowa) ctx.setProperty(wezel, 'url', nowa);
      },
    };
  };
}
