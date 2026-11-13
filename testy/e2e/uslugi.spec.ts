// Testy idą na build z fiksturami (testy/fikstury/jezyki/uslugi), projekt "jezyki". Brak usług: uslugi-puste.spec.ts na prawdziwej treści.
import { test, expect, type Page } from '@playwright/test';

const SITE = 'https://robert-debicki.pl';

const jsonLd = async (page: Page) =>
  Promise.all((await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)));
const wezly = (dane: any[]) => dane.flatMap((d) => d['@graph'] ?? [d]);

test('strona usługi: H1, title, opis, okruszki i karta usługi', async ({ page }) => {
  await page.goto('/uslugi/ai-i-automatyzacja/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('AI i automatyzacja w Twojej firmie');
  await expect(page).toHaveTitle('AI i automatyzacja procesów w firmie | Robert Dębicki');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Wdrażam AI i automatyzuję procesy w firmach/);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${SITE}/uslugi/ai-i-automatyzacja/`);
  const okruszki = page.locator('.okruszki');
  await expect(okruszki.locator('a[href="/"]')).toHaveText('Strona główna');
  await expect(okruszki.locator('a[href="/uslugi/"]')).toHaveText('Usługi');
  await expect(okruszki).toContainText('AI i automatyzacja');
  await expect(page.locator('.role b')).toHaveText('/ Claude Code');
  await expect(page.locator('aside.ticket dt')).toHaveText(['Modele', 'Wdrażam', 'Łączę z', 'Przykłady', 'Miejsce']);
  await expect(page.locator('a.btn[href="#przyklad"]')).toBeVisible();
});

test('strona usługi: sekcje problem, kroki, przykłady i FAQ z treści', async ({ page }) => {
  await page.goto('/uslugi/ai-i-automatyzacja/');
  await expect(page.locator('#problem h3')).toHaveText(['Dokumenty czyta człowiek', 'Kampanie i ruch sprawdzane ręcznie', 'Blog pisany i tłumaczony od zera']);
  await expect(page.locator('#jak .when')).toHaveText(['Krok 1', 'Krok 2', 'Krok 3']);
  await expect(page.locator('#przyklad .job h3')).toHaveText(['Automatyzacja obiegu wniosków o dofinansowanie', 'Agenci AI do Google Ads, SEO i bloga']);
  await expect(page.locator('#przyklad .fig .p-k')).toHaveText(['setki', '3']);
  await expect(page.locator('#przyklad a.dalej[href="/#wdrozenia"]')).toHaveText('Wszystkie wdrożenia na stronie głównej');
  await expect(page.locator('#faq .job')).toHaveCount(6);
});

test('przykład bez liczby i bez linku: sama ikona, brak pustej liczby i linku', async ({ page }) => {
  await page.goto('/uslugi/voiceboty/');
  await expect(page.locator('#przyklad .job')).toHaveCount(1);
  await expect(page.locator('#przyklad .job svg.icon')).toHaveCount(1);
  await expect(page.locator('#przyklad .fig')).toHaveCount(0);
  await expect(page.locator('#przyklad a.dalej')).toHaveCount(0);
});

test('wezwanie na końcu strony usługi: tytuł kontaktu, tel: i mailto: z tymi samymi zdarzeniami co na stronie głównej', async ({ page }) => {
  await page.goto('/uslugi/ai-i-automatyzacja/');
  const kontakt = page.locator('#kontakt');
  await expect(kontakt.locator('h2')).toHaveText('Szukam stałej pracy jako Automation Developer albo AI Engineer');
  await expect(kontakt.locator('a[href="tel:+48600100200"][data-zdarzenie="klik_telefon"]')).toBeVisible();
  await expect(kontakt.locator('a[href="mailto:robert.debicki7@gmail.com"][data-zdarzenie="klik_email"]')).toBeVisible();
});

test('JSON-LD: Service z dostawcą, obszarem i typem oraz FAQPage z każdym pytaniem', async ({ page }) => {
  for (const [adres, kraj, pytania] of [['/uslugi/ai-i-automatyzacja/', 'Polska', 6], ['/en/services/ai-and-automation/', 'Poland', 3]] as const) {
    await page.goto(adres);
    const graf = wezly(await jsonLd(page));
    const usluga = graf.find((w) => w['@type'] === 'Service');
    expect(usluga, adres).toBeTruthy();
    expect(usluga.provider['@id']).toBe(`${SITE}/#osoba`);
    expect(usluga.areaServed).toEqual({ '@type': 'Country', name: kraj });
    expect(usluga.serviceType).toBe(await page.locator('h1').innerText());
    expect(usluga.url).toBe(`${SITE}${adres}`);
    const faq = graf.find((w) => w['@type'] === 'FAQPage');
    expect(faq.mainEntity).toHaveLength(pytania);
    expect(faq.mainEntity.every((q: any) => q['@type'] === 'Question' && q.acceptedAnswer['@type'] === 'Answer')).toBe(true);
  }
});

