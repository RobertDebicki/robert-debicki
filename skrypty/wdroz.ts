// Wdrożenie strony na hosting home.pl przez FTPS (curl). Uruchamiane lokalnie, hasło leży poza repozytorium.
//   npm run wdroz -- --lista [/sciezka]   tylko wypisuje zawartość katalogu na serwerze
//   npm run wdroz -- --na-sucho           pokazuje, co zostałoby wgrane (bez połączenia)
//   npm run wdroz -- --wgraj              kontrole, build, kopia zapasowa serwera, wgranie, odbiór
//   dodatkowo --indeksuj                  pozwala na build z PUBLIC_INDEKSUJ=true (zdjęcie noindex, tylko na decyzję Roberta)
// Skrypt niczego nie usuwa na serwerze i nie wychodzi poza katalog KATALOG z konfiguracji.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Konfiguracja = { host: string; user: string; password: string; katalog: string };
export type WpisListingu = { nazwa: string; katalog: boolean };
export type Transfer = { adres: string; opcje: string[] };

const ADRES_STRONY = 'https://robert-debicki.pl/';

// Pliki, które Cloudflare czyta z dist/, a Apache na home.pl nie rozumie, oraz .htaccess z dist/ (wgrywamy własny, hosting/htaccess).
const NIE_WGRYWAC = new Set(['_headers', '_redirects', '.htaccess']);

export function wczytajKonfiguracje(tekst: string): Konfiguracja {
  const pola: Record<string, string> = {};
  for (const wiersz of tekst.split(/\r?\n/)) {
    if (!wiersz.trim() || wiersz.trim().startsWith('#')) continue;
    const i = wiersz.indexOf('=');
    if (i > 0) pola[wiersz.slice(0, i).trim()] = wiersz.slice(i + 1);
  }
  for (const klucz of ['HOST', 'USER', 'PASSWORD']) {
    if (!pola[klucz]) throw new Error(`Brak pola ${klucz} w pliku konfiguracji.`);
  }
  const katalog = (pola.KATALOG ?? '/').trim().replace(/\/+$/, '') || '/';
  if (!katalog.startsWith('/') || katalog.split('/').includes('..')) {
    throw new Error(`KATALOG musi zaczynać się od / i nie może zawierać "..": ${katalog}`);
  }
  return { host: pola.HOST.trim(), user: pola.USER.trim(), password: pola.PASSWORD, katalog };
}

export function plikiDoWgrania(pliki: string[]): string[] {
  const wybrane = pliki.filter((p) => !NIE_WGRYWAC.has(p));
  // Strony HTML na końcu: żadna nie wskazuje na plik, którego jeszcze nie ma na serwerze.
  return [...wybrane.filter((p) => !p.endsWith('.html')), ...wybrane.filter((p) => p.endsWith('.html'))];
}

// Wiersz, którego nie rozpoznamy, przerywa pracę: pominięty po cichu wiersz oznaczałby "serwer pusty" i brak kopii zapasowej.
export function parsujListing(tekst: string): WpisListingu[] {
  const wynik: WpisListingu[] = [];
  const nierozpoznane: string[] = [];
  const wzor = /^([d-])[rwxsStT-]{9}[+.@]?\s+\d+\s+\S+\s+\S+\s+\d+\s+\w{3}\s+\d{1,2}\s+(?:\d{2}:\d{2}|\d{4})\s+(.+?)\r?$/;
  for (const wiersz of tekst.split('\n')) {
    if (!wiersz.trim() || /^total\s/.test(wiersz)) continue;
    const m = wzor.exec(wiersz);
    if (!m) { nierozpoznane.push(wiersz.trim()); continue; }
    if (m[2] === '.' || m[2] === '..') continue;
    wynik.push({ nazwa: m[2], katalog: m[1] === 'd' });
  }
  if (nierozpoznane.length) throw new Error(`Listing serwera ma wiersze w nieznanym formacie (np. "${nierozpoznane[0]}"). Przerywam, żeby nie pominąć plików.`);
  return wynik;
}

