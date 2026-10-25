// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Build testowy (testy e2e języków) używa treści z fikstur: TRESC_BAZA wskazuje katalog z kolekcjami,
// WYJSCIE katalog wyjściowy. Bez tych zmiennych build jest zwykły: ./src/content i dist/.
const wyjscie = process.env.WYJSCIE;

// https://astro.build/config
export default defineConfig({
  site: 'https://robert-debicki.robert-debicki7.workers.dev',
  ...(wyjscie ? { outDir: wyjscie, cacheDir: `./node_modules/.astro-${wyjscie.replace(/\W/g, '')}` } : {}),
  // CSS w <style> zamiast osobnego pliku: usuwa blokujące renderowanie żądanie (Lighthouse: FCP).
  build: { inlineStylesheets: 'always' },
  // Zdjęcia z testy/fikstury/ trafiają do buildu tylko przy treści z fikstur (src/lib/wpisy.ts). Stała jest
  // wpisana w kod przy budowaniu, więc w buildzie produkcyjnym gałąź z fiksturami znika razem z plikami.
  vite: { define: { 'import.meta.env.OBRAZY_Z_FIKSTUR': JSON.stringify(Boolean(process.env.TRESC_BAZA)) } },
  integrations: [
    sitemap({
      // panel Sveltii nie jest stroną serwisu
      filter: (strona) => !new URL(strona).pathname.startsWith('/admin/'),
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-US' } },
    }),
  ],
});
