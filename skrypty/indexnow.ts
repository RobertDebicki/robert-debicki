/**
 * IndexNow: zgłasza adresy z mapy witryny do Binga (i innych wyszukiwarek IndexNow) po wgraniu.
 * Mapa Astro to indeks map bez <lastmod>, więc bez argumentów idzie cała mapa.
 * Plik klucza public/<KLUCZ>.txt musi być na serwerze, zanim wyślesz zgłoszenie (skrypt to sprawdza).
 * Użycie:
 *   npx tsx skrypty/indexnow.ts                                        # cała mapa witryny
 *   npx tsx skrypty/indexnow.ts https://robert-debicki.pl/adres/ ...   # wybrane adresy
 *   --sucho  tylko wypisz, nic nie wysyłaj
 */
import { KLUCZ, czytajMape } from '../src/lib/indexnow';

const HOST = 'robert-debicki.pl';
const MAPA = `https://${HOST}/sitemap-index.xml`;
const args = process.argv.slice(2);
const sucho = args.includes('--sucho');
const nieznane = args.filter((a) => a.startsWith('--') && a !== '--sucho');
if (nieznane.length) { console.error(`🔴 Nieznany argument: ${nieznane.join(', ')}. Jedyna flaga to --sucho.`); process.exit(1); }
const reczne = args.filter((a) => !a.startsWith('--'));
const obce = reczne.filter((a) => !a.startsWith(`https://${HOST}/`));
if (obce.length) { console.error(`🔴 Adresy spoza https://${HOST}/: ${obce.join(', ')}`); process.exit(1); }

async function pobierz(url: string): Promise<string> {
  const r = await fetch(url);
  if (!r.ok) { console.error(`🔴 ${url}: ${r.status}`); process.exit(1); }
  return r.text();
}
/** Zwykła mapa albo indeks map (wtedy wchodzi w mapy podrzędne). */
async function adresyMapy(url: string): Promise<string[]> {
  const { mapy, adresy } = czytajMape(await pobierz(url));
  for (const m of mapy) adresy.push(...await adresyMapy(m));
  return adresy;
}

let adresy = reczne.length ? reczne : (await adresyMapy(MAPA)).filter((a) => a.startsWith(`https://${HOST}/`));
adresy = [...new Set(adresy)];
if (!adresy.length) { console.error(`🔴 Zero adresów w ${MAPA}. Nic nie wysłano.`); process.exit(1); }
console.log(`Adresów do zgłoszenia: ${adresy.length}`);
if (sucho) { adresy.forEach((a) => console.log('  ' + a)); process.exit(0); }

const kontrola = await fetch(`https://${HOST}/${KLUCZ}.txt`);
if (!kontrola.ok || (await kontrola.text()).trim() !== KLUCZ) {
  console.error('🔴 Plik klucza nie jest jeszcze na serwerze. Najpierw npm run wdroz -- --wgraj.');
  process.exit(1);
}
for (let i = 0; i < adresy.length; i += 10000) {
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KLUCZ, keyLocation: `https://${HOST}/${KLUCZ}.txt`, urlList: adresy.slice(i, i + 10000) }),
  });
  console.log(`IndexNow: ${r.status} ${r.statusText} (${Math.min(i + 10000, adresy.length)}/${adresy.length})`);
  if (r.status >= 300) process.exit(1);
}
