import { test, expect } from '@playwright/test';

test('strona 404 ma noindex i nie ma adresu kanonicznego ani hreflang', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('h1')).toHaveText('Nie ma takiej strony.');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel=canonical]')).toHaveCount(0);
  await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(0);
});

test('zwykła strona nadal ma adres kanoniczny', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel=canonical]')).toHaveCount(1);
});
