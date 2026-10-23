import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { skanujSekrety } from '../../skrypty/skan-sekretow';

const katalog = mkdtempSync(join(tmpdir(), 'skan-'));
afterAll(() => rmSync(katalog, { recursive: true, force: true }));

describe('skanujSekrety', () => {
  it('wykrywa klucz Cloudflare i token GitHub', () => {
    // Tokeny składane w czasie testu, żeby w repo nie leżał żaden literał podobny do sekretu.
    const tokenGitHub = 'gh' + 'p_' + 'a'.repeat(36);
    const tokenCloudflare = 'CLOUDFLARE_API' + '_TOKEN=' + 'b'.repeat(40);
    const plik = join(katalog, 'sekrety.txt');
    writeFileSync(plik, `pierwszy ${tokenGitHub}\n${tokenCloudflare}\nzwykły wiersz\n`);

    const trafienia = skanujSekrety([plik]);

    expect(trafienia).toHaveLength(2);
    expect(trafienia.map((t) => t.wiersz)).toEqual([1, 2]);
    expect(trafienia.every((t) => t.plik === plik)).toBe(true);
  });

  it('pomija node_modules, .git, dist i .astro', () => {
    for (const nazwa of ['node_modules', '.git', 'dist', '.astro']) {
      mkdirSync(join(katalog, 'pomijane', nazwa), { recursive: true });
      writeFileSync(join(katalog, 'pomijane', nazwa, 'x.txt'), 'AK' + 'IA' + 'A'.repeat(16));
    }
    expect(skanujSekrety([join(katalog, 'pomijane')])).toHaveLength(0);
  });

  it('makieta nie zawiera sekretów', () => {
    const makieta = resolve(__dirname, '../../docs/makieta/index.html');
    expect(skanujSekrety([makieta])).toHaveLength(0);
  });
});
