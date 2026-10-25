import { defineConfig, devices } from '@playwright/test';

// Test produkcyjny: bez lokalnych serwerów, adres z ADRES (patrz testy/e2e/produkcja.spec.ts).
export default defineConfig({
  testDir: 'testy/e2e',
  testMatch: /produkcja\.spec\.ts/,
  reporter: 'list',
  use: { ...devices['Desktop Chrome'] },
});