test('JSON-LD: odpowiedź FAQ z cudzysłowem, < i </script> parsuje się i nie zamyka znacznika', async ({ page }) => {
  await page.goto('/uslugi/voiceboty/');
  const graf = wezly(await jsonLd(page));
  const faq = graf.find((w) => w['@type'] === 'FAQPage');
  expect(faq.mainEntity[0].acceptedAnswer.text).toBe('Odpowiedź z cudzysłowem "tak" i znakiem < oraz </script> w treści.');
  await expect(page.locator('#faq .job').first()).toContainText('</script>');
});

test('lista /uslugi/ pokazuje usługi według kolejności z linkami do stron', async ({ page }) => {
  await page.goto('/uslugi/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main .now-item h2')).toHaveText(['Voiceboty', 'AI i automatyzacja']);
  await expect(page.locator('main .now-item a.dalej')).toHaveText(['Voiceboty', 'AI i automatyzacja']);
  await expect(page.locator('main a.dalej').first()).toHaveAttribute('href', '/uslugi/voiceboty/');
});

test('EN: strona pod adresEn, lista bez usługi tylko po polsku, przełącznik między odpowiednikami', async ({ page }) => {
  await page.goto('/en/services/ai-and-automation/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveText('AI and automation in your company');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/uslugi/ai-i-automatyzacja/');
  await expect(page.locator('link[rel=alternate][hreflang=pl]')).toHaveAttribute('href', `${SITE}/uslugi/ai-i-automatyzacja/`);
  await expect(page.locator('.okruszki a[href="/en/services/"]')).toHaveText('Services');

  await page.goto('/uslugi/ai-i-automatyzacja/');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/en/services/ai-and-automation/');
  await expect(page.locator('link[rel=alternate][hreflang=en]')).toHaveAttribute('href', `${SITE}/en/services/ai-and-automation/`);

  // Usługa tylko po polsku: przełącznik do listy EN, bez hreflang.
  await page.goto('/uslugi/voiceboty/');
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/en/services/');
  await expect(page.locator('link[rel=alternate][hreflang=en]')).toHaveCount(0);

  await page.goto('/en/services/');
  await expect(page.locator('main .now-item h2')).toHaveText(['AI and automation']);
  await expect(page.locator('a.przelacznik')).toHaveAttribute('href', '/uslugi/');
});

test('menu ma link do usług w obu językach', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header nav a[href="/uslugi/"]')).toHaveText('Usługi');
  await page.goto('/en/');
  await expect(page.locator('header nav a[href="/en/services/"]')).toHaveText('Services');
});

test('strona główna ma sekcję usług z kartami po otwarciu, przed wdrożeniami', async ({ page }) => {
  await page.goto('/');
  const sekcja = page.locator('#uslugi');
  await expect(sekcja.locator('h2')).toHaveText('Wdrażam AI i automatyzuję procesy');
  await expect(sekcja.locator('.now-item h3')).toHaveText(['Voiceboty', 'AI i automatyzacja']);
  await expect(sekcja.locator('.now-item a.dalej[href="/uslugi/ai-i-automatyzacja/"]')).toBeVisible();
  await expect(sekcja.locator('.now-item svg.icon')).toHaveCount(2);
  const kolejnosc = await page.locator('main > *').evaluateAll((el) => el.map((e) => e.id || e.className));
  expect(kolejnosc.indexOf('uslugi')).toBe(kolejnosc.indexOf('start') + 1);
  expect(kolejnosc.indexOf('wdrozenia')).toBe(kolejnosc.indexOf('uslugi') + 1);

  await page.goto('/en/');
  await expect(page.locator('#uslugi .now-item h3')).toHaveText(['AI and automation']);
  await expect(page.locator('#uslugi a.dalej')).toHaveAttribute('href', '/en/services/ai-and-automation/');
});

test('/llms.txt wymienia strony usług', async ({ request }) => {
  const tekst = await (await request.get('/llms.txt')).text();
  expect(tekst).toContain(`${SITE}/uslugi/`);
  expect(tekst).toContain(`${SITE}/uslugi/ai-i-automatyzacja/`);
  expect(tekst).toContain(`${SITE}/uslugi/voiceboty/`);
  expect(tekst).toContain(`${SITE}/en/services/ai-and-automation/`);
});
