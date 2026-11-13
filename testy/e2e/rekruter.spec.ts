// Testy idą na build z fiksturami (testy/fikstury/jezyki/ustawienia, blok rekruter), projekt "jezyki".
// Fikstura PL ma cvUrl, EN nie ma: tak widać przycisk CV i jego brak w jednym buildzie.
import { test, expect, type Page } from '@playwright/test';

const SITE = 'https://robert-debicki.pl';
const CV = 'https://robert-debicki.pl/cv/Robert-Debicki-CV.pdf';

const jsonLd = async (page: Page) =>
  Promise.all((await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)));
const wezly = (dane: any[]) => dane.flatMap((d) => d['@graph'] ?? [d]);

test('podstrona rekrutera: H1, title, opis, okruszki, rola i karta kandydata z telefonem', async ({ page }) => {
  await page.goto('/dla-rekruterow/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Szukam stałej roli');
  await expect(page).toHaveTitle('Automation Developer i AI Engineer | Robert Dębicki');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Szukam stałej roli Automation Developer/);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${SITE}/dla-rekruterow/`);
  const okruszki = page.locator('.okruszki');
  await expect(okruszki.locator('a[href="/"]')).toHaveText('Strona główna');
  await expect(okruszki).toContainText('Dla rekruterów');
  await expect(page.locator('.role')).toHaveText('Automation Developer / AI Engineer');
  await expect(page.locator('.lead')).toHaveText('Od 2024 automatyzuję procesy w firmach jako Automation Developer.');
  await expect(page.locator('aside.ticket header')).toContainText('Karta kandydata');
  await expect(page.locator('aside.ticket header')).toContainText('11.2026');
  await expect(page.locator('aside.ticket dt')).toHaveText(['Szukam', 'Forma', 'Kontakt']);
  await expect(page.locator('aside.ticket dd').last()).toHaveText('+48 600 100 200');
});

test('podstrona rekrutera: narzędzia, wybrane prace i etapy doświadczenia z ustawień i kolekcji', async ({ page }) => {
  await page.goto('/dla-rekruterow/');
  await expect(page.locator('.skills dt')).toHaveText(['Automatyzacja', 'AI i LLM', 'Rozwój aplikacji', 'Strony i sklepy', 'Bazy danych', 'CRM i integracje', 'Marketing i analityka', 'Hosting i Git']);
  const wybrane = page.locator('#wybrane');
  await expect(wybrane.locator('h2')).toHaveText('Systemy, które zbudowałem i przekazałem');
  await expect(wybrane.locator('.now-item h3')).toHaveText(['Wdrożenie tylko po polsku', 'Wdrożenie z tłumaczeniem', 'Projekt z tłumaczeniem']);
  await expect(wybrane.locator('a.dalej[href="/#wdrozenia"]')).toHaveText(['Szczegóły wdrożenia', 'Szczegóły wdrożenia']);
  await expect(wybrane.locator('.stamp')).toHaveCount(1);
  await expect(page.locator('#droga .when')).toHaveText(['2024-2026', 'od 08.2026']);
  // Zasady pracy zostają na stronie głównej, podstrona pokazuje same etapy.
  await expect(page.locator('#droga .how')).toHaveCount(0);
  await expect(page.locator('h2.sec-title')).toHaveCount(4);
});

test('podstrona rekrutera: kontakt z własnym tytułem, tel:, mailto:, LinkedIn i CV z ustawień', async ({ page }) => {
  await page.goto('/dla-rekruterow/');
  const kontakt = page.locator('#kontakt');
  await expect(kontakt.locator('h2')).toHaveText('Porozmawiajmy o roli Automation Developer albo AI Engineer');
  await expect(kontakt.locator('.sec-intro')).toHaveText('Wrocław albo zdalnie. Najszybciej odpowiadam mailowo.');
  await expect(kontakt.locator('a[href="tel:+48600100200"][data-zdarzenie="klik_telefon"]')).toBeVisible();
  await expect(kontakt.locator('a[href="mailto:robert.debicki7@gmail.com"][data-zdarzenie="klik_email"]')).toBeVisible();
  await expect(kontakt.locator('a[href^="https://www.linkedin.com/"]')).toBeVisible();
  await expect(page.locator('.hero a.btn[href^="https://www.linkedin.com/"]')).toHaveText('LinkedIn');
  await expect(page.locator('.hero a.btn.solid')).toHaveAttribute('href', CV);
  await expect(page.locator('.hero a.btn.solid')).toHaveText('Pobierz CV (PDF)');
  await expect(kontakt.locator(`a[href="${CV}"]`)).toHaveText('Pobierz CV (PDF)');
  // Na samej podstronie kontakt nie linkuje do niej.
  await expect(kontakt.locator('a[href="/dla-rekruterow/"]')).toHaveCount(0);
});

test('bez cvUrl (fikstura EN) przycisku CV nie ma, LinkedIn zostaje', async ({ page }) => {
  await page.goto('/en/for-recruiters/');
  await expect(page.locator('a[href*="/cv/"], a.btn.solid')).toHaveCount(0);
  await expect(page.getByText('Download resume')).toHaveCount(0);
  await expect(page.locator('.hero a.btn[href^="https://www.linkedin.com/"]')).toBeVisible();
});

test('JSON-LD: ProfilePage z mainEntity wskazującym tę samą osobę co strona główna', async ({ page }) => {
  for (const [adres, jezyk] of [['/dla-rekruterow/', 'pl'], ['/en/for-recruiters/', 'en']] as const) {
    await page.goto(adres);
    const profil = wezly(await jsonLd(page)).find((w) => w['@type'] === 'ProfilePage');
    expect(profil, adres).toBeTruthy();
    expect(profil.url).toBe(`${SITE}${adres}`);
    expect(profil.inLanguage).toBe(jezyk);
    expect(profil.mainEntity['@id']).toBe(`${SITE}/#osoba`);
    expect(profil.mainEntity.name).toBe('Robert Dębicki');
  }
});