export function cytujDlaCurl(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export function adresPliku(host: string, katalog: string, wzgledna: string): string {
  const segmenty = [...katalog.split('/'), ...wzgledna.split('/')].filter(Boolean).map(encodeURIComponent);
  return `ftp://${host}/${segmenty.join('/')}`;
}

// Jeden proces curl na wiele transferów (jedna sesja zamiast setek logowań). Hasło tylko w konfiguracji podanej przez stdin.
export function konfiguracjaTransferow(k: Konfiguracja, transfery: Transfer[]): string {
  return transfery
    .map((t) =>
      [
        `user = "${cytujDlaCurl(`${k.user}:${k.password}`)}"`,
        `url = "${cytujDlaCurl(t.adres)}"`,
        'ssl-reqd',
        'write-out = "%{exitcode} %{url}\\n"',
        ...t.opcje,
      ].join('\n'),
    )
    .join('\nnext\n');
}

// --- część uruchamiana ręcznie (wymaga serwera, więc bez testów jednostkowych) ---

const KORZEN = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function sciezkaKonfiguracji(): string {
  return process.env.WDROZ_KONFIG ?? join(homedir(), '.config', 'robert-debicki-ftp');
}

function wczytajZPliku(): Konfiguracja {
  const sciezka = sciezkaKonfiguracji();
  if (!existsSync(sciezka)) throw new Error(`Brak pliku konfiguracji ${sciezka}. Utwórz go wg instrukcji (hasło tylko tam).`);
  if ((statSync(sciezka).mode & 0o077) !== 0) throw new Error(`Plik ${sciezka} ma zbyt szerokie uprawnienia. Uruchom: chmod 600 "${sciezka}"`);
  return wczytajKonfiguracje(readFileSync(sciezka, 'utf8'));
}

function uruchomProces(polecenie: string, argumenty: string[], opcje: Parameters<typeof spawnSync>[2]) {
  const r = spawnSync(polecenie, argumenty, opcje);
  if (r.error) throw new Error(`Nie można uruchomić "${polecenie}": ${r.error.message}`);
  return r;
}

// Zwraca kody wyjścia transferów; błąd, gdy któryś się nie powiódł.
function curl(k: Konfiguracja, transfery: Transfer[]): { wyjscie: string } {
  const r = uruchomProces('curl', ['-sS', '--max-time', '120', '-K', '-'], { input: konfiguracjaTransferow(k, transfery), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const wyjscie = String(r.stdout ?? '');
  const bledy = wyjscie.split('\n').filter((w) => /^\d+ ftp/.test(w) && !w.startsWith('0 '));
  if (r.status !== 0 || bledy.length) {
    throw new Error(`curl zgłosił błąd (${bledy.length ? bledy.join('; ') : `kod ${r.status}`}): ${String(r.stderr ?? '').trim()}`);
  }
  return { wyjscie: wyjscie.replace(/^\d+ ftp\S*\n?/gm, '') };
}

// "LIST -a" pokazuje też pliki ukryte (np. istniejący .htaccess), które trafiają do kopii zapasowej.
function listuj(k: Konfiguracja, katalogZdalny: string): WpisListingu[] {
  const adres = adresPliku(k.host, katalogZdalny, '');
  return parsujListing(curl(k, [{ adres: adres.endsWith('/') ? adres : `${adres}/`, opcje: ['request = "LIST -a"'] }]).wyjscie);
}

function pliki(katalog: string, prefiks = ''): string[] {
  return readdirSync(katalog, { withFileTypes: true }).flatMap((w) =>
    w.isDirectory() ? pliki(join(katalog, w.name), `${prefiks}${w.name}/`) : [`${prefiks}${w.name}`],
  );
}

function listaDoWgrania(): { lokalny: string; zdalny: string }[] {
  const dist = join(KORZEN, 'dist');
  if (!existsSync(join(dist, 'index.html'))) throw new Error('Brak dist/index.html. Najpierw npm run build.');
  const lista = plikiDoWgrania(pliki(dist)).map((p) => ({ lokalny: join(dist, p), zdalny: p }));
  lista.push({ lokalny: join(KORZEN, 'hosting', 'htaccess'), zdalny: '.htaccess' }); // na końcu: reguły działają dopiero po wgraniu całej strony
  return lista;
}

function kopiaZapasowa(k: Konfiguracja): string | null {
  const cel = join(homedir(), 'Backups', 'robert-debicki-ftp', new Date().toISOString().replace(/[:.]/g, '-'));
  const doPobrania: Transfer[] = [];
  const idz = (zdalny: string, wzgledna: string): void => {
    for (const w of listuj(k, zdalny)) {
      const dalej = `${wzgledna}${w.nazwa}`;
      if (w.katalog) { idz(`${zdalny === '/' ? '' : zdalny}/${w.nazwa}`, `${dalej}/`); continue; }
      const plikLokalny = join(cel, dalej);
      mkdirSync(dirname(plikLokalny), { recursive: true });
      doPobrania.push({ adres: adresPliku(k.host, k.katalog, dalej), opcje: [`output = "${cytujDlaCurl(plikLokalny)}"`] });
    }
  };
  idz(k.katalog, '');
  if (!doPobrania.length) return null;
  curl(k, doPobrania);
  return cel;
}

function uruchom(polecenie: string, argumenty: string[], env: NodeJS.ProcessEnv = process.env): void {
  const r = uruchomProces(polecenie, argumenty, { cwd: KORZEN, stdio: 'inherit', env });
  if (r.status !== 0) throw new Error(`Polecenie nie powiodło się: ${polecenie} ${argumenty.join(' ')}`);
}

function wyjscie(polecenie: string, argumenty: string[]): string {
  return String(uruchomProces(polecenie, argumenty, { cwd: KORZEN, encoding: 'utf8' }).stdout ?? '').trim();
}

// Po wgraniu .htaccess strona musi odpowiadać 200 bez pętli przekierowań; inaczej głośny komunikat z miejscem kopii.
async function odbior(kopia: string | null): Promise<void> {
  const przywroc = kopia ? `Kopia poprzedniej zawartości: ${kopia}` : 'Serwer był pusty, nie ma kopii.';
  try {
    const odp = await fetch(ADRES_STRONY, { redirect: 'follow', signal: AbortSignal.timeout(20_000) });
    if (odp.status !== 200) throw new Error(`status ${odp.status}`);
    console.log(`Odbiór: ${ADRES_STRONY} odpowiada 200.`);
  } catch (e) {
    console.error(`UWAGA: ${ADRES_STRONY} nie odpowiada poprawnie (${(e as Error).message}). Możliwa pętla przekierowań z .htaccess. ${przywroc}`);
    process.exitCode = 1;
  }
}

async function wgraj(k: Konfiguracja, indeksuj: boolean): Promise<void> {
  for (const z of ['TRESC_BAZA', 'WYJSCIE']) {
    if (process.env[z]) throw new Error(`Zmienna ${z} jest ustawiona. Build wdrożeniowy ma iść bez niej.`);
  }
  const indeks = process.env.PUBLIC_INDEKSUJ;
  if (indeks && !indeksuj) throw new Error('PUBLIC_INDEKSUJ jest ustawione. Zdjęcie noindex wymaga jawnego --indeksuj (tylko na decyzję Roberta).');
  if (indeksuj && indeks !== 'true') throw new Error('--indeksuj wymaga PUBLIC_INDEKSUJ=true.');
  if (wyjscie('git', ['status', '--porcelain'])) throw new Error('Są niezatwierdzone zmiany. Zrób commit przed wdrożeniem.');
  const galaz = wyjscie('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  if (galaz !== 'main') throw new Error(`Wdrażamy tylko z gałęzi main, jesteś na: ${galaz}`);
  // Te same kontrole co w `npm run sprawdz`, bez e2e (te idą na własnym buildzie).
  for (const skrypt of ['sprawdz:sekrety', 'sprawdz:tresc', 'sprawdz:skany', 'sprawdz:zdjecia', 'sprawdz:tlumaczenia']) uruchom('npm', ['run', skrypt]);
  uruchom('npm', ['test']);
  uruchom('npm', ['run', 'build']);
  const lista = listaDoWgrania();
  const kopia = kopiaZapasowa(k);
  console.log(kopia ? `Kopia zapasowa serwera: ${kopia}` : 'Serwer pusty, kopii nie trzeba.');
  curl(k, lista.map((p) => ({ adres: adresPliku(k.host, k.katalog, p.zdalny), opcje: [`upload-file = "${cytujDlaCurl(p.lokalny)}"`, 'ftp-create-dirs'] })));
  console.log(`Wgrano ${lista.length} plików do ${k.host}${k.katalog}.`);
  await odbior(kopia);
  console.log('Dalej: ADRES=https://robert-debicki.pl npm run test:produkcja');
}

async function main(argv: string[]): Promise<void> {
  if (argv.includes('--na-sucho')) {
    const lista = listaDoWgrania();
    for (const p of lista) console.log(p.zdalny);
    console.log(`\n${lista.length} plików (bez usuwania czegokolwiek na serwerze).`);
    return;
  }
  const k = wczytajZPliku();
  const i = argv.indexOf('--lista');
  if (i >= 0) {
    const sciezka = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : k.katalog;
    for (const w of listuj(k, sciezka)) console.log(`${w.katalog ? 'katalog' : 'plik   '}  ${w.nazwa}`);
    return;
  }
  if (argv.includes('--wgraj')) return wgraj(k, argv.includes('--indeksuj'));
  console.log('Użycie: npm run wdroz -- --lista [/sciezka] | --na-sucho | --wgraj [--indeksuj]');
  process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((e) => {
    console.error(`BŁĄD: ${(e as Error).message}`);
    process.exit(1);
  });
}
