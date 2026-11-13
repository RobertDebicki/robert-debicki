# Widoczność: klienci i rekruterzy. Plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strona przyciąga klientów (telefon, e-mail) i rekruterów: telefon, nowy przekaz, strony usług, podstrona dla rekrutera, dane strukturalne, angielskie adresy wpisów.

**Architecture:** Astro (statyczny HTML) z treścią w kolekcjach `src/content/<kolekcja>/<adres>/{pl,en}.md`, schematy Zod w `src/lib/schematy.ts`, panel Sveltia CMS z `src/lib/panel.ts`. Nowa kolekcja `uslugi` i nowe pola ustawień idą tą samą drogą. JSON-LD jako komponenty Astro w slocie `glowa` layoutu `Strona.astro`.

**Tech Stack:** Astro, TypeScript, Zod (`astro/zod`), Vitest, Playwright, Sveltia CMS.

**Spec:** `docs/superpowers/specs/2026-11-12-widocznosc-klienci-rekruterzy-design.md`

## Global Constraints

- Twarde zasady i ograniczenia z `AGENTS.md` obowiązują w całości (fonty, paleta, makieta, bez myślników w treści, bez nazw klientów, bez liczby projektów, bez zmyślonych faktów).
- Każdy commit z wpisem w `CHANGELOG.md` (format: ✅ Zrobione / 🚧 W toku / 🎯 Następny krok). Push i wdrożenie tylko za zgodą Roberta w danej wiadomości.
- Przed commitem: `npm run sprawdz:tresc` i `npm run sprawdz:sekrety` dają 0. Przed zgłoszeniem zadania jako gotowe: `npm run sprawdz` przechodzi.
- Teksty treści pisze Claude wyłącznie z faktów Roberta; Robert akceptuje teksty przed commitem treści.
- Nowe zdarzenia kliknięć tylko przez atrybut `data-zdarzenie` (obsługa w `src/scripts/zgoda.ts`, wysyłka po zgodzie).
- Każdy JSON-LD: `JSON.stringify(...).replaceAll('<', '\\u003c')` jak w `DaneStrukturalne.astro`.
- Lighthouse mobile co najmniej 95 w czterech kategoriach; brak przewijania w bok przy 360, 390, 1024, 1440 px (sprawdza `uklad.spec.ts`, nowe adresy dopisać do jego listy).

## Review Focus

- Numer z odstępami i `+48` (np. `+48 600 100 200`): tekst pokazuje się z odstępami, `href` to `tel:+48600100200`. Test w zadaniu 1.
- EN bez telefonu w `en.md` ustawień: brak pustego linku `tel:` i brak `telephone` w JSON-LD EN. Test w zadaniu 1.
- Tekst z `<` lub cudzysłowem w FAQ usługi: JSON-LD nadal parsuje się i nie zamyka znacznika `<script>`. Test w zadaniu 6.
- Adres CV spoza R2 albo http: build pada z czytelnym komunikatem po polsku. Test w zadaniu 8.
- Wpis EN bez pola `adresEn`: zostaje pod starym adresem, bez przekierowania i bez pętli. Test w zadaniu 9.

---

### Task 1: Telefon

**Files:**
- Modify: `src/lib/schematy.ts` (obiekt `kontakt` w `ustawienia`)
- Modify: `src/lib/panel.ts` (pole w ustawieniach, sekcja kontakt)
- Modify: `src/components/Kontakt.astro`
- Modify: `src/components/DaneStrukturalne.astro`
- Modify: `src/lib/llms.ts`, `src/pages/llms.txt.ts`
- Create: `src/lib/telefon.ts`
- Modify: `AGENTS.md` (opis regexu GTM: `klik_email|klik_linkedin|kopiuj_email|klik_telefon`)
- Modify: `src/content/ustawienia/pl.md` (numer od Roberta; `en.md` też, jeśli Robert chce numer w EN)
- Test: `testy/jednostkowe/telefon.test.ts`, `testy/jednostkowe/llms.test.ts`, `testy/jednostkowe/panel.test.ts`, `testy/e2e/seo.spec.ts`, `testy/e2e/strona-glowna.spec.ts`, fikstury `testy/fikstury/jezyki/ustawienia/{pl,en}.md`

