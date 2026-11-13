import { describe, expect, it } from 'vitest';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { uslugi, ustawienia } from '../../src/lib/schematy';
import { rozdziel } from '../../src/lib/frontmatter';
import { zbudujPary, wczytajFiksture } from '../../src/lib/tresc';
import { adresOdpowiednika } from '../../src/lib/jezyki';
import { adresUslugi, ulozUslugi } from '../../src/lib/uslugi';

const F = join(import.meta.dirname, '../fikstury/jezyki');
const dane = (sciezka: string) => rozdziel(readFileSync(join(F, sciezka), 'utf8')).dane as Record<string, any>;
const wzor = () => structuredClone(dane('uslugi/ai-i-automatyzacja/pl.md'));
const para = (adres: string, nadpisania = {}) => zbudujPary(wczytajFiksture(join(F, 'uslugi', adres), adres, nadpisania))[0];

describe('schemat uslugi', () => {
  it('przyjmuje fiksturę PL i EN', () => {
    expect(uslugi.safeParse(wzor()).success).toBe(true);
    expect(uslugi.safeParse(dane('uslugi/ai-i-automatyzacja/en.md')).success).toBe(true);
  });
  it('odrzuca usługę bez przykładu', () => {
    const u = wzor();
    u.przyklady.pozycje = [];
    expect(uslugi.safeParse(u).success).toBe(false);
    delete u.przyklady;
    expect(uslugi.safeParse(u).success).toBe(false);
  });
  it('odrzuca FAQ krótsze niż 3 pytania', () => {
    const u = wzor();
    u.faq.pozycje = u.faq.pozycje.slice(0, 2);
    expect(uslugi.safeParse(u).success).toBe(false);
  });
  it('opis od 120 do 155 znaków: 119 i 156 odrzucone', () => {
    for (const [dl, ok] of [[119, false], [120, true], [155, true], [156, false]] as const) {
      expect(uslugi.safeParse({ ...wzor(), opis: 'a'.repeat(dl) }).success, `opis ${dl}`).toBe(ok);
    }
  });
  it('tytulSeo najwyżej 60 znaków: 61 odrzucone', () => {
    expect(uslugi.safeParse({ ...wzor(), tytulSeo: 'a'.repeat(60) }).success).toBe(true);
    expect(uslugi.safeParse({ ...wzor(), tytulSeo: 'a'.repeat(61) }).success).toBe(false);
  });
  it('adresEn tylko małe litery, cyfry i dywizy', () => {
    expect(uslugi.safeParse({ ...wzor(), adresEn: 'ai-and-automation' }).success).toBe(true);
    expect(uslugi.safeParse({ ...wzor(), adresEn: 'AI i automatyzacja' }).success).toBe(false);
  });
  it('link przykładu tylko do adresu w serwisie', () => {
    const u = wzor();
    u.przyklady.pozycje[1].link.adres = 'https://example.com/';
    expect(uslugi.safeParse(u).success).toBe(false);
  });
});

describe('schemat ustawien: nagłówek sekcji usług', () => {
  it('jest opcjonalny (prawdziwe ustawienia jeszcze go nie mają)', () => {
    const u = dane('ustawienia/pl.md');
    expect(ustawienia.safeParse(u).success).toBe(true);
    delete u.uslugi;
    expect(ustawienia.safeParse(u).success).toBe(true);
  });
});

describe('adresy usług', () => {
  it('w EN adresEn, gdy jest, inaczej polski adres folderu; w PL zawsze folder', () => {
    expect(adresUslugi(para('ai-i-automatyzacja'), 'en')).toBe('ai-and-automation');
    expect(adresUslugi(para('ai-i-automatyzacja'), 'pl')).toBe('ai-i-automatyzacja');
    const bezAdresuEn = readFileSync(join(F, 'uslugi/ai-i-automatyzacja/en.md'), 'utf8').replace(/^adresEn:.*\n/m, '');
    expect(adresUslugi(para('ai-i-automatyzacja', { 'en.md': bezAdresuEn }), 'en')).toBe('ai-i-automatyzacja');
  });
  it('przełącznik języka prowadzi między odpowiednikami, a bez en.md do listy EN', () => {
    expect(adresOdpowiednika('pl', 'uslugi', para('ai-i-automatyzacja'))).toBe('/en/services/ai-and-automation/');
    expect(adresOdpowiednika('en', 'uslugi', para('ai-i-automatyzacja'))).toBe('/uslugi/ai-i-automatyzacja/');
    expect(adresOdpowiednika('pl', 'uslugi', para('voiceboty'))).toBe('/en/services/');
  });
});

describe('ulozUslugi', () => {
  const pary = [para('ai-i-automatyzacja'), para('voiceboty')];
  const wpisy = pary.flatMap((p) => (['pl', 'en'] as const).filter((j) => p[j]).map((j) => ({ id: `${p.adres}/${j}`, data: p[j]!.data as any })));
  it('sortuje po kolejnosc, a nie po nazwie folderu', () => {
    expect(ulozUslugi(pary, wpisy, 'pl').map((u) => u.adres)).toEqual(['voiceboty', 'ai-i-automatyzacja']);
  });
  it('EN pomija usługę bez en.md i używa adresEn', () => {
    expect(ulozUslugi(pary, wpisy, 'en').map((u) => u.adres)).toEqual(['ai-and-automation']);
  });
  it('zatrzymuje build, gdy dwie usługi mają ten sam adres', () => {
    const kopia = { ...pary[0], adres: 'inna' };
    const zKopia = [...wpisy, { id: 'inna/en', data: { ...wpisy.find((w) => w.id === 'ai-i-automatyzacja/en')!.data } }];
    expect(() => ulozUslugi([pary[0], kopia], zKopia, 'en')).toThrow(/ai-and-automation/);
  });
});
