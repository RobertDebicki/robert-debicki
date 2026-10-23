// Na prawdziwej treści: dopóki nie ma src/content/ustawienia/en.md (zadanie 10), /en/ nie powstaje,
// a / nie linkuje do brakującej strony. Gdy plik się pojawi, test sprawdza stan odwrotny.
import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const jestEn = existsSync(join(import.meta.dirname, '../../src/content/ustawienia/en.md'));

test('strona główna ma canonical, a przełącznik i hreflang tylko gdy istnieje /en/', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('link[rel=canonical]')).toHaveCount(1);
  await expect(page.locator('a.przelacznik')).toHaveCount(jestEn ? 1 : 0);
  await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(jestEn ? 3 : 0);
  expect((await request.get('/en/')).status()).toBe(jestEn ? 200 : 404);
});
