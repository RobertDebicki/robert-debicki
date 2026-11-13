# CHANGELOG

## 2026-11-13 09:40, Claude Code

**✅ Zrobione (plan wdrożenia, bez zmian w kodzie):**
- Robert zaakceptował projekt widoczności. Plan w `docs/superpowers/plans/2026-11-13-widocznosc-klienci-rekruterzy.md`: 11 zadań (telefon, przekaz, BlogPosting, frazy, podgląd, kolekcja usług, treść usług, podstrona rekrutera, angielskie adresy wpisów, wpis o sklepie po starcie, linki zewnętrzne).

**🎯 Następny krok:** Robert przegląda plan i wybiera sposób wykonania; potem zadanie 1 (telefon: potrzebny numer od Roberta).

## 2026-11-13 09:00, Claude Code

**✅ Zrobione (projekt widoczności w Google i AI, gałąź `widocznosc-klienci-rekruterzy`, bez zmian w kodzie):**
- GA4, GSC, GTM przejrzane: alarm GTM „0% zgód” to brak zgód reklamowych (żywa strona po zgodzie wysyła `gcs=G101`), zostaje bez zmian. Mapa witryny przesłana ponownie w GSC (16 adresów, wcześniej odczytane 4), GA4 połączone z GSC, przechowywanie danych 14 miesięcy (ustawił Robert).
- Projekt `docs/superpowers/specs/2026-11-12-widocznosc-klienci-rekruterzy-design.md`: strony usług (pierwsza fala: automatyzacja, voiceboty, strony i aplikacje), telefon z `klik_telefon`, przekaz dla klienta i rekrutera, podstrona dla rekrutera z CV z R2, `BlogPosting`, angielskie adresy wpisów, linki z zewnątrz. Przegląd recenzenta: 7 pytań, odpowiedzi w dokumencie.

**🎯 Następny krok:** Robert akceptuje projekt; potem plan (`writing-plans`) i krok 1 (telefon + nowy nagłówek kontaktu).

## 2026-11-12 10:30, Claude Code

**✅ Zrobione (wygląd wpisów po uwagach Roberta ze zrzutu, ryzyko niskie; gałąź `wyglad-wpisow`, nie wdrożone):**
- Strona główna: 3 najnowsze wpisy w kolumnach z miniaturką nad tytułem (`NajnowszeWpisy.astro`, klasa `wpisy-siatka`); na telefonie jeden pod drugim.
- Strona wpisu: kolumna 46rem na środku arkusza (`sekcja-wpisu`), linia sekcji na całą szerokość. Wcześniej treść przy lewej krawędzi (zmierzone: 130 px z lewej, 575 px z prawej przy 1440).
- Miniatury liczy wspólna funkcja `zMiniaturami()` w `src/lib/wpisy.ts` (lista i strona główna).
- Testy najpierw czerwone: miniatura na stronie głównej, wyśrodkowanie `.wpis-tresc` przy 1440. `npm run sprawdz`: vitest 154 pass/1 skipped, e2e 122 pass, treść 0. Zrzuty: wpis 1440 ciemny, strona główna 1440 i 390, bez przewijania w bok.
- GA4 (zdarzenia kluczowe) nie sprawdzone: Robert przerwał odczyt przez AdLoop.

**🎯 Następny krok:**
- Zgoda Roberta na scalenie i wdrożenie; przy wdrożeniu sprawdzić, czy odbiór przechodzi bez uwag (nowy limit 60 s).

## 2026-11-12 10:05, Claude Code

