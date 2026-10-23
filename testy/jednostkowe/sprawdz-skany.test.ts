import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterAll, describe, expect, it } from 'vitest';
import { znajdzSkany } from '../../skrypty/sprawdz-skany';

const katalogi: string[] = [];
function repo(pliki: string[]): string {
  const k = mkdtempSync(join(tmpdir(), 'skany-'));
  katalogi.push(k);
  for (const p of pliki) {
    mkdirSync(join(k, p, '..'), { recursive: true });
    writeFileSync(join(k, p), 'x');
  }
  return k;
}
afterAll(() => katalogi.forEach((k) => rmSync(k, { recursive: true, force: true })));

describe('znajdzSkany', () => {
  it('zgłasza public/skan-referencji.jpg', () => {
    expect(znajdzSkany(repo(['public/skan-referencji.jpg']))).toEqual(['public/skan-referencji.jpg']);
  });

  it('zgłasza każdy obraz i PDF w src/content/referencje, także o nieoczywistej nazwie', () => {
    const k = repo(['src/content/referencje/a/foto.png', 'src/content/referencje/a/pl.md', 'src/content/referencje/b/list.pdf']);
    expect(znajdzSkany(k).sort()).toEqual(['src/content/referencje/a/foto.png', 'src/content/referencje/b/list.pdf']);
  });

  it('w public zgłasza tylko pliki z "referenc" lub "skan" w nazwie, każde z czterech rozszerzeń i PDF', () => {
    const k = repo([
      'public/Referencja-1.PNG',
      'public/skan.webp',
      'public/podpis/skan-2.jpeg',
      'public/list-referencyjny.pdf',
      'public/logo.png',
      'public/favicon.svg',
    ]);
    expect(znajdzSkany(k).sort()).toEqual(['public/Referencja-1.PNG', 'public/list-referencyjny.pdf', 'public/podpis/skan-2.jpeg', 'public/skan.webp']);
  });

  it('nie zgłasza plików, które nie są obrazami ani PDF (fikstury tekstowe)', () => {
    const k = repo(['public/skan-referencji.md', 'public/referencje.txt', 'src/content/referencje/a/pl.md']);
    expect(znajdzSkany(k)).toEqual([]);
  });

  it('ignoruje node_modules, dist*, .git i .astro', () => {
    const k = repo(['public/node_modules/skan.jpg', 'public/dist-fikstury/skan.jpg', 'public/dist/skan.jpg', 'public/.git/skan.jpg', 'public/.astro/skan.jpg']);
    expect(znajdzSkany(k)).toEqual([]);
  });
});

describe('skrypt sprawdz-skany', () => {
  const uruchom = (k: string) => spawnSync('npx', ['tsx', resolve('skrypty/sprawdz-skany.ts'), k], { encoding: 'utf8' });

  it('kończy się błędem z nazwą pliku, gdy w public leży skan', () => {
    const w = uruchom(repo(['public/skan-referencji.jpg']));
    expect(w.status).toBe(1);
    expect(w.stderr).toContain('public/skan-referencji.jpg');
  });

  it('kończy się sukcesem bez skanów', () => {
    expect(uruchom(repo(['public/logo.png'])).status).toBe(0);
  });
}, 60_000);

describe('pełna ścieżka w public', () => {
  it('zgłasza public/referencje/photo.jpg (katalog z "referenc", nazwa pliku neutralna)', () => {
    expect(znajdzSkany(repo(['public/referencje/photo.jpg']))).toEqual(['public/referencje/photo.jpg']);
  });
  it('zgłasza public/skany/a.pdf, ale nie public/img/photo.jpg', () => {
    expect(znajdzSkany(repo(['public/skany/a.pdf', 'public/img/photo.jpg']))).toEqual(['public/skany/a.pdf']);
  });
});
