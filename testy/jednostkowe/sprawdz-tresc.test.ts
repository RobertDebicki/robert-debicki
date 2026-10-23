import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterAll, describe, expect, it } from 'vitest';
import { znajdzZakazane } from '../../skrypty/sprawdz-tresc';

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
  it('fikstura z pauzą, NDA, Bubble i #c3f53c daje 4 trafienia z plikiem i wierszem', () => {
    const k = repo({
      'src/content/wdrozenia/a/pl.md': 'Linia pierwsza\nZbudowałem coś — szybko\nPodpisane NDA\nPlatforma Bubble\n',
      'src/styles/x.css': 'a { color: #c3f53c; }\n',
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
      'AGENTS.md': 'Zakazane: NDA, Bubble — pauza\n',
      'docs/plan.md': 'no-code\n',
      'testy/fikstury/x/pl.md': 'Webflow\n',
      'src/content/a/pl.md': 'czysto\n',
    });
    expect(znajdzZakazane(k)).toEqual([]);
  });

  it('treść startowa repozytorium nie ma trafień', () => {
    expect(znajdzZakazane(resolve('.'))).toEqual([]);
  });
});

describe('skrypt sprawdz-tresc', () => {
  const uruchom = (k: string) => spawnSync('npx', ['tsx', resolve('skrypty/sprawdz-tresc.ts'), k], { encoding: 'utf8' });

  it('kończy się błędem z plikiem, wierszem i nazwą wzorca po polsku', () => {
    const w = uruchom(repo({ 'src/a.md': 'ok\nPlatforma Bubble\n' }));
    expect(w.status).toBe(1);
    expect(w.stderr).toContain('src/a.md:2');
    expect(w.stderr).toContain('Bubble');
  });

  it('kończy się sukcesem bez trafień', () => {
    expect(uruchom(repo({ 'src/a.md': 'ok\n' })).status).toBe(0);
  });
}, 60_000);
