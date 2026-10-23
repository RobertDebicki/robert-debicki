import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { include: ['testy/jednostkowe/**/*.test.ts'] },
});
