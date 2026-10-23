# Strona osobista Roberta Dębickiego: plan budowy

> **Dla agentów:** WYMAGANY skill: superpowers:subagent-driven-development (zalecany) albo superpowers:executing-plans. Kroki mają pola wyboru (`- [ ]`) do odhaczania.

**Cel:** przenieść zatwierdzoną makietę do Astro z panelem Sveltia, wersją PL i EN, referencjami i wpisami, w publicznym repo z automatycznym wdrożeniem na obecny Worker Cloudflare.

**Architektura:** Astro generuje statyczny HTML do `dist/`. Treść to pliki Markdown w kolekcjach Astro (folder na pozycję, `pl.md` i opcjonalnie `en.md`), edytowane w Sveltii pod `/admin/`, która commituje do GitHuba. GitHub Actions buduje, uruchamia kontrole i wdraża `dist/` jako statyczne pliki Workera `robert-debicki`. Skany referencji leżą w R2, w repo jest tylko ich adres.

**Stos:** Astro 7, TypeScript strict, Sveltia CMS 0.221.8 (jsDelivr, jak w wcześniejszym projekcie), Vitest, Playwright, Lighthouse CI, Python 3 (kontrola tłumaczeń), wrangler 4.142.0, GitHub Actions.

**Projekt:** `docs/superpowers/specs/2026-10-23-strona-osobista-design.md`. Wzorzec panelu i CI: wcześniejszy projekt z tym samym zestawem (Astro + Sveltia + Cloudflare): `src/lib/panel.ts`, `.github/workflows/strona.yml`, `wrangler.jsonc`.

## Ograniczenia globalne

- Wygląd 1:1 z `docs/makieta/index.html` (kopia makiety z 23.10.2026). Zmiana wyglądu tylko dla kontrastu tekstu: przyciemnienie w ramach tej samej barwy i wpis w CHANGELOG.
- Fonty: Anybody (nagłówki, `wdth` 110-125, waga 800-850), Onest (tekst), Spline Sans Mono (etykiety). Paleta: `#ff5a1f`, `#d0201a`, `#ffc400`, `#131412`, papier `#f4f5f1`, tryb ciemny jak w makiecie.
- Polski pod `/`, angielski (en-US) pod `/en/`. Brak `en.md` ukrywa pozycję w EN, nie blokuje wdrożenia.
- Skany referencji nigdy w repo. Referencja wymaga `zgoda: true`.
- `noindex` sterowany zmienną `PUBLIC_INDEKSUJ` (domyślnie `false`).
- Lighthouse mobile ≥ 95 w czterech kategoriach. Brak przewijania w bok przy 360, 390, 1024, 1440 px.
- Repo publiczne: zero sekretów, kluczy i danych klientów poza treścią strony.
- Commit dopiero z wpisem w `CHANGELOG.md` (hook `changelog-przy-commicie`). Push na `main` i wdrożenie tylko za zgodą Roberta w danej wiadomości (hook `straznik-publikacji`).

## Na co uważać w recenzji

1. **Edycja PL po tłumaczeniu:** EN ma dostać stan `do-aktualizacji` i dalej się wyświetlać. Test w zadaniu 3 (`nieaktualne`).
2. **Pozycja tylko po polsku:** nie może pojawić się na liście EN, w mapie strony ani w `hreflang`, a przełącznik języka prowadzi do listy EN. Testy w zadaniu 6.
3. **Długi polski tytuł w szerokim Anybody przy 360 px:** nie może wyjść z kolumny. Fikstura z tytułem „Automatyzacja obiegu wniosków o dofinansowanie dla jednostek samorządu terytorialnego” w teście zadania 4.
4. **Pomarańczowy lub czerwony tekst na papierze i na ciemnym tle:** kontrast ≥ 4.5:1 dla tekstu poniżej 24 px. Test axe w zadaniu 9.
5. **Zapis z panelu bez altu albo bez zgody:** build ma się zatrzymać z komunikatem po polsku, który mówi, który plik i które pole. Testy w zadaniach 3 i 8.

