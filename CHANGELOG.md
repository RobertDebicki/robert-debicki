# CHANGELOG

## 2026-10-23 16:40, Claude Code

**✅ Zrobione:**
- Zadanie 10, część 1: narzędzia tłumaczenia PL na EN (en-US). `narzedzia/tlumaczenie/kontrola_tlumaczenia.py` (przeniesiony i dostosowany skrypt z pakietu `/tlumacz`): porównuje liczby powyżej dziewięciu i daty miesiąc-rok w obie strony (zgubione i dopisane fakty), kwoty liczy jak liczby („174 717 zł” = „PLN 174,717” = „174,717 PLN”), „10.2026” = „October 2026” = „10/2026”. BŁĄD: rozjazd faktów, pisownia en-GB (lista w `jezyki.json`), długi i krótki myślnik. UWAGA: cudzysłów spoza en-US, przecinek dziesiętny, polski zapis daty. Poprawka względem pakietu: „+28” nie jest już brany za kierunkowy kraju.
- `narzedzia/tlumaczenie/jezyki/en.md`: ogólne zasady z pakietu przestawione z en-GB na en-US, bez słowników i przykładów klientów. `jezyki.json` tylko z wpisem `en-US`.
- Testy: `narzedzia/tlumaczenie/test_kontrola.py` (13, unittest, działa też pod pytest), `testy/jednostkowe/stan-tlumaczen.test.ts` (3).
- `skrypty/skrot.ts` (wartość pola `zrodlo` liczona tym samym `skrotTresci` co build) i `skrypty/stan-tlumaczen.ts` (lista par ze stanem EN).
- Skill `.claude/skills/tlumacz-strone/SKILL.md`. `npm run sprawdz:tlumaczenia` wpięty w `npm run sprawdz` (a więc w workflow); pary bez `en.md` są pomijane.

**🚧 W toku / nie wdrożone:**
- Treść startowa jeszcze bez `en.md`. Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Zadanie 10, krok 5: tłumaczenie treści startowej skillem i kontrola `/en/` na prawdziwej treści.

## 2026-10-23 20:00, Claude Code

**✅ Zrobione:**
- Poprawki po przeglądzie zadania 9. Bramka Lighthouse w `lighthouserc*.json` używa `aggregationMethod: median-run` (zgodnie z "medianą z 3" w docs). `skrypty/lighthouse.mjs`: przebieg EN nie jest pomijany po błędzie PL (`blad = uruchom(...) || blad`), brak raportów nie wywraca skryptu.
- Wydajność `/` z 95 do 99, `/en/` (fikstury) z 97 do 99: CSS wstawiony do HTML (`build.inlineStylesheets: 'always'`) i preload pięciu fontów pierwszego ekranu. Wygląd bez zmian. Zestawienie przed i po: `docs/lighthouse/2026-10-23-poprawa.md`.

**🚧 W toku / nie wdrożone:**
- Nic nie jest wypchnięte; workflow wciąż nie uruchomiony w Actions.

**🎯 Następny krok:**
- Zadanie 10 z planu.

## 2026-10-23 19:00, Claude Code

