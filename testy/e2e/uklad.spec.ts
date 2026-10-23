import { test, expect } from '@playwright/test';

const szerokosci = [360, 390, 1024, 1440];

for (const w of szerokosci) {
  test(`brak przewijania w bok przy ${w} px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const [scroll, inner] = await page.evaluate(() => [
      document.documentElement.scrollWidth,
      window.innerWidth,
    ]);
    expect(scroll).toBe(inner);
  });
}

test('fonty Anybody, Onest i Spline Sans Mono są załadowane', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const zaladowane = await page.evaluate(async () => {
    // wymuś pobranie podzbiorów użytych na stronie, w tym znaków polskich
    await Promise.all([
      document.fonts.load('850 1em "Anybody Variable"', 'Dębicki Zażółć'),
      document.fonts.load('400 1em "Onest Variable"', 'Dębicki Zażółć'),
      document.fonts.load('400 1em "Spline Sans Mono Variable"', 'Dębicki Zażółć'),
    ]);
    return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
  });
  for (const nazwa of ['Anybody', 'Onest', 'Spline Sans Mono']) {
    expect(zaladowane.some((f) => f.includes(nazwa)), `brak załadowanego fontu ${nazwa}`).toBe(true);
  }
});

test('znaki polskie Anybody mają glify (latin-ext)', async ({ page }) => {
  await page.goto('/');
  const ok = await page.evaluate(async () => {
    await document.fonts.load('850 1em "Anybody Variable"', 'ĘęŁłŃńŚśŹźŻż');
    return document.fonts.check('850 1em "Anybody Variable"', 'ĘęŁłŃńŚśŹźŻż');
  });
  expect(ok).toBe(true);
});

test('html lang to pl, jest noindex, a konsola jest czysta', async ({ page }) => {
  const bledy: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') bledy.push(m.text());
  });
  page.on('pageerror', (e) => bledy.push(String(e)));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  expect(bledy).toEqual([]);
});
