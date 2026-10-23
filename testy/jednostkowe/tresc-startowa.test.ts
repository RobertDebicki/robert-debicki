import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { rozdziel } from '../../src/lib/frontmatter';
import { walidujPlik } from '../../src/lib/waliduj';
import { ustawienia } from '../../src/lib/schematy';
import { ZAKAZANE } from '../../skrypty/sprawdz-tresc';

const TRESC = join(import.meta.dirname, '../../src/content');

/** Frontmatter wszystkich pl.md kolekcji, posortowany polem kolejnosc. */
function pozycjePl(kolekcja: 'wdrozenia' | 'projekty') {
  const baza = join(TRESC, kolekcja);
  return readdirSync(baza)
    .filter((f) => existsSync(join(baza, f, 'pl.md')))
    .map((f) => ({ folder: f, plik: join(baza, f, 'pl.md'), dane: rozdziel(readFileSync(join(baza, f, 'pl.md'), 'utf8')).dane as Record<string, any> }))
    .sort((a, b) => a.dane.kolejnosc - b.dane.kolejnosc);
}

function wszystkiePliki(katalog: string): string[] {
  return readdirSync(katalog).flatMap((n) => {
    const p = join(katalog, n);
    return statSync(p).isDirectory() ? wszystkiePliki(p) : [p];
  });
}

describe('treść startowa', () => {
  it('sześć wdrożeń z liczbami w kolejności z makiety', () => {
    expect(pozycjePl('wdrozenia').map((p) => p.dane.liczba)).toEqual(['150+', '60 h', '+28', '2 min', 'setki', '1 mies.']);
  });

  it('cztery projekty z pieczątkami w kolejności z makiety', () => {
    expect(pozycjePl('projekty').map((p) => p.dane.etap)).toEqual([
      'Strony działają na produkcji',
      'Działa na produkcji',
      'Demo na serwerze testowym',
      'Przed publikacją',
    ]);
  });

  it('nazwy folderów to małe litery ASCII bez polskich znaków', () => {
    for (const k of ['wdrozenia', 'projekty'] as const) {
      for (const p of pozycjePl(k)) expect(p.folder).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('każdy plik przechodzi schemat swojej kolekcji', () => {
    for (const k of ['wdrozenia', 'projekty'] as const) {
      for (const p of pozycjePl(k)) expect(walidujPlik(p.plik, k)).toEqual([]);
    }
    expect(walidujPlik(join(TRESC, 'ustawienia/pl.md'), 'ustawienia')).toEqual([]);
  });

  it('ustawienia mają trzy zasady pracy', () => {
    const dane = rozdziel(readFileSync(join(TRESC, 'ustawienia/pl.md'), 'utf8')).dane as any;
    expect(dane.doswiadczenie.zasady).toHaveLength(3);
  });

  it('w całej treści nie ma wzorców zakazanych', () => {
    const trafienia: string[] = [];
    for (const plik of wszystkiePliki(TRESC)) {
      const tekst = readFileSync(plik, 'utf8');
      for (const [nazwa, wzor] of ZAKAZANE) if (wzor.test(tekst)) trafienia.push(`${plik}: ${nazwa}`);
    }
    expect(trafienia).toEqual([]);
  });
});

describe('schemat ustawień', () => {
  const poprawne = () => rozdziel(readFileSync(join(TRESC, 'ustawienia/pl.md'), 'utf8')).dane as any;

  it('brak adresu e-mail w kontakcie nie przechodzi, komunikat wskazuje pole', () => {
    const d = poprawne();
    delete d.kontakt.email;
    const r = ustawienia.safeParse(d);
    expect(r.success).toBe(false);
    expect(r.error!.issues.map((i) => i.path.join('.'))).toContain('kontakt.email');
  });

  it('wymaga dokładnie trzech zasad pracy', () => {
    const d = poprawne();
    d.doswiadczenie.zasady.pop();
    expect(ustawienia.safeParse(d).success).toBe(false);
  });

  it('LinkedIn musi być adresem https', () => {
    const d = poprawne();
    d.kontakt.linkedinUrl = 'nie-adres';
    expect(ustawienia.safeParse(d).success).toBe(false);
  });
});