---

### Zadanie 1: Repozytorium i szkielet

**Pliki:**
- Utwórz: katalog projektu (Astro, `npm create astro@latest -- --template minimal --typescript strict`), `AGENTS.md`, `CLAUDE.md` (tylko `@AGENTS.md`), `CHANGELOG.md`, `README.md` (PL i EN: co to, jak uruchomić, jak dodać treść), `LICENSE` (MIT dla kodu; w README zdanie, że treści i skany są © Robert Dębicki), `.gitignore`, `docs/makieta/index.html`, `docs/superpowers/specs/` i `plans/` (przeniesione z wcześniejszego repozytorium), `skrypty/skan-sekretow.ts`
- Test: `testy/jednostkowe/skan-sekretow.test.ts`

**Interfejsy:**
- Produkuje: `skanujSekrety(sciezki: string[]): { plik: string; wiersz: number; wzor: string }[]` oraz polecenie `npm run sprawdz:sekrety`.

- [ ] **Krok 1:** test `wykrywa klucz Cloudflare i token GitHub`: fikstura z `ghp_` + 36 znaków i 40-znakowym tokenem po `CLOUDFLARE_API_TOKEN=` daje 2 trafienia; fikstura z `docs/makieta/index.html` daje 0.
- [ ] **Krok 2:** `npx vitest run testy/jednostkowe/skan-sekretow.test.ts`, oczekiwane: FAIL (brak modułu).
- [ ] **Krok 3:** zaimplementuj `skanujSekrety` w `skrypty/skan-sekretow.ts` (wzorce: `ghp_`, `github_pat_`, `CLOUDFLARE_API_TOKEN=`, `-----BEGIN`, `sk-ant-`, `AKIA`).
- [ ] **Krok 4:** testy przechodzą; `npm run build` kończy się bez błędów; `npm run sprawdz:sekrety` na całym repo daje 0.
- [ ] **Krok 5:** `gh repo create RobertDebicki/robert-debicki --public --source . --remote origin` dopiero po zgodzie Roberta; push gałęzi `main` też za zgodą. Commit z wpisem w CHANGELOG.

### Zadanie 2: Tokeny, fonty i układ strony

**Pliki:**
- Utwórz: `src/styles/tokeny.css` (zmienne z `:root` makiety, jasny i ciemny), `src/styles/baza.css`, `src/layouts/Strona.astro`, `src/components/Naglowek.astro` (pasek barw, logo, menu, przełącznik języka), `src/components/Logo.astro`, `src/components/Stopka.astro`
- Test: `testy/e2e/uklad.spec.ts`

**Interfejsy:**
- Produkuje: `Strona.astro` z propsami `{ jezyk: 'pl' | 'en'; tytul: string; opis: string; odpowiednik?: string }`. `odpowiednik` to adres strony w drugim języku.

- [ ] **Krok 1:** test `uklad`: dla 360, 390, 1024, 1440 px `scrollWidth === innerWidth`; `document.fonts` ma załadowane `Anybody`, `Onest`, `Spline Sans Mono`; `<html lang>` równe `pl`; meta `robots` zawiera `noindex`, gdy `PUBLIC_INDEKSUJ` nie jest ustawione; brak błędów w konsoli.
- [ ] **Krok 2:** uruchom, oczekiwane FAIL.
- [ ] **Krok 3:** przenieś style z makiety. Fonty hostuj lokalnie przez Fontsource, jeśli pakiety mają osie `wdth` i znaki latin-ext; inaczej `<link>` do Google Fonts z `preconnect`, jak w makiecie. Zanotuj wybór w CHANGELOG.
- [ ] **Krok 4:** `npx playwright test testy/e2e/uklad.spec.ts`, oczekiwane PASS.
- [ ] **Krok 5:** commit.

### Zadanie 3: Model treści i powiązanie PL z EN

**Pliki:**
- Utwórz: `src/content.config.ts`, `src/lib/tresc.ts`, `src/lib/skrot.ts`
- Test: `testy/jednostkowe/tresc.test.ts`, fikstury w `testy/fikstury/tresc/`

