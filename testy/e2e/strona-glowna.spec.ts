import { test, expect, type Page } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const KORZEN = join(import.meta.dirname, '../..');
const MAKIETA = 'https://makieta.test/';
const FONTY = join(KORZEN, 'node_modules/@fontsource-variable');

/**
 * Makieta ładuje fonty z Google Fonts. Żeby porównanie nie zależało od sieci ani od wersji plików Google,
 * podstawiamy te same pliki Fontsource, których używa strona (rodziny przemianowane na nazwy z makiety).
 */
function cssFontow(): string {
  const zrodla: [string, string, string][] = [
    ['anybody/wdth.css', 'Anybody Variable', 'Anybody'],
    ['onest/index.css', 'Onest Variable', 'Onest'],
    ['spline-sans-mono/index.css', 'Spline Sans Mono Variable', 'Spline Sans Mono'],
  ];
  return zrodla
    .map(([plik, staraNazwa, nowaNazwa]) => {
      const pakiet = plik.split('/')[0];
      return readFileSync(join(FONTY, plik), 'utf8')
        .replaceAll(`'${staraNazwa}'`, `'${nowaNazwa}'`)
        .replaceAll('url(./files/', `url(https://fonts.gstatic.com/${pakiet}/files/`);
    })
    .join('\n');
}

/** Podmienia wszystkie wystąpienia; brak trafienia przerywa test (makieta zmieniła się bez nas). */
function podmien(tekst: string, szukane: RegExp, nowe: string): string {
  const wzor = new RegExp(szukane, 'g');
  if (!wzor.test(tekst)) throw new Error(`Makieta: brak fragmentu ${szukane}`);
  return tekst.replace(wzor, nowe);
}

/**
 * Makieta z 23.10 ma stare logo (ligatura "rd") i stary pomarańcz #ff5a1f / #ff6a33. Obie rzeczy zmieniono celowo
 * (logo od grafika, pomarańcz #EF7F1A z logo), więc w kopii makiety podmieniamy tylko je: token --c, znacznik SVG
 * logo i reguły CSS logo (wzięte z baza.css strony). Reszta makiety zostaje wzorcem bez zmian.
 */