**Interfaces:**
- Produces: `kontakt.telefon?: string` w danych ustawień; `hrefTelefonu(numer: string): string` w `src/lib/telefon.ts`; pole `telefon?: string` w `DaneLlms`.

- [ ] **Step 1: Testy jednostkowe (czerwone)**

```ts
// testy/jednostkowe/telefon.test.ts
expect(hrefTelefonu('+48 600 100 200')).toBe('tel:+48600100200');
expect(hrefTelefonu('600-100-200')).toBe('tel:600100200');
// schemat: ustawienia.shape.kontakt
expect(kontakt.safeParse({ ...poprawny, telefon: '+48 600 100 200' }).success).toBe(true);
expect(kontakt.safeParse({ ...poprawny, telefon: 'zadzwoń' }).success).toBe(false); // komunikat: 'Pole telefon musi być numerem, np. +48 600 100 200.'
expect(kontakt.safeParse(poprawny).success).toBe(true); // bez telefonu
// llms.test.ts
expect(llmsTxt({ ...dane, telefon: '+48 600 100 200' })).toContain('Kontakt: a@b.pl, telefon: +48 600 100 200, LinkedIn:');
expect(llmsTxt(dane)).not.toContain('telefon');
```

- [ ] **Step 2:** `npx vitest run testy/jednostkowe/telefon.test.ts testy/jednostkowe/llms.test.ts` → FAIL (brak modułu / brak pola).
- [ ] **Step 3: Implementacja.** `telefon: z.string().regex(/^\+?[0-9][0-9 -]{7,17}$/, { error: 'Pole telefon musi być numerem, np. +48 600 100 200.' }).optional()`. `hrefTelefonu` usuwa wszystko poza cyframi i wiodącym `+`. Panel: `tekst('telefon', 'Telefon', { required: false, hint: 'Z kierunkowym, np. +48 600 100 200. Puste pole ukrywa telefon.' })`. `Kontakt.astro`: gdy `k.telefon`, link `<a href={hrefTelefonu(k.telefon)} data-zdarzenie="klik_telefon">{k.telefon}</a>` nad e-mailem, w stylu istniejącego `.mail` (bez nowych kolorów). `DaneStrukturalne.astro`: `telephone: k.telefon` tylko gdy jest. `llms.txt.ts` przekazuje `k.telefon`.
- [ ] **Step 4: Fikstury i e2e.** Fikstura PL z `telefon: "+48 600 100 200"`, EN bez. W `strona-glowna.spec.ts`: `/` ma `a[href="tel:+48600100200"][data-zdarzenie="klik_telefon"]`; `/en/` nie ma `a[href^="tel:"]`. W `seo.spec.ts`: `osoba.telephone` = `'+48 600 100 200'` na `/`, `undefined` na `/en/`. W `zgoda.spec.ts` dopisać: po zgodzie klik w telefon wrzuca `{ event: 'klik_telefon' }` do `dataLayer` (wzór jak istniejący test `klik_email`).
- [ ] **Step 5:** `npm test && npm run build && npm run test:e2e` → PASS.
- [ ] **Step 6: Numer Roberta.** Zapytać Roberta o numer i o to, czy pokazać go też w EN. Wpisać do `src/content/ustawienia/pl.md` (i `en.md`). `npm run sprawdz` → PASS.
- [ ] **Step 7: Commit** z wpisem w CHANGELOG (`Telefon w kontakcie i danych strukturalnych, zdarzenie klik_telefon`).
- [ ] **Step 8: GTM i GA4 (po wdrożeniu, za zgodą Roberta).** Instrukcja dla Roberta albo Claude w Chrome za jego zgodą: wyzwalacz „Kliknięcia kontaktu”, regex `klik_email|klik_linkedin|kopiuj_email|klik_telefon`, Prześlij i opublikuj wersję. Sprawdzenie na żywej stronie skryptem Playwright (wzór: zapytanie `/g/collect` z `en=klik_telefon` po zgodzie). W GA4 oznaczyć `klik_telefon`, `klik_email`, `kopiuj_email` jako kluczowe, gdy pojawią się na liście.

