import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterAll, describe, expect, it } from 'vitest';
import { KLIENCI, klienciWLinii, skrotRdzenia, znajdzNazwyKlientow, znajdzZakazane, type Klient } from '../../skrypty/sprawdz-tresc';

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
  it('fikstura z pauzą, wzorzec, wzorzec i #wzorzec daje 4 trafienia z plikiem i wierszem', () => {
    const k = repo({
      'src/content/wdrozenia/a/pl.md': 'Linia pierwsza\nZbudowałem coś — szybko\nPodpisane wzorzec\nPlatforma wzorzec\n',
      'src/styles/x.css': 'a { color: #wzorzec; }\n',
    });
    const t = znajdzZakazane(k);
    expect(t).toHaveLength(4);
    expect(t.map((x) => `${x.plik}:${x.wiersz}`).sort()).toEqual([
      'src/content/wdrozenia/a/pl.md:2',
      'src/content/wdrozenia/a/pl.md:3',
      'src/content/wdrozenia/a/pl.md:4',
      'src/styles/x.css:1',
    ]);
  });

  it('nie skanuje AGENTS.md, docs/ ani testy/ (tam zakazane słowa występują celowo)', () => {
    const k = repo({
      'AGENTS.md': 'Zakazane: wzorzec, wzorzec — pauza\n',
      'docs/plan.md': 'wzorzec\n',
      'testy/fikstury/x/pl.md': 'wzorzec\n',
      'src/content/a/pl.md': 'czysto\n',
    });
    expect(znajdzZakazane(k)).toEqual([]);
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
  });
});

describe('skrypt sprawdz-tresc', () => {
  const uruchom = (k: string) => spawnSync('npx', ['tsx', resolve('skrypty/sprawdz-tresc.ts'), k], { encoding: 'utf8' });

  it('kończy się błędem z plikiem, wierszem i nazwą wzorca po polsku', () => {
    const w = uruchom(repo({ 'src/a.md': 'ok\nPlatforma wzorzec\n' }));
    expect(w.status).toBe(1);
    expect(w.stderr).toContain('src/a.md:2');
    expect(w.stderr).toContain('wzorzec');
  });

  it('--skrot wypisuje wpis do listy KLIENCI', () => {
    const w = spawnSync('npx', ['tsx', resolve('skrypty/sprawdz-tresc.ts'), '--skrot', 'Kowalex'], { encoding: 'utf8' });
    expect(w.stdout.trim()).toBe(`{ skrot: '${skrotRdzenia('kowalex')}', dlugosc: 7 }`);
  });

  it('kończy się sukcesem bez trafień', () => {
    expect(uruchom(repo({ 'src/a.md': 'ok\n' })).status).toBe(0);
  });
}, 60_000);