**Interfejsy:**
- Produkuje kolekcje `wdrozenia`, `projekty`, `referencje`, `wpisy` i plik `ustawienia` (`src/content/ustawienia/pl.md`, `en.md`). Każda pozycja to folder `src/content/<kolekcja>/<adres>/` z `pl.md` i opcjonalnie `en.md`.
- Pola wspólne `en.md`: `tlumaczenie: 'ai' | 'sprawdzone'`, `zrodlo: string` (skrót SHA-256 treści `pl.md` z chwili tłumaczenia).
- Pola: `wdrozenia` = `tytul, branza, liczba, podpisLiczby, opis, stack: string[], ikona: 'naczepa' | 'kalendarz' | 'powrot' | 'sluchawka' | 'dokument' | 'wykres', plyta: 'pomarancz' | 'czerwien' | 'zolty', kolejnosc: number`. `projekty` = `tytul, branza, opis, stack, etap, stan: 'w-toku' | 'produkcja', kolejnosc`. `referencje` = `cytat, osoba, funkcja, firma, data, skanUrl (https, host R2), zgoda: true (literal), podpisZamazany: boolean`. `wpisy` = `tytul, data, zajawka, zdjecia: { plik, alt (min 5 znaków) }[]`, treść w Markdown.
- `pobierzPary(kolekcja): Promise<Para[]>`, gdzie `Para = { adres: string; pl: Wpis; en?: Wpis; stanEn: 'brak' | 'ai' | 'sprawdzone' | 'do-aktualizacji' }`.
- `skrotTresci(tekst: string): string` w `src/lib/skrot.ts`.

- [ ] **Krok 1:** testy: `para bez en ma stanEn brak`; `nieaktualne: en ze zrodlo innym niż skrót pl ma stanEn do-aktualizacji`; `referencja bez zgoda: true nie przechodzi schematu z komunikatem zawierającym nazwę pliku i słowo zgoda`; `zdjecie wpisu bez alt nie przechodzi schematu z komunikatem zawierającym alt`.
- [ ] **Krok 2:** uruchom, oczekiwane FAIL.
- [ ] **Krok 3:** zaimplementuj schematy (zod z `astro:content`), `skrotTresci` (SHA-256 z treści po normalizacji końców linii) i `pobierzPary`.
- [ ] **Krok 4:** testy PASS.
- [ ] **Krok 5:** commit.

### Zadanie 4: Treść startowa i strona główna PL

**Pliki:**
- Utwórz: 6 folderów w `src/content/wdrozenia/`, 4 w `src/content/projekty/`, `src/content/ustawienia/pl.md` (otwarcie, karta zlecenia, doświadczenie, trzy zasady pracy, narzędzia, kontakt); komponenty `Otwarcie.astro`, `KartaZlecenia.astro`, `Wdrozenia.astro`, `Ikona.astro`, `Projekty.astro`, `Doswiadczenie.astro`, `Narzedzia.astro`, `Kontakt.astro`; `src/pages/index.astro`
- Test: `testy/e2e/strona-glowna.spec.ts`, `testy/jednostkowe/tresc-startowa.test.ts`

**Interfejsy:**
- Konsumuje: `pobierzPary` z zadania 3, `Strona.astro` z zadania 2.
- Produkuje: komponenty przyjmujące `jezyk: 'pl' | 'en'`, używane ponownie w zadaniu 6.