### Task 2: Przekaz dla klienta i rekrutera

**Files:**
- Modify: `src/content/ustawienia/pl.md`, `src/content/ustawienia/en.md` (pola `kontakt.tytul`, `kontakt.wstep`, wiersz karty `Szukam`, `wdrozenia.tytul`)
- Test: istniejące e2e i `sprawdz:tresc`; zrzut `strona-glowna.spec.ts-snapshots` odświeżyć, jeśli się zmieni

- [ ] **Step 1:** Przygotować dla Roberta 2-3 warianty każdego z czterech pól (punkt wyjścia ze specu: „Wdrażam automatyzacje i AI w firmach. Jestem otwarty na stałą rolę Automation Developer albo AI Engineer.”). `wdrozenia.tytul` bez liczby. Bez myślników. Pokazać w rozmowie.
- [ ] **Step 2:** Po wyborze Roberta wpisać do `pl.md`; EN przez skill `/tlumacz-strone` (ustawienia).
- [ ] **Step 3:** `npm run sprawdz` → PASS (testy, które sprawdzają stary tekst nagłówka, zaktualizować do nowego).
- [ ] **Step 4: Commit** z wpisem w CHANGELOG.

### Task 3: BlogPosting we wpisach

**Files:**
- Create: `src/components/DaneWpisu.astro`
- Modify: `src/pages/wpisy/[adres].astro`, `src/pages/en/posts/[adres].astro` (komponent w `slot="glowa"`)
- Test: `testy/e2e/wpisy.spec.ts`

**Interfaces:**
- Produces: `<DaneWpisu jezyk={Jezyk} adres={string} entry={wpis} />`; Task 9 zmienia tylko przekazywany `adres`.

- [ ] **Step 1: Test e2e (czerwony)** na wpisie z fikstur PL i EN:

```ts
const bloki = await page.locator('script[type="application/ld+json"]').allTextContents();
const wpis = JSON.parse(bloki.find((b) => b.includes('BlogPosting'))!);
expect(wpis['@type']).toBe('BlogPosting');
expect(wpis.headline).toBe(/* tytul z fikstury */);
expect(wpis.datePublished).toBe(/* data z fikstury, YYYY-MM-DD */);
expect(wpis.inLanguage).toBe('pl'); // 'en' na /en/posts/
expect(wpis.author).toMatchObject({ '@type': 'Person', '@id': 'https://robert-debicki.pl/#osoba', name: 'Robert Dębicki' });
expect(wpis.mainEntityOfPage).toBe(page.url().replace(/^http:\/\/localhost:\d+/, 'https://robert-debicki.pl'));
// wpis z miniaturą: wpis.image to bezwzględny adres https; bez miniatury: brak pola image
```

- [ ] **Step 2:** `npx playwright test testy/e2e/wpisy.spec.ts` → FAIL.
- [ ] **Step 3:** Komponent: `headline`, `description` (zajawka), `datePublished` (`dataIso`), `inLanguage`, `author` (jak w teście, `url` strony głównej w danym języku), `mainEntityOfPage` (bezwzględny adres wpisu z `Astro.site`), `image` z miniatury przez `getImage` z `astro:assets` (bezwzględny URL). Ucieczka `<` wg Global Constraints.
- [ ] **Step 4:** test → PASS; `npm run sprawdz` → PASS.
- [ ] **Step 5: Commit** z wpisem w CHANGELOG.

### Task 4: Badanie fraz dla usług (bez kodu)

**Files:**
- Create: `docs/seo/frazy-uslug.md`

