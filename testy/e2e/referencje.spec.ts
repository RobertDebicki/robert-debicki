// Testy idą na build z fiksturami (testy/fikstury/jezyki/referencje), projekt "jezyki". Pusta kolekcja: referencje-puste.spec.ts.
import { test, expect } from '@playwright/test';

const SKAN = 'https://skany-testowe.r2.dev/pierwsza.jpg';

test('strona główna PL: sekcja z cytatem jako tekstem, osobą, funkcją, firmą i datą', async ({ page }) => {
  await page.goto('/');
  const sekcja = page.locator('#referencje');
  await expect(sekcja).toBeVisible();
  const karta = sekcja.locator('article', { hasText: 'Anna Testowa' });
  await expect(karta.locator('blockquote')).toHaveText('Robert zbudował nam system, z którego korzysta cały zespół.');
  await expect(karta).toContainText('Dyrektor operacyjna');
  await expect(karta).toContainText('Firma Testowa sp. z o.o.');
  await expect(karta.locator('time')).toHaveAttribute('datetime', '2026-09-15');
  await expect(karta.locator('time')).toHaveText('15 września 2026');
  await expect(sekcja.locator('a[href="/referencje/"]')).toBeVisible();
});

test('skan: obraz z altem z nazwą osoby, leniwy, z wymiarami, w linku do pełnego skanu', async ({ page }) => {
  await page.goto('/referencje/');
  const karta = page.locator('main article', { hasText: 'Anna Testowa' });
  const img = karta.locator('img');
  await expect(img).toHaveAttribute('alt', /Anna Testowa/);
  await expect(img).toHaveAttribute('src', SKAN);
  await expect(img).toHaveAttribute('loading', 'lazy');
  await expect(img).toHaveAttribute('width', /\d+/);
  await expect(img).toHaveAttribute('height', /\d+/);
  const link = karta.locator(`a[href="${SKAN}"]`).first();
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
  await expect(link.locator('img')).toHaveCount(1);
});

test('skan PDF: bez obrazu, tylko link do pliku', async ({ page }) => {
  await page.goto('/referencje/');
  const karta = page.locator('main article', { hasText: 'Jan Przykładowy' });
  await expect(karta.locator('img')).toHaveCount(0);
  await expect(karta.locator('a[href="https://skany-testowe.r2.dev/tylko-pl.pdf"]')).toBeVisible();
});

test('referencja nie linkuje do żadnego wdrożenia ani projektu', async ({ page }) => {
  for (const sciezka of ['/', '/referencje/', '/en/references/']) {
    await page.goto(sciezka);
    const hrefy = await page.locator('#referencje article a').evaluateAll((a) => a.map((x) => x.getAttribute('href')));
    expect(hrefy.length, sciezka).toBeGreaterThan(0);
    for (const h of hrefy) {
      expect(h, sciezka).toMatch(/^https:\/\/skany-testowe\.r2\.dev\//);
    }
  }
});

test('EN: lista ukrywa referencję bez en.md, przełączniki prowadzą do odpowiedników', async ({ page }) => {
  await page.goto('/en/references/');
  expect(await page.locator('main article').count()).toBe(1);
  await expect(page.locator('main')).toContainText('Anna Testowa');
  await expect(page.locator('main')).not.toContainText('Jan Przykładowy');
  await expect(page.locator('main blockquote')).toHaveText('Robert built us a system the whole team uses.');
  await expect(page.locator('main img')).toHaveAttribute('alt', /Anna Testowa/);
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/referencje/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/referencje/');
  expect(await page.locator('main article').count()).toBe(2);
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/en/references/');
});

test('menu ma link do referencji w obu językach', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header nav a[href="/referencje/"]')).toHaveText('Referencje');
  await page.goto('/en/');
  await expect(page.locator('header nav a[href="/en/references/"]')).toHaveText('References');
});

for (const szer of [360, 390, 1024, 1440]) {
  test(`referencje nie powodują przewijania w bok przy ${szer} px`, async ({ page }) => {
    await page.setViewportSize({ width: szer, height: 800 });
    for (const sciezka of ['/', '/referencje/', '/en/references/']) {
      await page.goto(sciezka);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), sciezka).toBe(false);
    }
  });
}
