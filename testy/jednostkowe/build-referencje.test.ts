import { mkdtempSync, mkdirSync, copyFileSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterAll, expect, it } from 'vitest';

const katalog = mkdtempSync(join(tmpdir(), 'build-ref-'));
afterAll(() => rmSync(katalog, { recursive: true, force: true }));

// Dowodzi, że referencja bez zgoda: true zatrzymuje cały build (nie tylko walidację pojedynczego pliku).
it('build z referencją bez zgoda: true kończy się błędem po polsku z nazwą pliku i polem zgoda', () => {
  const baza = join(katalog, 'tresc');
  cpSync(resolve('src/content'), baza, { recursive: true });
  mkdirSync(join(baza, 'referencje/bez-zgody'), { recursive: true });
  copyFileSync(resolve('testy/fikstury/tresc/bledne/referencja-bez-zgody.md'), join(baza, 'referencje/bez-zgody/pl.md'));
  const w = spawnSync('npm', ['run', 'build'], {
    encoding: 'utf8',
    env: { ...process.env, TRESC_BAZA: baza, WYJSCIE: join(katalog, 'dist') },
  });
  const wyjscie = `${w.stdout}\n${w.stderr}`;
  expect(w.status).not.toBe(0);
  expect(wyjscie).toContain('bez-zgody/pl.md');
  expect(wyjscie).toContain('zgoda');
  expect(wyjscie).toContain('Bez zgody osoby referencja nie może zostać opublikowana');
}, 180_000);
