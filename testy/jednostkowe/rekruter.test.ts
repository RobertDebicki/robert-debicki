import { describe, expect, it, afterAll } from 'vitest';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { ustawienia } from '../../src/lib/schematy';
import { rozdziel } from '../../src/lib/frontmatter';
import { zbudujPary, wczytajFiksture } from '../../src/lib/tresc';
import { wybierzPozycje } from '../../src/lib/rekruter';

const F = join(import.meta.dirname, '../fikstury/jezyki');
const dane = (sciezka: string) => rozdziel(readFileSync(join(F, sciezka), 'utf8')).dane as Record<string, any>;
const wzor = () => structuredClone(dane('ustawienia/pl.md'));
const zCv = (cvUrl: string) => {
  const u = wzor();
  u.rekruter.cvUrl = cvUrl;
  return ustawienia.safeParse(u);
};
const KOMUNIKAT_CV = 'Pole cvUrl musi wskazywać na plik CV na robert-debicki.pl albo w magazynie R2 (CV nie trafia do repozytorium).';

describe('schemat ustawienia.rekruter', () => {
  it('przyjmuje fiksturę PL (z cvUrl) i EN (bez cvUrl)', () => {
    expect(ustawienia.safeParse(wzor()).success).toBe(true);
    expect(dane('ustawienia/en.md').rekruter.cvUrl).toBeUndefined();
    expect(ustawienia.safeParse(dane('ustawienia/en.md')).success).toBe(true);
  });

  it('bez bloku rekruter ustawienia nadal przechodzą (podstrona po prostu nie powstaje)', () => {
    const u = wzor();
    delete u.rekruter;
    expect(ustawienia.safeParse(u).success).toBe(true);
  });

  it('cvUrl przez http albo na obcym hoście odrzucony z komunikatem po polsku', () => {
    for (const adres of ['http://robert-debicki.pl/cv/cv.pdf', 'https://example.com/cv.pdf', 'https://robert-debicki.pl.example.com/cv.pdf', 'https://zlyrobert-debicki.pl/cv.pdf', 'https://robert-debicki.pl@evil.com/cv.pdf']) {
      const r = zCv(adres);
      expect(r.success, adres).toBe(false);
      expect(r.error!.issues.map((i) => i.message).join('\n'), adres).toContain(KOMUNIKAT_CV);
    }
  });

  it('cvUrl na robert-debicki.pl albo w R2 przyjęty', () => {
    for (const adres of ['https://robert-debicki.pl/cv/Robert-Debicki-CV.pdf', 'https://pub-abc.r2.dev/cv.pdf', 'https://konto.r2.cloudflarestorage.com/cv.pdf']) {
      expect(zCv(adres).success, adres).toBe(true);
    }
  });

  it('najwyżej trzy wdrożenia i trzy projekty', () => {
    const u = wzor();
    u.rekruter.wdrozenia = ['a', 'b', 'c', 'd'];
    expect(ustawienia.safeParse(u).success).toBe(false);
    const p = wzor();
    p.rekruter.projekty = ['a', 'b', 'c', 'd'];
    expect(ustawienia.safeParse(p).success).toBe(false);
  });

  it('tytulSeo najwyżej 60 znaków i opis od 120 do 155, jak na stronach usług', () => {
    const t = wzor();
    t.rekruter.tytulSeo = 'a'.repeat(61);
    expect(ustawienia.safeParse(t).success).toBe(false);
    for (const [dl, ok] of [[119, false], [120, true], [155, true], [156, false]] as const) {
      const o = wzor();
      o.rekruter.opis = 'a'.repeat(dl);
      expect(ustawienia.safeParse(o).success, `opis ${dl}`).toBe(ok);
    }
  });
});

describe('wybierzPozycje', () => {
  const pary = ['oba', 'tylko-pl'].map((a) => zbudujPary(wczytajFiksture(join(F, 'wdrozenia', a), a))[0]);
  const wpisy = pary.flatMap((p) => [p.pl, p.en].filter((w) => w !== undefined).map((w) => ({ id: `${p.adres}/${w.jezyk}`, data: w.data })));

  it('zwraca dane pozycji w kolejności z ustawień', () => {
    expect(wybierzPozycje(pary, wpisy, ['tylko-pl', 'oba'], 'pl', 'wdrożenia').map((d) => d.tytul)).toEqual(['Wdrożenie tylko po polsku', 'Wdrożenie z tłumaczeniem']);
  });

  it('w EN pomija pozycję bez en.md (jak sekcje na stronie głównej)', () => {
    expect(wybierzPozycje(pary, wpisy, ['tylko-pl', 'oba'], 'en', 'wdrożenia')).toHaveLength(1);
  });

  it('nieistniejący folder zatrzymuje build z komunikatem', () => {
    expect(() => wybierzPozycje(pary, wpisy, ['nie-ma'], 'pl', 'wdrożenia')).toThrow('Podstrona rekrutera: nie ma wdrożenia "nie-ma".');
    expect(() => wybierzPozycje(pary, wpisy, ['nie-ma'], 'pl', 'projekty')).toThrow('Podstrona rekrutera: nie ma projektu "nie-ma".');
  });
});

describe('hosting: CV bez indeksowania', () => {
  // SetEnvIf zamiast <If>: <If> wymaga Apache 2.4, a błąd składni w .htaccess daje 500 na całej stronie.
  it('pliki pod /cv/ dostają nagłówek X-Robots-Tag: noindex (SetEnvIf + mod_headers, bez <If>)', () => {
    const h = readFileSync(resolve('hosting/htaccess'), 'utf8');
    expect(h).toMatch(/SetEnvIf Request_URI "\^\/cv\/" CV_NOINDEX/);
    expect(h).toMatch(/Header always set X-Robots-Tag "noindex, nofollow" env=CV_NOINDEX/);
    expect(h).not.toMatch(/<If /);
  });
});

const katalog = mkdtempSync(join(tmpdir(), 'build-rekruter-'));
afterAll(() => rmSync(katalog, { recursive: true, force: true }));

// Dowodzi, że literówka w nazwie folderu zatrzymuje cały build (a nie tylko gubi kartę na podstronie).
it('build z wdrozenia: ["nie-ma"] w ustawieniach kończy się błędem z nazwą folderu', () => {
  const baza = join(katalog, 'tresc');
  cpSync(resolve('testy/fikstury/jezyki'), baza, { recursive: true });
  const plik = join(baza, 'ustawienia/pl.md');
  const tekst = readFileSync(plik, 'utf8');
  const zmieniony = tekst.replace(/(rekruter:[\s\S]*?\n  wdrozenia:\n)(    - "[^"]+"\n)+/, '$1    - "nie-ma"\n');
  expect(zmieniony).not.toBe(tekst);
  writeFileSync(plik, zmieniony);
  const w = spawnSync('npm', ['run', 'build'], { encoding: 'utf8', env: { ...process.env, TRESC_BAZA: baza, WYJSCIE: join(katalog, 'dist') } });
  expect(w.status).not.toBe(0);
  expect(`${w.stdout}\n${w.stderr}`).toContain('Podstrona rekrutera: nie ma wdrożenia "nie-ma".');
}, 180_000);
