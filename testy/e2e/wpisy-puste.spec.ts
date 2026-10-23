// Prawdziwa treść: kolekcja wpisów jest pusta, więc nie powstaje ani lista, ani sekcja na stronie głównej.
import { test, expect } from '@playwright/test';

test('pusta kolekcja: brak sekcji wpisów na / i brak /wpisy/', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('#wpisy')).toHaveCount(0);
  await expect(page.locator('a[href="/wpisy/"]')).toHaveCount(0);
  await expect(page.locator('header nav a[href="/wpisy/"]')).toHaveCount(0);
  expect((await request.get('/wpisy/')).status()).toBe(404);
});
