import { describe, expect, it } from 'vitest';
import { hrefTelefonu } from '../../src/lib/telefon';
import { SCHEMATY } from '../../src/lib/schematy';

const kontakt = SCHEMATY.ustawienia.shape.kontakt;
const poprawny = {
  tytul: 'Tytuł',
  wstep: 'Wstęp',
  email: 'a@b.pl',
  linkedinUrl: 'https://www.linkedin.com/in/jan/',
  linkedinTekst: 'LinkedIn',
};

describe('hrefTelefonu', () => {
  it('zostawia cyfry i wiodący plus', () => {
    expect(hrefTelefonu('+48 600 100 200')).toBe('tel:+48600100200');
    expect(hrefTelefonu('600-100-200')).toBe('tel:600100200');
  });
});

describe('pole kontakt.telefon', () => {
  it('przyjmuje numer z kierunkowym', () => {
    expect(kontakt.safeParse({ ...poprawny, telefon: '+48 600 100 200' }).success).toBe(true);
  });
  it('odrzuca tekst, który nie jest numerem, z czytelnym komunikatem', () => {
    const r = kontakt.safeParse({ ...poprawny, telefon: 'zadzwoń' });
    expect(r.success).toBe(false);
    expect(r.error!.issues[0].message).toBe('Pole telefon musi być numerem, np. +48 600 100 200.');
  });
  it('przyjmuje puste pole z panelu (czyszczenie numeru)', () => {
    expect(kontakt.safeParse({ ...poprawny, telefon: '' }).success).toBe(true);
  });
  it('jest opcjonalne', () => {
    expect(kontakt.safeParse(poprawny).success).toBe(true);
  });
});
