// Zgoda na analitykę: kontener tagu Google (GA4, GTM-…) ładuje się dopiero po kliknięciu „Akceptuję”. Do tego czasu nic nie idzie do Google.
import { ID_TAGU, KLUCZ_WYBORU, adresTagu, ciasteczkaGoogle, domenyDoUsuniecia, odczytajWybor, zapiszWybor } from '../lib/zgoda';

type Okno = Window & { dataLayer: unknown[] };
const okno = window as unknown as Okno;
okno.dataLayer = okno.dataLayer || [];
// GA4 wymaga, żeby do dataLayer trafiał obiekt `arguments`, a nie tablica.
function gtag(..._: unknown[]): void {
  // eslint-disable-next-line prefer-rest-params
  okno.dataLayer.push(arguments);
}

const POZIOMY = ['ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization'];
const ustaw = (rodzaj: 'default' | 'update', analityka: 'granted' | 'denied') => {
  const stan: Record<string, string> = {};
  for (const p of POZIOMY) stan[p] = p === 'analytics_storage' ? analityka : 'denied';
  gtag('consent', rodzaj, stan);
};
ustaw('default', 'denied');

// Samo odwołanie do window.localStorage może rzucić wyjątek (zablokowane dane witryn), więc dostęp idzie przez tę funkcję.
function pamiec(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const baner = document.getElementById('zgoda') as HTMLElement | null;
let zaladowany = false;

// Skrypt wstrzykujemy tylko raz, ale stan zgody ustawiamy przy każdej decyzji (akceptuj, odrzuć, akceptuj w jednej wizycie).
function wlaczAnalityke(): void {
  ustaw('update', 'granted');
  if (zaladowany) return;
  zaladowany = true;
  // Zdarzenie startowe kontenera (gtm.js) i polecenie js tagu Google: oba są bezpieczne, a kontener uruchamia wyzwalacze „Wszystkie strony”.
  okno.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  gtag('js', new Date());
  const s = document.createElement('script');
  s.async = true;
  s.src = adresTagu(ID_TAGU);
  document.head.appendChild(s);
}

function wylaczAnalityke(): void {
  ustaw('update', 'denied');
  const host = location.hostname;
  for (const nazwa of ciasteczkaGoogle(document.cookie)) {
    for (const domena of domenyDoUsuniecia(host)) {
      document.cookie = `${nazwa}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domena ? `; domain=${domena}` : ''}`;
    }
  }
}

// Fokus przenosimy na baner tylko wtedy, gdy odwiedzający sam go otworzył, żeby nie przeskakiwać klawiatury przy wczytaniu strony.
function pokaz(zFokusem: boolean): void {
  if (!baner) return;
  baner.hidden = false;
  if (zFokusem) baner.focus({ preventScroll: true });
}

function zdecyduj(wybor: 'tak' | 'nie'): void {
  const m = pamiec();
  if (m) zapiszWybor(m, wybor);
  if (wybor === 'tak') {
    wlaczAnalityke();
  } else {
    const byloZaladowane = zaladowany;
    wylaczAnalityke();
    // Kontenera załadowanego w tej wizycie nie da się wyładować: po wycofaniu zgody odświeżamy stronę, żeby nic nie działało dalej.
    if (byloZaladowane) {
      location.reload();
      return;
    }
  }
  if (baner) baner.hidden = true;
}

// Bez dostępu do pamięci pytamy przy każdej wizycie, a analityka zostaje wyłączona.
let zapisany: 'tak' | 'nie' | null = null;
try {
  zapisany = odczytajWybor(pamiec()?.getItem(KLUCZ_WYBORU) ?? null);
} catch {
  /* odczyt może rzucić nawet przy dostępnym obiekcie */
}
if (zapisany === 'tak') wlaczAnalityke();
else if (zapisany === null) pokaz(false);

baner?.querySelectorAll<HTMLButtonElement>('[data-zgoda]').forEach((b) => b.addEventListener('click', () => zdecyduj(b.dataset.zgoda === 'tak' ? 'tak' : 'nie')));
document.querySelectorAll('[data-zgoda-otworz]').forEach((b) => b.addEventListener('click', () => pokaz(true)));

// Zdarzenia kliknięć (e-mail, telefon, LinkedIn, kopiowanie adresu; atrybut data-zdarzenie) trafiają do dataLayer tylko, gdy analityka jest już włączona.
// Przed decyzją albo po odmowie nic się nie zapisuje, więc po późniejszej zgodzie nic się nie odtwarza.
// To zwykłe obiekty { event }: kontener GTM przekazuje je do GA4 wyzwalaczem „Zdarzenie niestandardowe” i tagiem zdarzenia GA4 (ustawia się w panelu GTM).
function zdarzenieKlikniecia(e: Event): void {
  if (!zaladowany) return;
  const nazwa = (e.target as Element | null)?.closest<HTMLElement>('[data-zdarzenie]')?.dataset.zdarzenie;
  if (nazwa) okno.dataLayer.push({ event: nazwa });
}
document.addEventListener('click', zdarzenieKlikniecia);
// Środkowy przycisk myszy (otwarcie w nowej karcie) generuje auxclick, nie click.
document.addEventListener('auxclick', (e) => {
  if (e.button === 1) zdarzenieKlikniecia(e);
});
