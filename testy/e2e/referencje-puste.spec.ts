// Prawdziwa treść: kolekcja referencji jest pusta, więc nie powstaje ani sekcja, ani strona, ani link w menu.
import { test, expect } from '@playwright/test';

test('pusta kolekcja: brak sekcji referencji na /, brak /referencje/ i linku w menu', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('#referencje')).toHaveCount(0);
  await expect(page.locator('a[href="/referencje/"]')).toHaveCount(0);
  expect((await request.get('/referencje/')).status()).toBe(404);
  expect((await request.get('/en/references/')).status()).toBe(404);
});
