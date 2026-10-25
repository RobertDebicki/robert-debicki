// Zdjęcia z telefonu niosą w EXIF współrzędne GPS (np. adres domu). Repozytorium i strona są publiczne,
// więc obraz z lokalizacją w src/assets/ przerywa kontrolę. Metadane czyta sharp (zależność Astro).
import { readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const OBRAZY = /\.(jpe?g|png|webp|avif|tiff?|heic|heif)$/i;

function pliki(katalog: string): string[] {
  let wpisy;
  try {
    wpisy = readdirSync(katalog, { withFileTypes: true });
  } catch {
    return [];
  }
  return wpisy.flatMap((w) => {
    const sciezka = join(katalog, w.name);
    return w.isDirectory() ? pliki(sciezka) : OBRAZY.test(w.name) ? [sciezka] : [];
  });
}

/** Czy blok EXIF (z nagłówkiem `Exif\0\0` albo bez) ma niepusty katalog GPS (znacznik 0x8825 w IFD0). */
export function maGps(exif: Buffer): boolean {
  const tiff = exif.subarray(0, 6).toString('latin1') === 'Exif\0\0' ? exif.subarray(6) : exif;
  if (tiff.length < 8) return false;
  const le = tiff.toString('latin1', 0, 2) === 'II';
  const u16 = (o: number) => (le ? tiff.readUInt16LE(o) : tiff.readUInt16BE(o));
  const u32 = (o: number) => (le ? tiff.readUInt32LE(o) : tiff.readUInt32BE(o));
  const ifd0 = u32(4);
  if (ifd0 + 2 > tiff.length) return false;
  for (let i = 0, n = u16(ifd0); i < n; i++) {
    const wpis = ifd0 + 2 + i * 12;
    if (wpis + 12 > tiff.length) return false;
    if (u16(wpis) !== 0x8825) continue;
    const gps = u32(wpis + 8);
    return gps + 2 <= tiff.length && u16(gps) > 0;
  }
  return false;
}

export interface Problem { plik: string; powod: string }

const GPS = 'zdjęcie ma w danych EXIF lokalizację GPS. Usuń ją (np. eksport bez lokalizacji albo zrzut ekranu) i wgraj plik jeszcze raz.';
const NIECZYTELNE = 'nie da się odczytać metadanych (HEIC z iPhone\'a trzeba wyeksportować jako JPG). Wgraj plik JPG, PNG albo WebP.';

/** Obrazy w src/assets/ z lokalizacją GPS albo bez możliwości sprawdzenia (np. HEIC); ścieżki względem korzenia. */
export async function znajdzZdjeciaZGps(korzen: string): Promise<Problem[]> {
  const wynik: Problem[] = [];
  for (const sciezka of pliki(join(korzen, 'src/assets'))) {
    const plik = relative(korzen, sciezka).split('\\').join('/');
    try {
      const { exif } = await sharp(sciezka).metadata();
      if (exif && maGps(exif)) wynik.push({ plik, powod: GPS });
    } catch {
      wynik.push({ plik, powod: NIECZYTELNE });
    }
  }
  return wynik;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const zdjecia = await znajdzZdjeciaZGps(resolve(process.argv[2] ?? '.'));
  for (const z of zdjecia) console.error(`${z.plik}: ${z.powod}`);
  console.log(`Zdjęć z lokalizacją GPS albo nieczytelnych w src/assets/: ${zdjecia.length}`);
  process.exit(zdjecia.length ? 1 : 0);
}
