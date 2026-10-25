import { defineConfig, devices } from '@playwright/test';

// Test produkcyjny: bez lokalnych serwerów, adres z ADRES (patrz testy/e2e/produkcja.spec.ts).
export default defineConfig({
  testDir: 'testy/e2e',
  testMatch: /produkcja\.spec\.ts/,
  reporter: 'list',
  // Tuż po wdrożeniu brzeg Cloudflare może jeszcze chwilę podawać poprzednią wersję.
  retries: process.env.CI ? 2 : 0,
  use: { ...devices['Desktop Chrome'] },
});
