// Prawdziwa treść: dopóki w src/content/uslugi nie ma usług, nie powstaje sekcja, link w menu ani strony usług.
import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';

const saUslugi = readdirSync('src/content/uslugi', { withFileTypes: true }).some((w) => w.isDirectory());

test('brak usług: brak sekcji na / i /en/, linku w menu i stron list', async ({ page, request }) => {
  test.skip(saUslugi, 'Są prawdziwe usługi: sprawdza je uslugi.spec.ts na fiksturach i testy treści.');
  for (const adres of ['/', '/en/']) {
    await page.goto(adres);
    await expect(page.locator('#uslugi')).toHaveCount(0);
    await expect(page.locator('a[href="/uslugi/"], a[href="/en/services/"]')).toHaveCount(0);
  }
  expect((await request.get('/uslugi/')).status()).toBe(404);
  expect((await request.get('/en/services/')).status()).toBe(404);
});
