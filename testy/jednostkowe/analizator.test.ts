import { describe, expect, it } from 'vitest';
import { okienka, tekstUslugi, tekstWpisu } from '../../skrypty/analizator';

const WPIS = `---
tytul: "Automatyzacja faktur w małej firmie"
data: 2026-11-16
zajawka: "Opis wpisu."
zdjecia:
  - plik: "/src/assets/wpisy/pod-trescia.png"
    alt: "Zdjęcie pod treścią wpisu"
---
**Automatyzacja faktur** zdejmuje przepisywanie.

## Pierwsza sekcja

Tekst.
`;

const USLUGA = {
  tytul: 'Automatyzacja faktur w Twojej firmie', tytulSeo: 'Automatyzacja faktur | Robert Dębicki', opis: 'Opis usługi.',
  lead: 'Lead usługi.', akapit: 'Akapit usługi.', karta: [{ etykieta: 'Narzędzia', wartosc: 'n8n' }],
  problemy: { tytul: 'Problemy', wstep: 'Wstęp problemów.', pozycje: [{ tytul: 'Problem', tekst: 'Opis problemu.' }] },
  kroki: { tytul: 'Kroki', pozycje: [{ tytul: 'Krok', tekst: 'Opis kroku.' }] },
  przyklady: { tytul: 'Przykłady', pozycje: [{ tytul: 'Przykład', tekst: 'Opis przykładu.', link: { tekst: 'zobacz opis wdrożenia', adres: '/wpisy/x/' } }] },
  faq: { tytul: 'Najczęstsze pytania o automatyzację faktur', pozycje: [{ pytanie: 'Czy to działa?', odpowiedz: 'Tak.' }] },
};

describe('tekst do okienka „Tekst”', () => {
  it('wpis: H1 z pola tytul, treść, zdjęcia z pola zdjecia pod treścią jak na stronie', () => {
    const t = tekstWpisu(WPIS);
    expect(t.startsWith('# Automatyzacja faktur w małej firmie\n\n**Automatyzacja faktur**')).toBe(true);
    expect(t.trimEnd().endsWith('![Zdjęcie pod treścią wpisu](pod-trescia.png)')).toBe(true);
    expect(t.match(/^# /gm)).toHaveLength(1);
  });
  it('usługa: H1, wstęp, sekcje H2 z H3 i FAQ w kolejności strony', () => {
    const t = tekstUslugi(USLUGA);
    const kolejnosc = ['# Automatyzacja faktur w Twojej firmie', 'Lead usługi.', 'Akapit usługi.', '## Problemy', '### Problem', '## Kroki',
      '## Przykłady', '[zobacz opis wdrożenia](/wpisy/x/)', '## Najczęstsze pytania o automatyzację faktur', '### Czy to działa?', 'Tak.'];
    const pozycje = kolejnosc.map((k) => t.indexOf(k));
    expect(pozycje.every((p) => p >= 0)).toBe(true);
    expect([...pozycje].sort((a, b) => a - b)).toEqual(pozycje);
  });
});

describe('po przeglądzie 16.11', () => {
  it('usługa: rola pod H1 i pola przykładu jak w szablonie (sektor, H3, tekst, liczba, stos, link)', () => {
    const t = tekstUslugi({ ...USLUGA, rola: 'Odczyt dokumentów', rolaWyroznienie: '/ n8n',
      przyklady: { tytul: 'Przykłady', pozycje: [{ sektor: 'Biuro', tytul: 'Przykład', tekst: 'Opis przykładu.', liczba: 'setki', liczbaOpis: 'wniosków', stos: ['n8n'], link: { tekst: 'zobacz opis wdrożenia', adres: '/wpisy/x/' } }] } });
    const kolejnosc = ['# Automatyzacja', 'Odczyt dokumentów / n8n', 'Lead usługi.', 'setki wniosków', 'Biuro', '### Przykład', 'Opis przykładu.', 'n8n', '[zobacz'];
    const poz = kolejnosc.map((k) => t.indexOf(k));
    expect(poz.every((p) => p >= 0)).toBe(true);
  });
});

describe('okienka', () => {
  const w = okienka({ rodzaj: 'wpisy', adres: 'automatyzacja-faktur', plik: WPIS, fraza: 'automatyzacja faktur', dodatkowe: ['odczyt faktur', 'n8n'] });
  it('każde okienko podpisane nazwą z formularza i w osobnym bloku', () => {
    for (const n of ['Tytuł strony', 'Opis w Google', 'Adres strony', 'Fraza główna', 'Frazy dodatkowe', 'Tekst']) expect(w).toContain(`„${n}”`);
    expect(w).toContain('```\nAutomatyzacja faktur w małej firmie | Robert Dębicki\n```');
    expect(w).toContain('```\nhttps://robert-debicki.pl/wpisy/automatyzacja-faktur/\n```');
    expect(w).toContain('```\nodczyt faktur, n8n\n```');
    expect(w).toContain('```markdown\n# Automatyzacja faktur w małej firmie');
  });
  it('cel 100 punktów', () => expect(w).toContain('100 punktów'));
  it('usługa: adres /uslugi/ i tytuł z pola tytulSeo', () => {
    const u = okienka({ rodzaj: 'uslugi', adres: 'automatyzacja-faktur', dane: USLUGA, fraza: 'automatyzacja faktur', dodatkowe: ['odczyt faktur'] });
    expect(u).toContain('```\nhttps://robert-debicki.pl/uslugi/automatyzacja-faktur/\n```');
    expect(u).toContain('```\nAutomatyzacja faktur | Robert Dębicki\n```');
  });
});