- [ ] **Step 1:** Dla usług pierwszej fali (automatyzacja procesów, voiceboty, strony i aplikacje z Claude Code) zebrać frazy PL i EN: podpowiedzi Google, „Ludzie pytają też”, tytuły stron z pierwszej dziesiątki wyników. Źródło przy każdej frazie (WebSearch, data). Bez wymyślonych wolumenów: gdy nie ma danych o liczbie wyszukiwań, napisać to wprost.
- [ ] **Step 2:** Dla każdej usługi zaproponować: frazę główną, adres PL (`/uslugi/<adres>/`), adres EN (`/en/services/<adres>/`), tytuł do 60 znaków z marką, 5 pytań FAQ z „Ludzie pytają też”.
- [ ] **Step 3:** Robert akceptuje adresy (po wdrożeniu ich zmiana wymaga 301).
- [ ] **Step 4: Commit** z wpisem w CHANGELOG.

### Task 5: Podgląd wyglądu (bez kodu strony)

**Files:**
- Create: `docs/makieta/uslugi.html` (strona usługi, sekcja usług na stronie głównej, podstrona rekrutera; style i fonty z `docs/makieta/index.html`)

- [x] **Step 1:** Skill `ui-ux-pro-max` w granicach makiety: tylko istniejące style (płyty, etykiety mono, `sec-title`), żadnych elementów z listy zakazów w `AGENTS.md`.
- [x] **Step 2:** Zrzuty 1440 i 390 (jasny i ciemny), bez przewijania w bok. Pokazać Robertowi.
- [x] **Step 3:** Poprawki do akceptacji Roberta (pętla: po 3 rundach bez akceptacji zatrzymać się i omówić podejście).
- [x] **Step 4: Commit** z wpisem w CHANGELOG.

> Zadanie 5 zatwierdzone przez Roberta 13.11 po 6 rundach uwag (kierunek: AI i automatyzacja jako jedna usługa).

### Task 6: Kolekcja `uslugi` i strony usług

**Files:**
- Modify: `src/lib/schematy.ts` (`uslugi`, dopisać do `SCHEMATY`), `src/content.config.ts`, `src/lib/panel.ts`, `src/lib/jezyki.ts` (`Kolekcja`, `adresOdpowiednika`, etykiety `uslugi` / `services`), `src/components/Naglowek.astro`
- Create: `src/lib/uslugi.ts`, `src/components/StronaUslugi.astro`, `src/components/DaneUslugi.astro`, `src/components/Uslugi.astro` (sekcja na stronie głównej), `src/pages/uslugi/[adres].astro`, `src/pages/uslugi/index.astro`, `src/pages/en/services/[adres].astro`, `src/pages/en/services/index.astro`
- Modify: `src/pages/index.astro`, `src/pages/en/[...glowna].astro` (sekcja usług), `src/pages/llms.txt.ts` (strony usług w `strony`)
- Test: `testy/jednostkowe/uslugi.test.ts`, `testy/jednostkowe/panel.test.ts`, `testy/e2e/uslugi.spec.ts`, `testy/e2e/uklad.spec.ts`, fikstury `testy/fikstury/jezyki/uslugi/<adres>/{pl,en}.md`

**Interfaces:**
- Produces: schemat `uslugi`:

```ts
z.object({
  tytul: z.string(),            // H1
  tytulSeo: z.string().max(60), // <title>
  opis: z.string().min(120).max(155), // meta description
  zajawka: z.string(),          // karta na stronie głównej
  problem: z.string(),
  rozwiazanie: z.string(),
  przyklad: z.object({ tekst: z.string(), link: z.string().regex(/^\/(en\/)?[a-z0-9/#-]*$/) }), // wymagany (spec)
  faq: z.array(z.object({ pytanie: z.string(), odpowiedz: z.string() })).min(3),
  kolejnosc: z.number(),
  adresEn: z.string().regex(/^[a-z0-9-]+$/).optional(), // tylko w en.md
  ...tlumaczenie,
})
```

