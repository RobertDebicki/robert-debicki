// Testy idą na build z fiksturami (testy/fikstury/jezyki/wpisy), projekt "jezyki". Pusta kolekcja: test na zwykłym buildzie (projekt "chromium", plik wpisy-puste.spec.ts).
import { test, expect } from '@playwright/test';

const SITE = 'https://robert-debicki.robert-debicki7.workers.dev';

test('strona główna PL pokazuje 3 najnowsze wpisy od najnowszego, bez najstarszego', async ({ page }) => {
  await page.goto('/');
  const sekcja = page.locator('#wpisy');
  await expect(sekcja).toBeVisible();
  const tytuly = await sekcja.locator('article h3').allInnerTexts();
  expect(tytuly).toEqual(['Automatyzacja obiegu wniosków o dofinansowanie dla jednostek samorządu terytorialnego', 'Wpis środkowy', 'Wpis z tłumaczeniem']);
  await expect(sekcja.locator('a[href="/wpisy/"]')).toBeVisible();
});

test('strona główna EN nie pokazuje wpisu tylko po polsku', async ({ page }) => {
  await page.goto('/en/');
  const tekst = await page.locator('#wpisy').innerText();
  expect(tekst).toContain('Middle post');
  expect(tekst).not.toContain('tylko po polsku');
});

test('lista PL ma wszystkie wpisy, lista EN ukrywa wpis bez en.md', async ({ page }) => {
  await page.goto('/wpisy/');
  expect(await page.locator('main article').count()).toBe(4);
  await expect(page.locator('main')).toContainText('Wpis tylko po polsku');
  await page.goto('/en/posts/');
  expect(await page.locator('main article').count()).toBe(3);
  await expect(page.locator('main')).not.toContainText('tylko po polsku');
});

test('strona wpisu ma article, time z datetime i zdjęcie z altem', async ({ page }) => {
  await page.goto('/wpisy/najnowszy/');
  await expect(page.locator('article')).toHaveCount(1);
  await expect(page.locator('article time')).toHaveAttribute('datetime', '2026-10-20');
  const img = page.locator('article img');
  await expect(img).toHaveAttribute('alt', 'Testowy obraz w kolorze pomarańczowym');
  expect(await img.getAttribute('src')).toMatch(/^\/_astro\//);
  await expect(img).toHaveAttribute('width', /\d+/);
  await expect(img).toHaveAttribute('height', /\d+/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
});

test('przełącznik: wpis z tłumaczeniem do odpowiednika z hreflang, bez tłumaczenia do listy EN bez hreflang', async ({ page }) => {
  await page.goto('/wpisy/najnowszy/');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/en/posts/najnowszy/');
  await expect(page.locator('link[rel=alternate][hreflang=en]')).toHaveAttribute('href', `${SITE}/en/posts/najnowszy/`);
  await page.goto('/wpisy/tylko-pl/');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/en/posts/');
  await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(0);
  await page.goto('/en/posts/najnowszy/');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/wpisy/najnowszy/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('wpis tylko po polsku nie ma strony EN ani wpisu w mapie strony', async ({ request }) => {
  expect((await request.get('/en/posts/tylko-pl/')).status()).toBe(404);
  const mapa = await (await request.get('/sitemap-0.xml')).text();
  expect(mapa).toContain(`${SITE}/en/posts/najnowszy/`);
  expect(mapa).not.toContain('/en/posts/tylko-pl');
});

for (const szer of [360, 390, 1024, 1440]) {
  test(`długi tytuł nie wychodzi z kolumny przy ${szer} px`, async ({ page }) => {
    await page.setViewportSize({ width: szer, height: 800 });
    for (const sciezka of ['/', '/wpisy/', '/wpisy/najnowszy/', '/en/posts/najnowszy/']) {
      await page.goto(sciezka);
      const przewija = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(przewija, sciezka).toBe(false);
    }
  });
}

test('menu ma link do listy wpisów w obu językach', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header nav a[href="/wpisy/"]')).toHaveText('Wpisy');
  await page.goto('/en/');
  await expect(page.locator('header nav a[href="/en/posts/"]')).toHaveText('Posts');
});
