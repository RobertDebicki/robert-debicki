import { test, expect } from '@playwright/test';

test('po 1,5 s html ma klasę ready, a warstwy płyt nazwiska znikają', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(1500);
  await expect(page.locator('html')).toHaveClass(/ready/);
  const krycie = await page.evaluate(() =>
    [...document.querySelectorAll('h1 .p')].map((e) => getComputedStyle(e).opacity),
  );
  expect(krycie.length).toBeGreaterThan(0);
  expect(krycie.every((o) => o === '0')).toBe(true);
});

test('wdrożenia dostają klasę in dopiero po wejściu w widok', async ({ page }) => {
  await page.goto('/');
  const przed = await page.locator('.job.in').count();
  expect(przed).toBeLessThan(await page.locator('.job').count());
  await page.locator('.job').last().scrollIntoViewIfNeeded();
  await expect(page.locator('.job').last()).toHaveClass(/\bin\b/);
});

test.describe('ruch ograniczony', () => {
  test.use({ reducedMotion: 'reduce' });
  test('canvas rastra rysuje się raz i nie przerysowuje po 2 s', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    const a = await page.evaluate(() => (document.getElementById('raster') as HTMLCanvasElement).toDataURL());
    await page.waitForTimeout(2000);
    const b = await page.evaluate(() => (document.getElementById('raster') as HTMLCanvasElement).toDataURL());
    expect(a).toBe(b);
    const pusty = await page.evaluate(() => {
      const c = document.createElement('canvas');
      const raster = document.getElementById('raster') as HTMLCanvasElement;
      c.width = raster.width; c.height = raster.height;
      return c.toDataURL();
    });
    expect(a).not.toBe(pusty);
  });
  test('wszystkie wdrożenia od razu mają klasę in', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.job:not(.in)')).toHaveCount(0);
  });
});

test('skrypt rastra nie blokuje renderowania (type="module")', async ({ page }) => {
  await page.goto('/');
  const skrypty = await page.evaluate(() =>
    [...document.querySelectorAll('script')].map((s) => s.getAttribute('type')),
  );
  expect(skrypty.length).toBeGreaterThan(0);
  expect(skrypty.every((t) => t === 'module')).toBe(true);
});

test('Kopiuj adres zmienia tekst przycisku', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const przycisk = page.locator('#copy-email');
  const przed = await przycisk.textContent();
  await przycisk.click();
  await expect(przycisk).not.toHaveText(przed!);
  await expect(przycisk).toHaveText(przed!, { timeout: 4000 });
});

test.describe('bez JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('widać nazwisko i sześć liczb, płyty ukryte, paski pełne', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    const liczby = page.locator('.job .fig .p-k');
    await expect(liczby).toHaveCount(6);
    for (const l of await liczby.all()) await expect(l).toBeVisible();
    const plyty = await page.locator('h1 .p').evaluateAll((e) => e.map((x) => getComputedStyle(x).display));
    expect(plyty.length).toBeGreaterThan(0);
    expect(plyty.every((d) => d === 'none')).toBe(true);
    const em = await page.locator('.job .fig').first().evaluate((e) => {
      const s = getComputedStyle(e);
      return parseFloat(s.backgroundSize.split(' ')[0]) / parseFloat(s.fontSize);
    });
    expect(em).toBeCloseTo(2.6, 1);
  });
});