- `uslugiWJezyku(jezyk: Jezyk): Promise<{ para, adres: string, entry }[]>` w `src/lib/uslugi.ts`, posortowane po `kolejnosc`; w EN `adres` = `entry.data.adresEn ?? para.adres`.
- `body` (markdown) opcjonalny, jak we wpisach.

- [ ] **Step 1: Testy jednostkowe (czerwone):** schemat odrzuca usługę bez `przyklad`, z `faq` krótszym niż 3, z `opis` 119 znaków, z `tytulSeo` 61 znaków; `uslugiWJezyku('en')` zwraca `adresEn`, gdy jest, inaczej polski adres; `panel.test.ts` (istniejąca zasada wymagalności ze schematu) obejmuje `uslugi`.
- [ ] **Step 2:** `npx vitest run` → FAIL.
- [ ] **Step 3:** Schemat, kolekcja, `uslugi.ts`, panel (kolekcja `uslugi`, `i18n multiple_files`, pola jak w schemacie, `adresEn` tylko w EN z podpowiedzią „angielski adres strony, małe litery i dywizy”).
- [ ] **Step 4:** `npx vitest run` → PASS.
- [ ] **Step 5: Testy e2e (czerwone)** w `uslugi.spec.ts` na fiksturach: `/uslugi/<adres>/` ma H1 = `tytul`, `<title>` = `tytulSeo`, link `tel:` i `mailto:` w wezwaniu na końcu, link przykładu; JSON-LD zawiera `Service` (`provider` `@id` osoby, `areaServed` `{ '@type': 'Country', name: 'Polska' }` / `'Poland'` w EN, `serviceType` = `tytul`) i `FAQPage` z tyloma `Question`, ile pozycji `faq`; fikstura z `<` i `"` w odpowiedzi FAQ parsuje się przez `JSON.parse`; `/uslugi/` listuje usługi po `kolejnosc`; `/en/services/<adresEn>/` istnieje, a przełącznik języka prowadzi między odpowiednikami; menu ma link do usług; strona główna ma sekcję usług z kartami; `/llms.txt` wymienia strony usług. Nowe adresy dopisane do `uklad.spec.ts`.
- [ ] **Step 6:** `npm run build && npx playwright test testy/e2e/uslugi.spec.ts` → FAIL.
- [ ] **Step 7:** Komponenty i strony według zatwierdzonego podglądu z zadania 5. Wezwanie do kontaktu korzysta z `kontakt.telefon` i `kontakt.email` (te same `data-zdarzenie` co w `Kontakt.astro`). Brak usług w danym języku: brak sekcji, linku w menu i stron listy (wzór: `maListe` we wpisach).
- [ ] **Step 8:** `npm run sprawdz` → PASS; `npm run sprawdz:lighthouse` na `/uslugi/<adres>/` → 95+ w czterech kategoriach.
- [ ] **Step 9: Commit** z wpisem w CHANGELOG.

### Task 7: Treść trzech usług

**Files:**
- Create: `src/content/uslugi/<adres>/pl.md` ×3 (adresy z zadania 4), `en.md` przez `/tlumacz-strone`

- [ ] **Step 1:** Szkic każdej usługi z faktów Roberta: wdrożenia (`src/content/wdrozenia/*`), projekty, wpisy, rozmowa z 12-13.11. Usługi i kolejność według specu (zmiana 13.11): AI i automatyzacja (`/uslugi/ai-i-automatyzacja/`), aplikacje, strony i narzędzia z AI, voiceboty AI. Teksty strony AI i automatyzacja przenieść z zatwierdzonego podglądu `docs/makieta/uslugi.html` (widok 1); przykład = obieg wniosków (istniejące wdrożenie), agenci AI u producenta mebli HoReCa w treści strony (brak wpisu w `wdrozenia`, chyba że Robert zdecyduje go dodać). Voiceboty: `voice-bot`; aplikacje: projekt z `src/content/projekty`. FAQ z zadania 4 i z podglądu. Przy każdym zdaniu z faktem: źródło w komentarzu roboczym dla Roberta (nie w pliku).
- [ ] **Step 2:** Robert akceptuje teksty. Brakujące fakty: pytać, nie zgadywać.
- [ ] **Step 3:** W opublikowanych wpisach dopisać po jednym linku do pasującej usługi (np. `n8n-make-czy-zapier` → AI i automatyzacja, `voice-bot-dla-firmy` → voiceboty, wpisy serii 2 po ich wydaniu), zdanie do akceptacji Roberta.
- [ ] **Step 4:** `npm run sprawdz:tresc` → 0; EN przez `/tlumacz-strone`; `npm run sprawdz` → PASS.
- [ ] **Step 5: Commit** z wpisem w CHANGELOG.

