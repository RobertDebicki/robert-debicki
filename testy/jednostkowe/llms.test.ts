import { describe, expect, it } from 'vitest';
import { llmsTxt } from '../../src/lib/llms';

const dane = {
  imie: 'Robert',
  nazwisko: 'Dębicki',
  rola: 'Automation Developer',
  lead: 'Automatyzuję procesy w firmach.',
  opis: 'Scenariusze stawiam w n8n i Make.com.',
  miejsce: 'Wrocław albo zdalnie',
  email: 'jan@example.com',
  linkedinUrl: 'https://www.linkedin.com/in/jan/',
  narzedzia: [
    { nazwa: 'Automatyzacja', wartosc: 'n8n, Make.com' },
    { nazwa: 'Kod', wartosc: 'Python, TypeScript' },
  ],
  strony: [
    { nazwa: 'Strona główna (polski)', adres: 'https://example.pl/' },
    { nazwa: 'Home page (English)', adres: 'https://example.pl/en/' },
  ],
};

describe('llmsTxt', () => {
  const tekst = llmsTxt(dane);
  it('zaczyna się od nazwy jako nagłówka i streszczenia w cytacie (format llms.txt)', () => {
    expect(tekst.split('\n')[0]).toBe('# Robert Dębicki');
    expect(tekst).toMatch(/^> Automation Developer\. Automatyzuję procesy w firmach\./m);
  });
  it('zawiera opis, miejsce, e-mail i LinkedIn', () => {
    expect(tekst).toContain('Scenariusze stawiam w n8n i Make.com.');
    expect(tekst).toContain('Wrocław albo zdalnie');
    expect(tekst).toContain('jan@example.com');
    expect(tekst).toContain('https://www.linkedin.com/in/jan/');
  });
  it('wypisuje narzędzia po jednej linii na obszar', () => {
    expect(tekst).toContain('- Automatyzacja: n8n, Make.com');
    expect(tekst).toContain('- Kod: Python, TypeScript');
  });
  it('linkuje strony jako listę markdown z adresem bezwzględnym', () => {
    expect(tekst).toContain('- [Strona główna (polski)](https://example.pl/)');
    expect(tekst).toContain('- [Home page (English)](https://example.pl/en/)');
  });
  it('kończy się znakiem nowej linii i nie ma myślników długich ani krótkich', () => {
    expect(tekst.endsWith('\n')).toBe(true);
    expect(tekst).not.toMatch(/[—–]/);
  });
});
