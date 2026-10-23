# CHANGELOG

## 2026-10-23 14:38, Claude Code

**✅ Zrobione:**
- Zadanie 4: treść startowa i strona główna PL. Sześć wdrożeń (`src/content/wdrozenia/<adres>/pl.md`), cztery projekty (`src/content/projekty/<adres>/pl.md`) i `src/content/ustawienia/pl.md` (otwarcie, karta zlecenia, nagłówki sekcji, doświadczenie z trzema zasadami pracy, narzędzia, kontakt). Teksty przeniesione 1:1 z makiety.
- Schemat `ustawienia` zaostrzony: wszystkie pola strony głównej wymagane, dokładnie trzy zasady, `email` jako adres e-mail, `linkedinUrl` jako https.
- Komponenty z propem `jezyk`: `Otwarcie`, `KartaZlecenia`, `Wdrozenia`, `Ikona` (SVG z makiety wybierane polem `ikona`), `Projekty`, `Doswiadczenie`, `Narzedzia`, `Kontakt`. Style sekcji 1:1 z makiety w `src/styles/sekcje.css`. Etykiety interfejsu w `src/lib/jezyki.ts` (`etykiety`, na razie tylko PL).
- `src/lib/pozycje.ts`: parowanie po folderze przez `pobierzPary` (sprawdzone na prawdziwej kolekcji), wartości z `data` wpisu kolekcji po walidacji, sortowanie po `kolejnosc`.
- `Strona.astro`: slot `poza-arkuszem` na pełnoszerokie pasmo kontaktu, klasa `ready` na `<html>` i `in` na `.job` (stan końcowy animacji statycznie, animacje w zadaniu 5).
- Testy: Vitest 22 PASS (liczby i pieczątki w kolejności, schematy, wzorce zakazane w `src/content/`), Playwright 11 PASS. Zrzut `/` przy 1440 i 390 px zgodny z makietą (przy progu 0 różnica 0 pikseli; makieta dostaje te same pliki fontów przez podstawienie żądań Google Fonts). Długi tytuł wstrzykiwany do strony przy 360 px nie wychodzi z kolumny. `h1` ma rodzinę Anybody.

**🚧 W toku / nie wdrożone:**
- Brak rastra i animacji (zadanie 5), wersji EN (zadanie 6; `etykiety('en')` zwraca na razie PL). Przycisk „Kopiuj adres” bez skryptu.
- Lista wzorców zakazanych jest w teście inline, zadanie 9 przepina ją na skrypt.
- Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Zadanie 5 z planu.

## 2026-10-23 15:10, Claude Code

**✅ Zrobione:**
- Zadanie 3: model treści. `src/content.config.ts` (loadery glob, folder na pozycję `<kolekcja>/<adres>/{pl,en}.md`, id wpisu `<adres>/<pl|en>`; `ustawienia` to pliki `pl.md` i `en.md` bez folderu), schematy zod w `src/lib/schematy.ts` dla `wdrozenia`, `projekty`, `referencje`, `wpisy`, `ustawienia`.
- `referencje.zgoda` to literał `true`, `alt` ma min. 5 znaków, `skanUrl` wymaga https i hosta R2. Komunikaty po polsku, z nazwą pola.
- `walidujPlik(sciezka, kolekcja)` (`src/lib/waliduj.ts`) zwraca błędy z przedrostkiem ścieżki pliku, do użycia w CI.
- `skrotTresci` (SHA-256, CRLF na LF), `zbudujPary` (czysta funkcja) i `pobierzPary` (nakładka na `getCollection`) w `src/lib/tresc.ts`. Stany: `brak`, `ai`, `sprawdzone`, `do-aktualizacji`.
- Testy: 13 w Vitest PASS (fikstury w `testy/fikstury/tresc/`), `npm run build` i `npm run test:e2e` (7) bez zmian.

**🚧 W toku / nie wdrożone:**
- Kolekcje puste (`.gitkeep`), treść w zadaniu 4. Pola `ustawienia` niezdefiniowane (luźny schemat) do zadań 5 i 7. `pobierzPary` nie była uruchomiona na prawdziwej kolekcji.
- Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Zadanie 4 z planu.

## 2026-10-23 14:30, Claude Code

**✅ Zrobione:**
- Zadanie 2: tokeny (`src/styles/tokeny.css`, jasny i ciemny jak w makiecie), styl bazowy (`baza.css`), układ `Strona.astro` (propsy `jezyk`, `tytul`, `opis`, `odpowiednik`), `Naglowek.astro` (pasek barw, logo `rd`, menu z kwadracikami, przełącznik języka linkujący do `odpowiednik`), `Logo.astro`, `Stopka.astro`, znaczniki cięcia.
- Fonty: wybrano hosting lokalny przez Fontsource (`@fontsource-variable/anybody` z osią `wdth` i latin-ext, `onest`, `spline-sans-mono`). Sprawdzone zrzutem: „Dębicki Zażółć" w Anybody `wdth` 125 renderuje się z polskimi znakami. Google Fonts niepotrzebne. Nazwy rodzin mają dopisek „Variable".
- `noindex, nofollow` w `<head>`, chyba że `PUBLIC_INDEKSUJ=true` (sprawdzone buildem w obu wariantach).
- Playwright (`npm run test:e2e`, port 4399, `--ignore-lock` bo Astro 7 domyślnie uruchamia preview w tle), test `testy/e2e/uklad.spec.ts`: 7 testów PASS. Vitest ograniczony do `testy/jednostkowe`.
- `.gitignore`: `.env.*`, `!.env.example`, `.dev.vars*`, wyniki Playwrighta.
- `src/pages/index.astro` to tymczasowy placeholder, zastąpią go kolejne zadania.

**🚧 W toku / nie wdrożone:**
- Brak sekcji treści, tła rastrowego (canvas) i animacji. Menu kieruje do kotwic, które powstaną w następnych zadaniach.
- Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Zadanie 3 z planu.

## 2026-10-23 13:45, Claude Code

**✅ Zrobione:**
- Zadanie 1: szkielet Astro (minimal, TypeScript strict), Vitest, skaner sekretów `skanujSekrety` z poleceniem `npm run sprawdz:sekrety`.
- Skopiowane: makieta (`docs/makieta/index.html`), projekt i plan (`docs/superpowers/`).
- AGENTS.md, CLAUDE.md, README (PL i EN), LICENSE (MIT).

**🚧 W toku / nie wdrożone:**
- Repozytorium GitHub nie jest założone, nic nie jest wypchnięte (czeka na zgodę Roberta).

**🎯 Następny krok:**
- Zadanie 2 z planu.
