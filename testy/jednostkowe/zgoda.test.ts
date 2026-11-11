import { describe, expect, it } from 'vitest';
import { ID_TAGU, adresTagu, ciasteczkaGoogle, domenyDoUsuniecia, odczytajWybor, zapiszWybor, KLUCZ_WYBORU } from '../../src/lib/zgoda';

describe('adresTagu', () => {
  it('składa adres tagu Google dokładnie tak, jak podaje GA4 (gtm.js z identyfikatorem kontenera)', () => {
    expect(adresTagu('GTM-ABC123')).toBe('https://www.googletagmanager.com/gtm.js?id=GTM-ABC123');
  });
  it('ID_TAGU to kontener Roberta w Menedżerze tagów (konto robert-debicki)', () => {
    expect(ID_TAGU).toBe('GTM-T7N4RZD8');
  });
  it('odrzuca identyfikator o nieoczekiwanym formacie, żeby nie wstrzyknąć obcego adresu', () => {
    expect(() => adresTagu('x&y=1')).toThrow(/identyfikator/i);
  });
});

describe('odczytajWybor', () => {
  it('rozpoznaje zapisane tak i nie', () => {
    expect(odczytajWybor('tak')).toBe('tak');
    expect(odczytajWybor('nie')).toBe('nie');
  });
  it('brak lub nieznana wartość oznacza brak decyzji, czyli pytamy ponownie (domyślnie bez zgody)', () => {
    expect(odczytajWybor(null)).toBeNull();
    expect(odczytajWybor('')).toBeNull();
    expect(odczytajWybor('TAK ')).toBeNull();
    expect(odczytajWybor('true')).toBeNull();
  });
});

describe('zapiszWybor', () => {
  const pamiec = (mapa: Record<string, string> = {}, rzuca = false) => ({
    getItem: (k: string) => mapa[k] ?? null,
    setItem: (k: string, v: string) => {
      if (rzuca) throw new Error('zablokowane');
      mapa[k] = v;
    },
  });
  it('zapisuje wybór pod stałym kluczem', () => {
    const m: Record<string, string> = {};
    expect(zapiszWybor(pamiec(m), 'tak')).toBe(true);
    expect(m[KLUCZ_WYBORU]).toBe('tak');
  });
  it('gdy pamięć jest zablokowana (tryb prywatny), nie rzuca błędu i zwraca false', () => {
    expect(zapiszWybor(pamiec({}, true), 'tak')).toBe(false);
  });
});

describe('ciasteczkaGoogle', () => {
  it('wybiera tylko ciasteczka analityki Google (_ga i _ga_*), po nazwie', () => {
    const wynik = ciasteczkaGoogle('a=1; _ga=GA1.1.1.2; _ga_ABC123XYZ=GS1.1.x; _gid=3; sesja=_ga');
    expect(wynik.sort()).toEqual(['_ga', '_ga_ABC123XYZ']);
  });
  it('pusty ciąg daje pustą listę', () => {
    expect(ciasteczkaGoogle('')).toEqual([]);
  });
});

describe('domenyDoUsuniecia', () => {
  it('dla domeny głównej: bez domeny, host i .host', () => {
    expect(domenyDoUsuniecia('robert-debicki.pl')).toEqual(['', 'robert-debicki.pl', '.robert-debicki.pl']);
  });
  it('dla subdomeny dodaje też domeny nadrzędne, na których GA mógł ustawić ciasteczko, ale nie samą końcówkę (pl)', () => {
    expect(domenyDoUsuniecia('www.robert-debicki.pl')).toEqual(['', 'www.robert-debicki.pl', '.www.robert-debicki.pl', 'robert-debicki.pl', '.robert-debicki.pl']);
  });
  it('localhost zostaje sam (bez domen nadrzędnych)', () => {
    expect(domenyDoUsuniecia('localhost')).toEqual(['', 'localhost', '.localhost']);
  });
});
