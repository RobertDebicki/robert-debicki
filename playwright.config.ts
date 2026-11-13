import { defineConfig, devices } from '@playwright/test';

const PORT = 4399;
const PORT_FIKSTURY = 4400;

// Baner zgody zasłaniałby zrzuty i pomiary układu. Poza testami zgody (zgoda.spec.ts czyści ten stan) każdy test startuje z wyborem „nie”.
const bezBanera = (port: number) => ({
  cookies: [],
  origins: [{ origin: `http://localhost:${port}`, localStorage: [{ name: 'zgoda-analityka', value: 'nie' }] }],
});

export default defineConfig({
  testDir: 'testy/e2e',
  fullyParallel: true,
  reporter: 'list',
  projects: [
    // Prawdziwa treść z src/content. Testy języków (jezyki.spec.ts) idą na build z fiksturami.
    { name: 'chromium', testIgnore: /(jezyki|wpisy|referencje|uslugi|produkcja)\.spec\.ts/, use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${PORT}`, storageState: bezBanera(PORT) } },
    { name: 'jezyki', testMatch: /(jezyki|wpisy|referencje|uslugi)\.spec\.ts/, use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${PORT_FIKSTURY}`, storageState: bezBanera(PORT_FIKSTURY) } },
  ],
  webServer: {
    command: 'node skrypty/serwery-e2e.mjs',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
