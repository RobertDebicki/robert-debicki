import { readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';

// Serwer testów (skrypty/serwery-e2e.mjs) buduje najpierw zwykły dist/, potem build z fiksturami do dist-fikstury/.
// Porównanie po zawartości: Astro kopiuje oryginał bajt w bajt (nazwa dostaje skrót), a pod dist/ nie może być żadnej kopii.
const skrot = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex');
const pliki = (k: string): string[] =>
  readdirSync(k, { withFileTypes: true }).flatMap((w) => (w.isDirectory() ? pliki(join(k, w.name)) : [join(k, w.name)]));
const obrazyFikstur = pliki('testy/fikstury').filter((p) => /\.(jpe?g|png|webp|avif)$/i.test(p));

test('build produkcyjny (dist/) nie zawiera zdjęć z testy/fikstury/', () => {
  expect(obrazyFikstur.length).toBeGreaterThan(0);
  const zFikstur = new Set(obrazyFikstur.map(skrot));
  expect(pliki('dist').filter((p) => zFikstur.has(skrot(p)))).toEqual([]);
});

test('build z fiksturami (dist-fikstury/) nadal ma zdjęcie wpisu z fikstur (wersje WebP z nazwą pliku)', () => {
  const nazwy = obrazyFikstur.map((p) => p.split('/').pop()!.replace(/\.[^.]+$/, ''));
  expect(readdirSync('dist-fikstury/_astro').some((p) => nazwy.some((n) => p.startsWith(`${n}.`)))).toBe(true);
});
