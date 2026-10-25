# CHANGELOG

## 2026-10-25 18:07, Claude Code

**✅ Zrobione:**
- Skrót `zrodlo` liczony z treści, nie z zapisu: kanoniczny JSON nagłówka pl.md (klucze posortowane, bez `tlumaczenie` i `zrodlo`) plus treść z LF bez białych znaków na brzegach. Ta sama funkcja w `src/lib/skrot.ts` (używają jej `src/lib/tresc.ts`, `skrypty/skrot.ts`, `skrypty/stan-tlumaczen.ts`) i w Pythonie (`zrodlo_pl` w `kontrola_tlumaczenia.py`, PyYAML z wartościami jak w YAML 1.2, daty i `yes` zostają tekstem). Ponowny zapis z panelu w innym formacie YAML nie oznacza już EN jako nieaktualnego.
- Wspólna fikstura `testy/fikstury/skrot/`: ten sam pl.md z listą w nawiasach oraz z listą z myślnikami, cudzysłowami i CRLF; oba pliki dają w Vitest i w unittest skrót z `oczekiwany-skrot.txt`.
- `zrodlo` przeliczone we wszystkich en.md (11 w `src/content`, 6 w fiksturach); treść bez zmian, `stan-tlumaczen.ts` pokazuje `ai` dla 11 pozycji, fikstura `nieaktualne` zostaje nieaktualna.
- `kontrola_tlumaczenia.py --katalog`: gdy `zrodlo` w en.md różni się od skrótu pl.md, różnice faktów są UWAGĄ (kod 0), bo edycja samego PL nie może blokować wdrożenia. Przy zgodnym skrócie różnica faktów nadal jest BŁĘDEM. Testy obu przypadków.
- CI: `actions/setup-python@v7` (Python 3.12) i `narzedzia/tlumaczenie/requirements.txt` (PyYAML 6.0.3).
- Sprawdzone: Vitest 84 PASS, unittest 19 OK, `npm run sprawdz:tlumaczenia` 11 par bez błędów.

**🚧 W toku / nie wdrożone:**
- Krok setup-python w CI sprawdzi dopiero przebieg na GitHub (lokalnie Python 3.9 z PyYAML 6.0.3).

**🎯 Następny krok:**
- Zdjęcia z panelu, fikstura w buildzie, SEO i dostępność, CI, dokumentacja.

## 2026-10-25 18:02, Claude Code

**✅ Zrobione:**
- Usunięta nazwa klienta z projektu i planu (dwa miejsca), zastąpiona "we wcześniejszym projekcie".
- `skrypty/sprawdz-tresc.ts`: osobna kontrola "nazwy klientów" w `src/`, `docs/`, `AGENTS.md`, `README.md` i `CHANGELOG.md`. Uruchamia ją `npm run sprawdz:tresc`, czyli też `npm run sprawdz`. Lista `KLIENCI` nie zawiera nazw (repozytorium jest publiczne): ma skrót SHA-256 rdzenia i dozwolone końcówki odmiany, porównywane z początkiem słowa albo 2-3 sklejonych słów. Nowy wpis: `npx tsx skrypty/sprawdz-tresc.ts --skrot rdzen`.
- Testy na fikcyjnych nazwach (odmiana, nazwa z dwóch słów, inne końcówki bez trafienia), zwykłe słowa o podobnym początku bez trafień, repozytorium 0 trafień. Lokalnie (poza repo) sprawdzone, że lista łapie wszystkie 13 rdzeni z odmianą, także obie stare linie z projektu i planu.

**🚧 W toku / nie wdrożone:**
- Nazwa zostaje w historii git (bez przepisywania historii, zgodnie z poleceniem).

**🎯 Następny krok:**
- Pozostałe poprawki z przeglądu końcowego.

## 2026-10-25 17:36, Claude Code

**✅ Zrobione:**
- `strona.yml`: zadanie `wdroz` korzysta ze środowiska GitHub `claudeflare` (klucz `environment` z adresem Workera), czyli sekrety Cloudflare są czytane ze środowiska, a nie z sekretów repozytorium.

**🚧 W toku / nie wdrożone:**
- Pierwsze wdrożenie czeka na zgodę Roberta.

**🎯 Następny krok:**
- Push i obserwacja workflow `Strona` na GitHub.

## 2026-10-25 17:20, Claude Code

