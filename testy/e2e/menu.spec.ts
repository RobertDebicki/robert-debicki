import { test, expect } from '@playwright/test';

// Na wąskim ekranie menu chowa się pod przyciskiem (decyzja Roberta 19.11). Na szerokim zostaje w jednym wierszu.
test('przy 390 px menu jest schowane pod przyciskiem i otwiera się, zamyka po kliknięciu linku i klawiszem Esc', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/');
  const przycisk = page.getByRole('button', { name: 'Menu' });
  const menu = page.locator('header nav');

  await expect(przycisk).toBeVisible();
  await expect(przycisk).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();
  await expect(page.locator('a.przelacznik')).toBeVisible();

  await przycisk.click();
  await expect(przycisk).toHaveAttribute('aria-expanded', 'true');
  await expect(menu.getByRole('link', { name: 'Wdrożenia' })).toBeVisible();

  await menu.getByRole('link', { name: 'Wdrożenia' }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#wdrozenia$/);

  await przycisk.click();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(przycisk).toBeFocused();
});

test('przy 1024 px menu jest widoczne bez przycisku', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  await expect(page.locator('header nav').getByRole('link', { name: 'Wdrożenia' })).toBeVisible();
});

test('bez JavaScriptu menu przy 390 px zostaje rozwinięte', async ({ browser }) => {
  const kontekst = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 800 } });
  const page = await kontekst.newPage();
  await page.goto('http://localhost:4399/');
  await expect(page.locator('header nav').getByRole('link', { name: 'Wdrożenia' })).toBeVisible();
  await expect(page.locator('.menu-przycisk')).toBeHidden();
  await kontekst.close();
});
