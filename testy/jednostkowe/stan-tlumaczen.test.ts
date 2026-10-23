import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { stanTlumaczen } from '../../skrypty/stan-tlumaczen';
import { skrotTresci } from '../../src/lib/skrot';

const FIKSTURY = join(import.meta.dirname, '../fikstury/jezyki');

describe('stanTlumaczen (lista par dla skilla /tlumacz-strone)', () => {
  const stany = Object.fromEntries(stanTlumaczen(FIKSTURY).map((p) => [p.folder, p.stanEn]));

  it('pozycja bez en.md ma stan brak, a po edycji PL do-aktualizacji', () => {
    expect(stany['wdrozenia/tylko-pl']).toBe('brak');
    expect(stany['projekty/tylko-pl']).toBe('brak');
    expect(stany['wdrozenia/nieaktualne']).toBe('do-aktualizacji');
  });

  it('ustawienia (pliki bez folderu pozycji) też są parą', () => {
    expect(stany).toHaveProperty('ustawienia');
  });
});

describe('skrypty/skrot.ts', () => {
  it('wypisuje ten sam skrót, który liczy build (skrotTresci pl.md)', () => {
    const plik = join(FIKSTURY, 'wdrozenia/oba/pl.md');
    const wynik = spawnSync('npx', ['tsx', 'skrypty/skrot.ts', plik], { encoding: 'utf8' });
    expect(wynik.status).toBe(0);
    expect(wynik.stdout.trim()).toBe(skrotTresci(readFileSync(plik, 'utf8')));
  });
});