**✅ Zrobione:**
- Zadanie 9: kontrole jakości i CI. `skrypty/sprawdz-tresc.ts` (`npm run sprawdz:tresc`) skanuje `src/` pod kątem pauz, półpauz, NDA, low-code, no-code, Bubble, Webflow, DTP, drukarni, serwisu chłodniczego i kolorów NoCodeWork; komunikat po polsku z plikiem i wierszem. AGENTS.md, docs/ i testy/ są pominięte celowo. Jedyna lista wzorców (`ZAKAZANE`) jest eksportowana i używana też przez test treści startowej (usunięta kopia inline z zadania 4).
- `npm run sprawdz` łączy: sekrety, treść, skany, Vitest, build, Playwright. `sprawdz:skany` jest teraz sprawdzany także po pełnej ścieżce w `public/` (np. `public/referencje/photo.jpg` jest zgłaszany); nowe testy.
- `testy/e2e/dostepnosc.spec.ts` (`@axe-core/playwright`): 0 naruszeń `color-contrast` na `/` oraz na `/en/` (build z fiksturami) w trybie jasnym i ciemnym. Kontrast przeszedł bez zmian tokenów, więc żadnych wartości kolorów nie zmieniono (stare = nowe). Test ma zdolność wykrywania: z wymuszonym szarym tekstem (`AXE_SPRAWDZ_CZERWONE=1`) wszystkie 4 padają.
- Lighthouse CI (`lighthouserc.json`, `lighthouserc-en.json`, `npm run sprawdz:lighthouse`), mobile, próg 0.95 w czterech kategoriach, build z `PUBLIC_INDEKSUJ=true`. Wynik (mediana z 3): `/` 95/100/100/100, `/en/` (fikstury) 97/100/96/100. Podsumowanie w `docs/lighthouse/`.
- `.github/workflows/strona.yml`: na każdy push i PR `npm run sprawdz` oraz Lighthouse, raport jako artefakt. Miejsce na wdrożenie (zadanie 12) oznaczone komentarzem, bez sekretów. Walidacja lokalna: parsowanie YAML; faktyczny przebieg dopiero po utworzeniu repozytorium i zgodzie na push.
- Testy animacji bez stałych `waitForTimeout`: oczekiwanie na warunek (`expect.poll`, klatki `requestAnimationFrame`), test klasy `in` na stałym oknie 390x700. 21 przebiegów (3 powtórzenia) bez błędu.

**🚧 W toku / nie wdrożone:**
- Pełny `npm run sprawdz` w jednym przebiegu zdarzało się zatrzymać na timeoutach 30 s przy obciążeniu komputera (load average 100+, inne procesy); kolejne kroki osobno: Vitest 44 PASS, Playwright 54 PASS (`--workers=2`), sekrety/treść/skany 0.
- Workflow nie był uruchomiony w GitHub Actions (repozytorium nie istnieje). Nic nie jest wypchnięte.
- Wydajność `/` wynosi dokładnie 95, margines zerowy.

**🎯 Następny krok:**
- Zadanie 10 z planu (kontrola tłumaczeń, dopisana do `npm run sprawdz` i workflow).

## 2026-10-23 18:00, Claude Code

**✅ Zrobione:**
- Zadanie 8: referencje. `src/lib/referencje.ts` (referencje w języku od najnowszej, `maListeReferencji`, `czyPdf`), komponent `Referencje.astro` (cytat jako `<blockquote>`, osoba, funkcja, firma, `<time>`, skan jako zwykły `<img>` z `loading="lazy"`, `width`/`height` i `aspect-ratio`, `alt` z imieniem i nazwiskiem, w linku `target="_blank"` do `skanUrl`; skan PDF tylko jako link). Referencja nie linkuje do żadnego wdrożenia ani projektu.
- Strony `/referencje/` i `/en/references/` (trasy rest jak listy wpisów), sekcja `#referencje` na `/` i `/en/` (trzy najnowsze i link do listy), link w menu. Bez referencji nie ma sekcji, strony ani linku. W EN tylko pozycje z `en.md`; przełączniki prowadzą do odpowiednika listy.
- `npm run sprawdz:skany` (`skrypty/sprawdz-skany.ts`): błąd, gdy w `src/content/referencje/` leży jakikolwiek obraz lub PDF albo w `public/` leży taki plik z `referenc` lub `skan` w nazwie. Pomija `node_modules`, `dist*`, `.git`, `.astro`; nie zgłasza plików tekstowych.
- Test, że build zatrzymuje się na referencji bez `zgoda: true` (`testy/jednostkowe/build-referencje.test.ts`): prawdziwy `npm run build` kończy się błędem po polsku z nazwą pliku i polem `zgoda`.
- Fikstury referencji w `testy/fikstury/jezyki/referencje/` (jedna z EN, jedna tylko PL ze skanem PDF). Testy: Vitest 37 PASS, Playwright 50 PASS, `npm run build` OK, `sprawdz:skany` 0.

**🚧 W toku / nie wdrożone:**
- Brak prawdziwych referencji i skanów w R2. Nic nie jest wypchnięte.
- Wyświetlanie `podpisZamazany` nie jest zaimplementowane (pole tylko w schemacie).