test('menu: link „Dla rekruterów” zamiast „Doświadczenie”, na stronie głównej i na stronie usługi', async ({ page }) => {
  for (const adres of ['/', '/uslugi/ai-i-automatyzacja/']) {
    await page.goto(adres);
    const nav = page.locator('header nav');
    await expect(nav.locator('a[href="/dla-rekruterow/"]'), adres).toHaveText('Dla rekruterów');
    await expect(nav.locator('a[href="/#droga"]'), adres).toHaveCount(0);
  }
  await page.goto('/en/');
  await expect(page.locator('header nav a[href="/en/for-recruiters/"]')).toHaveText('For recruiters');
});

test('kontakt na stronie głównej i na stronie usługi linkuje do podstrony rekrutera', async ({ page }) => {
  for (const adres of ['/', '/uslugi/ai-i-automatyzacja/']) {
    await page.goto(adres);
    await expect(page.locator('#kontakt a[href="/dla-rekruterow/"]'), adres).toHaveText('Dla rekruterów');
  }
  await page.goto('/en/');
  await expect(page.locator('#kontakt a[href="/en/for-recruiters/"]')).toHaveText('For recruiters');
});

test('/en/for-recruiters/: lang, hreflang, przełącznik do PL i pozycje tylko z en.md', async ({ page }) => {
  await page.goto('/en/for-recruiters/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveText('Looking for a full-time role');
  await expect(page.locator('.okruszki a[href="/en/"]')).toHaveText('Home page');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/dla-rekruterow/');
  await expect(page.locator('link[rel=alternate][hreflang=pl]')).toHaveAttribute('href', `${SITE}/dla-rekruterow/`);
  await expect(page.locator('#wybrane .now-item')).toHaveCount(2);
  await expect(page.locator('#wybrane a.dalej').first()).toHaveAttribute('href', '/en/#wdrozenia');
  await page.goto('/dla-rekruterow/');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/en/for-recruiters/');
  await expect(page.locator('link[rel=alternate][hreflang=en]')).toHaveAttribute('href', `${SITE}/en/for-recruiters/`);
});
