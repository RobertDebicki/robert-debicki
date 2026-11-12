import { describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { sciezkaWzgledna } from '../../src/lib/obrazy-w-tresci.mjs';

const korzen = mkdtempSync(join(tmpdir(), 'obrazy-'));
mkdirSync(join(korzen, 'src/assets/wpisy'), { recursive: true });
writeFileSync(join(korzen, 'src/assets/wpisy/grafika.png'), '');
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
    expect(sciezkaWzgledna('/src/assets/wpisy/brak.png', md, DOZWOLONE, korzen)).toBeNull();
  });
});
