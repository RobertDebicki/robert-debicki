// Rastry favicony z public/favicon.svg (wersja jasna: czarny znak, pomarańczowa belka).
// Używa sharp, który jest w node_modules jako zależność Astro (nie jest wpisany w package.json).
// Uruchamiać po `node skrypty/logo-z-fontu.mjs`: node skrypty/favicony.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/favicon.svg');
// SVG nie ma width/height, więc sharp wziąłby viewBox (ok. 25 tys. jednostek) jako piksele.
// Wstawiamy rozmiar 4 razy większy od celu i zmniejszamy.
const raster = (bok) =>
  sharp(Buffer.from(svg.toString().replace('<svg ', `<svg width="${bok * 4}" height="${bok * 4}" `))).resize(bok, bok);

// 32 px na przezroczystym tle (karty przeglądarek bez obsługi SVG).
const png32 = await raster(32).png().toBuffer();
writeFileSync('public/favicon-32.png', png32);

// favicon.ico: kontener ICO z jednym obrazem PNG 32x32 (przeglądarki pytają o /favicon.ico same z siebie).
const naglowek = Buffer.alloc(22);
naglowek.writeUInt16LE(0, 0); naglowek.writeUInt16LE(1, 2); naglowek.writeUInt16LE(1, 4);
naglowek.writeUInt8(32, 6); naglowek.writeUInt8(32, 7); naglowek.writeUInt8(0, 8); naglowek.writeUInt8(0, 9);
naglowek.writeUInt16LE(1, 10); naglowek.writeUInt16LE(32, 12);
naglowek.writeUInt32LE(png32.length, 14); naglowek.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([naglowek, png32]));

// apple-touch-icon 180 px: iOS wypełnia przezroczystość czernią, więc tło białe i margines wokół znaku.
const znak = await raster(140).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: znak, top: 20, left: 20 }])
  .flatten({ background: '#ffffff' })
  .png()
  .toFile('public/apple-touch-icon.png');
console.log('public/favicon-32.png, public/favicon.ico, public/apple-touch-icon.png');