### Task 8: Podstrona dla rekrutera

**Files:**
- Modify: `src/lib/schematy.ts` (`ustawienia.rekruter`), `src/lib/panel.ts`, `src/lib/jezyki.ts` (etykiety), `src/components/Naglowek.astro`, `src/components/Kontakt.astro` (link do podstrony)
- Create: `src/components/StronaRekrutera.astro`, `src/components/DaneRekrutera.astro`, `src/pages/dla-rekruterow.astro`, `src/pages/en/for-recruiters.astro`
- Modify: `src/content/ustawienia/{pl,en}.md`, `src/pages/llms.txt.ts`
- Test: `testy/jednostkowe/tresc.test.ts` lub nowy `rekruter.test.ts`, `testy/e2e/rekruter.spec.ts`, `testy/e2e/uklad.spec.ts`

**Interfaces:**
- Produces: `ustawienia.rekruter`:

```ts
z.object({
  tytul: z.string(),
  wstep: z.string(),
  cvUrl: z.url({ protocol: /^https$/ }).refine(/* host kończy się na HOSTY_R2 */, { error: 'Pole cvUrl musi wskazywać na magazyn R2 (CV nie trafia do repozytorium).' }).optional(),
  wdrozenia: z.array(z.string()).max(3), // adresy folderów z src/content/wdrozenia
  projekty: z.array(z.string()).max(3),  // adresy folderów z src/content/projekty
})
```

- [ ] **Step 1: Testy (czerwone):** `cvUrl` `http://…` i `https://example.com/cv.pdf` odrzucone z komunikatem jak wyżej; adres z `.r2.dev` przyjęty; build z `wdrozenia: ['nie-ma']` pada z komunikatem `Podstrona rekrutera: nie ma wdrożenia "nie-ma".` (test w stylu `build-referencje.test.ts`).
- [ ] **Step 2:** `npx vitest run` → FAIL.
- [ ] **Step 3:** Schemat, panel (lista wyboru `relation` do kolekcji wdrożeń i projektów, jeśli Sveltia na to pozwala; inaczej lista tekstów z podpowiedzią), walidacja adresów przy buildzie.
- [ ] **Step 4: E2E (czerwone):** `/dla-rekruterow/` ma H1 = `rekruter.tytul`, wiersze z `narzedzia`, wybrane wdrożenia i projekty, etapy z `doswiadczenie`, LinkedIn, kontakt z `tel:` i `mailto:`; przycisk CV tylko z `cvUrl` (fikstura z i bez); JSON-LD `ProfilePage` z `mainEntity` `@id` osoby; link w menu i w sekcji kontakt; `/en/for-recruiters/` z odpowiednikiem w przełączniku.
- [ ] **Step 5:** Implementacja według podglądu z zadania 5; dane z istniejących komponentów (bez kopiowania treści).
- [ ] **Step 6:** `npm run sprawdz` → PASS; Lighthouse 95+.
- [ ] **Step 7:** Teksty `tytul`/`wstep` do akceptacji Roberta; CV: Robert wgrywa PDF do R2 i podaje adres (bez pliku przycisk się nie pokazuje).
- [ ] **Step 8: Commit** z wpisem w CHANGELOG.