**✅ Zrobione:**
- Zadanie 12, część lokalna: `wrangler.jsonc` (Worker `robert-debicki`, katalog `./dist`, `not_found_handling: 404-page`, `html_handling: auto-trailing-slash`, `compatibility_date` 2026-10-01), `public/_headers` (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`; CSP pominięte, bo panel Sveltii i R2 potrzebują osobnych zezwoleń).
- `src/pages/404.astro` w stylu strony (PL z krótką linią EN, linki do `/` i `/en/`), zawsze `noindex` (nowy opcjonalny prop `noindex` w układzie `Strona.astro`), poza mapą witryny (brak w `sitemap-0.xml`).
- `strona.yml`: zadanie `wdroz` (tylko push na `main`, po `kontrola`, kroki pomijane gdy brak sekretów `CLOUDFLARE_API_TOKEN` i `CLOUDFLARE_ACCOUNT_ID`), blokada gdy ustawione `TRESC_BAZA`, `WYJSCIE` lub `PUBLIC_INDEKSUJ`, polecenie wrangler 4.142.0. Akcje podniesione do `checkout@v7`, `setup-node@v7`, `upload-artifact@v7` (action.yml każdej: node24).
- Test produkcyjny `testy/e2e/produkcja.spec.ts` (tylko z `ADRES`, inaczej pominięty), `playwright.produkcja.config.ts` i skrypt `npm run test:produkcja`.
- Logowanie do panelu: token GitHub (fine-grained, Contents read/write, tylko to repozytorium, ważność 1 rok). `docs/panel-instrukcja.md` przepisana, usunięte wzmianki o Workerze `sveltia-cms-auth`. Ścieżka kodu bez `base_url` zostaje.
- Sprawdzone: Vitest 76 PASS, build OK, Playwright 73 PASS, `sprawdz:tresc` 0, `sprawdz:sekrety` 0, YAML workflow się parsuje, `npm run test:produkcja` bez `ADRES` daje 4 pominięte.

**🚧 W toku / nie wdrożone:**
- Nie wypchnięte, nie wdrożone. Próba suchego przebiegu wrangler nie została uruchomiona (blokada hooka publikacji).
- Test produkcyjny nie przeszedł na prawdziwym adresie. Na lokalnym serwerze statycznym przeszły noindex, logo, 6 liczb i `/admin/`; nagłówek nosniff i stronę 404 sprawdzi dopiero Cloudflare.
- Sekrety `CLOUDFLARE_API_TOKEN` i `CLOUDFLARE_ACCOUNT_ID` nie są ustawione w GitHub.

**🎯 Następny krok:**
- Za zgodą Roberta: dodać sekrety w GitHub, wypchnąć `main`, uruchomić `ADRES=https://robert-debicki.robert-debicki7.workers.dev npm run test:produkcja`, dopisać w `Robert_CV/CHANGELOG.md`, że `Robert_CV/strona/` i `wrangler.jsonc` są historyczne.

## 2026-10-23 19:40, Claude Code

**✅ Zrobione:**
- Logo od grafika: źródło w `docs/logo/zrodlo-grafik.svg` (eksport CorelDRAW). Skrypt `skrypty/logo-z-fontu.mjs` zamienia napis z fontów SVG (Favela Regular i Medium, przeglądarki ich nie renderują) na ścieżki z wpisaną transformacją i generuje `src/assets/logo/znak.svg`, `logo-pelne.svg` (kopie w `docs/logo/`) oraz `public/favicon.svg`. viewBox przycięty do treści, czarne części `fill="currentColor"`, belka `class="logo-pomarancz"` z `#EF7F1A`.
- Nagłówek: znak logo zamiast ligatury "rd" (wysokość 29 px jak wcześniej), link ma nazwę "Robert Dębicki, strona główna" / "Robert Dębicki, home page" (etykieta `stronaGlowna`), SVG `aria-hidden`.
- Favicony: SVG z trybem ciemnym (czarny staje się biały), `favicon-32.png`, `apple-touch-icon.png` (180 px, białe tło) i `favicon.ico` (zamiast domyślnej ikony Astro) z `skrypty/favicony.mjs` (sharp z zależności Astro, bez nowego wpisu w package.json).
- Paleta: `--c` z `#ff5a1f` (jasny) i `#ff6a33` (ciemny) na `#EF7F1A` w obu trybach. Pomarańcz nie jest kolorem małego tekstu (tylko kwadraty, belki, cień przycisku, płyta nagłówka h1, która znika). Kontrast `#EF7F1A`: 2,48 na papierze `#f4f5f1` (było 2,85), 7,01 na `#0f100e` (było 6,69). Test axe color-contrast: 0 naruszeń w 6 przebiegach, bez korekt.
- Test zgodności z makietą: `docs/makieta/index.html` zostaje bez zmian jako zatwierdzony wzorzec, a test w swojej kopii podmienia tylko celowe zmiany: token `--c`, SVG logo (z `znak.svg`) i reguły CSS logo (z `baza.css`). Brak któregoś fragmentu w makiecie przerywa test. Próg 2% bez zmian.
- Testy: `testy/jednostkowe/logo.test.ts` (pliki logo czyste, currentColor, pomarańcz, brak starego pomarańczu w `src/`), `testy/e2e/logo.spec.ts` (znak w nagłówku, nazwa dostępna, wysokość, favicony 200 z właściwym typem).
- Sprawdzone: Vitest 76 PASS, build OK, Playwright 73 PASS, `sprawdz:tresc` 0, `sprawdz:sekrety` 0, Lighthouse `/` i `/en/`: 99/100/100/100.

**🚧 W toku / nie wdrożone:**
- Nie wypchnięte. Gałąź `budowa`, scalona do `main` fast-forwardem.
- Pełne logo z napisem (`logo-pelne.svg`) nie jest jeszcze nigdzie użyte na stronie.

**🎯 Następny krok:**
- Akceptacja wyglądu nagłówka i favicony przez Roberta.

## 2026-10-23 19:30, Claude Code

**✅ Zrobione:**
- Lighthouse w CI: wydajność jest ostrzeżeniem (`CI=true` ustawia `warn` w wygenerowanym konfigu, próg 0.95 bez zmian), pozostałe kategorie nadal blokują. Lokalnie wszystkie cztery blokują. Podsumowanie w `docs/lighthouse/` zapisuje tryb i oznacza wynik wydajności jako ostrzeżenie. Przyczyna: maszyny Actions dają 76-77, lokalnie 99.
- `strona.yml`: artefakt Lighthouse zawiera ukryty katalog `.lighthouseci/` (`include-hidden-files: true`).
- Sprawdzone: `CI=true npm run sprawdz:lighthouse` i wersja lokalna zwracają kod 0, wygenerowane konfigi mają `warn` (CI) i `error` (lokalnie), YAML workflow się parsuje.

**🚧 W toku / nie wdrożone:**
- Nie wypchnięte. Gałąź `budowa`, scalona do `main` fast-forwardem.
- Test z wynikiem wydajności poniżej 95 w CI nie był uruchomiony (wszystkie przebiegi dały 99), więc ścieżka "(ostrzeżenie)" w podsumowaniu jest nieprzetestowana.

**🎯 Następny krok:**
- Ponowny przebieg Actions. Pomiar wydajności na wdrożonej stronie w zadaniu 12.

## 2026-10-23 19:19, Claude Code

**✅ Zrobione:**
- CI: Node 24 z `.nvmrc` (setup-node czyta wersję z pliku zamiast `node-version: 22`), engines w `package.json` (`>=22.23.4`). Przyczyna: Node 22.23.3 w Actions poniżej wymagań Astro.

**🚧 W toku / nie wdrożone:**
- Nic.

**🎯 Następny krok:**
- Ponowny przebieg Actions.

## 2026-10-23 18:00, Claude Code

**✅ Zrobione:**
- Dokumenty `docs/superpowers/specs/` i `plans/` przygotowane pod publiczne repo: usunięte nazwy klientów, osób, cudzej strony i lokalne ścieżki, zastąpione neutralnym opisem wcześniejszego projektu. Uzasadnienia osobiste zamienione na zwykłe reguły treści. Decyzje, architektura, pola i testy bez zmian. `grep` po wzorcach wrażliwych: 0 trafień.

**🚧 W toku / nie wdrożone:**
- Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Kroki 6-7 zadania 11 po decyzji Roberta w sprawie skanów w R2.

## 2026-10-23 17:30, Claude Code

**✅ Zrobione:**
- Poprawki po recenzji zadania 11A: `initial_locales: 'default'` (tekst, zgodnie z typami Sveltii 0.221.8; wcześniej błędnie tablica), pole `alt` wymusza w panelu minimum 5 znaków (test porównuje z `minLength` ze schematu Zod), skrypt Sveltii z jsDelivr ma SRI `sha384` i `crossorigin="anonymous"` (suma policzona z pobranego pliku 0.221.8), podpowiedź przy `liczba` bez zmyślonego limitu 7 znaków.

**🚧 W toku / nie wdrożone:**
- Kroki 6-7 zadania 11 (OAuth, Worker logowania, R2, test na żywo). Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Decyzja Roberta w sprawie wgrywania skanów do R2, potem kroki 6-7.

## 2026-10-23 17:10, Claude Code

**✅ Zrobione:**
- Zadanie 11, kroki 1-5: konfiguracja panelu Sveltia CMS 0.221.8 pod `/admin/`. `src/lib/panel.ts` (obiekt konfiguracji), `src/pages/admin/config.yml.ts` (eksport do YAML), `src/pages/admin/index.astro` (`noindex, nofollow`).
- Kolekcje: wdrożenia, projekty, referencje, wpisy (folder na pozycję, `path: {{slug}}/{{locale}}`) oraz plik ustawień `ustawienia/{{locale}}.md`. i18n `multiple_files`, pl domyślny, en dodatkowy, nowa pozycja startuje tylko po polsku (`initial_locales: 'default'`, tekst, nie tablica). Pola `tlumaczenie` i `zrodlo` ukryte (ustawia je skill).
- Backend GitHub `RobertDebicki/robert-debicki`, gałąź `main`. `base_url` z `PUBLIC_PANEL_LOGOWANIE`; bez zmiennej config nie ma `base_url` i build przechodzi (sprawdzone oboma wariantami).
- Zdjęcia wpisów trafiają do `src/assets/wpisy/` ze ścieżką `/src/assets/wpisy/...` (jak oczekuje pole `plik`). `skanUrl` to zwykłe pole z adresem https i hostem R2 (wzorzec z `HOSTY_R2`). `zgoda` wymagana z podpowiedzią o zgodzie klienta i zamazaniu podpisu, `alt` wymagany.
- Test `testy/jednostkowe/panel.test.ts` liczy wymagalność, enumy i długości list ze schematów Zod (`z.toJSONSchema`), nie z przepisanej listy. Kontrola negatywna: po zmianie panelu test pada. Test e2e `panel.spec.ts`: noindex, YAML, brak `/admin/` w mapie.
- `/admin/` wyłączony z mapy witryny filtrem w `astro.config.mjs` (bez filtra `sitemap-0.xml` zawiera `/admin/`, zmierzone).
- `docs/panel-instrukcja.md` po polsku. Sekcje logowania i R2 oznaczone "do uzupełnienia po konfiguracji".
- Krok 5: Sveltia 0.221.8 wspiera Cloudflare R2 (`media_libraries.cloudflare_r2`, także na poziomie pola). Nie wdrożone, zob. raport. `npm run sprawdz`: sekrety 0, treść 0, Vitest 65 PASS, build OK, Playwright 70 PASS.

**🚧 W toku / nie wdrożone:**
- Kroki 6-7: aplikacja OAuth na GitHubie, Worker `sveltia-cms-auth`, bucket R2, test logowania na żywo. Wymagają Roberta.
- Nie zweryfikowane bez logowania: czy Sveltia zachowuje ukryte pola `tlumaczenie` i `zrodlo` w `en.md` przy zapisie oraz czy zapis tylko PL nie przepisuje `en.md`.
- Nic nie jest wypchnięte.

**🎯 Następny krok:**
- Decyzja Roberta w sprawie wgrywania skanów do R2 (opcje w raporcie), potem kroki 6-7 z Robertem.

## 2026-10-23 16:46, Claude Code

**✅ Zrobione:**
- Zadanie 10, krok 5: angielska treść startowa (`tlumaczenie: ai`, `zrodlo` ze `skrypty/skrot.ts`): 6 wdrożeń, 4 projekty, `ustawienia/en.md`. Kontrola tłumaczeń: 11 par bez błędów i bez uwag. `/en/` powstaje na prawdziwej treści.
- Kontrola: cudzysłowy YAML w listach (`stack: ["n8n", ...]`) nie są już zgłaszane jako cudzysłów spoza en-US (nowy test).
- Przełącznik języka na `/`: selektor `.top nav a.przelacznik`, żeby działał zamierzony `padding: 4px 8px` (wcześniej przegrywał z `.top nav a` i podnosił nagłówek o 2 px, przez co porównanie z makietą dawało 4-6% różnicy). Porównanie z makietą znowu PASS.
- Liczba wdrożenia dłuższa niż 7 znaków (EN „hundreds”) dostaje klasę `dluga` i mniejszy krój (0.72 × `--s-3`); bez tego przy 1024 i 1440 px wchodziła na kolumnę z opisem. Polskie wartości mają do 7 znaków, wygląd PL bez zmian (test makiety PASS). Nowy test w `uklad.spec.ts` (bez klasy pada na `/en/` przy 1024 i 1440 px).
- Testy e2e na prawdziwym `/en/`: `lang="en"`, przełącznik do `/`, 3 linki hreflang, w menu brak „Posts”; `/` ma przełącznik i hreflang. Axe (kontrast, jasny i ciemny) i brak przewijania w bok przy 360/390/1024/1440 px także dla `/en/`.
- Lighthouse `/en/` mierzony na prawdziwej treści: mediana z 3, `/` 99/100/100/100, `/en/` 99/100/100/100 (`docs/lighthouse/2026-10-23.md`).
- `npm run sprawdz`: sekrety 0, treść 0, skany 0, tłumaczenia 14 testów + 11 par OK, Vitest 47 PASS, build OK, Playwright 67 PASS.

**🚧 W toku / nie wdrożone:**
- Tłumaczenia mają stan `ai`: czekają na przeczytanie przez osobę z USA (prośba do korektora w `narzedzia/tlumaczenie/jezyki/en.md`).
- Nic nie jest wypchnięte; workflow nie uruchomiony w Actions.

**🎯 Następny krok:**
- Zadanie 11 z planu.

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
