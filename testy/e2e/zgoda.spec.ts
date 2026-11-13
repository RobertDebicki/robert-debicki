import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Baner zgody na analitykę. Pozostałe testy startują z zapisaną decyzją „nie” (playwright.config.ts), tu zaczynamy od zera.
test.use({ storageState: { cookies: [], origins: [] } });

const TAG = 'https://www.googletagmanager.com/gtm.js?id=GTM-T7N4RZD8';

// Google jest podstawiony: test nie łączy się z prawdziwym serwerem, a my widzimy, czy żądanie w ogóle wyszło.
async function podstawGoogle(page: Page): Promise<string[]> {
  const zadania: string[] = [];
  await page.route('https://www.googletagmanager.com/**', (r) => {
    zadania.push(r.request().url());
    return r.fulfill({ contentType: 'application/javascript', body: '' });
  });
  return zadania;
}
const baner = (page: Page) => page.getByRole('dialog');
const wybor = (page: Page) => page.evaluate(() => localStorage.getItem('zgoda-analityka'));
// dataLayer trzyma obiekty `arguments`; zamieniamy je na zwykłe tablice, żeby sprawdzać dokładne wpisy.
// Zwykłe obiekty (np. zdarzenie gtm.start) zostają jako jednoelementowa tablica.
const wpisyDataLayer = (page: Page) =>
  page.evaluate(() =>
    ((window as any).dataLayer as any[]).map((e) => (Object.prototype.toString.call(e) === '[object Arguments]' ? Array.from(e) : [e])),
  );
const zgodaAnalityki = async (page: Page) => {
  const wpisy = await wpisyDataLayer(page);
  const stany = wpisy.filter((w) => w[0] === 'consent').map((w) => `${w[1]}:${(w[2] as any).analytics_storage}`);
  return stany;
};

test('pierwsza wizyta: baner widoczny, dwa równorzędne przyciski, nic nie idzie do Google', async ({ page }) => {
  const zadania = await podstawGoogle(page);
  await page.goto('/');
  await expect(baner(page)).toBeVisible();
  await expect(baner(page)).toHaveAccessibleName('Mierzę ruch na stronie?');
  const tak = baner(page).getByRole('button', { name: 'Akceptuję' });
  const nie = baner(page).getByRole('button', { name: 'Odrzucam' });
  const [a, b] = [await tak.boundingBox(), await nie.boundingBox()];
  expect(Math.abs(a!.height - b!.height)).toBeLessThan(2);
  expect(Math.abs(a!.width - b!.width)).toBeLessThan(40);
  await page.waitForTimeout(500);
  expect(zadania).toEqual([]);
});

test('domyślnie zgoda odmowna: w dataLayer jest consent default denied, zanim cokolwiek się załaduje', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  expect(await zgodaAnalityki(page)).toEqual(['default:denied']);
  const wpisy = await wpisyDataLayer(page);
  expect(JSON.stringify(wpisy)).not.toContain('gtm.start');
});

test('akceptuję: ładuje tag Google, chowa baner, pamięta wybór po odświeżeniu', async ({ page }) => {
  const zadania = await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('button', { name: 'Akceptuję' }).click();
  await expect(baner(page)).toBeHidden();
  await expect.poll(() => zadania).toContain(TAG);
  expect(await wybor(page)).toBe('tak');
  zadania.length = 0;
  await page.reload();
  await expect(baner(page)).toBeHidden();
  await expect.poll(() => zadania).toContain(TAG);
});

test('odrzucam: nie ładuje taga, chowa baner, pamięta wybór po odświeżeniu', async ({ page }) => {
  const zadania = await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('button', { name: 'Odrzucam' }).click();
  await expect(baner(page)).toBeHidden();
  expect(await wybor(page)).toBe('nie');
  await page.reload();
  await expect(baner(page)).toBeHidden();
  await page.waitForTimeout(500);
  expect(zadania).toEqual([]);
});

test('stopka: „Ustawienia cookies” otwiera baner, a odrzucenie po zgodzie usuwa ciasteczka _ga i przeładowuje stronę bez Google', async ({ page }) => {
  const zadania = await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('button', { name: 'Akceptuję' }).click();
  await expect.poll(() => zadania).toContain(TAG);
  await page.evaluate(() => { document.cookie = '_ga=GA1.1.1.1; path=/'; document.cookie = '_ga_ABC123=GS1.1.x; path=/'; document.cookie = 'inne=1; path=/'; });
  await page.locator('footer').getByRole('button', { name: 'Ustawienia cookies' }).click();
  await expect(baner(page)).toBeVisible();
  zadania.length = 0;
  const przeladowanie = page.waitForEvent('load');
  await baner(page).getByRole('button', { name: 'Odrzucam' }).click();
  await przeladowanie;
  await expect(baner(page)).toBeHidden();
  const ciasteczka = await page.evaluate(() => document.cookie);
  expect(ciasteczka).not.toContain('_ga');
  expect(ciasteczka).toContain('inne=1');
  expect(await wybor(page)).toBe('nie');
  expect(await zgodaAnalityki(page)).toEqual(['default:denied']);
  await page.waitForTimeout(500);
  expect(zadania).toEqual([]);
});

