import { describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { sciezkaWzgledna } from '../../src/lib/obrazy-w-tresci.mjs';

const korzen = mkdtempSync(join(tmpdir(), 'obrazy-'));
mkdirSync(join(korzen, 'src/assets/wpisy'), { recursive: true });
mkdirSync(join(korzen, 'public'), { recursive: true });
for (const plik of ['grafika-1.png', 'zdjecie_2.v2.JPG', 'Duza.png']) writeFileSync(join(korzen, 'src/assets/wpisy', plik), '');
writeFileSync(join(korzen, 'public/og.png'), '');
const md = join(korzen, 'src/content/wpisy/adres/pl.md');
const wynik = (url: string) => sciezkaWzgledna(url, md, ['/src/assets/wpisy/'], korzen);

describe('obrazy w treści wpisu: ścieżka z panelu na względną', () => {
  it('plik z /src/assets/wpisy/ o bezpiecznej nazwie zamienia na ścieżkę względną od pliku .md', () => {
    expect(wynik('/src/assets/wpisy/grafika-1.png')).toBe('../../../assets/wpisy/grafika-1.png');
    expect(wynik('/src/assets/wpisy/zdjecie_2.v2.JPG')).toBe('../../../assets/wpisy/zdjecie_2.v2.JPG');
  });
  it('nie rusza adresów zewnętrznych i względnych', () => {
    expect(wynik('https://example.com/a.png')).toBeNull();
    expect(wynik('//example.com/a.png')).toBeNull();
    expect(wynik('./a.png')).toBeNull();
  });
  it('nazwa spoza zasady (wielkie litery, polskie znaki, spacja, %, #, ?, podfolder, ..) zatrzymuje build prośbą o zmianę nazwy', () => {
    for (const nazwa of ['Duza.png', 'żółw.png', 'moja grafika.png', 'wzrost-100%25.png', 'a%23b.png', 'a.png?v=2', 'a.png#x', 'inne/a.png', '../a.png', '..a.png', '']) {
      expect(() => wynik(`/src/assets/wpisy/${nazwa}`), nazwa).toThrow(/zmień nazwę/);
    }
  });
  it('bezpieczna nazwa bez pliku zatrzymuje build komunikatem ze ścieżką wpisu w repo', () => {
    expect(() => wynik('/src/assets/wpisy/brak.png')).toThrow(/src\/content\/wpisy\/adres\/pl\.md: nie znaleziono obrazu \/src\/assets\/wpisy\/brak\.png/);
  });
  it('inna ścieżka od / (spoza folderu i spoza public/) zatrzymuje build', () => {
    expect(() => wynik('/src/assets/inne/a.png')).toThrow(/\/src\/assets\/wpisy\//);
    expect(() => wynik('/brak-w-public.png')).toThrow(/\/src\/assets\/wpisy\//);
    expect(() => wynik('/og.png')).toThrow(/\/src\/assets\/wpisy\//);
    expect(() => wynik('/../src/assets/wpisy/grafika-1.png')).toThrow(/\/src\/assets\/wpisy\//);
    expect(() => wynik('/')).toThrow(/\/src\/assets\/wpisy\//);
  });
  it('niedozwolony typ pliku ma osobny komunikat z listą typów', () => {
    expect(() => wynik('/src/assets/wpisy/zdjecie.heic')).toThrow(/typ pliku.*png/);
  });
});