**✅ Zrobione (odbiór po wdrożeniu bez fałszywych alarmów, ryzyko niskie):**
- `skrypty/wdroz.ts`: limit pobrania przy odbiorze 60 s zamiast 20 s (`LIMIT_POBRANIA_MS`); błąd sieci na pliku ponawiany raz, niezgodna treść zgłaszana od razu. Powód: przy obu wdrożeniach 12.11 po 4 pliki zgłoszone z powodu przekroczonego czasu, sumy SHA-256 zgodne.
- Testy najpierw czerwone (ponowienie), potem zielone: `wdroz.test.ts` 34, vitest 154 pass/1 skipped.
- Scalony zaległy wpis CHANGELOG o wdrożeniu EN (`changelog-en-wdrozone`); `changelog-blog-wdrozony` był już w `main` (PR #7).

**🎯 Następny krok:**
- Przy następnym wdrożeniu sprawdzić, czy odbiór przechodzi bez uwag.

## 2026-11-12 09:55, Claude Code

**✅ Zrobione (wpisy EN wdrożone na robert-debicki.pl, zgoda Roberta 12.11 „scalone wdróż”):**
- PR #7 scalony przez Roberta. `npm run wdroz -- --wgraj`: 103 pliki, kopia zapasowa `~/Backups/robert-debicki-ftp/2026-11-12T08-50-42-325Z`. Odbiór zgłosił 4 pliki (przekroczony czas); sumy SHA-256 serwer i lokalnie zgodne dla wszystkich 4.
- `test:produkcja` 5 pass. `/en/posts/` i strony wpisów EN 200, 5 miniaturek EN, 5 wpisów EN w mapie strony.

**🚧 W toku:**
- Teksty EN w stanie `ai`: korekta osoby z USA (prośba na końcu `narzedzia/tlumaczenie/jezyki/en.md`), potem `tlumaczenie: sprawdzone`.

**🎯 Następny krok:**
- Korekta EN przez native speakera; zdarzenia kluczowe w GA4 po pierwszych kliknięciach (wpis z 11.11).

## 2026-11-12 09:40, Claude Code

**✅ Zrobione (tłumaczenie EN 5 wpisów skillem `/tlumacz-strone`, gałąź `tlumaczenie-wpisow-en`):**
- `en.md` dla: ai-act-dla-malej-firmy, ile-firm-uzywa-ai, automatyczny-odczyt-dokumentow, voice-bot-dla-firmy, n8n-make-czy-zapier; stan `ai`, `zrodlo` ze skrótu `pl.md`. Linki wewnętrzne na `/en/posts/...`, kwota PLN 174,717, daty w zapisie en-US.
- 16 grafik i 5 miniaturek po angielsku (`src/assets/wpisy/*-en-*.png`) z `docs/blog-szkice/podglad/grafiki_en.py` i `node zrzuty.mjs en`; ALT w `en.md` zgodne z grafikami (sprawdzone skryptem).
- Kontrola tłumaczeń rozpoznaje pełne daty z dniem („20 lipca 2026”, „2.08.2026” ↔ „July 20, 2026”, „Aug. 2, 2026”, „7/20/2026”), decyzją Roberta zamiast zapisu brytyjskiego; pełne daty liczone przed regułą godzin („od 2.08” to nie godzina). Test najpierw czerwony; 20 testów skryptu OK, 16 par bez błędów.
- `npm run sprawdz`: treść 0, GPS 0, vitest 152 pass/1 skipped, e2e 120 pass. Zrzuty `/en/posts/` (1440) i wpisu (390): bez przewijania w bok, przełącznik do PL.

**🚧 W toku / nie wdrożone:**
- Teksty EN czekają na korektę osoby z USA (prośba na końcu `narzedzia/tlumaczenie/jezyki/en.md`); stan `ai` → `sprawdzone` po korekcie.

**🎯 Następny krok:**
- PR, scalenie i wdrożenie. Wdrożenie tylko za zgodą Roberta w danej wiadomości (ta zgoda dotyczy rozmowy z 12.11 i nie przechodzi na kolejne sesje).

**✅ Poprawki po `/code-review medium`:** „small online store” → „small store” (dopisany fakt), CTA voice bota „what kind of inquiries” (PL: jakich, nie ile), daty EN w jednym stylu AP i reguła w `jezyki/en.md`, podpis wykresu PL i EN „ponad 10 osób” jak w źródle (`zrodlo` w `en.md` przeliczone), `zrzuty.mjs` odrzuca nieznany argument. Bez zmian: komunikaty kontroli przy złym formacie daty (błąd i tak jest zgłaszany), ALT w `grafiki_en.py` zdublowane z `en.md` (pomocnik w docs/, zgodność sprawdzona skryptem).

## 2026-11-12 09:10, Claude Code

**✅ Zrobione (5 wpisów wdrożonych na robert-debicki.pl, zgoda Roberta 12.11):**
- PR #6 scalony (CI na Linuksie: kontrole, testy i Lighthouse pass). `/security-review`: brak podatności.
- `npm run wdroz -- --wgraj`: 67 plików, kopia zapasowa serwera w `~/Backups/robert-debicki-ftp/2026-11-12T08-04-46-964Z`. Odbiór zgłosił 4 pliki (przekroczony czas pobierania); sumy SHA-256 serwer i lokalnie zgodne dla wszystkich 4.
- `test:produkcja` 5 pass. `/wpisy/` i strony wpisów 200, 5 wpisów w mapie strony, 5 miniaturek na liście, bez metatagu robots (indeksowanie).

**🎯 Następny krok:**
- Wersje EN wpisów z angielskimi grafikami (`/tlumacz-strone` + grafiki z makiety po angielsku). Do tego czasu menu EN „Posts” prowadzi do pustej listy.

## 2026-11-12 08:50, Claude Code

**✅ Zrobione (5 wpisów na blogu, gałąź `blog-piec-wpisow`, nie wdrożone):**
- Wpisy w `src/content/wpisy/<adres>/pl.md`, daty wstecz co tydzień (14.10, 21.10, 28.10, 04.11, 11.11) decyzją Roberta. Zdania ⚠️ z `docs/blog-szkice/README.md` zostają decyzją Roberta.
- 16 grafik i 5 miniaturek jako PNG w `src/assets/wpisy/` (zrzut z makiety, kolumna 600 px, skala 2), ALT przy każdej, podpisy jako tekst pod grafiką. Ścieżka: `generuj.py` → `zrzuty.mjs` → `eksport.py` w `docs/blog-szkice/podglad/`.
- Dwa linki wewnętrzne między wpisami (anchor z frazą), twarde spacje w „10 000” i „174 717”.
- Testy, które zakładały brak wpisów na prawdziwej treści, sprawdzają teraz oba stany: `wpisy-puste.spec.ts`, menu EN w `jezyki-prawdziwa-tresc.spec.ts` (Posts z „No posts in English yet”, jak w `maListe`), porównanie z makietą ukrywa sekcję wpisów i link w menu (makieta ich nie ma).
- `npm run sprawdz`: treść 0, GPS 0, tłumaczenia OK, vitest 148 pass/1 skipped, e2e 120 pass. Zrzuty listy i wpisu 1440 jasny i ciemny, 390: bez przewijania w bok.

**✅ Poprawki po `/code-review medium` (runda 1, 10 uwag):**
- Przeinaczony fakt: wpis n8n mówił, że logika „przekroczyła limity”, karta: przeniesiona, „żeby nie przekraczać limitów”. Ten sam typ: „około 15 rozmów” zamiast „15” (karta), też na grafice. Poprawione w szkicach, wpisach i PNG.
- Wtyczka obrazów: brak pliku w `/src/assets/` zatrzymuje build (wcześniej cicho zepsuty obrazek), `%` i polskie znaki w nazwie bez wywracania buildu (testy najpierw czerwone).
- Komunikat `obraz()` wskazuje też miniaturę; `eksport.py` nie nadpisuje wpisów bez `--nadpisz`; README szkiców: źródłem treści jest panel; ALT miniaturki: „według Eurostatu”.
- Bez zmian: porównanie z makietą pomija sekcję wpisów (makieta jej nie ma), wspólny helper w testach (refaktor bez błędu).
- Runda 2 (9 uwag, jeden typ: nietypowe nazwy plików grafik): odkodowanie po kawałku (dosłowny `%` obok zakodowanego „ż”), odrzucenie `#` i `?`, folder, wyjście poza folder (też `%2e%2e`) i zła wielkość liter zatrzymują build; komunikat ze ścieżką wpisu w repo; mocniejszy test z istniejącym plikiem; cofnięty szum w `n8n-make-czy-zapier-3.png`. Wtyczka 7 testów, vitest 153 pass/1 skipped, e2e 120 pass.
- Runda 3 znów znalazła przypadki brzegowe nazw plików (wielkość liter w folderze, `..x.png`, `%41`). Po 3 rundach zmiana podejścia za zgodą Roberta: wtyczka przyjmuje tylko bezpieczne nazwy w `/src/assets/wpisy/` (małe litery, cyfry, `.`, `-`, `_`; rozszerzenie bez względu na wielkość liter), plik z `public/` zostaje, każda inna ścieżka od `/` zatrzymuje build komunikatem. Bez odkodowywania `%`. Podpowiedź w panelu przy treści wpisu. Wtyczka 5 testów, vitest 151 pass/1 skipped, e2e 120 pass.
- Przegląd uproszczonej wtyczki (8 uwag): usunięte przepuszczanie plików z `public/` (źródło 5 uwag: `..`, wielkość liter, katalogi, `?`), osobny komunikat dla niedozwolonego typu pliku (np. `.heic`), typy w podpowiedzi panelu, bez podwójnego sprawdzania pliku. Bez zmian: obrazy w stylu przypisów i surowy `<img>` (panel ich nie wstawia). Wtyczka 6 testów, vitest 152 pass/1 skipped, e2e 120 pass.
- Decyzja Roberta: wpisy zostaną przetłumaczone na EN (z angielskimi grafikami) po wdrożeniu wersji PL; do tego czasu menu EN „Posts” prowadzi do pustej listy.
- (rozstrzygnięte wyżej) menu EN „Posts” prowadzi do pustej listy, która trafia do mapy strony.

**🎯 Następny krok:**
- `/code-review`, potem PR, scalenie i `npm run wdroz -- --wgraj` (zgoda Roberta z 12.11 w rozmowie).
- Później: angielskie wersje wpisów przez `/tlumacz-strone` (do tego czasu w EN menu „Posts” prowadzi do pustej listy).

## 2026-11-12 08:30, Claude Code

**✅ Zrobione (grafiki w treści wpisu i miniaturki na liście, ryzyko średnie: kod listy i panelu; gałąź `blog-piec-wpisow`, nie wdrożone):**
- Grafika wstawiona w treść wpisu z panelu (ścieżka `/src/assets/wpisy/...`) idzie przez optymalizację Astro: wtyczka Sätteri `src/lib/obrazy-w-tresci.mjs` zamienia ją na ścieżkę względną. Astro 7 domyślnie używa Sätteri, więc `remarkPlugins` nie działają; `@astrojs/markdown-satteri` 0.4.5 dopisana jako zależność bezpośrednia (ta sama wersja, którą instaluje Astro).
- Pole `miniatura` (plik i alt, opcjonalne) w schemacie wpisów i panelu; lista `/wpisy/` pokazuje miniaturkę 16:9 obok tytułu, karta bez miniatury bez zmian. Strona główna (3 najnowsze wpisy) bez miniaturek.
- Testy najpierw czerwone: e2e miniaturki i grafiki w treści, jednostkowy panelu; potem zielone (e2e wpisów 13, panel 22, wtyczka 2).
- ⚠️ Pułapka: cache treści Astro (`node_modules/.astro*`) nie unieważnił wpisu po zmianie schematu (pole `miniatura` znikało). Przed buildem po zmianie schematu usuń cache.

## 2026-11-11 23:30, Claude Code

**✅ Zrobione (5 szkiców wpisów na bloga, ryzyko niskie: tylko tekst w `docs/blog-szkice/`, nic nie trafia na stronę, nie wdrożone):**
- Tematy: AI Act dla małej firmy, pierwsza automatyzacja procesów, odczyt dokumentów, voice bot, n8n/Make/Zapier. Źródła i punkty do potwierdzenia: `docs/blog-szkice/README.md`.
- Reguły DNK dostosowane do strony Roberta, sprawdzone skryptem (długości, fraza, linki, FAQ, myślniki).
- Makiety wpisów z grafikami: `docs/blog-szkice/podglad/podglad.html` (generuje `python3 docs/blog-szkice/podglad/generuj.py` z plików .md). 15 grafik w HTML i CSS w wyglądzie strony (oś czasu AI Act, makieta czatu, wykres Eurostat, schemat odczytu dokumentów, oś 2 minut voice bota, licznik opłat n8n/Make/Zapier i inne), pod każdą propozycja ALT. Zrzuty 1440 jasny i ciemny, 390, 360: bez przewijania w bok.
- Weryfikacja faktów w szkicach (11.11): 5 błędów i 5 zdań bez źródła poprawionych w tekście, grafikach, miniaturkach i ALT; lista ✅/⚠️ w `docs/blog-szkice/README.md`.
- Lista wpisów z miniaturkami 16:9 w podglądzie (sekcja na górze); miniaturki zapisywane też jako pliki `docs/blog-szkice/podglad/miniatury/*.svg`. Zrzuty 1440 jasny i ciemny, 390, 360: bez przewijania w bok.
- Do wdrożenia na stronie grafiki trzeba będzie zamienić na pliki SVG w `src/assets/wpisy/` albo dodać obsługę grafik w treści wpisu (dziś wpis ma tylko zdjęcia pod tekstem).

**🎯 Następny krok:**
- Robert czyta szkice, potwierdza fakty z README, publikuje po jednym (kopia do `src/content/wpisy/<adres>/pl.md`, data w dniu publikacji).

## 2026-11-11 22:50, Claude Code

**✅ Zrobione (wdrożenie PR #5 na produkcję za zgodą Roberta: „zrób push, PR i wdróż”, ryzyko wysokie):**
- PR #5 scalony (`edaf799`) po zielonym CI. `npm run wdroz -- --wgraj`: 29 plików na home.pl, kopia serwera `~/Backups/robert-debicki-ftp/2026-11-11T21-39-06-500Z`, odbiór zgodny, `.htaccess` działa. `test:produkcja` 5 z 5.
- Żywa strona ładuje `GTM-T7N4RZD8` (curl). **Pomiar na żywej stronie** z prawdziwym Google (żądania `g/collect` przerywane, nazwy zdarzeń z adresu i treści POST): przed zgodą 0 zdarzeń; po „Akceptuję”: `page_view` raz, `scroll`, `klik_email`, `klik_linkedin`, `kopiuj_email`; po „Odrzucam” 0 zdarzeń.

**🚧 W toku:**
- Zdarzenia kluczowe w GA4: oznaczyć `klik_email` i `klik_linkedin` po tym, jak prawdziwy odwiedzający wygeneruje je na stronie (przerwane żądania testowe nie dotarły do GA4).
- Bing: sprawdzić za kilka dni liczbę URL w mapie. AdLoop dla robert-debicki.pl: autoryzacja najwcześniej wieczorem 17.11. Przekierowania `.com`/`.com.pl` gubią ścieżkę; konto FTP ma dostęp do całego hostingu; polityka: forma administratora i przegląd prawny.

**🎯 Następny krok:**
- Od 17.11 wieczorem: dokończyć autoryzację AdLoopa i odczytać GA4 i GSC; w GA4 oznaczyć zdarzenia kluczowe po pierwszym wystąpieniu.

## 2026-11-11 22:40, Claude Code

**✅ Zrobione (przejście na własny kontener GTM `GTM-T7N4RZD8`, ryzyko wysokie: pomiar analityczny; gałąź `gtm-nowy-kontener`, nie wdrożone):**
- **Dlaczego:** `GTM-NMV5XT8J` (z fragmentu GA4) nie jest widoczny w Menedżerze tagów Roberta, więc nie da się w nim dodać wyzwalacza ani tagu zdarzeń. Konto `robert-debicki` ma jeden kontener, `GTM-T7N4RZD8` (był pusty). Wzorzec jak u prestameble: kontener GTM, zdarzenia przez `dataLayer.push({ event })`, tagi zdarzeń GA4 w GTM.
- **Robert w GTM (opublikowane 11.11):** Tag Google `G-4CQH9ZBDBC` (Initialization - All Pages), tag zdarzenia GA4 `{{Event}}` z wyzwalaczem Zdarzenie niestandardowe (regex `klik_email|klik_linkedin|kopiuj_email`). Nadmiarowy tag „Google Analytics G-4CQH9ZBDBC” usunięty. Wersja kontenera zawiera też dwa automatyczne ustawienia GTM („automatyczne wykrywanie zdarzeń”, „dane przekazywane przez użytkowników”): ⚠️ ich wartości niesprawdzone, do potwierdzenia przez Roberta.
- **Kod:** `ID_TAGU = GTM-T7N4RZD8` (`src/lib/zgoda.ts`), test jednostkowy i e2e zaktualizowane (test najpierw czerwony), `AGENTS.md` opisuje kontener i tagi.
- **Pomiar z prawdziwym Google (lokalny build, żądania `g/collect` przerywane, nazwy zdarzeń z adresu i treści POST):** przed zgodą 0 zdarzeń; po „Akceptuję”: `page_view` raz, `scroll`, `klik_email`, `klik_linkedin`, `kopiuj_email` (kopiuj po dłuższym czekaniu: GA4 grupuje zdarzenia); po „Odrzucam” 0 zdarzeń.
- **Wycofanie:** wcześniejszy wpis (21:40) twierdził, że `gtag('event')` nie działa z kontenerem (zmierzone). Tamten pomiar czytał tylko adres żądania i mógł przeoczyć zdarzenia zgrupowane w treści POST, więc twierdzenie jest **niepotwierdzone**; komentarze w kodzie poprawione. Działa `dataLayer.push({ event })` z wyzwalaczem GTM.
- `npm test` 145 pass/1 skipped, e2e zgoda i seo 39 pass, treść 0, sekrety 0.

**🚧 W toku / nie wdrożone:**
- Wdrożenie wymaga PR i `npm run wdroz -- --wgraj` za zgodą Roberta. Do czasu wdrożenia żywa strona nadal ładuje `GTM-NMV5XT8J` (zbiera `page_view`, bez zdarzeń kliknięć).
- Po wdrożeniu: pomiar na żywej stronie (`ADRES=https://robert-debicki.pl`), `page_view` raz, zdarzenia kliknięć.
- **Zrobione przez Roberta 11.11 (na jego słowo, bez zrzutów po zmianie):** GA4: retencja 14 miesięcy, wyłączone Google Signals, zbieranie danych przekazywanych przez użytkowników i personalizacja reklam (stan przed zmianą widoczny na zrzutach: wszystkie trzy włączone, lokalizacja i urządzenie włączone, zostawione). Bing Webmaster Tools: import z GSC, mapa `sitemap-index.xml` ze statusem Success (zrzut). Wersja 2 kontenera GTM opublikowana (zrzut).
- Do zrobienia: zdarzenia kluczowe w GA4 (`klik_email`, `klik_linkedin`) po pierwszym wystąpieniu zdarzeń na żywej stronie; sprawdzenie liczby URL w Bingu za kilka dni.

**🎯 Następny krok:**
- Zgoda Roberta na PR, scalenie i wdrożenie.

## 2026-11-11 21:40, Claude Code

**✅ Zrobione (odwzorowanie ustawień prestameble.pl pod wyszukiwarki i AI; gałąź `llms-i-zdarzenia`, ryzyko wysokie: dane analityczne i zgoda, nie wdrożone):**
- **Wzorzec (odczyt przez AdLoop, nic nie zmieniane na prestameble):** GA4 ma 4 zdarzenia kluczowe (`generate_lead`, `klik_telefon`, `klik_email`, `purchase`), retencja 2 miesiące, GTM; w 90 dni kanał „AI Assistant” 167 sesji (chatgpt.com 162, claude.ai 4), Organic Search 479; GSC: usługa z prefiksem URL, 5 map bez błędów; `llms.txt` jest (200). Związek `llms.txt` z ruchem z AI niezmierzony.
- **`/llms.txt`** (`src/lib/llms.ts`, `src/pages/llms.txt.ts`): generowany z ustawień PL (nazwa, rola, opis, miejsce, kontakt, narzędzia, strony PL, EN i polityka), bez myślników. Test jednostkowy (5) i e2e w `seo.spec.ts`.
- **Zdarzenia kliknięć:** `klik_email`, `klik_linkedin`, `kopiuj_email` (atrybut `data-zdarzenie` w `Kontakt.astro`, nasłuch `click` i `auxclick` w `src/scripts/zgoda.ts`, `dataLayer.push({ event })`). Idą tylko, gdy analityka jest włączona po „Akceptuję”: bez zgody i przed decyzją nic nie trafia do `dataLayer`, a po późniejszej zgodzie nic się nie odtwarza (testy e2e). `kopiuj_email` liczy kliknięcia przycisku (próby), nie udane skopiowania.
- **Pomiar z prawdziwym Google (kontener `GTM-NMV5XT8J`, żądania `g/collect` przerywane, żeby nie zaśmiecać GA4):** `gtag('event', …)` nie wysyła nic (ani bez, ani z `send_to`), wyszło tylko `page_view` i `scroll`. Pierwsza wersja kodu (gtag) była więc błędna i została zastąpiona `dataLayer.push({ event })`. Aby GA4 dostał te zdarzenia, w GTM trzeba dodać wyzwalacz „Zdarzenie niestandardowe” (`klik_email|klik_linkedin|kopiuj_email`, regex) i tag „Zdarzenie GA4” z nazwą `{{Event}}`.
- **Polityka PL i EN:** dopisane kliknięcia w adres e-mail i link do LinkedIn jako dane analityczne (test e2e).
- Wyniki: `npm test` 142 pass/1 skipped, e2e 117 pass, treść 0, sekrety 0. Czerwony krok widziany tylko dla testu jednostkowego `llms`; testy e2e nowych zachowań napisane przed kodem, ale ich czerwonego uruchomienia nie wykonałem.
- Przegląd świeżego agenta (`/code-review high`, runda 1), 8 uwag: zdarzenia przez `gtag` (naprawione i zmierzone, patrz wyżej), `llms.txt` zależny od etykiety „Miejsce” i puste pola (generator pomija puste pola i podwojoną kropkę, 3 testy), brak `auxclick` (dodany, test), kodowanie `.txt` na Apache (`AddDefaultCharset UTF-8` w `hosting/htaccess`, do sprawdzenia `curl -I` po wdrożeniu), poziom ryzyka (podniesiony do wysokiego). Bez zmian: test e2e `llms.txt` z treścią z panelu (jak istniejące testy SEO), `kopiuj_email` jako próby.
- Poprawka konfiguracji AdLoopa: `ga4.property_id` musi mieć postać `properties/563831727`.

**🚧 W toku / nie wdrożone:**
- Zmiany lokalne, bez push i wdrożenia (wymaga zgody Roberta). Po dodaniu wyzwalacza i tagu w GTM sprawdzić z prawdziwym Google, czy idzie `g/collect` z `en=klik_email`. Po wdrożeniu `curl -I https://robert-debicki.pl/llms.txt` (charset UTF-8).
- Do zrobienia przez Roberta w panelach: GSC „Zweryfikuj” i mapa `sitemap-index.xml`, Bing Webmaster Tools (import z GSC), GA4: retencja 14 miesięcy i oznaczenie `klik_email`, `klik_linkedin` jako zdarzeń kluczowych (dopiero po pierwszym wystąpieniu).

**🎯 Następny krok:**
- Zgoda Roberta na push, PR i wdrożenie (po `/security-review`); w panelach kroki z listy powyżej.

## 2026-11-11 21:30, Claude Code

**✅ Zrobione (AdLoop dla robert-debicki.pl, ryzyko niskie: konfiguracja poza repo, tylko odczyt):**
- Osobna konfiguracja `~/.adloop-robert/` (`config.yaml`, kopia `credentials.json`; poza repo, nie czytać ani wklejać): GA4 `property_id` 563831727 (z adresu panelu GA4), Search Console `https://robert-debicki.pl/`, `require_dry_run: true`. Prestameble (`~/.adloop/`) nietknięte.
- Serwer MCP `adloop` dopisany lokalnie do projektu (`claude mcp add -s local`, nie w `.mcp.json`, bo repo jest publiczne): `ADLOOP_CONFIG=~/.adloop-robert/config.yaml`, narzędzia `ga4,gsc,tracking,web,gtm`.

**🚧 W toku:**
- 🔴 Brak `~/.adloop-robert/token.json`: autoryzacja OAuth kontem robert.debicki7@gmail.com zablokowana przez Google ("Spróbuj jeszcze raz za 6 dni", nowe klucze dostępu), na każdej przeglądarce. Decyzja Roberta: czekamy 6 dni (od 11.11 wieczorem, czyli próba najwcześniej wieczorem 17.11).
- Uwaga: AdLoop prosi OAuth o szersze zakresy niż odczyt (`analytics.edit`, `adwords`, `content`). Zapasowy wariant bez OAuth: konto serwisowe z rolą Odczyt w GA4 i GSC (AdLoop obsługuje klucz `service_account` w `credentials.json`).
- Search Console: "Zweryfikuj" (Tag HTML) i zgłoszenie mapy czeka na Roberta. Polityka: retencja GA4, zawartość kontenera GTM, forma administratora.

**🎯 Następny krok:**
- Od 17.11 wieczorem: uruchomić logowanie (skrypt wypisujący adres, bo `!` w oknie rozmowy nie uruchamia poleceń), sprawdzić `token.json`, zrestartować sesję, `health_check` AdLoopa i pierwszy odczyt GA4 oraz GSC (przed zapisem skill `adloop-rules`).

## 2026-11-11 20:55, Claude Code

**✅ Zrobione (wdrożenie metatagu Search Console, ryzyko niskie):**
- PR #3 scalony po zielonym CI. `npm run wdroz -- --wgraj`: 28 plików na home.pl, kopia serwera `~/Backups/robert-debicki-ftp/2026-11-11T19-49-53-971Z`, odbiór zgodny, `.htaccess` działa.
- Na żywej stronie metatag `google-site-verification` jest na `/` i `/en/` (curl), `test:produkcja` 5 z 5.

**🚧 W toku:**
- 🔴 Weryfikacja w GSC i zgłoszenie mapy: dopiero po kliknięciu Roberta. Do potwierdzenia w polityce: retencja GA4, zawartość kontenera GTM, forma administratora. Przekierowania `.com`/`.com.pl` gubią ścieżkę.

**🎯 Następny krok:**
- Robert klika „Zweryfikuj” w GSC (Tag HTML), zgłasza `https://robert-debicki.pl/sitemap-index.xml`, sprawdza GA4 w czasie rzeczywistym.

## 2026-11-11 20:30, Claude Code

**✅ Zrobione (weryfikacja Search Console, ryzyko niskie: metatag w `<head>`):**
- Weryfikacja przez Menedżera tagów Google nie przeszła (komunikat GSC: nie znaleziono identyfikatora kontenera na stronie głównej, bo kontener ładuje się dopiero po zgodzie). Zgodnie z ustaleniem nie wczytujemy go bez zgody.
- Metoda „Tag HTML”: `src/layouts/Strona.astro` ma `<meta name="google-site-verification" content="ug2L…49E" />` (wartość od Roberta z GSC, nie jest tajna). Test `testy/e2e/seo.spec.ts` dla `/` i `/en/` (najpierw czerwony).

**🚧 W toku / nie wdrożone:**
- Zmiana jest na gałęzi `changelog-wdrozenie-analityki`, nie wypchnięta; wymaga PR i `npm run wdroz -- --wgraj` za zgodą Roberta w danej wiadomości. Dopiero po wdrożeniu GSC może zweryfikować tag.

**🎯 Następny krok:**
- Po wdrożeniu: Robert klika „Zweryfikuj” w GSC (metoda Tag HTML), potem zgłasza mapę `https://robert-debicki.pl/sitemap-index.xml`.

## 2026-11-11 20:00, Claude Code

**✅ Zrobione (wdrożenie na produkcję za zgodą Roberta: „zgoda na PR i zgoda na wypchnięcie zmian na produkcję”):**
- PR #2 (analityka, baner, polityka) scalony po zielonym CI (`54a1013`). `npm run wdroz -- --wgraj`: 28 plików na home.pl, kopia serwera `~/Backups/robert-debicki-ftp/2026-11-11T18-52-13-900Z`, odbiór skryptu zgodny.
- **Strona jest indeksowana:** na żywej `robert-debicki.pl` brak metatagu robots (0 trafień), `test:produkcja` 5 z 5 (oczekuje braku robots i canonical na siebie), mapa strony zawiera `/polityka-prywatnosci/` i `/en/privacy-policy/`, wszystkie 5 adresów 200.
- **Test na żywo z prawdziwym Google (Playwright):** przed zgodą baner widoczny i 0 żądań do Google; po „Akceptuję” baner znika, ładuje się `gtm.js?id=GTM-NMV5XT8J` i idzie żądanie `g/collect` do GA4 (strumień `G-4CQH9ZBDBC`), kontener `GTM-NMV5XT8J` załadowany, ustawione `_ga` i `_ga_4CQH9ZBDBC`.

**🚧 W toku / nie wdrożone:**
- 🔴 Search Console, weryfikacja przez GTM: Google szuka fragmentu kontenera w kodzie strony, a u nas identyfikator jest tylko w skrypcie ładowanym po zgodzie (w surowym HTML jest raz, w skrypcie banera, nie jako snippet GTM). Czy weryfikacja przejdzie, nie wiadomo; zapasowa metoda to rekord TXT w DNS home.pl.
- 🔴 Do potwierdzenia przez Roberta w polityce: okres przechowywania danych w GA4, zawartość kontenera GTM (tylko GA4?), forma administratora; tekst warto pokazać prawnikowi.
- Ten wpis jest na gałęzi `changelog-wdrozenie-analityki`, niewypchniętej.

**🎯 Następny krok:**
- Robert klika „Zweryfikuj” w Search Console (metoda Google Tag Manager); jeśli się nie uda: rekord TXT w DNS home.pl. Potem zgłoszenie mapy `https://robert-debicki.pl/sitemap-index.xml`, sprawdzenie ruchu w GA4 (czas rzeczywisty) i uzupełnienie polityki.

## 2026-11-11 20:10, Claude Code

**✅ Zrobione (analityka GA4 za zgodą, baner i polityka prywatności; gałąź `analityka-baner-polityka`, ryzyko wysokie: dane osobowe i zgoda):**
- **Prośba Roberta 11.11 (cytat):** „dodaj własny baner który będzie nawiązywał do designu strony, dodaj stronę z polityką prywatności”, kod tagu pochodzi z GA4 (kontener `GTM-NMV5XT8J`, zrzut z „Konfigurowanie tagu Google”). Wcześniejsza uwaga Claude, że snippet jest niekompletny, była błędna i została wycofana.
- **Baner** (`src/components/Zgoda.astro`, `src/styles/zgoda.css`, `src/scripts/zgoda.ts`): paski CMY, mono, grube ramki, przyciski z cieniem jak na reszcie strony; „Akceptuję” i „Odrzucam” mają ten sam kształt i wagę. Tag Google ładuje się dopiero po akceptacji; domyślnie Consent Mode `denied`; wybór w `localStorage` (`zgoda-analityka`), „Ustawienia cookies” w stopce otwiera baner ponownie; odrzucenie po zgodzie usuwa `_ga`/`_ga_*` (także z domen nadrzędnych) i przeładowuje stronę, bo załadowanego kontenera nie da się wyładować. Działa przy zablokowanej pamięci przeglądarki.
- **Polityka prywatności** (`/polityka-prywatnosci/`, `/en/privacy-policy/`): `src/lib/polityka.ts`, e-mail z ustawień PL (panel). Teksty prawne w kodzie to wyjątek od zasady „treść z panelu”.
- Makieta (`docs/makieta/index.html`) dostała linię stopki z odnośnikami prawnymi; baner i strona polityki to nowe elementy bez odpowiednika w makiecie (zamierzona zmiana wyglądu na prośbę Roberta). `playwright.config.ts`: pozostałe testy startują z zapisanym wyborem „nie”, żeby baner nie zasłaniał zrzutów.
- **Testy:** `testy/jednostkowe/zgoda.test.ts` (12), `testy/e2e/zgoda.spec.ts` (22: baner, dataLayer, zgoda i odmowa, ponowna akceptacja, przeładowanie przy wycofaniu, fokus i Tab, pamięć zablokowana, kontrast jasny i ciemny, 360/390/1024/1440 bez przewijania w bok, polityka PL i EN). `npm test` 137 pass, e2e 109 pass, sekrety 0, treść 0, tłumaczenia OK.
- **Lighthouse mobile:** `/` i `/en/` z banerem: wydajność 98, reszta 100; strony polityki: wydajność 98 do 99, dostępność 100, praktyki 100, CLS 0, SEO 100 (build produkcyjny, bez noindex).
- Przegląd świeżego agenta (`/code-review` high), 2 rundy: 12 + 8 uwag, poprawione. Typy: „stan zgody niespójny przy ponownej akceptacji” (osobno `wlaczAnalityke`), „fokus zabierany przy wczytaniu”, „usuwanie cookies tylko z jednej domeny”, „dostęp do localStorage poza try”, „strona EN zależna od en.md”, „wycofanie zgody nie zatrzymuje załadowanego kontenera” (przeładowanie), „nieaktualna podstawa prawna w tekście” (bez numeru artykułu, odwołanie do Prawa komunikacji elektronicznej), „zdania w polityce bez potwierdzenia” (usunięte lub złagodzone), „test z fałszywą nazwą” (Tab naprawdę), „dublowane etykiety”.

**🚧 W toku / nie wdrożone:**
- Gałąź nie jest wypchnięta, bez PR i bez wgrania na home.pl (straż publikacji wymaga zgody Roberta).
- 🔴 **Do potwierdzenia przez Roberta w polityce:** (1) okres przechowywania danych w GA4 (Administracja, Zbieranie danych, Przechowywanie danych; w tekście jest tylko „okres ustawiony w usłudze”), (2) czy w kontenerze `GTM-NMV5XT8J` są wyłącznie tagi GA4 (polityka opisuje tylko GA4, a `_ga` i `_ga_*` to jedyne usuwane cookies), (3) forma administratora (osoba prywatna czy działalność), (4) tekst prawny warto pokazać prawnikowi.
- Search Console: weryfikacja własności (rekord TXT w DNS home.pl albo przez ten sam kontener GTM), potem zgłoszenie mapy `https://robert-debicki.pl/sitemap-index.xml`.

**🎯 Następny krok:**
- Zgoda Roberta: push gałęzi, PR, scalenie, `npm run wdroz -- --wgraj`, odbiór `ADRES=https://robert-debicki.pl npm run test:produkcja`; sprawdzić w GA4 (Raporty w czasie rzeczywistym) po kliknięciu „Akceptuję” na żywej stronie.

## 2026-11-11 19:50, Claude Code

**✅ Zrobione (przygotowanie zdjęcia noindex na `robert-debicki.pl`, ryzyko wysokie: strona wejdzie do wyszukiwarek):**
- **Decyzja Roberta 11.11 (cytat z wiadomości):** „zrób push na gtihub i zdejmij noindex”. Wcześniej: „zdejmiemy po poprawkach”.
- `skrypty/wdroz.ts`: build domyślnie z `PUBLIC_INDEKSUJ=true` (`srodowiskoBuildu`, nadpisuje wartość z powłoki); `--noindex` przywraca noindex; odbiór sprawdza tryb żywej strony (`zgodnoscRobots`: z indeksowaniem brak metatagu robots, z `--noindex` jest noindex). Flaga `--indeksuj` z poprzedniego wpisu **nie istnieje**.
- `public/robots.txt`: usunięte `Disallow: /admin/` (blokada uniemożliwiała crawlerowi odczyt `noindex` z panelu; `/admin/` zostaje z metatagiem noindex i poza mapą strony).
- `testy/e2e/produkcja.spec.ts`: na `robert-debicki.pl` oczekuje braku metatagu robots i canonical na siebie, na pozostałych adresach (kopia Cloudflare) noindex. Najpierw czerwony na żywej stronie z noindex.
- Przegląd świeżego agenta (`/code-review` high), runda 3 (tylko zmiany po rundzie 2): 7 uwag, poprawione. Typy: „brak bezpiecznego wyłącznika i weryfikacji trybu” (`--noindex`, odbiór sprawdza robots), „zmiana zachowania bez wpisu i bez testu” (ten wpis, 4 testy `srodowiskoBuildu` i `zgodnoscRobots`), „robots.txt blokuje odczyt noindex”, „asercja bez canonical”. `npm test` 125 pass, e2e chromium i jezyki 88 z 88.

**🚧 W toku / nie wdrożone:**
- Commit lokalny. Push na GitHub i wgranie bez noindex na home.pl czekają na potwierdzenie (straż publikacji nie dopuściła pushu bez zgody w ostatniej wiadomości).
- GA4 i Search Console: czekają na decyzje Roberta (identyfikator GA4, zgoda na pliki cookie, metoda weryfikacji GSC).

**🎯 Następny krok:**
- Push, `npm run wdroz -- --wgraj`, odbiór `ADRES=https://robert-debicki.pl npm run test:produkcja`, zgłoszenie domeny w Search Console.

## 2026-11-11 19:25, Claude Code

**✅ Zrobione (strona na żywo pod `https://robert-debicki.pl/`, wgrana za zgodą Roberta w wiadomości „Wgraj”):**
- `npm run wdroz -- --wgraj` (commit `21fad3c`): 26 plików, kopia serwera `~/Backups/robert-debicki-ftp/2026-11-11T17-58-11-368Z`, odbiór skryptu: wszystkie pliki zgodne z lokalnymi (SHA-256), `.htaccess` działa.
- **Odbiór niezależny:** `ADRES=https://robert-debicki.pl npm run test:produkcja` 5 z 5; brak plików `.part` na serwerze; http→https 301, `www`→bez `www` 301 (ścieżka zachowana), 404 ze stroną 404, `nosniff`, `gzip`, `_astro/` z `immutable`; `robots` `noindex, nofollow`, canonical `https://robert-debicki.pl/`.
- **Lighthouse mobile (3 przebiegi na `/` i `/en/`, narzędzie `lighthouse` na żywej domenie):** wydajność 98 do 100 (LCP 1,1 do 2,0 s), dostępność 100, dobre praktyki 100, SEO 66. SEO 66 ma jedną przyczynę: `is-crawlable` (noindex celowo). Wymóg ≥95 spełniony poza SEO, które po zdjęciu noindex powinno wzrosnąć (⚠️ do zmierzenia po zdjęciu).
- `hosting/htaccess`: przekierowanie `/sitemap.xml` na adres bezwzględny https (zmierzone: dotąd szło najpierw na `http://`, czyli dwa skoki). Poprawka w repo, **nie wgrana**.

**🚧 W toku / nie wdrożone:**
- Zmiana `htaccess` czeka na wgranie (`--wgraj`, za zgodą Roberta).
- `.com` i `.com.pl` przekierowują 301 na `https://robert-debicki.pl` bez zachowania ścieżki (`.com/en/` kończy na `/`). Naprawa wymaga zmiany w panelu home.pl (lokalizacja www obu domen na „Główny katalog”) i reguły w `.htaccess`.
- `noindex` zostaje do akceptacji grafika; zdjęcie: `PUBLIC_INDEKSUJ=true npm run wdroz -- --wgraj --indeksuj` (AGENTS.md).
- Dalej: push `main` na GitHub (kod z `site` na nowej domenie), zgłoszenie domeny w Search Console po zdjęciu noindex.

**🎯 Następny krok:**
- Decyzja Roberta: ponowne wgranie z poprawką sitemap, przekierowania `.com`, push na GitHub, termin zdjęcia `noindex`.

## 2026-11-11 19:10, Claude Code

**✅ Zrobione (pierwsze wgranie na home.pl: usterka, naprawa, ryzyko wysokie):**
- Login FTP to `claude@robert-debicki.pl` (nie opis z panelu „we wszystkich domenach”, który dawał 530). `KATALOG=/` to katalog domeny: na serwerze był tylko placeholder home.pl (`index.html` 3335 B, `tmp`).
- 🔴→✅ **Usterka pierwszego `--wgraj`:** 14 z 26 plików (w tym `index.html`; próg rozmiaru zmierzono tylko jako: 24 KB przechodzi, 48 KB nie) wgrało się jako puste (0 B), curl zgłosił `451 Error during read from data connection`, a skrypt nie zatrzymał nadpisywania. Przez ok. 1 minutę `https://robert-debicki.pl/` zwracało pustą stronę (0 B, status 200). Zmierzone: porównanie sum SHA-256 plików z żywej strony i z `dist/` (11 zgodnych, 14 różnych) i ETag `0-…`.
- **Naprawa strony:** `index.html` przywrócony z kopii zapasowej (`~/Backups/robert-debicki-ftp/2026-11-11T17-50-30-231Z`), strona znów pokazuje „Strona w przygotowaniu” (3335 B).
- **Przyczyna (zmierzona na plikach próbnych w `/tmp` na serwerze, potem usuniętych):** 4, 12 i 24 KB przechodzą, 48 KB daje 451; z `tls-max = 1.2` 48 KB i 600 KB przechodzą (226). Czyli TLS 1.3 na kanale danych home.pl z curlem z macOS. `--disable-epsv` i `--tlsv1.2` nie pomagają.
- **Poprawki skryptu:** `tls-max = 1.2` w każdym transferze; wgrywanie pod nazwą `.part` i podmiana po udanym transferze (`-RNFR`/`-RNTO`, sprawdzone na serwerze: 350 i 250), więc nieudany transfer nigdy nie zostawi pustego pliku strony; odbiór porównuje SHA-256 każdego pliku z żywej strony z lokalnym (łapie puste i ucięte), nie tylko status 200. Testy: `testy/jednostkowe/wdroz.test.ts` 20 (najpierw 2 czerwone), `npm test` 113 pass.
- Typ błędu: „błąd transferu nie zatrzymuje nadpisywania ani nie jest wykryty przy odbiorze”. Poprawione w obu miejscach (wgrywanie i odbiór).
- Przegląd świeżego agenta, runda 2 (tylko zmiany po rundzie 1): 10 uwag, poprawione wszystkie. Typy: „błąd transferu nie zatrzymuje reszty listy” (wgrywanie w 3 etapach: zasoby, HTML, `.htaccess`; błąd etapu przerywa następne), „odbiór nie sprawdza `.htaccess`” (sprawdzane zachowanie: http→https 301 i nagłówek nosniff), „odbiór bez testu” (`sprawdzZgodnosc` wydzielona, 4 testy z podstawionym pobieraniem: pusty plik, 404, ucięty, błąd sieci), „błąd jednego pliku przerywa pętlę odbioru” (błąd per plik na liście), „adres odbioru bez kodowania segmentów”, „nazwa w RNFR/RNTO bez ucieczki”, „osierocone `.part`” (wypisywane po błędzie), „limit czasu tylko dla pierwszego transferu” (`max-time` w każdym bloku), „liczba bez dowodu w komentarzu” (próg opisany jako zmierzony tylko między 24 a 48 KB), „odbiór ignoruje KATALOG” (pomijany, gdy KATALOG inny niż `/`). `npm test` 121 pass.

**🚧 W toku / nie wdrożone:**
- Strona na żywo nadal pokazuje placeholder home.pl (+ nowy `.htaccess` i 11 poprawnych plików: favicony, sitemapy, `admin/`, `robots.txt`, jedna czcionka). 🔴 Ponowne `--wgraj` czeka na zgodę Roberta po poprawce i przeglądzie.

**🎯 Następny krok:**
- Przegląd zmian (`/code-review`), commit, zgoda Roberta na ponowne `--wgraj`, odbiór `ADRES=https://robert-debicki.pl npm run test:produkcja` i Lighthouse mobile.

## 2026-11-11 18:45, Claude Code

**✅ Zrobione (hosting home.pl, ryzyko wysokie: dostęp do serwera i adres strony):**
- Domena główna `robert-debicki.pl`: `site` w `astro.config.mjs`, `Sitemap` w `public/robots.txt`, stałe `SITE` w testach i domyślny `site_url` panelu (`src/lib/panel.ts`). Pomiar z zewnątrz 11.11: wszystkie 3 domeny wskazują na `46.242.250.87` (serwer2643459), certyfikaty działają (HTTP/2 200 na `.pl` i `www`, 301 na `.com` i `.com.pl`).
- `skrypty/wdroz.ts` (`npm run wdroz`): FTPS przez curl, jedna sesja na wiele plików, hasło z pliku poza repo przez stdin curl (nie w liście procesów), odmowa przy zbyt szerokich uprawnieniach pliku, tylko wgrywanie (bez usuwania), HTML na końcu, `.htaccess` ostatni. Przed wgraniem: czysty git, gałąź main, bez `PUBLIC_INDEKSUJ` (chyba że jawne `--indeksuj`), pięć kontrol `sprawdz:*`, `npm test`, build, kopia zapasowa serwera z plikami ukrytymi (`LIST -a`) do `~/Backups/robert-debicki-ftp/`. Po wgraniu odbiór `https://robert-debicki.pl/` (200 bez pętli). Testy: `testy/jednostkowe/wdroz.test.ts` (18, najpierw czerwone).
- `hosting/htaccess`: https i bez www (301, z wyjątkiem `/.well-known/`), `/sitemap.xml` 301, 404, nagłówki, cache plików z hashem (`FilesMatch`), kompresja. Zastępuje `_headers` i `_redirects` z Cloudflare.
- Przegląd świeżego agenta (`/code-review` high), runda 1: 9 uwag, poprawione wszystkie. Typy: „po cichu pominięty wiersz listingu” (listing rzuca błąd przy nieznanym formacie, także symlink i DOS, ACL `+` rozpoznane), „kopia nie obejmuje plików ukrytych” (`LIST -a`), „kontrole słabsze niż `sprawdz`”, „zablokowane zdjęcie noindex” (flaga `--indeksuj`, akapit w AGENTS.md zaktualizowany), „ryzyko pętli i `.well-known` w `.htaccess`” (wyjątek i odbiór po wgraniu), „setki sesji FTPS” (jeden curl), „błąd uruchomienia curl jako TypeError”, „zmienna środowiskowa w cache” (FilesMatch), „test bez asercji” (zamieniony na prawdziwy). Całość: `npm test` 111 pass, e2e chromium i jezyki 88 z 88, sekrety 0, treść 0.

**🚧 W toku / nie wdrożone:**
- 🔴 Nie sprawdzone: połączenie FTPS z kontem Roberta (brak pliku `~/.config/robert-debicki-ftp`), katalog domeny na serwerze, działanie `.htaccess` na home.pl (ryzyko pętli przekierowań, jeśli `%{HTTPS}` nie jest widoczne za proxy), czy 301 `.com` i `.com.pl` zachowuje ścieżkę (zmierzone: NIE, `.com/en/` kończy na `/`).
- Commit lokalny, bez push i bez wgrania na serwer. `noindex` zostaje.

**🎯 Następny krok:**
- Robert tworzy plik konfiguracji, `npm run wdroz -- --lista` pokazuje katalog domeny, ustawiamy `KATALOG`, `--na-sucho`, potem `--wgraj` za zgodą, odbiór `ADRES=https://robert-debicki.pl npm run test:produkcja` i Lighthouse mobile.

## 2026-11-11 17:55, Claude Code

**✅ Zrobione (audyt SEO żywej strony, ryzyko niskie: tylko metadane):**
- Tytuł PL skrócony z 61 do 60 znaków, tytuł EN z 61 do 57 (limit 60). Opisy PL (147 zn.) i EN (149 zn.) w widełkach 120 do 155, z wezwaniem „Napisz do mnie” / „Get in touch”, bez nowych faktów (n8n i Make.com są w treści hero). Pliki: `src/pages/index.astro`, `src/pages/en/[...glowna].astro`.
- `testy/e2e/seo.spec.ts`: asercje długości tytułu (do 60) i opisu (120 do 155); najpierw czerwone na starych tytułach, po zmianie 9 z 9. `npm test` 93 pass, `sprawdz:tresc` 0.
- Świadomie bez zmian: H1 (zostaje samo nazwisko, zmiana zmieniłaby wygląd hero), `lastmod` w mapie (2 strony bez własnych dat), `noindex` (zdejmujemy po decyzji Roberta, tylko po poprawkach).

**🚧 W toku / nie wdrożone:**
- Commit lokalny, bez push i wdrożenia (decyzja Roberta 11.11).
- Własna domena z home.pl: czeka na nazwę domeny i potwierdzenie zdjęcia `noindex`.

**🎯 Następny krok:**
- Podpięcie domeny: Cloudflare (domena dla Workera, DNS), zmiana `site`, linii `Sitemap`, przekierowanie 301 z workers.dev, potem `PUBLIC_INDEKSUJ=true` wg `AGENTS.md`.

## 2026-11-03 19:45, Claude Code

**✅ Zrobione:**
- Dodany `REVIEW.md`: kryteria przeglądu zmian w tym projekcie (prawdziwe błędy, ryzyko wysokie, jak sprawdzać, sekcja „Reguły nauczone”). Link w `AGENTS.md` pod nagłówkiem.
- Globalnie (`~/.claude/CLAUDE.md`): ocena ryzyka zmiany, limit 3 rund poprawek, skill `test-nowego-uzytkownika`.

**🚧 W toku / nie wdrożone:**
- Sekcja „Reguły nauczone” pusta, uzupełniana po kolejnych przeglądach za zgodą Roberta.

**🎯 Następny krok:**
- Bez zmian, zob. poprzedni wpis.

## 2026-10-28 14:20, Claude Code

**✅ Zrobione:**
- Odpowiedzi Roberta wpisane w EN: `obieg-rozliczen` "Month-end close workflow app" i "a month closed in its accounting software" (księgowa zamyka miesiąc), `ustawienia` "Wrocław, Poland, or remote" w karcie i w kontakcie (dla czytelników spoza Polski). `npm run sprawdz` kod 0.

**🚧 W toku / nie wdrożone:**
- EN nadal `ai`, czeka na native speakera.

**🎯 Następny krok:**
- Wypchnięte za zgodą Roberta, run 40692175590 zielony; poprawki widoczne na /en/. Dalej: uwagi grafika, potem zdjęcie `noindex`.

## 2026-10-28 14:05, Claude Code

**✅ Zrobione:**
- Przegląd tłumaczeń skillem `/tlumacz-strone`: 11 par w stanie `ai`, żadna `brak` ani `do-aktualizacji`; kontrola skryptem bez błędów i uwag. Przeczytane wszystkie pary: fakty, liczby, narzędzia i branże zgodne z PL.
- Poprawki w EN (bez zmian w PL): `ustawienia` lead "the apps their teams use" (w PL "ich zespoły"), zasada o Claude Code bez powtórzenia "build ... I make", `monitoring-temperatur` zdanie o harmonogramie kierowcy gramatycznie pełne. `npm run sprawdz` kod 0.

**🚧 W toku / nie wdrożone:**
- Nie wypchnięte. Do decyzji Roberta: "Settlement workflow app" (rozliczenie w biurze rachunkowym, znaczenie do potwierdzenia) i "Wrocław or remote" bez "Poland".
- Wszystkie EN nadal `ai`, czekają na native speakera (prośba na końcu `narzedzia/tlumaczenie/jezyki/en.md`).

**🎯 Następny krok:**
- Odpowiedzi Roberta na dwa pytania, potem push za jego zgodą.

## 2026-10-28 13:35, Claude Code

**✅ Zrobione (poprawki z audytu SEO Roberta, przed zdjęciem noindex):**
- Tytuły z frazami: PL "Robert Dębicki | Automation Developer, automatyzacje n8n i AI", EN "Robert Dębicki | Automation Developer, n8n and AI deployments".
- Open Graph i Twitter Card w `Strona.astro`; obraz `public/og.png` 1200 x 630 z `skrypty/obraz-og.mjs` (fonty i znak strony).
- JSON-LD Person i WebSite (`DaneStrukturalne.astro`, dane z `ustawienia`: rola, LinkedIn, e-mail, Wrocław, narzędzia jako knowsAbout).
- H1: nazwisko w treści raz; kolorowe płyty biorą tekst z `data-t` przez CSS. Zrzut H1 z płytami identyczny co do piksela z wersją sprzed zmiany (390 i 1440 px).
- `public/robots.txt` (Allow, Disallow /admin/, Sitemap), `public/_redirects` (/sitemap.xml 301 na /sitemap-index.xml), pole kliknięcia adresu e-mail powiększone pseudo-elementem bez zmiany układu.
- Testy: `testy/e2e/seo.spec.ts` (9), test produkcyjny sprawdza og.png, robots.txt i przekierowanie. `npm run sprawdz` kod 0 (Vitest 93, Playwright 88).
- Wypchnięte za zgodą Roberta, run 40689354861 zielony (kontrole, wdrożenie, test produkcyjny). Na żywo: tytuł, og.png 200, JSON-LD, robots.txt z Sitemap, /sitemap.xml 301, noindex nadal włączony.
- Audyt: punkt o braku mapy strony był błędny (mapa jest pod /sitemap-index.xml, 404 dawał tylko /sitemap.xml).

**🚧 W toku / nie wdrożone:**
- `noindex` zostaje do akceptacji grafika. Własna domena: zmiana `site`, linii Sitemap, Always Use HTTPS i 301 z workers.dev (AGENTS.md).
- llms.txt pominięty (żadna duża wyszukiwarka nie potwierdziła, że go używa). Liczby wdrożeń nadal mają ukrytą kopię tekstu (`.fig .p`, display: none).

**🎯 Następny krok:**
- Robert: sprawdzić podgląd linku (LinkedIn Post Inspector) i Rich Results Test na żywym adresie.

## 2026-10-25 18:31, Claude Code

**✅ Zrobione:**
- `skrypty/sprawdz-tresc.ts`: kontrola zakazanych wzorców przepisana na skróty, tak jak kontrola nazw klientów (`WZORCE`: słowa z dozwolonymi końcówkami, frazy z dwóch słów, kolory jako skrót zapisu `#rrggbb` albo `rgb(r,g,b)`). Jawnie zostały tylko dwa znaki: pauza i półpauza. Komunikat podaje numer wzorca, nie jego treść. Wynik na repozytorium: 0 trafień.
- Testy na fikcyjnych wzorcach; test prawdziwej listy działa tylko lokalnie ze zmienną `ZAKAZANE_PLAIN_TEST` (w CI pominięty). Sprawdzone lokalnie poza repozytorium: wszystkie wzorce z listy Roberta dają trafienie, nazwa branży klienta i nazwa byłego pracodawcy nie.
- AGENTS.md, spec, plan, README, CHANGELOG: zakres treści opisany neutralnie (automatyzacja procesów, AI i kod), bez jawnej listy wzorców. README: panel `/admin/` istnieje, logowanie tokenem GitHub. `wrangler.jsonc`: komentarz bez nieaktualnej wersji wranglera.
- `npm run sprawdz` kod 0 (Vitest 93 PASS i 1 pominięty, build OK, Playwright 79 PASS na 2 procesach).

**🚧 W toku / nie wdrożone:**
- Nie wypchnięte. Historia gita nadal zawiera wcześniejsze wersje plików z jawną listą; usunięcie jej wymaga przepisania historii i decyzji Roberta.

**🎯 Następny krok:**
- Robert decyduje, czy przepisać historię repozytorium przed push na `main`.

## 2026-10-25 18:22, Claude Code

**✅ Zrobione:**
- Kontrola nazw klientów szybsza: pamięć skrótów rdzeni i pomijanie zlepków krótszych niż 4 albo dłuższych niż 24 znaki (wynik ten sam, 13 rdzeni nadal wykrywanych lokalnie).
- `vitest.config.ts`: `testTimeout` 30 s. Na obciążonej maszynie (load około 5) testy uruchamiające `npx tsx` przekraczały domyślne 5 s (raz `stan-tlumaczen`, raz skan repozytorium); po zmianie 3 z 3 przebiegów `npm test` zielone.
- Pełna weryfikacja: `npm run sprawdz` kod 0 (sekrety 0, zakazane wzorce 0, nazwy klientów 0, skany 0, zdjęcia z GPS 0, unittest 19 OK, kontrola tłumaczeń 11 par bez błędów, Vitest 90 PASS, build OK, Playwright 79 PASS). Lighthouse mobile `/` i `/en/`: 99/100/100/100 (`docs/lighthouse/2026-10-25.md`).

**🚧 W toku / nie wdrożone:**
- Nie wypchnięte. Gałąź `budowa`, scalona do `main` fast-forwardem. Wdrożenie dopiero po push na `main` za zgodą Roberta.

**🎯 Następny krok:**
- Za zgodą Roberta: push `main`, obserwacja workflow `Strona` (setup-python, wdrożenie, test produkcyjny po wdrożeniu).

## 2026-10-25 18:15, Claude Code

**✅ Zrobione:**
- `docs/panel-instrukcja.md`: zapis istniejącej pozycji przepisuje w `en.md` pola kopiowane z PL (`duplicate`, lista pól według kolekcji); każda zmiana w PL daje EN stan "do aktualizacji" do czasu `/tlumacz-strone` i nie blokuje wdrożenia; sam zapis bez zmian nie zmienia stanu.
- Wpis CHANGELOG z 17:36 poprawiony: wdrożenie działa pod https://robert-debicki.robert-debicki7.workers.dev, przebieg 40212866413.
- `LICENSE`: jedna linia, że treść, logo i skany referencji są © Robert Dębicki i nie są objęte MIT.
- `AGENTS.md`: jak później zdjąć `noindex` (`PUBLIC_INDEKSUJ=true`, usunięcie zmiennej z zabezpieczenia w `strona.yml`, `public/robots.txt` z linią `Sitemap`, asercja w teście produkcyjnym). Nic nie zmienione w działaniu.

**🚧 W toku / nie wdrożone:**
- `README.md` nadal pisze, że panelu "na razie nie ma". Poza zakresem tej poprawki, do aktualizacji.

**🎯 Następny krok:**
- Pełne `npm run sprawdz` i Lighthouse, scalenie do `main` (bez push).

## 2026-10-25 18:14, Claude Code

**✅ Zrobione:**
- CI `strona.yml`: `push` tylko na `main` plus `pull_request` do `main` (gałąź z PR nie uruchamia workflow dwa razy). Po wdrożeniu w zadaniu `wdroz`: instalacja Chromium i `npm run test:produkcja` z `ADRES=https://robert-debicki.robert-debicki7.workers.dev`. `playwright.produkcja.config.ts`: 2 powtórki w CI (brzeg Cloudflare tuż po wdrożeniu).
- wrangler 4.142.0 w `devDependencies` (dokładna wersja, w `package-lock.json`), wdrożenie przez `npx wrangler deploy` z lockfile zamiast pobierania `wrangler@4.142.0`.
- Panel: `slug: { encoding: 'ascii', clean_accents: true }` w konfiguracji Sveltii (klucze sprawdzone w `types/public.d.ts` wersji 0.221.8, typ `SlugOptions` w `CmsConfig`). Test w `panel.test.ts`.
- Sprawdzone: YAML workflow się parsuje (wyzwalacze i kroki `wdroz` odczytane), `npx wrangler --version` 4.142.0, test produkcyjny na obecnym adresie 4 PASS, Vitest `panel` 21 PASS.

**🚧 W toku / nie wdrożone:**
- Nowe kroki CI sprawdzi dopiero przebieg na GitHub po wypchnięciu.
- Działanie opcji slug w samym panelu (nowa pozycja z polskimi znakami) niesprawdzone w przeglądarce.

**🎯 Następny krok:**
- Dokumentacja: panel, CHANGELOG, LICENSE, zdjęcie noindex w AGENTS.md.

## 2026-10-25 18:12, Claude Code

**✅ Zrobione:**
- Strona 404: bez `link rel=canonical` (prop `noindex` w `Strona.astro` pomija też canonical). Test `testy/e2e/strona-404.spec.ts`.
- hreflang: mapa witryny używa tych samych kodów co HTML (`pl`, `en`, wcześniej `pl-PL` i `en-US`) i dostaje `x-default` na wersję polską przez `serialize` w `@astrojs/sitemap` (gdy adres ma odpowiednik). Test w `jezyki.spec.ts` porównuje kody w mapie i w HTML.
- Przełącznik języka: nazwa dostępna "English version" / "Wersja polska" (nowa etykieta `wersjaJezyka`, w języku celu, zgodnie z `lang` linku), widoczny tekst EN / PL bez zmian. Test nazwy i tekstu.
- Sprawdzone: Playwright 41 PASS (404, języki, wpisy, referencje, dostępność axe).

**🚧 W toku / nie wdrożone:**
- Mapa witryny łączy wersje językowe tylko przy tej samej ścieżce (`/` i `/en/`). Wpisy i referencje mają inne ścieżki w EN (`/wpisy/` i `/en/posts/`), więc w mapie nie mają `xhtml:link`, a w HTML mają hreflang. Bez zmian, do decyzji.

**🎯 Następny krok:**
- CI (test produkcyjny po wdrożeniu, wrangler z lockfile), slug ASCII w panelu, dokumentacja.

## 2026-10-25 18:10, Claude Code

**✅ Zrobione:**
- `skrypty/sprawdz-zdjecia.ts` (`npm run sprawdz:zdjecia`, w łańcuchu `npm run sprawdz`): przerywa z polskim komunikatem i nazwą pliku, gdy obraz w `src/assets/` ma w EXIF lokalizację GPS (sharp z zależności Astro, odczyt katalogu GPS 0x8825) albo gdy nie da się go odczytać (np. HEIC). Test z JPEG wygenerowanym z EXIF GPS, z czystym JPEG i z plikiem HEIC.
- `src/lib/wpisy.ts`: glob zdjęć przyjmuje rozszerzenia małymi i wielkimi literami (jpg, jpeg, png, webp, avif). Zdjęcie fikstury przemianowane na `foto.PNG`, więc test e2e wpisu sprawdza wielkie litery w buildzie.
- Zdjęcia z `testy/fikstury/` tylko w buildzie z fiksturami: stała `import.meta.env.OBRAZY_Z_FIKSTUR` z `astro.config.mjs` (prawda tylko przy `TRESC_BAZA`), gałąź z fiksturami znika z buildu produkcyjnego. Wcześniej `dist/_astro/foto.*.png` był w buildzie produkcyjnym (sprawdzone: identyczny bajtowo z fiksturą). Test e2e `build-bez-fikstur.spec.ts`: w `dist/` brak pliku o zawartości obrazu z fikstur, w `dist-fikstury/` zdjęcie jest.
- `docs/panel-instrukcja.md`: formaty zdjęć, eksport HEIC do JPG, kontrola lokalizacji.
- Sprawdzone: Vitest `sprawdz-zdjecia` 5 PASS, Playwright `build-bez-fikstur` i `wpisy` 13 PASS, `sprawdz:zdjecia` na repo 0.

**🚧 W toku / nie wdrożone:**
- Pełne `npm run sprawdz` na końcu serii poprawek.

**🎯 Następny krok:**
- SEO (404, hreflang), przełącznik języka, CI, slug ASCII w panelu, dokumentacja.

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
- Pierwsze wdrożenie wykonane za zgodą Roberta: strona działa pod https://robert-debicki.robert-debicki7.workers.dev (przebieg workflow `Strona` nr 40212866413).

**🚧 W toku / nie wdrożone:**
- Strona ma `noindex` (zamierzone do czasu decyzji Roberta).

**🎯 Następny krok:**
- Poprawki z przeglądu końcowego całego projektu.

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
- Zadanie 9: kontrole jakości i CI. `skrypty/sprawdz-tresc.ts` (`npm run sprawdz:tresc`) skanuje `src/` pod kątem pauz, półpauz i wzorców spoza zakresu treści (kontrola zakazanych wzorców); komunikat po polsku z plikiem i wierszem. AGENTS.md, docs/ i testy/ są pominięte celowo. Jedyna lista wzorców (`ZAKAZANE`) jest eksportowana i używana też przez test treści startowej (usunięta kopia inline z zadania 4).
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