test('akceptuj, odrzuć i akceptuj ponownie: po ostatniej akceptacji zgoda to granted i tag się ładuje, a po odrzuceniu strona nie łączy się z Google', async ({ page }) => {
  const zadania = await podstawGoogle(page);
  await page.goto('/');
  const stopka = page.locator('footer').getByRole('button', { name: 'Ustawienia cookies' });
  await baner(page).getByRole('button', { name: 'Akceptuję' }).click();
  await expect.poll(() => zadania.length).toBe(1);
  await stopka.click();
  const przeladowanie = page.waitForEvent('load');
  await baner(page).getByRole('button', { name: 'Odrzucam' }).click();
  await przeladowanie;
  await page.waitForTimeout(400);
  expect(zadania).toHaveLength(1);
  await stopka.click();
  await baner(page).getByRole('button', { name: 'Akceptuję' }).click();
  await expect.poll(() => zadania.length).toBe(2);
  expect(await zgodaAnalityki(page)).toEqual(['default:denied', 'update:granted']);
  expect(await wybor(page)).toBe('tak');
});

test('zablokowana pamięć przeglądarki: przyciski nadal działają (baner się chowa, odrzucenie czyści ciasteczka)', async ({ page, context }) => {
  await podstawGoogle(page);
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('zablokowane', 'SecurityError'); } });
  });
  await page.goto('/');
  await context.addCookies([{ name: '_ga', value: 'GA1.1.1.1', domain: 'localhost', path: '/' }]);
  await expect(baner(page)).toBeVisible();
  await baner(page).getByRole('button', { name: 'Odrzucam' }).click();
  await expect(baner(page)).toBeHidden();
  expect((await context.cookies()).map((c) => c.name)).not.toContain('_ga');
});

test('po akceptacji w dataLayer jest zdarzenie startowe kontenera (gtm.start) i polecenie js', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('button', { name: 'Akceptuję' }).click();
  const wpisy = await wpisyDataLayer(page);
  expect(wpisy.some((w) => w[0] === 'js')).toBe(true);
  expect(wpisy.some((w) => (w[0] as any)?.event === 'gtm.js' && typeof (w[0] as any)['gtm.start'] === 'number')).toBe(true);
});

test('baner nie zabiera fokusu klawiatury przy wczytaniu strony', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await expect(baner(page)).toBeVisible();
  const aktywny = await page.evaluate(() => document.activeElement?.tagName);
  expect(aktywny).toBe('BODY');
});

test('po otwarciu z stopki fokus trafia na baner', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('button', { name: 'Odrzucam' }).click();
  await page.locator('footer').getByRole('button', { name: 'Ustawienia cookies' }).click();
  await expect(baner(page)).toBeFocused();
});

test('link do polityki prywatności z banera prowadzi na stronę polityki', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('link', { name: 'Polityka prywatności' }).click();
  await expect(page).toHaveURL(/\/polityka-prywatnosci\/$/);
  await expect(page.locator('h1')).toHaveText('Polityka prywatności');
});

