import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const KORZEN = join(import.meta.dirname, '../../src/content');
const pliki = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? pliki(join(dir, n)) : [join(dir, n)]));

// Link w treści (nie obraz) prowadzący do polskiej strony serwisu.
const LINK_PL = /(?<!!)\[[^\]]*\]\((\/(?:wpisy|uslugi|dla-rekruterow|polityka-prywatnosci|referencje)\/[^)\s]*)\)/g;

describe('linki w angielskich tekstach', () => {
  it('żaden en.md nie prowadzi do polskiej strony serwisu', () => {
    const bledy = pliki(KORZEN)
      .filter((f) => f.endsWith('/en.md'))
      .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(LINK_PL)].map((m) => `${f.replace(KORZEN, 'src/content')}: ${m[1]}`));
    expect(bledy).toEqual([]);
  });
});