- [ ] **Krok 1:** test treści: liczby wdrożeń w kolejności `150+`, `60 h`, `+28`, `2 min`, `setki`, `1 mies.`; pieczątki `Strony działają na produkcji`, `Działa na produkcji`, `Demo na serwerze testowym`, `Przed publikacją`; w całej treści 0 trafień wzorców zakazanych z „Ograniczeń globalnych”.
- [ ] **Krok 2:** test e2e: zrzut `/` przy 1440 i 390 px różni się od zrzutu `docs/makieta/index.html` o mniej niż 2% pikseli (`toHaveScreenshot` z `maxDiffPixelRatio: 0.02`, animacje wyłączone); fikstura z długim tytułem z „Na co uważać” pkt 3 nie wychodzi z kolumny przy 360 px.
- [ ] **Krok 3:** uruchom, oczekiwane FAIL.
- [ ] **Krok 4:** przenieś treść 1:1 z makiety do plików i zbuduj komponenty. Ikony to SVG z makiety, wybierane polem `ikona`.
- [ ] **Krok 5:** testy PASS; `npm run build` PASS.
- [ ] **Krok 6:** commit.

### Zadanie 5: Animacje

**Pliki:**
- Utwórz: `src/components/Raster.astro` (canvas i skrypt z makiety), `src/scripts/plyty.ts` (klasa `ready`, obserwator wejścia w widok, kopiowanie adresu)
- Test: `testy/e2e/animacje.spec.ts`

**Interfejsy:**
- Produkuje: `<Raster />` w `Strona.astro`; klasy `ready` na `<html>` i `in` na `.job`, jak w makiecie.

- [ ] **Krok 1:** testy: po 1,5 s `<html>` ma klasę `ready`, a warstwy płyt nazwiska mają `opacity: 0`; przy `reducedMotion: 'reduce'` canvas nie przerysowuje się po 2 s (porównanie dwóch odczytów `toDataURL`); skrypt rastra nie jest blokujący (atrybut `type="module"` albo ładowanie po `load`); kliknięcie „Kopiuj adres” zmienia tekst przycisku.
- [ ] **Krok 2:** FAIL.
- [ ] **Krok 3:** przenieś skrypty z makiety bez zmiany zachowania.
- [ ] **Krok 4:** PASS.
- [ ] **Krok 5:** commit.

### Zadanie 6: Wersja angielska

**Pliki:**
- Utwórz: `src/pages/en/index.astro`, `src/lib/jezyki.ts`, fikstury par z `en.md` i bez w `testy/fikstury/jezyki/` (prawdziwe `en.md` treści startowej powstają w zadaniu 10, krok 5)
- Modyfikuj: `astro.config.mjs` (`site`, `@astrojs/sitemap` z `i18n`)
- Test: `testy/e2e/jezyki.spec.ts`, `testy/jednostkowe/jezyki.test.ts`

**Interfejsy:**
- Produkuje: `adresOdpowiednika(jezyk, kolekcja, para): string` (strona odpowiednika albo lista EN, gdy `stanEn === 'brak'`); `etykiety(jezyk)` ze stałymi tekstami interfejsu.

- [ ] **Krok 1:** testy: pozycja bez `en.md` nie występuje na `/en/`, w `sitemap-index.xml` ani w `hreflang`; przełącznik na stronie takiej pozycji prowadzi do listy EN; `<link rel="alternate" hreflang="en">` i `canonical` są na stronach, które mają odpowiednik; `/en/` ma `lang="en"`.
- [ ] **Krok 2:** FAIL.
- [ ] **Krok 3:** zaimplementuj.
- [ ] **Krok 4:** PASS.
- [ ] **Krok 5:** commit.

### Zadanie 7: Wpisy

**Pliki:**
- Utwórz: `src/pages/wpisy/index.astro`, `src/pages/wpisy/[adres].astro`, `src/pages/en/posts/index.astro`, `src/pages/en/posts/[adres].astro`, `src/components/NajnowszeWpisy.astro`, fikstura wpisu testowego w `testy/fikstury/`
- Test: `testy/e2e/wpisy.spec.ts`

- [ ] **Krok 1:** testy: sekcja najnowszych wpisów nie istnieje na `/`, gdy kolekcja jest pusta; z fiksturą pokazuje 3 najnowsze; strona wpisu ma `<article>`, datę w `<time datetime>` i zdjęcia przez `astro:assets` z `alt`.
- [ ] **Krok 2:** FAIL. **Krok 3:** zaimplementuj. **Krok 4:** PASS. **Krok 5:** commit.

### Zadanie 8: Referencje

