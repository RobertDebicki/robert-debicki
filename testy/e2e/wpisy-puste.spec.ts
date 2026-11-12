// Prawdziwa treść: bez wpisów nie powstaje ani lista, ani sekcja na stronie głównej; z wpisami jest jedno i drugie.
// Szczegóły listy i stron wpisów sprawdza wpisy.spec.ts na fiksturach.
import { test, expect } from '@playwright/test';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const katalog = join(import.meta.dirname, '../../src/content/wpisy');
const saWpisy = existsSync(katalog) && readdirSync(katalog).some((d) => existsSync(join(katalog, d, 'pl.md')));

test('sekcja wpisów na / i lista /wpisy/ tylko gdy kolekcja ma wpisy', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('#wpisy')).toHaveCount(saWpisy ? 1 : 0);
  await expect(page.locator('header nav a[href="/wpisy/"]')).toHaveCount(saWpisy ? 1 : 0);
  expect((await request.get('/wpisy/')).status()).toBe(saWpisy ? 200 : 404);
});
