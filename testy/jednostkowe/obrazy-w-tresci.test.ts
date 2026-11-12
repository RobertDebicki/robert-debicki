import { describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { sciezkaWzgledna } from '../../src/lib/obrazy-w-tresci.mjs';

const korzen = mkdtempSync(join(tmpdir(), 'obrazy-'));
mkdirSync(join(korzen, 'src/assets/wpisy'), { recursive: true });
for (const plik of ['grafika.png', 'wzrost-100%.png', 'żółw.png', '100%-ż.png', 'a#b.png']) writeFileSync(join(korzen, 'src/assets/wpisy', plik), '');
writeFileSync(join(korzen, 'package.json'), '{}');
const md = join(korzen, 'src/content/wpisy/adres/pl.md');
const DOZWOLONE = ['/src/assets/'];
const wynik = (url: string) => sciezkaWzgledna(url, md, DOZWOLONE, korzen);

describe('obrazy w treści wpisu: ścieżka z panelu na względną', () => {
  it('ścieżkę od korzenia repo do istniejącego pliku zamienia na względną od pliku .md', () => {
    expect(wynik('/src/assets/wpisy/grafika.png')).toBe('../../../assets/wpisy/grafika.png');
  });
  it('nie rusza adresów zewnętrznych, względnych i spoza dozwolonych folderów', () => {
    expect(wynik('https://example.com/a.png')).toBeNull();
    expect(wynik('//example.com/a.png')).toBeNull();
    expect(wynik('./a.png')).toBeNull();
    expect(wynik('/og.png')).toBeNull();
  });
  it('brak pliku zatrzymuje build komunikatem ze ścieżką wpisu w repo, nie z dysku', () => {
    expect(() => wynik('/src/assets/wpisy/brak.png')).toThrow(/src\/content\/wpisy\/adres\/pl\.md.*brak\.png/);
    expect(() => wynik('/src/assets/wpisy/brak.png')).not.toThrow(new RegExp(korzen.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });
  it('folder zamiast pliku i inna wielkość liter zatrzymują build (macOS nie rozróżnia liter, Linux w CI tak)', () => {
    expect(() => wynik('/src/assets/wpisy/')).toThrow(/nie znaleziono/);
    expect(() => wynik('/src/assets/')).toThrow(/nie znaleziono/);
    expect(() => wynik('/src/assets/wpisy/Grafika.PNG')).toThrow(/nie znaleziono/);
  });
  it('ścieżka z .. (także zakodowanym) nie wychodzi poza dozwolony folder', () => {
    expect(() => wynik('/src/assets/%2e%2e/%2e%2e/package.json')).toThrow(/poza/);
    expect(() => wynik('/src/assets/../../package.json')).toThrow(/poza/);
  });
  it('nazwy z % i polskimi znakami: wynik po decodeURI w Astro trafia w plik, także przy mieszanym kodowaniu', () => {
    expect(decodeURI(wynik('/src/assets/wpisy/wzrost-100%25.png')!)).toBe('../../../assets/wpisy/wzrost-100%.png');
    expect(decodeURI(wynik('/src/assets/wpisy/wzrost-100%.png')!)).toBe('../../../assets/wpisy/wzrost-100%.png');
    expect(decodeURI(wynik('/src/assets/wpisy/%C5%BC%C3%B3%C5%82w.png')!)).toBe('../../../assets/wpisy/żółw.png');
    expect(decodeURI(wynik('/src/assets/wpisy/żółw.png')!)).toBe('../../../assets/wpisy/żółw.png');
    expect(decodeURI(wynik('/src/assets/wpisy/100%-%C5%BC.png')!)).toBe('../../../assets/wpisy/100%-ż.png');
  });
  it('nazwa z # albo ? zatrzymuje build prośbą o zmianę nazwy (Astro czyta je jako kotwicę i zapytanie)', () => {
    expect(() => wynik('/src/assets/wpisy/a%23b.png')).toThrow(/zmień nazwę/);
  });
});
