import { describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { sciezkaWzgledna } from '../../src/lib/obrazy-w-tresci.mjs';

const korzen = mkdtempSync(join(tmpdir(), 'obrazy-'));
mkdirSync(join(korzen, 'src/assets/wpisy'), { recursive: true });
writeFileSync(join(korzen, 'src/assets/wpisy/grafika.png'), '');
writeFileSync(join(korzen, 'src/assets/wpisy/wzrost-100%.png'), '');
writeFileSync(join(korzen, 'src/assets/wpisy/żółw.png'), '');
const md = join(korzen, 'src/content/wpisy/adres/pl.md');
const DOZWOLONE = ['/src/assets/'];

describe('obrazy w treści wpisu: ścieżka z panelu na względną', () => {
  it('ścieżkę od korzenia repo do istniejącego pliku zamienia na względną od pliku .md', () => {
    expect(sciezkaWzgledna('/src/assets/wpisy/grafika.png', md, DOZWOLONE, korzen)).toBe('../../../assets/wpisy/grafika.png');
  });
  it('nie rusza adresów zewnętrznych, względnych, spoza dozwolonych folderów i nieistniejących plików', () => {
    expect(sciezkaWzgledna('https://example.com/a.png', md, DOZWOLONE, korzen)).toBeNull();
    expect(sciezkaWzgledna('//example.com/a.png', md, DOZWOLONE, korzen)).toBeNull();
    expect(sciezkaWzgledna('./a.png', md, DOZWOLONE, korzen)).toBeNull();
    expect(sciezkaWzgledna('/og.png', md, DOZWOLONE, korzen)).toBeNull();
  });
  it('brak pliku w dozwolonym folderze zatrzymuje build z nazwą pliku (jak przy zdjęciach pod wpisem)', () => {
    expect(() => sciezkaWzgledna('/src/assets/wpisy/brak.png', md, DOZWOLONE, korzen)).toThrow(/brak\.png/);
  });
  it('nazwy z % i polskimi znakami: wynik zakodowany tak, żeby Astro po swoim decodeURI trafiło w plik', () => {
    const procent = sciezkaWzgledna('/src/assets/wpisy/wzrost-100%25.png', md, DOZWOLONE, korzen)!;
    expect(decodeURI(procent)).toBe('../../../assets/wpisy/wzrost-100%.png');
    const polskie = sciezkaWzgledna('/src/assets/wpisy/%C5%BC%C3%B3%C5%82w.png', md, DOZWOLONE, korzen)!;
    expect(decodeURI(polskie)).toBe('../../../assets/wpisy/żółw.png');
    expect(decodeURI(sciezkaWzgledna('/src/assets/wpisy/żółw.png', md, DOZWOLONE, korzen)!)).toBe('../../../assets/wpisy/żółw.png');
  });
  it('błędna sekwencja % nie wywraca buildu wyjątkiem URIError', () => {
    expect(() => sciezkaWzgledna('/src/assets/wpisy/zly-%zz.png', md, DOZWOLONE, korzen)).not.toThrow(URIError);
  });
});
