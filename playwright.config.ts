import { defineConfig, devices } from '@playwright/test';

const PORT = 4399;
const PORT_FIKSTURY = 4400;

export default defineConfig({
  testDir: 'testy/e2e',
  fullyParallel: true,
  reporter: 'list',
  projects: [
    // Prawdziwa treść z src/content. Testy języków (jezyki.spec.ts) idą na build z fiksturami.
    { name: 'chromium', testIgnore: /(jezyki|wpisy|referencje|produkcja)\.spec\.ts/, use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${PORT}` } },
    { name: 'jezyki', testMatch: /(jezyki|wpisy|referencje)\.spec\.ts/, use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${PORT_FIKSTURY}` } },
  ],
  webServer: {
    command: 'node skrypty/serwery-e2e.mjs',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
