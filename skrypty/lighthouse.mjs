// Lighthouse mobile dla `/` i `/en/`, obie na prawdziwej treści (angielska od zadania 10).
// Budujemy z PUBLIC_INDEKSUJ=true: strona ma noindex do akceptacji, a SEO ma być mierzone tak, jak po publikacji.
// Podsumowanie wyników trafia do docs/lighthouse/.
import { spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const uruchom = (cmd, args, env = {}) => {
  const w = spawnSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...env } });
  return w.status ?? 1;
};
const KATEGORIE = ['performance', 'accessibility', 'best-practices', 'seo'];
// GitHub Actions ustawia CI=true. Tam wydajność jest ostrzeżeniem (maszyny współdzielone, wynik ~76-77),
// reszta kategorii nadal blokuje. Lokalnie wszystkie cztery blokują.
const CI = process.env.CI === 'true';
rmSync('.lighthouseci', { recursive: true, force: true });
mkdirSync('.lighthouseci', { recursive: true });

// Konfig z pliku JSON (wartości lokalne), w CI z wydajnością jako `warn`. Zapisywany obok, w .lighthouseci/.
const konfigDlaPrzebiegu = (plik, katalog) => {
  const rc = JSON.parse(readFileSync(plik, 'utf8'));
  if (CI) rc.ci.assert.assertions['categories:performance'][0] = 'warn';
  const wyjscie = `.lighthouseci/konfig-${katalog}.json`;
  writeFileSync(wyjscie, JSON.stringify(rc, null, 2));
  return wyjscie;
};

const przebiegi = [
  { nazwa: '/', konfig: 'lighthouserc.json', katalog: 'pl', env: { PUBLIC_INDEKSUJ: 'true', WYJSCIE: './dist-lighthouse' } },
  { nazwa: '/en/', konfig: 'lighthouserc-en.json', katalog: 'en', env: { PUBLIC_INDEKSUJ: 'true', WYJSCIE: './dist-lighthouse-en' } },
];

let blad = 0;
const wiersze = [];
for (const p of przebiegi) {
  if (uruchom('npm', ['run', 'build'], p.env) !== 0) process.exit(1);
  blad = uruchom('npx', ['lhci', 'autorun', `--config=${konfigDlaPrzebiegu(p.konfig, p.katalog)}`]) || blad;
  const dir = `.lighthouseci/${p.katalog}`;
  let pliki = [];
  try { pliki = readdirSync(dir); } catch { /* brak raportów: wynik poniżej pokaże brak przebiegów */ }
  const lhr = pliki.filter((f) => /\.report\.json$/.test(f)).map((f) => JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')));
  if (!lhr.length) { blad = 1; wiersze.push(`| ${p.nazwa} | 0 | brak | brak | brak | brak |`); continue; }
  const mediana = (k) => {
    const w = lhr.map((r) => r.categories[k].score).sort((a, b) => a - b);
    return w[Math.floor(w.length / 2)];
  };
  const komorka = (k) => {
    const wynik = Math.round(mediana(k) * 100);
    return k === 'performance' && CI && wynik < 95 ? `${wynik} (ostrzeżenie)` : `${wynik}`;
  };
  wiersze.push(`| ${p.nazwa} | ${lhr.length} | ${KATEGORIE.map(komorka).join(' | ')} |`);
}

const data = new Date().toISOString().slice(0, 10);
mkdirSync('docs/lighthouse', { recursive: true });
const tryb = CI
  ? 'Tryb CI: wydajność jest ostrzeżeniem (mierzona i raportowana, nie blokuje), pozostałe kategorie blokują.'
  : 'Tryb lokalny: wszystkie cztery kategorie blokują.';
writeFileSync(
  `docs/lighthouse/${data}.md`,
  `# Lighthouse mobile, ${data}\n\n` +
    'Mediana z trzech przebiegów, profil mobilny (domyślny dla Lighthouse CI), próg 95 w każdej kategorii.\n' +
    'Build z `PUBLIC_INDEKSUJ=true`: do akceptacji strona ma `noindex`, który obniżyłby wynik SEO, więc mierzymy stan po publikacji.\n' +
    '`/en/` mierzony na prawdziwej treści (`src/content/**/en.md`).\n' +
    `${tryb}\n\n` +
    `| Strona | Przebiegi | Wydajność | Dostępność | Dobre praktyki | SEO |\n|---|---|---|---|---|---|\n${wiersze.join('\n')}\n`,
);
console.log(wiersze.join('\n'));
process.exit(blad);
