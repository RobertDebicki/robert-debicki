import { test, expect } from '@playwright/test';

// Uruchamiany tylko z ADRES (np. ADRES=https://robert-debicki.robert-debicki7.workers.dev npm run test:produkcja).
// Bez ADRES jest pomijany, żeby CI zostało zielone.
const ADRES = process.env.ADRES?.replace(/\/$/, '');
test.skip(!ADRES, 'Ustaw ADRES, żeby uruchomić test produkcyjny');

for (const [sciezka, jezyk] of [['/', 'pl'], ['/en/', 'en']] as const) {
  test(`produkcja ${sciezka}: 200, noindex, logo i 6 liczb wdrożeń`, async ({ page }) => {
    const odp = await page.goto(`${ADRES}${sciezka}`);
    expect(odp!.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', jezyk);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('header .brand svg.logo')).toHaveCount(1);
    await expect(page.locator('#wdrozenia .job .fig .p-k')).toHaveCount(6);
    const naglowki = await odp!.allHeaders();
    expect(naglowki['x-content-type-options']).toBe('nosniff');
  });
}

test('produkcja: nieistniejący adres zwraca 404 ze stroną 404', async ({ page }) => {
  const odp = await page.goto(`${ADRES}/nie-ma-takiej-strony-xyz/`);
  expect(odp!.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('Nie ma takiej strony');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('produkcja: /admin/ zwraca 200', async ({ request }) => {
  const odp = await request.get(`${ADRES}/admin/`);
  expect(odp.status()).toBe(200);
});
