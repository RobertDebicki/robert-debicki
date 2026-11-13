import { test, expect } from '@playwright/test';

// Metadane dla wyszukiwarek i podglądu linku (LinkedIn, Slack, mail). Wartości z src/content/ustawienia.
for (const [adres, jezyk, tytul] of [
  ['/', 'pl', 'Robert Dębicki | Automation Developer, automatyzacje n8n, AI'],
  ['/en/', 'en', 'Robert Dębicki | Automation Developer, n8n and AI systems'],
] as const) {
  test(`${adres}: tytuł z frazami, Open Graph i Twitter Card`, async ({ page }) => {
    await page.goto(adres);
    await expect(page).toHaveTitle(tytul);
    const meta = (atr: string) => page.locator(`meta[property="${atr}"], meta[name="${atr}"]`);
    await expect(meta('og:title')).toHaveAttribute('content', tytul);
    await expect(meta('og:description')).toHaveAttribute('content', /Automation Developer/);
    // Długości pod wyniki wyszukiwania: tytuł do 60 znaków, opis 120 do 155.
    expect(tytul.length).toBeLessThanOrEqual(60);
    const opis = (await meta('description').getAttribute('content')) ?? '';
    expect(opis.length).toBeGreaterThanOrEqual(120);
    expect(opis.length).toBeLessThanOrEqual(155);
    await expect(meta('og:type')).toHaveAttribute('content', 'website');
    await expect(meta('og:url')).toHaveAttribute('content', new RegExp(`${adres.replace(/\//g, '\\/')}$`));
    await expect(meta('og:locale')).toHaveAttribute('content', jezyk === 'pl' ? 'pl_PL' : 'en_US');
    await expect(meta('og:image')).toHaveAttribute('content', /^https:\/\/.+\/og\.png$/);
    await expect(meta('og:image:width')).toHaveAttribute('content', '1200');
    await expect(meta('og:image:height')).toHaveAttribute('content', '630');
    await expect(meta('twitter:card')).toHaveAttribute('content', 'summary_large_image');
  });

  test(`${adres}: metatag weryfikacji własności Google Search Console`, async ({ page }) => {
    await page.goto(adres);
    await expect(page.locator('meta[name="google-site-verification"]')).toHaveAttribute('content', 'ug2LBsjDLEVt3TScZOzzdaCjnJznbJBmDzTL-L0K49E');
  });

  test(`${adres}: JSON-LD z Person i WebSite`, async ({ page }) => {
    await page.goto(adres);
    const bloki = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(bloki).toHaveLength(1);
    const dane = JSON.parse(bloki[0]);
    const graf: { '@type': string; [k: string]: unknown }[] = dane['@graph'];
    const osoba = graf.find((w) => w['@type'] === 'Person')!;
    expect(osoba.name).toBe('Robert Dębicki');
    expect(osoba.jobTitle).toBe('Automation Developer');
    expect(osoba.sameAs).toContain('https://www.linkedin.com/in/robert-d%C4%99bicki/');
    expect(osoba.knowsAbout).toEqual(expect.arrayContaining(['n8n', 'Make.com', 'Claude Code']));
    expect(osoba.telephone).toBe('+48 665 780 129');
    expect(osoba.address).toMatchObject({ addressLocality: 'Wrocław', addressCountry: 'PL' });
    const strona = graf.find((w) => w['@type'] === 'WebSite')!;
    expect(strona.inLanguage).toBe(jezyk);
  });

  test(`${adres}: H1 ma nazwisko raz, warstwy efektu nie są tekstem`, async ({ page }) => {
    await page.goto(adres);
    const tekst = await page.locator('h1').evaluate((h) => h.textContent!.replace(/\s+/g, ' ').trim());
    expect(tekst).toBe('Robert Dębicki');
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Robert Dębicki');
  });
}

test('pole kliknięcia adresu e-mail ma co najmniej 24 px wysokości na telefonie', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const wysokosc = await page.locator('#email').evaluate((a) => {
    const r = a.getBoundingClientRect();
    const po = getComputedStyle(a, '::after');
    return Math.max(r.height, r.height - parseFloat(po.top) - parseFloat(po.bottom));
  });
  expect(wysokosc).toBeGreaterThanOrEqual(24);
});

test('obraz podglądu /og.png ma 1200 x 630', async ({ request }) => {
  const odp = await request.get('/og.png');
  expect(odp.status()).toBe(200);
  const b = await odp.body();
  expect([b.readUInt32BE(16), b.readUInt32BE(20)]).toEqual([1200, 630]);
});

test('robots.txt wskazuje mapę strony', async ({ request }) => {
  const tekst = await (await request.get('/robots.txt')).text();
  expect(tekst).toMatch(/^User-agent: \*$/m);
  expect(tekst).toMatch(/^Sitemap: https:\/\/.+\/sitemap-index\.xml$/m);
});

test('llms.txt opisuje autora dla asystentów AI: nazwa, rola, kontakt, narzędzia i strony', async ({ request }) => {
  const odp = await request.get('/llms.txt');
  expect(odp.status()).toBe(200);
  expect(odp.headers()['content-type']).toMatch(/^text\/plain/);
  const tekst = await odp.text();
  expect(tekst.split('\n')[0]).toBe('# Robert Dębicki');
  expect(tekst).toMatch(/^> Automation Developer\./m);
  expect(tekst).toContain('robert.debicki7@gmail.com');
  expect(tekst).toContain('https://www.linkedin.com/in/robert-d%C4%99bicki/');
  expect(tekst).toMatch(/^- Automatyzacja: n8n, Make\.com$/m);
  expect(tekst).toMatch(/^- \[.+\]\(https:\/\/robert-debicki\.pl\/\)$/m);
  expect(tekst).toMatch(/^- \[.+\]\(https:\/\/robert-debicki\.pl\/en\/\)$/m);
  expect(tekst).toMatch(/^- \[.+\]\(https:\/\/robert-debicki\.pl\/polityka-prywatnosci\/\)$/m);
  expect(tekst).toMatch(/^- \[Dla rekruterów\]\(https:\/\/robert-debicki\.pl\/dla-rekruterow\/\)$/m);
  expect(tekst).toMatch(/^- \[For recruiters \(English\)\]\(https:\/\/robert-debicki\.pl\/en\/for-recruiters\/\)$/m);
  expect(tekst).not.toMatch(/[—–]/);
});
