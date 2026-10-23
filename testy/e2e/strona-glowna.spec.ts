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

async function podstawMakiete(page: Page) {
  await page.route(MAKIETA, (r) =>
    r.fulfill({ contentType: 'text/html; charset=utf-8', body: readFileSync(join(KORZEN, 'docs/makieta/index.html'), 'utf8') }),
  );
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
      const zrzut = await page.screenshot({ fullPage: true, animations: 'disabled' });
      expect(zrzut).toMatchSnapshot(nazwa, { maxDiffPixelRatio: 0.02 });
    });
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
