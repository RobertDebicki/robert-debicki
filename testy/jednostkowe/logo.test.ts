import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const KORZEN = resolve(__dirname, '../..');
const czytaj = (p: string) => readFileSync(join(KORZEN, p), 'utf8');

function plikiRekurencyjnie(katalog: string): string[] {
  return readdirSync(katalog).flatMap((n) => {
    const p = join(katalog, n);
    return statSync(p).isDirectory() ? plikiRekurencyjnie(p) : [p];
  });
}

describe('pliki logo', () => {
  for (const plik of ['src/assets/logo/znak.svg', 'src/assets/logo/logo-pelne.svg', 'docs/logo/znak.svg', 'docs/logo/logo-pelne.svg']) {
    it(`${plik}: czysty SVG z currentColor i pomarańczem logo`, () => {
      const svg = czytaj(plik);
      expect(svg).toMatch(/^<svg [^>]*viewBox="[\d. -]+"/);
      expect(svg).toContain('fill="currentColor"');
      expect(svg).toMatch(/class="logo-pomarancz"[^>]*fill="#EF7F1A"|fill="#EF7F1A"[^>]*class="logo-pomarancz"/);
      expect(svg).not.toMatch(/<text|<font|<glyph|Corel|metadata|<!DOCTYPE|<\?xml/i);
    });
  }

  it('logo pełne zawiera napis jako ścieżki (więcej niż sam znak)', () => {
    const pelne = czytaj('src/assets/logo/logo-pelne.svg');
    const znak = czytaj('src/assets/logo/znak.svg');
    expect(pelne.length).toBeGreaterThan(znak.length * 3);
    expect(pelne).toContain('class="logo-napis"');
  });

  it('pliki w docs/logo są kopiami plików z src/assets/logo', () => {
    expect(czytaj('docs/logo/znak.svg')).toBe(czytaj('src/assets/logo/znak.svg'));
    expect(czytaj('docs/logo/logo-pelne.svg')).toBe(czytaj('src/assets/logo/logo-pelne.svg'));
  });

  it('favicon SVG ma tryb ciemny i pomarańcz logo', () => {
    const svg = czytaj('public/favicon.svg');
    expect(svg).toContain('#EF7F1A');
    expect(svg).toContain('prefers-color-scheme: dark');
  });
});

describe('paleta', () => {
  it('w src/ nie ma starego pomarańczu #ff5a1f ani #ff6a33', () => {
    const trafienia = plikiRekurencyjnie(join(KORZEN, 'src'))
      .filter((p) => /\.(astro|css|ts|mjs|js|svg|md|ya?ml|json)$/.test(p))
      .filter((p) => /#ff5a1f|%23ff5a1f|#ff6a33/i.test(readFileSync(p, 'utf8')));
    expect(trafienia).toEqual([]);
  });

  it('token --c to #EF7F1A', () => {
    expect(czytaj('src/styles/tokeny.css')).toMatch(/--c: #EF7F1A;/i);
  });
});