**Pliki:**
- Utwórz: `src/components/Referencje.astro`, `src/pages/referencje.astro`, `src/pages/en/references.astro`, `skrypty/sprawdz-skany.ts`
- Test: `testy/e2e/referencje.spec.ts`, `testy/jednostkowe/sprawdz-skany.test.ts`

**Interfejsy:**
- Produkuje: `npm run sprawdz:skany`, który kończy się błędem, gdy w repo jest plik `.jpg`, `.jpeg`, `.png`, `.webp` albo `.pdf` w `src/content/referencje/` lub w `public/`, z nazwą, która zawiera `referenc` albo `skan`.

- [ ] **Krok 1:** testy: sekcja nie istnieje bez referencji; z fiksturą pokazuje cytat jako tekst, osobę, funkcję, firmę i datę, a obraz skanu ma `alt` z nazwą osoby i otwiera `skanUrl`; referencja nie zawiera linku do żadnego wdrożenia; `sprawdz:skany` z fikstura `public/skan-referencji.jpg` zwraca błąd.
- [ ] **Krok 2:** FAIL. **Krok 3:** zaimplementuj. **Krok 4:** PASS. **Krok 5:** commit.

### Zadanie 9: Kontrole jakości i CI

**Pliki:**
- Utwórz: `skrypty/sprawdz-tresc.ts` (zakazane znaki i słowa z „Ograniczeń globalnych”), `testy/e2e/dostepnosc.spec.ts` (`@axe-core/playwright`), `lighthouserc.json`, `.github/workflows/strona.yml`
- Test: `testy/jednostkowe/sprawdz-tresc.test.ts`

**Interfejsy:**
- Produkuje: `npm run sprawdz` (sekrety, treść, skany, tłumaczenia, testy jednostkowe, build, e2e) i workflow, który uruchamia je przy każdym push i PR, a na `main` dodatkowo wdraża (zadanie 12).

- [ ] **Krok 2:** test axe: 0 naruszeń `color-contrast` na `/` i `/en/` w trybie jasnym i ciemnym.
- [ ] **Krok 3:** FAIL. **Krok 4:** zaimplementuj; jeśli kontrast nie przechodzi, przyciemnij odcień tokena tekstu w tej samej barwie i zapisz zmianę w CHANGELOG.
- [ ] **Krok 5:** `npx lhci autorun` z progiem 0.95 w czterech kategoriach dla `/` i `/en/` na profilu mobilnym; wynik zapisany w `docs/lighthouse/`.
- [ ] **Krok 6:** PASS lokalnie i w GitHub Actions na gałęzi roboczej. Commit.

### Zadanie 10: Tłumaczenie PL na EN

**Pliki:**
- Utwórz: `narzedzia/tlumaczenie/jezyki/en.md` (ogólne zasady z pakietu tłumaczenia z wcześniejszego projektu, przestawione na en-US, bez jego fraz i przykładów), `narzedzia/tlumaczenie/kontrola_tlumaczenia.py` i `jezyki.json` (tylko wpis `en-US`), `.claude/skills/tlumacz-strone/SKILL.md`
- Test: `narzedzia/tlumaczenie/test_kontrola.py`

**Interfejsy:**
- Produkuje: polecenie `python3 narzedzia/tlumaczenie/kontrola_tlumaczenia.py --zrodlo pl.md --tlumaczenie en.md` (kod 0 albo 1 z listą niezgodności); skill `/tlumacz-strone`, który: wyszukuje pary o `stanEn` `brak` albo `do-aktualizacji`, tłumaczy według `en.md` (tłumaczysz, nie piszesz), ustawia `tlumaczenie: ai` i `zrodlo`, uruchamia kontrolę i commituje z wpisem w CHANGELOG.

