import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import { afterAll, describe, expect, it } from 'vitest';
import { maGps, znajdzZdjeciaZGps } from '../../skrypty/sprawdz-zdjecia';

const katalogi: string[] = [];
afterAll(() => katalogi.forEach((k) => rmSync(k, { recursive: true, force: true })));

const pusty = () => sharp({ create: { width: 8, height: 8, channels: 3, background: '#ef7f1a' } });
const zGps = () => pusty().jpeg().withExif({ IFD0: { Make: 'Telefon' }, IFD3: { GPSLatitudeRef: 'N', GPSLatitude: '51/1 6/1 0/1' } }).toBuffer();
const bezGps = () => pusty().jpeg().withExif({ IFD0: { Make: 'Telefon' } }).toBuffer();

async function repo(pliki: Record<string, Buffer>): Promise<string> {
  const k = mkdtempSync(join(tmpdir(), 'zdjecia-'));
  katalogi.push(k);
  for (const [p, dane] of Object.entries(pliki)) {
    mkdirSync(join(k, p, '..'), { recursive: true });
    writeFileSync(join(k, p), dane);
  }
  return k;
}

describe('maGps', () => {
  it('odróżnia EXIF z katalogiem GPS od EXIF bez niego', async () => {
    expect(maGps((await sharp(await zGps()).metadata()).exif!)).toBe(true);
    expect(maGps((await sharp(await bezGps()).metadata()).exif!)).toBe(false);
    expect(maGps(Buffer.from('Exif\0\0'))).toBe(false);
  });
});

describe('znajdzZdjeciaZGps', () => {
  it('zgłasza JPG z GPS (także z wielkimi literami w rozszerzeniu) i plik HEIC, pomija zdjęcie bez GPS', async () => {
    const k = await repo({
      'src/assets/wpisy/z-telefonu.JPG': await zGps(),
      'src/assets/wpisy/czyste.jpg': await bezGps(),
      'src/assets/wpisy/IMG_0001.heic': Buffer.from('nie obraz'),
    });
    const wynik = await znajdzZdjeciaZGps(k);
    expect(wynik.map((w) => w.plik).sort()).toEqual(['src/assets/wpisy/IMG_0001.heic', 'src/assets/wpisy/z-telefonu.JPG']);
    expect(wynik.find((w) => w.plik.endsWith('.JPG'))!.powod).toContain('lokalizację GPS');
    expect(wynik.find((w) => w.plik.endsWith('.heic'))!.powod).toContain('JPG');
  });

  it('obrazy w repozytorium nie mają lokalizacji', async () => {
    expect(await znajdzZdjeciaZGps(resolve('.'))).toEqual([]);
  });
});

describe('skrypt sprawdz-zdjecia', () => {
  const uruchom = (k: string) => spawnSync('npx', ['tsx', resolve('skrypty/sprawdz-zdjecia.ts'), k], { encoding: 'utf8' });

  it('kończy się błędem z plikiem i polskim komunikatem', async () => {
    const w = uruchom(await repo({ 'src/assets/wpisy/a.jpg': await zGps() }));
    expect(w.status).toBe(1);
    expect(w.stderr).toContain('src/assets/wpisy/a.jpg: zdjęcie ma w danych EXIF lokalizację GPS');
  });

  it('kończy się sukcesem bez zdjęć z GPS', async () => {
    expect(uruchom(await repo({ 'src/assets/wpisy/a.jpg': await bezGps() })).status).toBe(0);
  });
}, 60_000);
