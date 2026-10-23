import { describe, expect, it } from 'vitest';
import { join } from 'node:path';
import { etykiety, adresOdpowiednika, widocznaWJezyku } from '../../src/lib/jezyki';
import { zbudujPary, wczytajFiksture } from '../../src/lib/tresc';

const F = join(import.meta.dirname, '../fikstury/jezyki');
const para = (kolekcja: string, adres: string) => zbudujPary(wczytajFiksture(join(F, kolekcja, adres), adres))[0];

describe('widocznaWJezyku', () => {
  it('PL widzi wszystko, EN nie widzi pozycji bez en.md, widzi do-aktualizacji', () => {
    expect(widocznaWJezyku(para('wdrozenia', 'tylko-pl'), 'pl')).toBe(true);
    expect(widocznaWJezyku(para('wdrozenia', 'tylko-pl'), 'en')).toBe(false);
    expect(widocznaWJezyku(para('wdrozenia', 'oba'), 'en')).toBe(true);
    const stara = para('wdrozenia', 'nieaktualne');
    expect(stara.stanEn).toBe('do-aktualizacji');
    expect(widocznaWJezyku(stara, 'en')).toBe(true);
  });
});

describe('adresOdpowiednika', () => {
  it('wpis z tłumaczeniem: strona odpowiednika w obie strony', () => {
    const p = para('wpisy', 'oba');
    expect(adresOdpowiednika('pl', 'wpisy', p)).toBe('/en/posts/oba/');
    expect(adresOdpowiednika('en', 'wpisy', p)).toBe('/wpisy/oba/');
  });
  it('wpis bez en.md: przełącznik z PL prowadzi do listy EN', () => {
    expect(adresOdpowiednika('pl', 'wpisy', para('wpisy', 'tylko-pl'))).toBe('/en/posts/');
  });
  it('referencje: lista do listy', () => {
    const p = para('wpisy', 'oba');
    expect(adresOdpowiednika('pl', 'referencje', p)).toBe('/en/references/');
    expect(adresOdpowiednika('en', 'referencje', p)).toBe('/referencje/');
  });
  it('wdrożenia i projekty żyją na stronie głównej', () => {
    const p = para('wdrozenia', 'oba');
    expect(adresOdpowiednika('pl', 'wdrozenia', p)).toBe('/en/');
    expect(adresOdpowiednika('en', 'projekty', p)).toBe('/');
  });
});

describe('etykiety', () => {
  const pl = etykiety('pl');
  const en = etykiety('en');
  it('EN ma te same klucze co PL i żadna wartość nie jest polska ani pusta', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(pl).sort());
    for (const [k, v] of Object.entries(en)) {
      expect(v, k).not.toBe('');
      expect(v, k).not.toBe((pl as Record<string, string>)[k]);
      expect(v, k).not.toMatch(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/);
      expect(v, k).not.toMatch(/[—–]/);
    }
  });
  it('etykiety przycisku kopiowania istnieją w obu językach', () => {
    expect(en.skopiowano).toBe('Copied');
    expect(pl.skopiowano).toBe('Skopiowano');
    expect(en.adresZaznaczony).toBeTruthy();
  });
});
