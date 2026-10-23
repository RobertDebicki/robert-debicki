import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { skrotTresci } from '../../src/lib/skrot';
import { zbudujPary, wczytajFiksture } from '../../src/lib/tresc';
import { walidujPlik } from '../../src/lib/waliduj';
import { wpisy, referencje } from '../../src/lib/schematy';

const F = join(import.meta.dirname, '../fikstury/tresc');
const surowyPl = (d: string) => readFileSync(join(F, d, 'pl.md'), 'utf8');

function en(zrodlo: string, tlumaczenie: 'ai' | 'sprawdzone') {
  return `---\ntytul: Shared title\ntlumaczenie: ${tlumaczenie}\nzrodlo: ${zrodlo}\n---\nPolish body in English.\n`;
}

describe('skrotTresci', () => {
  it('normalizuje CRLF i daje SHA-256 hex', () => {
    expect(skrotTresci('a\r\nb')).toBe(skrotTresci('a\nb'));
    expect(skrotTresci('a')).toMatch(/^[0-9a-f]{64}$/);
    expect(skrotTresci('a')).not.toBe(skrotTresci('b'));
  });
});

describe('zbudujPary', () => {
  it('para bez en ma stanEn brak', () => {
    const pary = zbudujPary(wczytajFiksture(join(F, 'brak-en'), 'brak-en'));
    expect(pary).toHaveLength(1);
    expect(pary[0].adres).toBe('brak-en');
    expect(pary[0].en).toBeUndefined();
    expect(pary[0].stanEn).toBe('brak');
  });

  it('nieaktualne: en ze zrodlo innym niż skrót pl ma stanEn do-aktualizacji', () => {
    const stary = skrotTresci('Stara treść polska.\n');
    const pliki = wczytajFiksture(join(F, 'nieaktualne'), 'nieaktualne', { 'en.md': en(stary, 'sprawdzone') });
    const [p] = zbudujPary(pliki);
    expect(p.en).toBeDefined();
    expect(p.stanEn).toBe('do-aktualizacji');
  });

  it('aktualne en zwraca wartość pola tlumaczenie', () => {
    for (const t of ['ai', 'sprawdzone'] as const) {
      const d = t === 'ai' ? 'aktualne-ai' : 'aktualne-sprawdzone';
      const pliki = wczytajFiksture(join(F, d), d, { 'en.md': en(skrotTresci(surowyPl(d)), t) });
      expect(zbudujPary(pliki)[0].stanEn).toBe(t);
    }
  });

  it('pomija foldery bez pl.md i sortuje po adresie', () => {
    const a = wczytajFiksture(join(F, 'brak-en'), 'b');
    const b = wczytajFiksture(join(F, 'brak-en'), 'a');
    expect(zbudujPary([...a, ...b]).map((p) => p.adres)).toEqual(['a', 'b']);
  });
});

describe('schematy', () => {
  it('referencja bez zgoda: true nie przechodzi schematu z komunikatem zawierającym nazwę pliku i słowo zgoda', () => {
    const plik = join(F, 'bledne/referencja-bez-zgody.md');
    const bledy = walidujPlik(plik, 'referencje');
    expect(bledy.length).toBeGreaterThan(0);
    expect(bledy[0]).toContain('referencja-bez-zgody.md');
    expect(bledy.join('\n')).toContain('zgoda');
  });

  it('zdjecie wpisu bez alt nie przechodzi schematu z komunikatem zawierającym alt', () => {
    const plik = join(F, 'bledne/wpis-bez-altu.md');
    const bledy = walidujPlik(plik, 'wpisy');
    expect(bledy.length).toBeGreaterThan(0);
    expect(bledy.join('\n')).toContain('alt');
    expect(bledy[0]).toContain('wpis-bez-altu.md');
  });

  it('alt krótszy niż 5 znaków nie przechodzi', () => {
    const r = wpisy.safeParse({ tytul: 'a', data: '2026-09-01', zajawka: 'b', zdjecia: [{ plik: '/a.jpg', alt: 'abc' }] });
    expect(r.success).toBe(false);
  });

  it('poprawny wpis przechodzi', () => {
    expect(walidujPlik(join(F, 'bledne/wpis-poprawny.md'), 'wpisy')).toEqual([]);
  });

  it('skanUrl musi być https', () => {
    const r = referencje.safeParse({ cytat: 'c', osoba: 'o', funkcja: 'f', firma: 'f', data: '2026-09-01', skanUrl: 'http://x.r2.dev/a.pdf', zgoda: true, podpisZamazany: false });
    expect(r.success).toBe(false);
  });
});
