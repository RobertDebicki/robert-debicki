import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Kilka testów uruchamia skrypty przez `npx tsx` albo skanuje całe repozytorium; przy obciążonej maszynie 5 s nie wystarcza.
  test: { include: ['testy/jednostkowe/**/*.test.ts'], testTimeout: 30_000 },
});
