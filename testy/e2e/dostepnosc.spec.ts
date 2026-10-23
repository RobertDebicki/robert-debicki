import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// `/` na prawdziwej treści (port 4399). `/en/` nie istnieje na prawdziwej treści do zadania 10,
// więc angielska strona jest sprawdzana na buildzie z fiksturami (port 4400).
const STRONY = [
  { nazwa: '/', url: 'http://localhost:4399/' },
  { nazwa: '/en/ (fikstury)', url: 'http://localhost:4400/en/' },
];

for (const s of STRONY) {
  for (const schemat of ['light', 'dark'] as const) {
    test(`kontrast tekstu: 0 naruszeń na ${s.nazwa} w trybie ${schemat === 'light' ? 'jasnym' : 'ciemnym'}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: schemat });
      await page.goto(s.url);
      await expect(page.locator('html')).toHaveClass(/ready/);
      await page.waitForFunction(() => [...document.querySelectorAll('h1 .p')].every((e) => getComputedStyle(e).opacity === '0'));
      if (process.env.AXE_SPRAWDZ_CZERWONE) await page.addStyleTag({ content: 'h1, h2, p { color: #bbb !important; }' });
      const wynik = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
      const opis = wynik.violations.flatMap((v) =>
        v.nodes.map((n) => `${n.target.join(' ')}: ${n.any[0]?.message ?? v.help}`),
      );
      expect(opis).toEqual([]);
    });
  }
}