function makietaZNowymLogo(html: string): string {
  const znak = readFileSync(join(KORZEN, 'src/assets/logo/znak.svg'), 'utf8')
    .trim()
    .replace('<svg ', '<svg class="logo" aria-hidden="true" focusable="false" ');
  const cssLogo = readFileSync(join(KORZEN, 'src/styles/baza.css'), 'utf8')
    .split('\n')
    .filter((l) => /^(\.logo|\.brand:hover \.logo)/.test(l))
    .join('\n');
  let wynik = podmien(html, /--c: #ff5a1f;|--c: #ff6a33;/, '--c: #EF7F1A;');
  wynik = podmien(wynik, /<svg class="logo"[\s\S]*?<\/svg>/, znak);
  wynik = podmien(wynik, /\.logo \{[^\n]*\n\.lg-ink[^\n]*\n\.lg-flow[^\n]*\n\.brand:hover \.lg-flow[^\n]*/, cssLogo);
  return wynik;
}

/**
 * Makieta ma stary przekaz (opis otwarcia, tytuł wdrożeń, tytuł i wstęp kontaktu). Treść zmieniono celowo (przekaz dla klienta
 * i rekrutera, potem AI na pierwszym miejscu), więc w kopii makiety podmieniamy tylko te cztery teksty na aktualne z `ustawienia/pl.md`.
 */
function makietaZNowymPrzekazem(html: string): string {
  let wynik = podmien(
    html,
    /Scenariusze stawiam w n8n i Make\.com\. Strony i aplikacje tworzę z Claude Code, od WordPressa po aplikacje pisane od zera\. Agentów AI wdrażam bezpośrednio w zespołach klientów\./,
    'Agentów AI wdrażam bezpośrednio w zespołach klientów. Aplikacje, strony i narzędzia z AI tworzę z Claude Code. Procesy automatyzuję w n8n i Make.com.',
  );
  wynik = podmien(wynik, /Sześć systemów, które działają u klientów/, 'Systemy, które działają u klientów');
  wynik = podmien(wynik, /Szukam stałej pracy jako Automation Developer albo AI Engineer/, 'Powiedz, co robicie ręcznie. Sprawdzę, co przejmie automatyzacja, a co AI.');
  return podmien(
    wynik,
    /Wrocław albo zdalnie\. Najszybciej odpowiadam mailowo\./,
    'Firmom wdrażam AI i automatyzuję procesy: agenci AI, voiceboty, aplikacje i strony. Jestem też otwarty na stałą rolę Automation Developer albo AI Engineer. Wrocław albo zdalnie. Zadzwoń albo napisz.',
  );
}

/**
 * Menu zmieniono celowo według zatwierdzonego podglądu `docs/makieta/uslugi.html` (13.11): bez linku „Doświadczenie”
 * (sekcja zostaje, rekruter ma własną podstronę) i z nowymi barwami kwadracików. W kopii makiety podmieniamy tylko menu.
 */
function makietaZNowymMenu(html: string): string {
  return podmien(
    html,
    /<a href="#wdrozenia" style="--sw: var\(--c\)">Wdrożenia<\/a>\s*<a href="#teraz" style="--sw: var\(--m\)">Projekty<\/a>\s*<a href="#droga" style="--sw: var\(--y\)">Doświadczenie<\/a>\s*<a href="#kontakt" style="--sw: var\(--ink\)">Kontakt<\/a>/,
    '<a href="#wdrozenia" style="--sw: var(--m)">Wdrożenia</a>\n      <a href="#teraz" style="--sw: var(--y)">Projekty</a>\n      <a href="#kontakt" style="--sw: var(--c)">Kontakt</a>',
  );
}

/**
 * Opis wdrożenia z kampaniami ujednolicono celowo z opisem na stronie usługi AI i automatyzacja (decyzja Roberta 13.11):
 * branża zamiast nazwy usługi, trzech agentów, AdLoop w stosie. W kopii makiety podmieniamy tylko tę kartę.
 */
function makietaZNowymWdrozeniemKampanii(html: string): string {
  let wynik = podmien(html, /<p class="sector mono">Kampanie Google Ads<\/p>/, '<p class="sector mono">Producent mebli dla branży HoReCa</p>');
  wynik = podmien(wynik, /<h3>Claude Code do prowadzenia kampanii i analityki<\/h3>/, '<h3>Agenci AI do kampanii, SEO i bloga</h3>');
  wynik = podmien(
    wynik,
    /Klient chciał prowadzić reklamy sam, bez agencji\. Skonfigurowałem Claude Code z dostępem do Google Ads, GA4 i Search Console, tak żeby mógł tworzyć kampanie, analizować wyniki i znajdować frazy, które sprzedają\. Po miesiącu prowadził kampanie samodzielnie i odnotował wzrost sprzedaży\./,
    'Klient chciał prowadzić reklamy sam, bez agencji. Skonfigurowałem Claude Code z dostępem do Google Ads, GA4 i Search Console. Pierwszy agent sprawdza rentowność kampanii i ruch na stronie, a gdy w SEO coś się zmieni, proponuje zmiany. Drugi pisze wpisy na blog i opisy realizacji na stronę, trzeci je tłumaczy. Po miesiącu klient prowadził kampanie samodzielnie i odnotował wzrost sprzedaży.',
  );
  return podmien(
    wynik,
    /<p class="stack mono"><span>Claude Code<\/span><span>Google Ads<\/span><span>GA4<\/span><span>Search Console<\/span><\/p>/,
    '<p class="stack mono"><span>Claude Code</span><span>AdLoop</span><span>Google Ads</span><span>GA4</span><span>Search Console</span></p>',
  );
}

async function podstawMakiete(page: Page) {
  const html = makietaZNowymWdrozeniemKampanii(makietaZNowymMenu(makietaZNowymPrzekazem(makietaZNowymLogo(readFileSync(join(KORZEN, 'docs/makieta/index.html'), 'utf8')))));
  await page.route(MAKIETA, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: html }));
  await page.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ contentType: 'text/css', body: cssFontow() }));
  await page.route('https://fonts.gstatic.com/**', (r) => {
    const sciezka = new URL(r.request().url()).pathname.slice(1);
    r.fulfill({ contentType: 'font/woff2', headers: { 'access-control-allow-origin': '*' }, body: readFileSync(join(FONTY, sciezka)) });
  });
}