- [ ] **Krok 1:** testy: `liczba 174 717 zł w PL i 174,717 PLN w EN przechodzi`; `brak liczby 230 w EN nie przechodzi`; `pisownia colour w EN jest zgłaszana jako en-GB`; `— w EN nie przechodzi`.
- [ ] **Krok 2:** `python3 -m pytest narzedzia/tlumaczenie -q`, FAIL.
- [ ] **Krok 3:** przenieś i dostosuj skrypt kontroli z pakietu tłumaczenia z wcześniejszego projektu, dodaj regułę en-US.
- [ ] **Krok 4:** PASS. Kontrola wpięta w `npm run sprawdz` dla wszystkich par z `en.md`.
- [ ] **Krok 5:** przetłumacz treść startową skillem (to tworzy `en.md` dla zadania 6). Commit.

### Zadanie 11: Panel Sveltia

**Pliki:**
- Utwórz: `src/lib/panel.ts` (konfiguracja jako obiekt, eksport do YAML), `src/pages/admin/index.astro`, `src/pages/admin/config.yml.ts`, `docs/panel-instrukcja.md` (PL, dla Roberta: logowanie, dodawanie wpisu, projektu, referencji, tłumaczenie)
- Test: `testy/jednostkowe/panel.test.ts`

**Interfejsy:**
- Konsumuje: schematy z zadania 3.
- Produkuje: `/admin/` z kolekcjami odpowiadającymi schematom, `i18n` w strukturze `multiple_files` (`pl.md`, `en.md`), polski interfejs, logowanie przez `sveltia-cms-auth` (`base_url` z `PUBLIC_PANEL_LOGOWANIE`).

- [ ] **Krok 1:** testy: każde pole wymagane w schemacie zod jest `required` w panelu; pole `zgoda` referencji jest wymagane i ma podpowiedź o zgodzie klienta i zamazaniu podpisu; pole `alt` zdjęć jest wymagane; `en.md` nie zawiera pól `zrodlo` i `tlumaczenie` do edycji (ustawia je skill).
- [ ] **Krok 2:** FAIL. **Krok 3:** zaimplementuj według wzorca z wcześniejszego projektu (`src/lib/panel.ts`). **Krok 4:** PASS.
- [ ] **Krok 5:** sprawdź w dokumentacji Sveltii, czy wgrywanie mediów do R2 jest wspierane. Jeśli nie, zatrzymaj się i zapytaj Roberta (projekt, „Skany referencji poza repo”), proponując konkretny sposób wgrywania.
- [ ] **Krok 6:** z Robertem: aplikacja OAuth na GitHubie, Worker `sveltia-cms-auth`, bucket R2. Instrukcja klik po kliku w `docs/panel-instrukcja.md`; sekrety tylko w Cloudflare i GitHub, nigdy w repo.
- [ ] **Krok 7:** sprawdzenie ręczne: logowanie, zapis wpisu testowego tworzy commit na GitHubie, build go publikuje. Wpis testowy usunięty. Commit.

### Zadanie 12: Wdrożenie

**Pliki:**
- Utwórz: `wrangler.jsonc` (Worker `robert-debicki`, `assets.directory: ./dist`, `not_found_handling: 404-page`, `html_handling: auto-trailing-slash`), `src/pages/404.astro`
- Modyfikuj: `.github/workflows/strona.yml` (krok wdrożenia na `main`, `npx wrangler@4.142.0 deploy`, sekrety `CLOUDFLARE_API_TOKEN` i `CLOUDFLARE_ACCOUNT_ID` w GitHub)
- Test: `testy/e2e/produkcja.spec.ts` (uruchamiany z `ADRES=https://robert-debicki.robert-debicki7.workers.dev`)

- [ ] **Krok 1:** test: `/` i `/en/` zwracają 200, mają `noindex`, logo, 6 liczb wdrożeń; nieistniejący adres zwraca 404 ze stroną 404; `/admin/` zwraca 200.
- [ ] **Krok 2:** za zgodą Roberta: merge do `main`, wdrożenie przez workflow.
- [ ] **Krok 3:** test produkcyjny PASS. Wpis w CHANGELOG, że wcześniejsza makieta i jej `wrangler.jsonc` są historyczne, a źródłem strony jest to repo.
- [ ] **Krok 4:** commit.