**🎯 Następny krok:**
- Zadanie 9 z planu.

## 2026-10-23 17:30, Claude Code

**✅ Zrobione:**
- Poprawki zadania 7: link do listy wpisów w menu nagłówka (`Wpisy` / `Posts`, tylko gdy lista istnieje), ostrzejszy test mapy strony (żaden `<loc>` pod `/en/` nie zawiera `tylko-pl`), scalony import w `wpisy/[adres].astro`. Testy e2e rozszerzone o menu (fikstury) i brak linku (prawdziwa treść).

**🚧 W toku / nie wdrożone:**
- Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Zadanie 8 z planu.

## 2026-10-23 17:00, Claude Code

**✅ Zrobione:**
- Zadanie 7: wpisy. `src/lib/wpisy.ts` (wpisy w języku posortowane po dacie malejąco, zdjęcia przez `import.meta.glob` i `astro:assets`, czytelna data, `maListe`). Komponenty `NajnowszeWpisy` (3 najnowsze, sekcja `#wpisy` na `/` i `/en/`), `ListaWpisow`, `StronaWpisu` (`<article>`, `<time datetime>`, `<Image>` z wymaganym `alt`, treść do 65ch). Strony: `/wpisy/`, `/wpisy/[adres]/`, `/en/posts/`, `/en/posts/[adres]/`. Etykiety `wpisy`, `wszystkieWpisy`, `brakWpisow` w PL i EN.
- Pusta kolekcja (stan produkcyjny): `/wpisy/` nie powstaje, sekcji na stronie głównej nie ma, w menu nie ma linku. Lista to trasa rest `[...lista].astro` ze `getStaticPaths` zwracającym pustą tablicę (jak `/en/`).
- EN: wpis bez `en.md` nie ma strony EN, nie jest na liście EN ani w mapie strony. Jego strona PL ma przełącznik do `/en/posts/` bez `hreflang`; wpis z tłumaczeniem ma odpowiednik i `hreflang`. Lista EN powstaje, gdy są wpisy PL i istnieje `ustawienia/en.md`.
- Pole `zdjecia.plik` to ścieżka od korzenia repozytorium (np. `/src/assets/wpisy/foto.jpg`); brak pliku zatrzymuje build komunikatem po polsku.
- Fikstury: dodane wpisy `najnowszy` (długi tytuł, zdjęcie) i `srodkowy` w `testy/fikstury/jezyki/wpisy/`, obraz w `testy/fikstury/zdjecia/`. `testy/e2e/wpisy.spec.ts` (fikstury) i `wpisy-puste.spec.ts` (prawdziwa treść). Zawężony test mapy strony w `jezyki.spec.ts` (strona PL wpisu tylko po polsku jest teraz w mapie, strony EN nie).
- Testy: Vitest 29 PASS, `npm run build` OK, Playwright 38 PASS.

**🚧 W toku / nie wdrożone:**
- Mapa strony nie ma `xhtml:link` dla wpisów (adresy PL i EN się różnią); `hreflang` jest w `<head>`.
- Ścieżka zdjęć w panelu Sveltia (`media_folder`) do ustalenia w zadaniu 8 zgodnie z konwencją `/src/assets/...`.
- Brak prawdziwych wpisów. Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Zadanie 8 z planu.

## 2026-10-23 16:10, Claude Code

