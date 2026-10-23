import { test, expect } from '@playwright/test';

for (const [adres, nazwa] of [['/', 'Robert Dębicki, strona główna'], ['/en/', 'Robert Dębicki, home page']] as const) {
  test(`nagłówek ${adres}: znak logo z currentColor i pomarańczową belką`, async ({ page }) => {
    await page.goto(adres);
    const link = page.locator('header .brand');
    await expect(link).toHaveAccessibleName(nazwa);
    await expect(link).toContainText('Robert Dębicki');
    const svg = link.locator('svg.logo');
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
    await expect(svg.locator('[fill="currentColor"]')).toHaveCount(1);
    await expect(svg.locator('.logo-pomarancz')).toHaveCount(1);
    const pudlo = await svg.boundingBox();
    expect(pudlo!.height).toBeCloseTo(29, 0);
  });
}

test('favicony: SVG, PNG 32 px i apple-touch-icon są podlinkowane i dostępne', async ({ page, request }) => {
  await page.goto('/');
  const ikony = [
    ['link[rel="icon"][type="image/svg+xml"]', '/favicon.svg', 'image/svg+xml'],
    ['link[rel="icon"][type="image/png"][sizes="32x32"]', '/favicon-32.png', 'image/png'],
    ['link[rel="apple-touch-icon"]', '/apple-touch-icon.png', 'image/png'],
  ] as const;
  for (const [sel, href, typ] of ikony) {
    await expect(page.locator(sel)).toHaveAttribute('href', href);
    const odp = await request.get(href);
    expect(odp.status(), href).toBe(200);
    expect(odp.headers()['content-type']).toContain(typ);
  }
});