test('wersja angielska: baner i polityka po angielsku', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/en/');
  await expect(baner(page)).toHaveAccessibleName('Can I measure traffic?');
  await expect(baner(page).getByRole('button', { name: 'Accept' })).toBeVisible();
  await expect(baner(page).getByRole('button', { name: 'Decline' })).toBeVisible();
  await baner(page).getByRole('link', { name: 'Privacy policy' }).click();
  await expect(page).toHaveURL(/\/en\/privacy-policy\/$/);
  await expect(page.locator('h1')).toHaveText('Privacy policy');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

for (const [adres, administrator, jezyk] of [
  ['/polityka-prywatnosci/', 'Robert Dębicki', 'pl'],
  ['/en/privacy-policy/', 'Robert Dębicki', 'en'],
] as const) {
  test(`polityka ${adres}: administrator, kontakt, Google Analytics, prawa, bez myślników`, async ({ page }) => {
    await podstawGoogle(page);
    const odp = await page.goto(adres);
    expect(odp!.status()).toBe(200);
    const tekst = await page.locator('main').innerText();
    expect(tekst).toContain(administrator);
    expect(tekst).toContain('robert.debicki7@gmail.com');
    expect(tekst).toContain('Google Analytics');
    expect(tekst).toMatch(jezyk === 'pl' ? /UODO/ : /supervisory authority/i);
    expect(tekst).not.toMatch(/[–—]/);
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

for (const szer of [360, 390, 1024, 1440]) {
  test(`baner przy ${szer} px: bez przewijania w bok, nie zasłania całego ekranu`, async ({ page }) => {
    await podstawGoogle(page);
    await page.setViewportSize({ width: szer, height: szer < 800 ? 700 : 900 });
    await page.goto('/');
    await expect(baner(page)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const ramka = await baner(page).boundingBox();
    expect(ramka!.height).toBeLessThan((szer < 800 ? 700 : 900) * 0.5);
    expect(ramka!.x).toBeGreaterThanOrEqual(0);
    expect(ramka!.x + ramka!.width).toBeLessThanOrEqual(szer + 1);
  });
}

for (const schemat of ['light', 'dark'] as const) {
  test(`kontrast baneru: 0 naruszeń w trybie ${schemat === 'light' ? 'jasnym' : 'ciemnym'}`, async ({ page }) => {
    await podstawGoogle(page);
    await page.emulateMedia({ colorScheme: schemat });
    await page.goto('/');
    await expect(baner(page)).toBeVisible();
    const wynik = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    expect(wynik.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
  });
}

test('klawiatura: po stopce Tab dochodzi do „Akceptuję”, potem do „Odrzucam”, Enter na „Odrzucam” zamyka baner', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await expect(baner(page)).toBeVisible();
  await page.locator('footer').getByRole('button', { name: 'Ustawienia cookies' }).focus();
  await page.keyboard.press('Tab');
  await expect(baner(page).getByRole('button', { name: 'Akceptuję' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(baner(page).getByRole('button', { name: 'Odrzucam' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(baner(page)).toBeHidden();
});

test('odrzucenie usuwa istniejące ciasteczko _ga ustawione na domenie hosta', async ({ page, context }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await context.addCookies([{ name: '_ga', value: 'GA1.1.1.1', domain: 'localhost', path: '/' }]);
  await baner(page).getByRole('button', { name: 'Odrzucam' }).click();
  expect((await context.cookies()).map((c) => c.name)).not.toContain('_ga');
});

// Zdarzenia kliknięć (e-mail, LinkedIn, kopiowanie adresu) to też dane analityczne: wysyłamy je do Google dopiero po zgodzie.
// Zdarzenia własne to zwykłe obiekty `{ event: nazwa }` (kontener GTM łapie je wyzwalaczem „Zdarzenie niestandardowe”).
const zdarzenia = async (page: Page) =>
  (await wpisyDataLayer(page))
    .map((w) => w[0] as { event?: string })
    .filter((e) => e && typeof e === 'object' && /^(klik_|kopiuj_)/.test(e.event ?? ''))
    .map((e) => e.event);
const klikniecia = async (page: Page) => {
  // Kliknięcie w mailto i w link zewnętrzny nie może nas wyprowadzić ze strony w teście.
  await page.evaluate(() => document.querySelectorAll('#kontakt a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault())));
  await page.locator('#email').click();
  await page.locator('#kontakt .links a[data-zdarzenie="klik_linkedin"]').click();
  await page.locator('#copy-email').click();
};

test('po zgodzie kliknięcia w e-mail, LinkedIn i kopiowanie adresu idą jako zdarzenia GA4', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('button', { name: 'Akceptuję' }).click();
  await klikniecia(page);
  expect(await zdarzenia(page)).toEqual(['klik_email', 'klik_linkedin', 'kopiuj_email']);
});

test('środkowy przycisk myszy na LinkedIn też liczy się jako klik_linkedin', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('button', { name: 'Akceptuję' }).click();
  await page.evaluate(() => document.querySelectorAll('#kontakt a').forEach((a) => a.addEventListener('auxclick', (e) => e.preventDefault())));
  await page.locator('#kontakt .links a[data-zdarzenie="klik_linkedin"]').click({ button: 'middle' });
  expect(await zdarzenia(page)).toEqual(['klik_linkedin']);
});

test('bez zgody kliknięcia nie tworzą żadnych zdarzeń w dataLayer', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await baner(page).getByRole('button', { name: 'Odrzucam' }).click();
  await klikniecia(page);
  expect(await zdarzenia(page)).toEqual([]);
});

test('przed decyzją (baner otwarty) kliknięcia nie tworzą zdarzeń, a po późniejszej zgodzie nie są odtwarzane', async ({ page }) => {
  await podstawGoogle(page);
  await page.goto('/');
  await klikniecia(page);
  await baner(page).getByRole('button', { name: 'Akceptuję' }).click();
  expect(await zdarzenia(page)).toEqual([]);
});

test('polityka wymienia kliknięcia w adres e-mail, numer telefonu i LinkedIn jako zbierane po zgodzie (PL i EN)', async ({ page }) => {
  await page.goto('/polityka-prywatnosci/');
  await expect(page.locator('main')).toContainText(/kliknięcia w adres e-mail, numer telefonu i link do LinkedIn/);
  await page.goto('/en/privacy-policy/');
  await expect(page.locator('main')).toContainText(/clicks on the email address, the phone number and the LinkedIn link/);
});
