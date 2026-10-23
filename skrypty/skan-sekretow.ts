import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Trafienie = { plik: string; wiersz: number; wzor: string };

const POMIJANE = new Set(['node_modules', '.git', 'dist', '.astro']);

// Wzorce zapisane tak, żeby ten plik sam ich nie wykrywał.
const WZORCE: { nazwa: string; regex: RegExp }[] = [
  { nazwa: 'token GitHub (ghp_)', regex: /ghp_[A-Za-z0-9]{36}/ },
  { nazwa: 'token GitHub (github_pat_)', regex: /github_pat_[A-Za-z0-9_]{22,}/ },
  { nazwa: 'klucz Cloudflare', regex: /CLOUDFLARE_API_TOKEN=[A-Za-z0-9_-]{40}/ },
  { nazwa: 'klucz prywatny', regex: /-{5}BEGIN [A-Z ]*PRIVATE KEY/ },
  { nazwa: 'klucz Anthropic', regex: /sk-ant-[A-Za-z0-9_-]{20,}/ },
  { nazwa: 'klucz AWS', regex: /AKIA[0-9A-Z]{16}/ },
];

function zbierzPliki(sciezka: string, wynik: string[]): void {
  const stan = statSync(sciezka);
  if (stan.isDirectory()) {
    for (const wpis of readdirSync(sciezka)) {
      if (POMIJANE.has(wpis)) continue;
      zbierzPliki(join(sciezka, wpis), wynik);
    }
  } else if (stan.isFile()) {
    wynik.push(sciezka);
  }
}

export function skanujSekrety(sciezki: string[]): Trafienie[] {
  const pliki: string[] = [];
  for (const s of sciezki) zbierzPliki(s, pliki);

  const trafienia: Trafienie[] = [];
  for (const plik of pliki) {
    const bufor = readFileSync(plik);
    if (bufor.includes(0)) continue; // plik binarny
    bufor
      .toString('utf8')
      .split('\n')
      .forEach((tresc, i) => {
        for (const { nazwa, regex } of WZORCE) {
          if (regex.test(tresc)) trafienia.push({ plik, wiersz: i + 1, wzor: nazwa });
        }
      });
  }
  return trafienia;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cele = process.argv.slice(2);
  const trafienia = skanujSekrety(cele.length ? cele : ['.']);
  for (const t of trafienia) console.error(`${t.plik}:${t.wiersz}: ${t.wzor}`);
  console.log(`Trafień: ${trafienia.length}`);
  process.exit(trafienia.length ? 1 : 0);
}