**✅ Zrobione:**
- Zadanie 6: wersja angielska i routing języków. `src/lib/jezyki.ts`: `etykiety(jezyk)` zwraca prawdziwe angielskie (en-US) teksty interfejsu, słownik jest typowany `Record<Jezyk, Etykiety>`, więc brak klucza w EN to błąd kompilacji (bez cichego powrotu do polskiego). Dodane etykiety przycisku kopiowania, menu i stopki. `widocznaWJezyku` (EN bez `en.md` ukryte, `do-aktualizacji` widoczne) i `adresOdpowiednika` (wpis z tłumaczeniem: strona odpowiednika, bez: lista EN `/en/posts/`; referencje: listy; wdrożenia i projekty: strona główna).
- `Kontakt.astro` ustawia `data-skopiowano` i `data-zaznaczony` z `etykiety`, więc skrypt `plyty.ts` nie używa już polskich zapasów w EN. `Naglowek` i `Stopka` biorą teksty z `etykiety`.
- `Strona.astro`: `canonical` na każdej stronie, `hreflang` pl, en i x-default (PL) tylko gdy jest dokładny odpowiednik; osobny prop `przelacznik` dla listy zastępczej bez `hreflang`.
- `astro.config.mjs`: `site` `https://robert-debicki.robert-debicki7.workers.dev`, `@astrojs/sitemap` z i18n (pl domyślny, en pod `/en/`). Sitemapa zawiera tylko wygenerowane strony, więc pozycje bez `en.md` w niej nie występują.
- `/en/` to `src/pages/en/[...glowna].astro` (trasa rest zamiast `en/index.astro`), generowana tylko gdy istnieje `ustawienia/en.md`. Do czasu zadania 10 `/en/` nie powstaje, a `/` nie pokazuje przełącznika ani `hreflang`.
- Testy na fiksturach: `TRESC_BAZA` podmienia katalog treści, `WYJSCIE` katalog wyjściowy (osobny `cacheDir`). `skrypty/serwery-e2e.mjs` buduje zwykłą stronę (port 4399) i build z `testy/fikstury/jezyki/` (port 4400); projekt Playwright `jezyki` testuje drugi. Fikstury: pozycje z `en.md`, bez, ze starym tłumaczeniem, wpisy i ustawienia pl/en.
- Testy: Vitest 29 PASS, `npm run build` OK, Playwright 27 PASS (w tym 8 testów `jezyki` na fiksturach i test stanu `/en/` na prawdziwej treści).

**🚧 W toku / nie wdrożone:**
- Strony wpisów i referencji nie istnieją (zadania późniejsze); `adresOdpowiednika` dla nich sprawdzony tylko testem jednostkowym.
- `<url>` w mapie strony nie ma `xhtml:link` dla stron o różnych adresach PL i EN (`/wpisy/` kontra `/en/posts/`); `hreflang` jest w `<head>`.
- Prawdziwe `ustawienia/en.md` i `en.md` pozycji w zadaniu 10. Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Zadanie 7 z planu.

## 2026-10-23 15:40, Claude Code

**✅ Zrobione:**
- Zadanie 5: animacje przeniesione z makiety bez zmiany zachowania. `src/components/Raster.astro` (canvas `#raster` i skrypt: raster 15° pomarańcz i 75° żółty, rozkwit przy kursorze, paralaksa, wygaszanie do 30% po przewinięciu hero, słabszy na małych ekranach, skos na prawą stronę przy szerokich, 30 klatek na s, pauza w ukrytej karcie, ponowny odczyt motywu). Rysowanie startuje po `load` i `requestAnimationFrame`. Przy ograniczonym ruchu raster rysuje się raz (i przy przewijaniu).
- `src/scripts/plyty.ts`: klasa `ready` na `<html>`, klasa `in` na `.job` i `.now-item` przez IntersectionObserver, kopiowanie adresu z zapasem przez zaznaczenie. Skrypty to moduły Astro, nie blokują renderowania.
- Z markupu usunięte na stałe `class="ready"` i `class="job in"`; dodaje je skrypt. Bez JavaScript `<noscript>` w `<head>` ukrywa płyty i wydłuża paski liczb, więc cała treść jest widoczna.
- Test wizualny: `przygotuj()` wymusza stan końcowy (`ready`, `in`) na stronie i na makiecie.
- Testy: Vitest 22 PASS, `npm run build` OK, Playwright 18 PASS (w tym nowy `testy/e2e/animacje.spec.ts`: klasa `ready`, krycie płyt 0, `in` po wejściu w widok, brak przerysowania rastra przy reduced motion, moduły, przycisk kopiowania, strona bez JS).

**🚧 W toku / nie wdrożone:**
- Etykiety przycisku kopiowania ("Skopiowano", "Adres zaznaczony") są po polsku w skrypcie; wersja EN w zadaniu 6.
- Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Zadanie 6 z planu.

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