/** Ukrywa raster (animowany canvas) i czeka na fonty. */
async function przygotuj(page: Page, adres: string) {
  await page.goto(adres);
  await page.addStyleTag({ content: '#raster { display: none !important; }' });
  // Wymuszamy stan końcowy animacji na stronie i na makiecie (skrypty dodają te klasy dopiero po załadowaniu i przewinięciu).
  await page.evaluate(() => {
    document.documentElement.classList.add('ready');
    document.querySelectorAll('.job').forEach((e) => e.classList.add('in'));
  });
  await page.evaluate(() => document.fonts.ready);
}

test.describe('zgodność z makietą', () => {
  test.use({ reducedMotion: 'reduce' });

  for (const w of [1440, 390]) {
    test(`strona główna przy ${w} px różni się od makiety o mniej niż 2% pikseli`, async ({ page }, info) => {
      await page.setViewportSize({ width: w, height: 900 });
      await podstawMakiete(page);
      await przygotuj(page, MAKIETA);
      const wzor = await page.screenshot({ fullPage: true, animations: 'disabled' });
      // Wzorzec to zrzut makiety z tego samego przebiegu, zapisany jako snapshot do porównania.
      const nazwa = `makieta-${w}.png`;
      const sciezka = info.snapshotPath(nazwa);
      mkdirSync(dirname(sciezka), { recursive: true });
      writeFileSync(sciezka, wzor);

      await przygotuj(page, '/');
      // Makieta nie ma sekcji wpisów i usług, linków do nich i do podstrony rekrutera (w menu i w kontakcie) ani telefonu
      // w kontakcie: pojawiają się z treścią (wygląd usług i podstrony rekrutera ma osobny, zatwierdzony podgląd
      // `docs/makieta/uslugi.html`). Porównujemy resztę.
      await page.addStyleTag({
        content:
          '#wpisy, #uslugi, header nav a[href="/wpisy/"], header nav a[href="/uslugi/"], a[href="/dla-rekruterow/"], #kontakt .mail:has(a[href^="tel:"]) { display: none !important; }',
      });
      const zrzut = await page.screenshot({ fullPage: true, animations: 'disabled' });
      expect(zrzut).toMatchSnapshot(nazwa, { maxDiffPixelRatio: 0.02 });
    });
  }
});

test('telefon w kontakcie jest widocznym linkiem tel: ze zdarzeniem na / i /en/', async ({ page }) => {
  for (const adres of ['/', '/en/']) {
    await page.goto(adres);
    await expect(page.locator('#kontakt a[href="tel:+48665780129"][data-zdarzenie="klik_telefon"]')).toBeVisible();
  }
});

test('nagłówek h1 jest złożony krojem Anybody', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const rodzina = await page.evaluate(() => getComputedStyle(document.querySelector('h1')!).fontFamily);
  expect(rodzina).toContain('Anybody');
  const zaladowany = await page.evaluate(() => document.fonts.check('850 1em "Anybody Variable"', 'Dębicki'));
  expect(zaladowany).toBe(true);
});

// Fikstura z „Na co uważać” pkt 3: długi tytuł wstrzykiwany w gotową stronę (bez strony testowej w dist/).
const DLUGI = 'Automatyzacja obiegu wniosków o dofinansowanie dla jednostek samorządu terytorialnego';

test('długi polski tytuł nie wychodzi z kolumny przy 360 px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const wyniki = await page.evaluate((tytul) => {
    const cele = ['.job h3', '.now-item h3', '#wdrozenia .sec-title', '.contact .sec-title'];
    return cele.map((sel) => {
      const el = document.querySelector<HTMLElement>(sel);
      if (!el) return { sel, brak: true, wystaje: 0 };
      el.textContent = tytul;
      const kolumna = el.parentElement!.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { sel, brak: false, wystaje: Math.max(r.right - kolumna.right, el.scrollWidth - el.clientWidth, 0) };
    });
  }, DLUGI);
  for (const w of wyniki) {
    expect(w.brak, `brak elementu ${w.sel}`).toBe(false);
    expect(w.wystaje, `${w.sel} wychodzi z kolumny`).toBeLessThanOrEqual(0.5);
  }
  const [scroll, inner] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
  expect(scroll).toBe(inner);
});