### Task 9: Angielskie adresy wpisów

Warunek: seria 2 (`blog-cztery-wpisy`) jest już w `main`.

**Files:**
- Modify: `src/lib/schematy.ts` (`wpisy.adresEn`), `src/lib/panel.ts`, `src/lib/wpisy.ts` (`wpisyWJezyku`), `src/lib/jezyki.ts` (`adresOdpowiednika` dla wpisów), `hosting/htaccess`
- Modify: `src/content/wpisy/*/en.md` (pole `adresEn` dla każdego wpisu z EN)
- Test: `testy/jednostkowe/jezyki.test.ts`, nowy `testy/jednostkowe/przekierowania.test.ts`, `testy/e2e/jezyki.spec.ts`, `testy/e2e/wpisy.spec.ts`

**Interfaces:**
- Consumes: `adresEn` ma tę samą postać co w `uslugi` (zadanie 6).
- Produces: `wpisyWJezyku('en')` zwraca `adres = entry.data.adresEn ?? para.adres`; `adresOdpowiednika('pl', 'wpisy', para)` zwraca `/en/posts/<adresEn>/`.

- [ ] **Step 1: Testy (czerwone):** `adresOdpowiednika` z `adresEn` i bez; `przekierowania.test.ts` czyta wszystkie `src/content/wpisy/*/en.md` i dla każdego z `adresEn` różnym od folderu wymaga w `hosting/htaccess` linii `Redirect 301 /en/posts/<folder>/ https://robert-debicki.pl/en/posts/<adresEn>/`; brak linii dla wpisów bez `adresEn`; e2e: hreflang i przełącznik na wpisie PL wskazują nowy adres EN, mapa witryny zawiera nowy adres, a nie stary.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementacja; angielskie adresy dla istniejących wpisów zaproponować Robertowi (z tytułu EN, małe litery, dywizy) i wpisać po akceptacji; linie `Redirect 301` w `htaccess` (adres bezwzględny z https, jak przy `sitemap.xml`).
- [ ] **Step 4:** `npm run sprawdz` → PASS.
- [ ] **Step 5: Commit** z wpisem w CHANGELOG. Po wdrożeniu (za zgodą): `curl -sI` na każdy stary adres → `301` na nowy, nowy → `200`.

### Task 10: Wpis o sklepie WooCommerce + Mała Księgowość (zablokowane)

Warunek: Robert potwierdza, że sklep działa u klienta na nowym hostingu.

- [ ] **Step 1:** Wywiad z Robertem o fakty (co było, co zbudował, co się zmieniło), szkic wpisu w `docs/blog-szkice/` w formacie serii 2 (reguły SEO i weryfikacja faktów jak w `docs/blog-szkice/README.md`). Klient opisany branżą.
- [ ] **Step 2:** Pozycję `src/content/projekty/sklep-b2b` przenieść do `src/content/wdrozenia` (pola wg schematu `wdrozenia`, liczba tylko od Roberta). Link z wpisu i ze strony usługi automatyzacji.
- [ ] **Step 3:** `npm run sprawdz` → PASS; commit z wpisem w CHANGELOG.

### Task 11: Lista działań z linkami zewnętrznymi (bez kodu)

**Files:**
- Create: `docs/seo/linki-zewnetrzne.md`

- [ ] **Step 1:** Skille `link-building` i `directory-submissions`: lista w kolejności (GitHub i LinkedIn z linkiem do strony i usług, społeczność n8n, katalogi specjalistów i firm w Polsce, artykuły gościnne, prośba do klientów o polecenie z linkiem). Przy każdym: adres, co wpisać, gotowy tekst opisu (bez myślników, bez nazw klientów). Linki płatne tylko jako `sponsored`/`nofollow`.
- [ ] **Step 2:** Pokazać Robertowi. Rejestracje i wysyłki robi Robert.
- [ ] **Step 3: Commit** z wpisem w CHANGELOG.
