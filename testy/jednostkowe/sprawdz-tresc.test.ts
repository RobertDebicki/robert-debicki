import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterAll, describe, expect, it } from 'vitest';
import { KLIENCI, WZORCE, klienciWLinii, skrotRdzenia, zakazaneWLinii, znajdzNazwyKlientow, znajdzZakazane, type Klient, type Wzorce } from '../../skrypty/sprawdz-tresc';

const katalogi: string[] = [];
function repo(pliki: Record<string, string>): string {
  const k = mkdtempSync(join(tmpdir(), 'tresc-'));
  katalogi.push(k);
  for (const [p, tekst] of Object.entries(pliki)) {
    mkdirSync(join(k, p, '..'), { recursive: true });
    writeFileSync(join(k, p), tekst);
  }
  return k;
}
afterAll(() => katalogi.forEach((k) => rmSync(k, { recursive: true, force: true })));

describe('znajdzZakazane', () => {
  // Fikcyjne wzorce: prawdziwa lista ma tylko skróty, więc testy nie mogą zawierać jej słów.
  const fikcyjne: Wzorce = {
    slowa: [
      { skrot: skrotRdzenia('qzx'), dlugosc: 3, koncowki: [] },
      { skrot: skrotRdzenia('blorbex'), dlugosc: 7 },
      { skrot: skrotRdzenia('kodwir'), dlugosc: 6, koncowki: ['u', 'owy'] },
    ],
    frazy: [[{ skrot: skrotRdzenia('kowal'), dlugosc: 5, koncowki: ['a', 'e'] }, { skrot: skrotRdzenia('młotkow'), dlugosc: 7 }]],
    kolory: [skrotRdzenia('#123abc'), skrotRdzenia('rgb(1,2,3)')],
  };

  it('fikstura z pauzą, słowem, frazą i kolorem daje trafienia z plikiem i wierszem', () => {
    const k = repo({
      'src/content/wdrozenia/a/pl.md': 'Linia pierwsza\nZbudowałem coś — szybko\nPodpisane QZX\nPlatforma Blorbex.io\nKowale kuźni młotkowej\n',
      'src/styles/x.css': 'a { color: #123ABC; }\nb { color: rgb(1, 2, 3); }\n',
    });
    expect(znajdzZakazane(k, fikcyjne).map((x) => `${x.plik}:${x.wiersz}:${x.nazwa}`).sort()).toEqual([
      'src/content/wdrozenia/a/pl.md:2:pauza (—)',
      'src/content/wdrozenia/a/pl.md:3:wzorzec słowny nr 1',
      'src/content/wdrozenia/a/pl.md:4:wzorzec słowny nr 2',
      'src/content/wdrozenia/a/pl.md:5:fraza nr 1',
      'src/styles/x.css:1:kolor nr 1',
      'src/styles/x.css:2:kolor nr 2',
    ]);
  });

  it('łapie słowo z dywizem i bez, nie łapie innej końcówki ani drugiego słowa frazy bez pierwszego', () => {
    expect(zakazaneWLinii('Kod-wir, kod wiru, kodwirowy', fikcyjne)).toEqual(['wzorzec słowny nr 3']);
    expect(zakazaneWLinii('Kodwirwork, qzxa, transport młotkowy, kowal z daleka, #123abd', fikcyjne)).toEqual([]);
  });

  it('nie skanuje AGENTS.md, docs/ ani testy/', () => {
    const k = repo({
      'AGENTS.md': 'Zakazane: QZX — pauza\n',
      'docs/plan.md': 'blorbex\n',
      'testy/fikstury/x/pl.md': 'blorbex\n',
      'src/content/a/pl.md': 'czysto\n',
    });
    expect(znajdzZakazane(k, fikcyjne)).toEqual([]);
  });

  it('prawdziwa lista to same skróty (16 znaków hex), bez słów', () => {
    for (const k of [...WZORCE.slowa, ...WZORCE.frazy.flat()]) expect(k.skrot).toMatch(/^[0-9a-f]{16}$/);
    for (const k of WZORCE.kolory) expect(k).toMatch(/^[0-9a-f]{16}$/);
  });

  // Tylko lokalnie: ZAKAZANE_PLAIN_TEST zawiera prawdziwe wzorce rozdzielone znakiem |, każdy musi dać trafienie.
  it.skipIf(!process.env.ZAKAZANE_PLAIN_TEST)('prawdziwa lista łapie wzorce podane lokalnie', () => {
    const niezlapane = process.env.ZAKAZANE_PLAIN_TEST!.split('|').filter((t) => zakazaneWLinii(t).length === 0);
    expect(niezlapane).toEqual([]);
  });

  it('prawdziwa lista nie łapie branży klienta ani nazwy byłego pracodawcy', () => {
    expect(zakazaneWLinii('Transport chłodniczy, transportu chłodniczego. Automation Developer, NoCodeWork.')).toEqual([]);
  });

  it('treść startowa repozytorium nie ma trafień', () => {
    expect(znajdzZakazane(resolve('.'))).toEqual([]);
  });
});

