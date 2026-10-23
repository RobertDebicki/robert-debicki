// Te testy idą na build z fiksturami (testy/fikstury/jezyki/), patrz skrypty/serwery-e2e.mjs i projekt "jezyki".
import { test, expect } from '@playwright/test';

const SITE = 'https://robert-debicki.robert-debicki7.workers.dev';

test('/en/ ma lang=en, canonical i hreflang pl, en, x-default', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${SITE}/en/`);
  await expect(page.locator('link[rel=alternate][hreflang=en]')).toHaveAttribute('href', `${SITE}/en/`);
  await expect(page.locator('link[rel=alternate][hreflang=pl]')).toHaveAttribute('href', `${SITE}/`);
  await expect(page.locator('link[rel=alternate][hreflang=x-default]')).toHaveAttribute('href', `${SITE}/`);
});

test('/ ma lang=pl, canonical, hreflang i przełącznik do /en/', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${SITE}/`);
  await expect(page.locator('link[rel=alternate][hreflang=en]')).toHaveAttribute('href', `${SITE}/en/`);
  await expect(page.locator('link[rel=alternate][hreflang=x-default]')).toHaveAttribute('href', `${SITE}/`);
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/en/');
});

test('przełącznik na /en/ prowadzi do /', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/');
});

test('/en/ pokazuje pozycje z en.md (także nieaktualne) i ukrywa te bez en.md', async ({ page }) => {
  await page.goto('/en/');
  const tekst = await page.locator('main').innerText();
  expect(tekst).toContain('Deployment with translation');
  expect(tekst).toContain('Deployment with stale translation');
  expect(tekst).toContain('Project with translation');
  expect(tekst).not.toContain('tylko po polsku');
  expect(tekst).not.toContain('Wdrożenie z tłumaczeniem');
});

test('/ pokazuje wszystkie pozycje po polsku', async ({ page }) => {
  await page.goto('/');
  const tekst = await page.locator('main').innerText();
  expect(tekst).toContain('Wdrożenie tylko po polsku');
  expect(tekst).toContain('Projekt tylko po polsku');
});

test('mapa strony zawiera / i /en/, a pozycji tylko po polsku nie ma ani w niej, ani w hreflang', async ({ page, request }) => {
  const indeks = await request.get('/sitemap-index.xml');
  expect(indeks.ok()).toBe(true);
  const mapa = await (await request.get('/sitemap-0.xml')).text();
  expect(mapa).toContain(`<loc>${SITE}/</loc>`);
  expect(mapa).toContain(`<loc>${SITE}/en/</loc>`);
  expect(mapa).not.toContain('/en/posts/tylko-pl');
  for (const sciezka of ['/', '/en/']) {
    await page.goto(sciezka);
    const hrefy = await page.locator('link[rel=alternate]').evaluateAll((l) => l.map((e) => e.getAttribute('href')));
    expect(hrefy.join(' ')).not.toContain('tylko-pl');
  }
});

test('przycisk kopiowania ma etykiety w języku strony', async ({ page }) => {
  await page.goto('/en/');
  const przycisk = page.locator('#copy-email');
  await expect(przycisk).toHaveText('Copy address');
  await expect(przycisk).toHaveAttribute('data-skopiowano', 'Copied');
  await expect(przycisk).toHaveAttribute('data-zaznaczony', 'Address selected');
  await page.goto('/');
  await expect(page.locator('#copy-email')).toHaveAttribute('data-skopiowano', 'Skopiowano');
});

test('menu i stopka /en/ są po angielsku', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('header nav')).toContainText('Deployments');
  await expect(page.locator('header nav')).toHaveAttribute('aria-label', 'Sections');
  await expect(page.locator('footer')).toContainText('sheet 1 of 1');
});
