// Lighthouse mobile dla `/` (prawdziwa treść) i `/en/` (build z fiksturami, bo /en/ na prawdziwej treści dojdzie w zadaniu 10).
// Budujemy z PUBLIC_INDEKSUJ=true: strona ma noindex do akceptacji, a SEO ma być mierzone tak, jak po publikacji.
// Podsumowanie wyników trafia do docs/lighthouse/.
import { spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const uruchom = (cmd, args, env = {}) => {
  const w = spawnSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...env } });
  return w.status ?? 1;
};
const KATEGORIE = ['performance', 'accessibility', 'best-practices', 'seo'];
rmSync('.lighthouseci', { recursive: true, force: true });

const przebiegi = [
  { nazwa: '/', konfig: 'lighthouserc.json', katalog: 'pl', env: { PUBLIC_INDEKSUJ: 'true', WYJSCIE: './dist-lighthouse' } },
  { nazwa: '/en/ (fikstury)', konfig: 'lighthouserc-en.json', katalog: 'en', env: { PUBLIC_INDEKSUJ: 'true', WYJSCIE: './dist-lighthouse-en', TRESC_BAZA: './testy/fikstury/jezyki' } },
];

let blad = 0;
const wiersze = [];
for (const p of przebiegi) {
  if (uruchom('npm', ['run', 'build'], p.env) !== 0) process.exit(1);
  blad = uruchom('npx', ['lhci', 'autorun', `--config=${p.konfig}`]) || blad;
  const dir = `.lighthouseci/${p.katalog}`;
  let pliki = [];
  try { pliki = readdirSync(dir); } catch { /* brak raportów: wynik poniżej pokaże brak przebiegów */ }
  const lhr = pliki.filter((f) => /\.report\.json$/.test(f)).map((f) => JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')));
  if (!lhr.length) { blad = 1; wiersze.push(`| ${p.nazwa} | 0 | brak | brak | brak | brak |`); continue; }
  const mediana = (k) => {
    const w = lhr.map((r) => r.categories[k].score).sort((a, b) => a - b);
    return w[Math.floor(w.length / 2)];
  };
  wiersze.push(`| ${p.nazwa} | ${lhr.length} | ${KATEGORIE.map((k) => Math.round(mediana(k) * 100)).join(' | ')} |`);
}

const data = new Date().toISOString().slice(0, 10);
mkdirSync('docs/lighthouse', { recursive: true });
writeFileSync(
  `docs/lighthouse/${data}.md`,
  `# Lighthouse mobile, ${data}\n\n` +
    'Mediana z trzech przebiegów, profil mobilny (domyślny dla Lighthouse CI), próg 95 w każdej kategorii.\n' +
    'Build z `PUBLIC_INDEKSUJ=true`: do akceptacji strona ma `noindex`, który obniżyłby wynik SEO, więc mierzymy stan po publikacji.\n' +
    '`/en/` mierzony na buildzie z fiksturami (`testy/fikstury/jezyki`), bo angielska treść prawdziwa powstaje w zadaniu 10.\n\n' +
    `| Strona | Przebiegi | Wydajność | Dostępność | Dobre praktyki | SEO |\n|---|---|---|---|---|---|\n${wiersze.join('\n')}\n`,
);
console.log(wiersze.join('\n'));
process.exit(blad);