describe('znajdzNazwyKlientow', () => {
  // Fikcyjni klienci: lista prawdziwych w repozytorium ma tylko skróty, więc testy nie mogą zawierać nazw.
  const fikcyjni: Klient[] = [
    { skrot: skrotRdzenia('kowalex'), dlugosc: 7, koncowki: ['ie', 'u', 'em'] },
    { skrot: skrotRdzenia('studiodębów'), dlugosc: 11 },
  ];

  it('łapie nazwę z odmianą w docs/ i AGENTS.md, także nazwę z dwóch słów', () => {
    const k = repo({
      'docs/plan.md': 'Panel jak w Kowalexie.\n',
      'AGENTS.md': 'ok\nKlient: Kowalex Meble\nStudio Dębów, sklep\n',
      'src/a.md': 'czysto\n',
    });
    expect(znajdzNazwyKlientow(k, fikcyjni).map((t) => `${t.plik}:${t.wiersz}:${t.nazwa}`).sort()).toEqual([
      'AGENTS.md:2:klient nr 1',
      'AGENTS.md:3:klient nr 2',
      'docs/plan.md:1:klient nr 1',
    ]);
  });

  it('nie łapie słów z tym samym początkiem i inną końcówką', () => {
    expect(klienciWLinii('Kowalexowski, Kowalexik i Kowale.', fikcyjni)).toEqual([]);
  });

  it('lista prawdziwych klientów nie łapie zwykłych słów (prezes, prezentacja, press, sigmoida, kuchnia)', () => {
    expect(klienciWLinii('Prezes, prezentacja, press release, sigmoida, kuchnia, Mariola.')).toEqual([]);
  });

  it('lista prawdziwych klientów to same skróty (16 znaków hex), bez nazw', () => {
    for (const k of KLIENCI) expect(k.skrot).toMatch(/^[0-9a-f]{16}$/);
  });

  it('repozytorium nie ma nazw klientów', () => {
    expect(znajdzNazwyKlientow(resolve('.'))).toEqual([]);
  }, 30_000);
});

describe('skrypt sprawdz-tresc', () => {
  const uruchom = (k: string) => spawnSync('npx', ['tsx', resolve('skrypty/sprawdz-tresc.ts'), k], { encoding: 'utf8' });

  it('kończy się błędem z plikiem, wierszem i nazwą wzorca po polsku', () => {
    const w = uruchom(repo({ 'src/a.md': 'ok\nSzybko — i dobrze\n' }));
    expect(w.status).toBe(1);
    expect(w.stderr).toContain('src/a.md:2');
    expect(w.stderr).toContain('pauza');
  });

  it('--skrot wypisuje wpis do listy KLIENCI', () => {
    const w = spawnSync('npx', ['tsx', resolve('skrypty/sprawdz-tresc.ts'), '--skrot', 'Kowalex'], { encoding: 'utf8' });
    expect(w.stdout.trim()).toBe(`{ skrot: '${skrotRdzenia('kowalex')}', dlugosc: 7 }`);
  });

  it('kończy się sukcesem bez trafień', () => {
    expect(uruchom(repo({ 'src/a.md': 'ok\n' })).status).toBe(0);
  });
}, 60_000);
