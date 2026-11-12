// Panel (Sveltia) wstawia obraz w treść wpisu ścieżką od korzenia repozytorium, np. `/src/assets/wpisy/grafika-1.png`
// (media_folder i public_folder w panel.ts). Astro traktuje ścieżkę z `/` jako plik z public/ i nie optymalizuje go,
// więc wtyczka Sätteri (procesor Markdown w Astro 7) zamienia ją na ścieżkę względną od pliku .md.
// Wtedy Astro robi z niej obraz z wymiarami i WebP. Wtyczka działa przed zbieraniem obrazów przez Astro.
// Przyjmujemy tylko bezpieczne nazwy plików: bez kodowania %, polskich znaków i wielkich liter nie ma przypadków,
// w których build na macOS przechodzi, a obrazek na stronie jest zepsuty.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const KORZEN = fileURLToPath(new URL('../..', import.meta.url));
const NAZWA = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*\.(?:png|jpe?g|webp|avif|gif|svg)$/;

/**
 * Ścieżka względna od pliku .md do obrazu albo null, gdy adresu nie zmieniamy (zewnętrzny, względny, plik z public/).
 * Każda inna ścieżka od `/` zatrzymuje build, bo na stronie dałaby zepsuty obrazek.
 * @param {string[]} foldery foldery od korzenia repo, z `/` na końcu
 */
export function sciezkaWzgledna(url, plikMd, foldery, korzen = KORZEN) {
  if (!url.startsWith('/') || url.startsWith('//')) return null;
  const wpis = relative(korzen, plikMd).split(sep).join('/');
  const folder = foldery.find((f) => url.startsWith(f));
  if (!folder) {
    if (existsSync(join(korzen, 'public', url))) return null;
    throw new Error(`Wpis ${wpis}: obraz ${url} musi leżeć w ${foldery[0]} (wstaw go z panelu).`);
  }
  const nazwa = url.slice(folder.length);
  const kropka = nazwa.lastIndexOf('.');
  // Rozszerzenie bez względu na wielkość liter (telefon zapisuje .JPG), reszta nazwy tylko małymi literami.
  if (kropka < 0 || !NAZWA.test(nazwa.slice(0, kropka) + nazwa.slice(kropka).toLowerCase())) {
    throw new Error(`Wpis ${wpis}: nazwa obrazu „${nazwa}” jest niedozwolona, zmień nazwę pliku na małe litery, cyfry, dywiz i podkreślnik, bez spacji i polskich znaków.`);
  }
  const cel = join(korzen, folder, nazwa);
  // Porównanie z listą folderu, bo macOS nie rozróżnia wielkości liter, a Linux w CI tak.
  if (!existsSync(cel) || !readdirSync(dirname(cel)).includes(nazwa)) {
    throw new Error(`Wpis ${wpis}: nie znaleziono obrazu ${url}. Sprawdź nazwę pliku.`);
  }
  return relative(dirname(plikMd), cel).split(sep).join('/');
}

/**
 * Fabryka wtyczki mdast dla Sätteri: dostaje adres pliku .md (`fileURL`) przed parsowaniem.
 * @param {{ foldery: string[] }} opcje foldery (od korzenia, z `/` na końcu), z których obrazy wolno wstawiać w treść
 */
export default function obrazyWTresci({ foldery }) {
  return ({ fileURL }) => {
    if (!fileURL || fileURL.protocol !== 'file:') return null;
    const plikMd = fileURLToPath(fileURL);
    return {
      name: 'obrazy-w-tresci',
      image(wezel, ctx) {
        const nowa = wezel.url && sciezkaWzgledna(wezel.url, plikMd, foldery);
        if (nowa) ctx.setProperty(wezel, 'url', nowa);
      },
    };
  };
}
