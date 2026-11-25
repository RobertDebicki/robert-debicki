## 2026-11-25 19:20, Claude Code

**✅ Zrobione:** układ sekcji usług przy parzystej liczbie kart: dwie kolumny (bazowe `.now`), przy nieparzystej trzy jak w makiecie (`src/components/Uslugi.astro`, decyzja Roberta 25.11: siatka 2 x 2 przy 4 kartach; zmiana wyglądu poza makietą `docs/makieta/uslugi.html`). Nowy test e2e (czerwony przed zmianą: 3 kolumny). Zrzuty 1440 i 390 px; 2 kolumny przy 1440 i 1024, 1 przy 390 i 360, bez przewijania w bok na `/`, `/uslugi/`, `/en/services/`. `npm run sprawdz` exit 0 (248 testów, 193 e2e, 24 pary tłumaczeń).

**🚧 W toku / nie wdrożone:** przegląd runda 2; ocena analizatora DNK; push, PR i wgranie czekają na zgodę Roberta.

**🎯 Następny krok:** przegląd zmian z rundy poprawek, potem PR do `main` po zgodzie Roberta.

## 2026-11-25 19:00, Claude Code

**✅ Zrobione:** poprawki po `/code-review` (medium, 8 uwag): voicebot PL i EN: notatka w CRM wraca do najprostszego wdrożenia (zgodnie z `ceny-uslug.md` z 23.11), rozbudowany bot „do 5000 zł netto” zamiast nakładających się widełek, „netto”/„plus VAT” przy 5000 w karcie; ikona karty Claude Code `dokument` zamiast powtórzonej `ai`. Fałszywy alarm: „fakty spoza listy” na stronie Claude Code (Desktop, Gmail, kalendarz, AdLoop, konsultant SEO, tokeny, instrukcja konta) Robert podał w rozmowie 25.11. DNK i kontrola tłumaczeń OK.

**🚧 W toku / nie wdrożone:** układ sekcji usług przy 4 kartach (siatka 3 kolumn zostawia jedną kartę samą w drugim rzędzie; zrzut 1440 px) czeka na decyzję Roberta, bo to zmiana wyglądu; ocena analizatora DNK; brak linku z FAQ AI do nowej strony (FAQ w szablonie nie ma linków).

**🎯 Następny krok:** decyzja o układzie kart, poprawka, przegląd runda 2 (tylko zmiany), PR po zgodzie.

## 2026-11-25 18:40, Claude Code

**✅ Zrobione:** Robert zaakceptował tekst strony „Szkolenie Claude Code” (bez oceny z analizatora DNK). EN `/en/services/claude-code-training/` (fraza „claude code training”, dodatkowe „claude code for business”, „claude code for teams”, podpowiedzi Google hl=en zapisane w `frazy-uslug.md` sekcja 5) z 2 grafikami EN. Voiceboty PL i EN: karta „od 2000 zł netto, rozbudowany bot do 5000 zł”, FAQ z zakresem ceny 2000 zł (scenariusz, testy, poprawki, oddanie z jednym scenariuszem) i widełkami 2000 do 5000 zł netto (Robert, 25.11; `ceny-uslug.md`). DNK OK dla obu stron, kontrola tłumaczeń 24 pary OK, `npm run sprawdz` exit 0 (248 testów, 192 e2e, 0 sekretów).

**🚧 W toku / nie wdrożone:** `/code-review`; EN w stanie `ai` (korekta native speakera); push, PR i wgranie czekają na zgodę Roberta.

**🎯 Następny krok:** przegląd, poprawki, PR do `main` po zgodzie; po wgraniu zgłoszenie 2 nowych adresów w GSC.

## 2026-11-25 18:15, Claude Code

**✅ Zrobione:** 2 grafiki strony „Szkolenie Claude Code” (`szkolenie-claude-code-1.png`: 3 kroki wdrożenia, `-2.png`: co wrzucać do Claude Code, a czego nie) w `docs/blog-szkice/podglad/uslugi-grafiki.html`, zrzut `zrzut-uslugi.mjs` (pozostałe PNG bez zmian). DNK OK bez uwag, build OK. GitHub: tematy repo i profilowe README `RobertDebicki/RobertDebicki` opublikowane za zgodą Roberta („publikuj”).

**🚧 W toku / nie wdrożone:** akceptacja tekstu i ocena z analizatora DNK; wersja EN (z grafikami EN); e2e; pole Website i Bio w profilu GitHub (Robert).

**🎯 Następny krok:** poprawki po analizatorze, `/tlumacz-strone`, `npm run sprawdz`, `/code-review`.

## 2026-11-25 18:10, Claude Code

**✅ Zrobione (gałąź `uslugi-szkolenie-claude-code`):** szkic nowej strony usługi `/uslugi/szkolenie-claude-code/` (fraza „szkolenie Claude Code”, dodatkowe „wdrożenie Claude Code”, „Claude Code dla firm”; fakty od Roberta 25.11: około 2000 zł netto, konfiguracja, baza wiedzy o firmie, 4 skille, szkolenie zdalnie albo w siedzibie, przykład producenta mebli: miesiąc wdrożenia, 5 h szkolenia, subskrypcja klienta około 400 zł/mies.). DNK OK (uwaga: 0 zdjęć), `sprawdz:tresc` 0, testy 248, build OK, zrzut 1280 px bez przewijania w bok. Analityka: filtr ruchu wewnętrznego GA4 włączony przez Roberta (IP domowe), test kliknięć: `klik_email` i `klik_telefon` dochodzą, `klik_linkedin` z telefonu nie doszedł (z komputera i emulacji tak). GitHub: repo `robert-debicki` ma adres strony; tematy i profilowe README czekają na koniec awarii GitHuba.

**🚧 W toku / nie wdrożone:** akceptacja tekstu i ocena z analizatora DNK (Robert); 2 grafiki; wersja EN; e2e.

**🎯 Następny krok:** poprawki po ocenie analizatora, grafiki, `/tlumacz-strone`, `npm run sprawdz`; voicebot: nowe fakty (rozbudowany 2000 do 5000 zł, zakres ceny 2000 zł) do FAQ strony usługi po decyzji Roberta.

## 2026-11-23 20:00, Claude Code

**✅ Zrobione (wgranie za zgodą Roberta „wgraj” w wiadomości z 23.11):** `npm run wdroz -- --wgraj` z `main` (eaae1d9): 203 pliki, kopia serwera `~/Backups/robert-debicki-ftp/2026-11-23T18-45-56-549Z`, odbiór zgodny, .htaccess działa. `npm run test:produkcja`: 5 passed. Na żywo (curl, 200): ceny na 3 stronach usług PL i EN, grafiki usług, wpis `/wpisy/ile-kosztuje-wdrozenie-ai/` i `/en/posts/ai-implementation-cost/` z grafikami; oba w sitemap.

**🚧 W toku / nie wdrożone:** Robert zgłasza 2 adresy nowego wpisu w GSC („Poproś o zindeksowanie”).

**🎯 Następny krok:** pomiar AI co tydzień według `docs/seo/pomiar-ai.md` (następny 30.11.2026); kontrola GSC 21.12.2026; linki zewnętrzne z `linki-zewnetrzne.md` (prośby do klientów, Make Partner, szablony n8n).

## 2026-11-23 19:55, Claude Code

**✅ Zrobione:** PR #18 scalony przez Roberta (`main` = eaae1d9). Na `main`: `npm run sprawdz` exit 0 (248 testów, 192 e2e, 23 pary tłumaczeń, 0 sekretów); `npm run wdroz -- --na-sucho`: 203 pliki, w tym nowy wpis `wpisy/ile-kosztuje-wdrozenie-ai/`, bez usuwania na serwerze.

**🚧 W toku / nie wdrożone:** wgranie na serwer czeka na „wgraj” od Roberta.

**🎯 Następny krok:** po „wgraj”: `npm run wdroz -- --wgraj`, `npm run test:produkcja`, sprawdzenie cen na żywych adresach, link GSC do zindeksowania nowego wpisu (PL i EN); kontrola GSC 21.12.2026.

## 2026-11-23 19:40, Claude Code

**✅ Zrobione:** przegląd runda 2 (low) bez błędów w kodzie; kwoty we wpisie sprawdzone ręcznie z `pomiar-ai.md`. Gałąź `wpis-koszt-wdrozenia-ai` wypchnięta, PR #18 do `main`: https://github.com/RobertDebicki/robert-debicki/pull/18

**🚧 W toku / nie wdrożone:** merge PR i wgranie na serwer czekają na zgodę Roberta.

**🎯 Następny krok:** po „wgraj”: merge, `npm run wdroz -- --wgraj`, `npm run test:produkcja`, sprawdzenie cen na żywych adresach; kontrola GSC 21.12.2026.

## 2026-11-23 19:30, Claude Code

**✅ Zrobione:** uwaga 2 z przeglądu zamknięta: Robert potwierdził, że cena voicebota rośnie z liczbą scenariuszy i integracji, a automatyzacji z liczbą kroków i systemów; zapisane w `ceny-uslug.md`, zdania na stronie zostają.

**🎯 Następny krok:** przegląd poprawek (runda 2), PR do `main`.

## 2026-11-23 19:20, Claude Code

**✅ Zrobione:** poprawki po `/code-review` (medium, 8 uwag): ceny rynku we wpisie zgodne ze źródłami (chatbot lub automatyzacja 3 do 15 tys. zł, szkolenie od około 1750 zł; grafika 2 PL i EN); opłaty na kontach klienta i koszt n8n tylko tam, gdzie są potwierdzone; „netto”/„plus VAT” przy voicebocie w zajawce i alt; FAQ strony usług „Ile kosztuje strona wizytówka?” zamiast „strona WordPress” (fraza dodatkowa do kontroli: „sklep WooCommerce”, EN `ai`); `ceny-uslug.md` bez nieaktualnego punktu o 1000 zł (sprawa zamknięta decyzją Roberta); komunikat `obraz()` „Strona …” zamiast „Wpis …”; usunięta nieużywana `bezPogrubienia`. `npm run sprawdz`: 248 testów, 192 e2e, 23 pary tłumaczeń OK.

**🚧 W toku / nie wdrożone:** uwaga 2 z przeglądu czeka na Roberta: czy cena rośnie z liczbą scenariuszy rozmów i integracji (voicebot) oraz kroków i systemów (automatyzacja).

**🎯 Następny krok:** odpowiedź Roberta na uwagę 2, przegląd poprawek, PR.

## 2026-11-23 19:00, Claude Code

**✅ Zrobione:** wpis o kosztach AI (PL, EN, grafika 2 w obu językach): bez nazw firm konkurencji (decyzja Roberta); ceny rynku opisane ogólnie jako cenniki firm wdrożeniowych, zakresy zgodne ze źródłami w `docs/seo/pomiar-ai.md` (utrzymanie voicebota 299 do 1500 zł/mies., wdrożenie z integracjami od 8000 zł). DNK OK bez uwag, kontrola tłumaczenia OK, build OK.

**🎯 Następny krok:** akceptacja tekstu przez Roberta, potem Task 8 (`/code-review`, PR, wgranie po zgodzie).

## 2026-11-23 18:45, Claude Code

**✅ Zrobione (gałąź `wpis-koszt-wdrozenia-ai`):** Task 4: wpis „Ile kosztuje wdrożenie AI w firmie” PL i EN (`/en/posts/ai-implementation-cost/`), fraza główna „ile kosztuje wdrożenie AI”, dodatkowa „ile kosztuje agent AI” (wolumeny w `frazy-uslug.md`). Tylko ceny Roberta z `ceny-uslug.md` i fakty ze stron usług; ceny rynku z podanym źródłem (Herens, AutomAIze, odbierze.ai, SimpleFast, SoftSolid, 23.11). 2 grafiki i miniatura PL i EN (`docs/blog-szkice/podglad/koszt-wdrozenia-ai*.html`, `zrzut-koszt-ai.mjs [en]`). DNK: OK bez uwag. Kontrola tłumaczeń 23 pary OK. `npm run sprawdz`: 249 testów, 192 e2e.

**🚧 W toku / nie wdrożone:** ocena z analizatora DNK: Robert wkleja okienka z `skrypty/analizator.ts`. Akceptacja tekstu przez Roberta. EN w stanie `ai`.

**🎯 Następny krok:** Task 8: `/code-review` całej pracy z 23.11, PR, wgranie po zgodzie Roberta.

## 2026-11-23 18:10, Claude Code

**✅ Zrobione:** AI i automatyzacja PL i EN: karta „Claude Code w zespole: wdrożenie ze szkoleniem około 2000 zł netto” i 7. pytanie FAQ „Ile kosztuje wdrożenie Claude Code w firmie?” (decyzja Roberta). DNK OK, kontrola tłumaczenia OK; EN tej strony z powrotem `tlumaczenie: ai` (nowy tekst po akceptacji).

**🎯 Następny krok:** wpis „Ile kosztuje wdrożenie AI w firmie” przez /wpis-rd (zgoda Roberta), potem Task 8.

## 2026-11-23 18:00, Claude Code

**✅ Zrobione:** `linki-zewnetrzne.md`: LinkedIn (opis i adres strony) oznaczony jako zrobiony; Robert zrobił to wcześniej. GitHub pominięty z decyzji Roberta (nie ma czego pokazać).

**🎯 Następny krok:** decyzja o cenie wdrożenia Claude Code na stronie, zgoda na wpis o kosztach, Task 8.

## 2026-11-23 17:50, Claude Code

**✅ Zrobione:** Task 6: `docs/seo/pomiar-ai.md`: 10 pytań klientów, pomiar wyjściowy Google AI Overview (Treg cloro, $0.028): robert-debicki.pl nie jest cytowany w żadnym z 10 (zmiany z 23.11 jeszcze niewgrane). Tabela cen konkurencji z tych wyników, w tym wdrożenia Claude Code (SoftSolid od 1800 zł szkolenie indywidualne, wdrożenie w zespole od 6900 zł netto; szkolenia otwarte 1750 do 2450 zł netto). Kontrola GSC 21.12.2026.

**🎯 Następny krok:** decyzja Roberta: cena wdrożenia Claude Code (około 2000 zł netto) na stronie usług; LinkedIn; Task 8 (code-review, PR, wgranie po zgodzie).

## 2026-11-23 17:30, Claude Code

**✅ Zrobione:** voiceboty PL i EN: koszt miesięczny (karta „Co miesiąc: około 20 USD ElevenLabs i numer telefonu”, w FAQ o cenie zamiast zdania z prośbą o dane, bo wezwanie jest pod FAQ), dane w `docs/seo/ceny-uslug.md`. Robert zaakceptował teksty EN bez poprawek: 22 pozycje `tlumaczenie: sprawdzone`. DNK voiceboty OK, sprawdz:tlumaczenia OK, testy OK.

**🎯 Następny krok:** Task 6 pomiar AI, konkurencja dla wdrożeń Claude Code, LinkedIn.

## 2026-11-23 17:15, Claude Code

**✅ Zrobione:** Task 5: URL Inspection API (AdLoop, odczyt) dla 32 adresów z `sitemap-0.xml` żywej strony: 30 „Submitted and indexed”, 2 „URL is unknown to Google”: `/en/posts/business-process-automation-ai/` i `/en/services/`. Obie zwracają 200, canonical na siebie, bez noindex. Linki przekazane Robertowi do „Poproś o zindeksowanie”.

**🚧 W toku / nie wdrożone:** Robert zgłasza 2 adresy w GSC. Zmiany z Task 1, 2, 3 i 9 lokalnie, bez pusha i wgrania.

**🎯 Następny krok:** Task 8: `/code-review`, PR, wgranie po zgodzie Roberta.

## 2026-11-23 17:05, Claude Code

**✅ Zrobione:** Task 3: wpis „n8n, Make czy Zapier” (PL i EN) ma drugi link, do `/uslugi/strony-i-aplikacje/` (anchor „aplikacje na zamówienie”, EN „custom apps”). Żeby nie przekroczyć 1000 słów (DNK 10), zdanie „przy prostej automatyzacji dla małego zespołu Zapier albo Make wystarczą” zastąpione zdaniem z linkiem; podobna myśl zostaje wyżej we wpisie. DNK: OK bez uwag, kontrola tłumaczeń OK, sprawdz:tresc 0.

**🎯 Następny krok:** Task 5: indeksacja adresów EN w Search Console.

## 2026-11-23 16:50, Claude Code

**✅ Zrobione:** Task 9 (akceptacja Roberta 23.11): szablon usługi ma pogrubioną frazę w `lead` (`**…**`), grafiki pod krokami (pole `zdjecia`, `src/assets/uslugi/`, PL i EN) i wezwanie pod FAQ (pole `wezwanie`). Schemat, panel (pola z podpowiedziami), `src/lib/uslugi.ts` (`czesciPogrubienia`, `bezPogrubienia`), `skrypty/dnk.ts`: zamiast stałych uwag „szablon nie…” sprawdza prawdziwe pola (DNK 4 pogrubienie, DNK 7 liczba i alt grafik, DNK 8 wezwanie wspólne z wpisami). 11 nowych testów. DNK 3 usług PL: 0 błędów. Kontrola tłumaczeń 22 pary OK. `npm run sprawdz`: 249 testów jednostkowych, 192 e2e. Zrzuty voiceboty (komputer, telefon) sprawdzone. Uwaga: build z fiksturami wymagał usunięcia starego cache `node_modules/.astro-distfikstury` (stary schemat bez `zdjecia`).

**🚧 W toku / nie wdrożone:** nic nie wypchnięte ani wgrane. EN w stanie `ai` (korekta osoby z USA).

**🎯 Następny krok:** Task 3 (link z wpisu o n8n), Task 5 (indeksacja EN), potem Task 8: `/code-review`, PR i wgranie po zgodzie Roberta.

## 2026-11-23 16:20, Claude Code

**✅ Zrobione:** Task 9, przygotowanie do akceptacji: 6 grafik stron usług (po 2 na usługę, tylko fakty ze stron) w `src/assets/uslugi/`, źródło `docs/blog-szkice/podglad/uslugi-grafiki.html`, zrzut `node docs/blog-szkice/podglad/zrzut-uslugi.mjs`. W tym samym pliku propozycje wezwań pod FAQ (wzór DNK „**Napisz do mnie: office@robert-debicki.pl** i …”, 117 do 176 znaków) i pogrubienia frazy we wstępie. sprawdz:tresc 0, sprawdz:zdjecia 0.

**🚧 W toku / nie wdrożone:** strony jeszcze nie używają grafik ani wezwań (szablon bez zmian). Czeka na akceptację Roberta.

**🎯 Następny krok:** po akceptacji Task 9 kroki 1 do 7 (schemat, szablon, dnk.ts, treść, EN z grafikami po angielsku).

## 2026-11-23 16:00, Claude Code

**✅ Zrobione:** Task 2 planu: ceny i czas w EN trzech usług (karta „Cost” i „Setup time”, FAQ „How much…”), „netto” jako „plus VAT” jak w opisie, wizytówka jako „brochure website” (opis EN też). kontrola_tlumaczenia: 3 pary OK, stan `ai`. `npm run sprawdz`: 22 pary tłumaczeń OK, 239 testów jednostkowych, 192 e2e, wszystko zielone.

**🚧 W toku / nie wdrożone:** tekst EN czeka na korektę osoby z USA (stan `ai`). Nic nie wypchnięte ani wgrane.

**🎯 Następny krok:** Task 3: link do „strony i aplikacje” z wpisu o n8n. Task 9 czeka na wybór zdjęć przez Roberta.

## 2026-11-23 15:40, Claude Code

**✅ Zrobione:** opis strony „strony i aplikacje” (PL i EN): „Strona wizytówka od 800 zł plus VAT” zamiast „landing page około 1000 zł” (decyzja Roberta). Długość 133 i 142 znaki, DNK OK. W planie nowe Task 9: szablon usługi z pogrubioną frazą we wstępie, zdjęciami i wezwaniem pod FAQ, skrypt DNK sprawdza prawdziwe pola.

**🎯 Następny krok:** Task 2: wersje EN cen trzech usług przez /tlumacz-strone. Task 9 czeka na wybór zdjęć przez Roberta (bez nich robimy pogrubienie i wezwanie).

## 2026-11-23 15:20, Claude Code

**✅ Zrobione:** Task 1 planu, wszystkie 3 usługi PL: AI i automatyzacja (od 500 zł netto, około 3 dni), strony i aplikacje (wizytówka od 800 zł netto, około 4 dni), voiceboty (poprawka: fraza „voicebot” wróciła do 6 wystąpień). Kontrola DNK wszystkich stron PL z frazami z `docs/seo/frazy-uslug.md` i `docs/blog-szkice/README.md`: 3 usługi i wpis n8n bez błędów. Build OK, kwota w karcie i w JSON-LD FAQPage każdej usługi. sprawdz:tresc 0.

**🚧 W toku:** Robert decyduje, czy „landing page około 1000 zł” w opisie strony usług zgadza się z wizytówką od 800 zł.

**🎯 Następny krok:** Task 2: wersje EN trzech usług przez /tlumacz-strone.

## 2026-11-23 14:55, Claude Code

**✅ Zrobione:** Task 1 planu `2026-11-23-braki-po-audycie-seo.md`, część voiceboty PL: w karcie „Koszt: od 2000 zł netto” i „Czas wdrożenia: 2 tygodnie do pierwszych testów”, odpowiedź FAQ „Ile kosztuje voicebot dla firmy?” zaczyna się od kwoty. Liczby od Roberta, zapisane w `docs/seo/ceny-uslug.md`. Kontrola DNK: zmiana nie dodaje błędów (6 błędów frazowych było już wcześniej, wynik przed i po porównany). Build OK, kwota w karcie i w JSON-LD FAQPage. Usunięta nazwa klienta z wpisu 11:08 (sprawdz:tresc: 0).

**🚧 W toku:** ceny i czas dla „AI i automatyzacja” oraz „Strony i aplikacje” czekają na Roberta. Koszt miesięczny voicebota (minuty) niepodany, na stronie go nie ma.

**🎯 Następny krok:** Robert podaje liczby dla 2 pozostałych usług, potem Task 1 dla nich i Task 2 (EN).


## 2026-11-23 12:45, Claude Code

**✅ Zrobione:** plan uzupełnień po audycie: `docs/superpowers/plans/2026-11-23-braki-po-audycie-seo.md` (9 zadań: ceny i czas na stronach usług PL i EN, link do „strony i aplikacje”, wpis o kosztach AI, indeksacja EN, pomiar AI, linki zewnętrzne, wydanie).

**🎯 Następny krok:** Task 0: Robert podaje ceny i czas wdrożenia dla 3 usług.

## 2026-11-23 12:30, Claude Code

**✅ Zrobione:** audyt SEO i widoczności w AI: `docs/seo/audyt-2026-11-23.md` (GSC przez AdLoop, wyniki Google i AI Overview z cloro, liczby wyszukiwań z DataForSEO, linki z SE Ranking; Treg ~$0.32). Technika bez usterek na 32 adresach. GSC 90 dni: 0 kliknięć, 37 wyświetleń. 0 domen linkujących (konkurenci 9 do 187). Strony usług bez cen i terminów, a AI Overview cytuje ceny konkurencji.

**🚧 Nie zrobione:** żadnych zmian na stronie; frazy „agenci ai”, „voicebot”, „ksef faktury kosztowe” bez sprawdzenia pozycji.

**🎯 Następny krok:** Robert podaje widełki cen i czasu wdrożenia dla 3 usług; potem zmiana stron usług według zasad DNK i GitHub/LinkedIn z `linki-zewnetrzne.md`.

## 2026-11-23 11:10, Claude Code

**✅ Zrobione:** skill `seo-audit` (`.claude/skills/seo-audit/`, wyłączony z gita w `.git/info/exclude`, identyczna kopia w projekcie innego klienta) uzupełniony po filmie o SEO 2027 (transkrypt 127 min): grupowanie fraz po wspólnych wynikach Google (heurystyka: 3+ wspólne adresy w top 10) z kolumną „Cluster / Owning Page”, sekcja 6 „AI Search Visibility” (dostęp botów i ustawienia Cloudflare, treść w surowym HTML, odpowiedź na początku sekcji, fakty w jednej wersji, wzmianki zewnętrzne, pytania wyjściowe), typ audytu „AI search visibility check”, tabela w raporcie, FID zamienione na INP, zastrzeżenie przy FAQ/HowTo. Przegląd świeżego agenta: 10 uwag, wprowadzone.

**🚧 Nie zrobione:** twierdzenia z filmu (llms.txt, badania cytowań) niezweryfikowane u źródła.

**🎯 Następny krok:** pierwszy audyt z nową sekcją 6 na robertdebicki.pl.

## 2026-11-22 22:35, Claude Code

**✅ Zrobione (PR #16 i #17 scalone, wdrożenie za zgodą Roberta w wiadomości 22.11):** na home.pl wgrano 154 pliki (`npm run wdroz -- --wgraj`, kopia serwera w `~/Backups/robert-debicki-ftp/2026-11-22T21-22-18-097Z`), odbiór zgodny z lokalnymi, `.htaccess` działa, `test:produkcja` 5 z 5. Na żywo: nowy wpis `/wpisy/wizytowka-firmy-w-chatgpt/` (200, tytuł „Wizytówka firmy w ChatGPT: co daje | Robert Dębicki”) i `/en/posts/chatgpt-business-profile/` (200); wpis GUS ma 17,8 procent, wpis n8n/Make ma „Make liczy kredyty”. Wdrożenie przeszło dzięki przypiętemu kluczowi certyfikatu FTPS (wpis z 22:30).

**🚧 Nie zrobione:** analizator DNK nowego wpisu czeka na wklejenie przez Roberta (okienka w `~/Desktop/rolki-tiktok/analizator-wizytowka-chatgpt.md`). EN nowego wpisu ma stan `ai`. Klucz FTPS do podmiany przy odnowieniu certyfikatu (wygasa 14.12.2026).

**🎯 Następny krok:** ocena z analizatora DNK i poprawki; podmiana `PIN_KLUCZA_HOME` przed 14.12.2026.

## 2026-11-22 22:30, Claude Code

**✅ Zrobione (za zgodą Roberta w tej wiadomości):** `npm run wdroz` przestał przechodzić: serwer FTPS `serwer2643459.hosting-home.pl` oddaje certyfikat `*.home.pl`, więc curl kończył się błędem 60 (nazwa się nie zgadza). Zmierzone: certyfikat ważny od 29.05 do 14.12.2026 i ten sam we wszystkich próbach, `curl`, skrypt i plik z danymi bez zmian od ostatniego udanego wdrożenia (19.11), przyczyna zmiany nieznana (podejrzewana zmiana po stronie home.pl). Próba z nazwą `*.home.pl` nie działa: serwer zrywa połączenie (curl 35). Rozwiązanie: dla hosta `*.hosting-home.pl` skrypt przypina klucz publiczny serwera (`pinnedpubkey`) i wyłącza sprawdzanie nazwy (`insecure`); inny klucz kończy połączenie błędem 90 (sprawdzone na żywo: zły klucz odrzucony, właściwy przechodzi do logowania). Testy: `testy/jednostkowe/wdroz.test.ts` (39), `npm test` 239 passed, skan sekretów 0.

**🚧 Nie zrobione:** klucz zmieni się przy odnowieniu certyfikatu (wygasa 14.12.2026), wtedy wdrożenie da błąd 90 i trzeba podmienić `PIN_KLUCZA_HOME` w `skrypty/wdroz.ts` (polecenie w komentarzu). Przyczyny zmiany po stronie home.pl nie ustalono.

**🎯 Następny krok:** wdrożenie wpisów (PR #16) i sprawdzenie żywych adresów; do tego czasu nowy wpis nie jest na stronie.

## 2026-11-22 22:15, Claude Code

**✅ Zrobione (gałąź `wpis-wizytowka-chatgpt`, lokalnie, bez pusha i wdrożenia):** nowy wpis „Wizytówka firmy w ChatGPT: co daje” (PL i EN, adres EN `chatgpt-business-profile`), do którego odsyła rolka TikTok z 22.11. Fakty z artykułu „Setting up your business on ChatGPT” w centrum pomocy OpenAI (stan 22.11.2026): przejęcie w Business Hub, weryfikacja w Personie, statystyki z 28 dni, przejęcie nie zmienia widoczności, agent tylko dla firm z USA. Artykuł nie podaje listy krajów, więc wpis tego nie rozstrzyga. Fraza główna „wizytówka firmy w ChatGPT” (Google nie podpowiada jej wcale, bez konkurencji), dodatkowa „widoczność firmy w ChatGPT”. `skrypty/dnk.ts`: OK, 813 słów. Trzy grafiki i miniatura w PL i EN (`docs/blog-szkice/podglad/wizytowka-chatgpt*.html`, `zrzut-wizytowka.mjs [en]`). `npm run sprawdz` przeszedł (e2e 192 passed, 1 skipped).

**🚧 Nie zrobione:** analizator DNK (ocena w punktach) czeka na wklejenie przez Roberta. Tłumaczenie EN ma stan `ai`, bez korekty native speakera. Wpis nie wdrożony.

**🎯 Następny krok:** Robert wkleja okienka do analizatora i odsyła ocenę; potem zgoda na push i wdrożenie razem z poprawkami z gałęzi `wpis-gus-2026`.

## 2026-11-19 23:00, Claude Code

**✅ Zrobione (gałąź `wpis-gus-2026`, lokalnie, bez pusha i wdrożenia):** wpis „n8n, Make czy Zapier” (PL i EN): Make liczy kredyty, nie operacje. Dopisane, że od 27 sierpnia 2025 roku jedna operacja w Make to jeden kredyt, poza wbudowanymi funkcjami AI (help.make.com, notatka „Introducing credits: new billing unit live in Make”, sekcja 2025: „1 operation still uses 1 credit”), w przykładzie „5 operacji, czyli 5 kredytów”. Grafiki z „5 operacjami” bez zmian (nadal zgodne). Kontrola DNK (fraza „n8n, Make czy Zapier”, dodatkowa „n8n czy Make”) bez błędów, kontrola tłumaczenia bez błędów, `npm run sprawdz` przeszedł (e2e 192 passed, 1 skipped).

**🚧 Nie zrobione:** push i wdrożenie obu wpisów (GUS 2026 i Make) czekają na poniedziałek 23.11, decyzja Roberta.

**🎯 Następny krok:** wdrożenie gałęzi `wpis-gus-2026` w poniedziałek 23.11 za zgodą Roberta.

## 2026-11-19 22:30, Claude Code

**✅ Zrobione (gałąź `wpis-gus-2026`, lokalnie, bez pusha i wdrożenia):** wpis „Automatyzacja procesów w firmie z AI” (`ile-firm-uzywa-ai`) z danymi GUS za 2026 rok (informacja sygnalna „Społeczeństwo informacyjne w Polsce w 2026 r.”, 21.10.2026, s. 4): AI stosuje 17,8% firm (o 9,1 p.proc. więcej niż 8,7% w 2025), obraz, dźwięk lub wideo 9,9%, tekst lub głos 9,7%, marketing i sprzedaż 11,1%, praca biurowa i decyzje 9,6%. Podział według wielkości firmy i finanse zostają z tablic 2025 (z rokiem w zdaniu), Eurostat bez zmian (dane za 2025). Zmienione: zajawka, wstęp, dwa akapity sekcji o danych, odpowiedź w FAQ; PL i EN. Kontrola DNK (fraza „automatyzacja procesów w firmie”, dodatkowa „wdrożenie AI w firmie”) bez błędów, `sprawdz:tresc` 0, kontrola tłumaczenia bez błędów, `npm run sprawdz` przeszedł (e2e 192 passed, 1 skipped). Powód: rolka na TikTok o danych GUS 2026 odsyła do tego wpisu.

**🚧 Nie zrobione:** analizator DNK po zmianie liczb nie uruchomiony ponownie (struktura tekstu bez zmian). Push i wdrożenie czekają na zgodę Roberta. Wpis „n8n, Make czy Zapier” nadal opisuje operacje w Make (od 27 sierpnia Make liczy kredyty).

**🎯 Następny krok:** zgoda Roberta na wdrożenie przed 23.11 (rolka); potem poprawka wpisu `n8n-make-czy-zapier` (kredyty w Make) przed 25.11.

## 2026-11-19 19:00, Claude Code

**✅ Zrobione (PR #15 scalony, za zgodą Roberta):** menu pod przyciskiem na wąskim ekranie wdrożone na home.pl (140 plików, odbiór zgodny, kopia serwera w `~/Backups/robert-debicki-ftp/2026-11-19T17-57-44-395Z`). `test:produkcja` 5 z 5, przycisk menu obecny na `/` i `/en/`, zrzut żywej strony przy 390 px z otwartym menu poprawny.

**🚧 Nie zrobione:** Lighthouse mobile po zmianie nie mierzony. Wpis KSeF EN nadal z polskimi grafikami.

**🎯 Następny krok:** pomiar Lighthouse mobile na żywej stronie; grafiki EN dla wpisu KSeF.

## 2026-11-19, Claude Code

**✅ Zrobione (gałąź `menu-hamburger`, lokalnie, bez pusha i wdrożenia):** menu na wąskim ekranie (poniżej 900 px) chowa się pod przyciskiem z trzema kreskami, obok zostaje przełącznik języka. Po otwarciu lista linków w dużych wierszach z kwadracikami, zamyka się po kliknięciu linku, klawiszem Esc i ponownym kliknięciem. Bez JavaScriptu menu zostaje rozwinięte jak wcześniej. Od 900 px menu bez zmian, przełącznik EN wyszedł z `<nav>` (ramka węższa o niewidoczny kwadracik). Zmiana wyglądu względem makiety decyzją Roberta 19.11; test zgodności z makietą przy 390 px porównuje nagłówek bez menu. Nowy test `testy/e2e/menu.spec.ts`. `npm run sprawdz` przeszedł (e2e 192 passed, 1 skipped).

**🚧 Nie zrobione:** Lighthouse mobile po zmianie nie mierzony; push i wdrożenie czekają na zgodę Roberta.

**🎯 Następny krok:** Robert ogląda menu na telefonie (np. `npm run dev -- --host`), potem decyzja o pushu i wdrożeniu.

## 2026-11-18 19:10, Claude Code

**✅ Zrobione (PR #14 scalony, za zgodą Roberta):** angielskie grafiki wpisu „Polityka AI w firmie” i angielski adres `/en/posts/ai-policy-for-your-company/` wdrożone na home.pl (140 plików, odbiór zgodny, `test:produkcja` 5 z 5). Stary adres EN `/en/posts/polityka-ai-w-firmie/` przekierowuje 301. Pierwsze wgranie przerwało się na błędzie DNS (curl 6), ponowienie przeszło. Po przerwaniu zostały osierocone pliki `.part` w `_astro/`, sprawdzić i usunąć ręcznie, jeśli są.

**🚧 Nie zrobione:** wpis KSeF EN nadal z polskimi grafikami; frazy EN dla wpisu brak.

**🎯 Następny krok:** grafiki EN dla wpisu KSeF (wymaga zgody na kolejną publikację); wpisy „oszustwo na prezesa” i „agent AI” nadal na `poprawki-dnk`.

## 2026-11-18 19:00, Claude Code

**✅ Zrobione (gałąź `blog-polityka-grafiki-en`, lokalnie, bez pusha i wdrożenia):** adres angielskiej wersji wpisu „Polityka AI w firmie” był polski (`/en/posts/polityka-ai-w-firmie/`), bo brakowało pola `adresEn`. Ustawione `adresEn: "ai-policy-for-your-company"`, adres `/en/posts/ai-policy-for-your-company/`. Link w `en.md` do wpisu o AI Act wskazuje teraz na `/en/posts/ai-act-for-small-business/` zamiast starego polskiego adresu. Przekierowania 301 ze starego adresu EN dopisane w `hosting/htaccess` i `public/_redirects`. `npm run sprawdz` exit 0, build zawiera nowy adres.

**🚧 Nie zrobione:** push i wdrożenie (na żywej stronie stary adres EN nadal działa i ma grafiki po polsku, do czasu wdrożenia). Wpis KSeF EN nadal z polskimi grafikami.

**🎯 Następny krok:** Robert potwierdza push i wdrożenie obu poprawek (grafiki EN i adres EN); potem grafiki EN dla wpisu KSeF.

## 2026-11-18 18:30, Claude Code

**✅ Zrobione (gałąź `blog-polityka-grafiki-en`, lokalnie, bez pusha i wdrożenia):** grafiki wpisu „Polityka AI w firmie” w wersji EN: 3 grafiki i miniatura po angielsku (`src/assets/wpisy/polityka-ai-w-firmie-en-*.png`), źródło w `docs/blog-szkice/podglad/grafiki_en.py` (`POLITYKA`, `MINIATURY_EN`), zrzut przez `zrzuty.mjs en`. `en.md` wskazuje nowe pliki, ALT i podpisy zgodne z grafikami. Kontrola tłumaczeń: 0 błędów dla polityki, `sprawdz:tresc` 0 i 0, `npm run build` exit 0.

**🚧 Nie zrobione:** push i wdrożenie tej poprawki na żywą stronę (czeka na zgodę Roberta). Na żywej stronie EN wpis nadal pokazuje grafiki po polsku. Wpisy KSeF EN (`ksef-faktury-kosztowe-1..3.png`, miniatura) też używają polskich grafik; do zrobienia tym samym sposobem. Frazy EN dla wpisu nadal brak.

**🎯 Następny krok:** Robert potwierdza push i wdrożenie tej poprawki; potem grafiki EN dla wpisu KSeF.

## 2026-11-18 12:00, Claude Code

**✅ Zrobione (publikacja za zgodą Roberta w wiadomości 18.11, gałąź `blog-polityka-ai`):** wpis „Polityka AI w firmie na jedną stronę” w wersji PL (`src/content/wpisy/polityka-ai-w-firmie/pl.md`, z `poprawki-dnk`, data 2026-11-20) i nowa wersja EN (`en.md`, `tlumaczenie: ai`, `zrodlo` przeliczone), 3 grafiki i miniatura. Kontrola DNK PL: `dnk.ts` 0 błędów (frazy: „polityka AI w firmie”, dodatkowa „wdrożenie AI w firmie”). Kontrola tłumaczeń: 0 błędów, jedna uwaga o cudzysłowie poprawiona. `npm run sprawdz` exit 0.

**🚧 Nie zrobione:** ocena z analizatora DNK (okienka wygenerowane, ocenę wkleja Robert); brak frazy EN dla tego wpisu w `docs/seo/frazy-uslug.md`; data 20.11 przy publikacji 18.11 (Robert zaplanował piątek); grafiki PL z tekstem polskim, wersja EN używa tych samych plików; korekta native speakera. Wpisy „oszustwo na prezesa” i „agent AI w firmie” nadal tylko na `poprawki-dnk`.

**🎯 Następny krok:** Robert wkleja ocenę analizatora dla polityki AI; decyzja o frazie EN i grafikach EN; następny z listy: „oszustwo na prezesa” (data 20.11).

# CHANGELOG

## 2026-11-17 19:30, Claude Code

**✅ Zrobione (za zgodą Roberta):** poprawka linku w angielskim wpisie o KSeF wdrożona na żywą stronę; dopisana reguła o linkach w `en.md` do „Reguł nauczonych” w `REVIEW.md`.

**🎯 Następny krok:** jutro Search Console po podpięciu AdLoopa (indeksacja nowych adresów EN, przyjęcie przekierowań 301).

## 2026-11-17 19:00, Claude Code

**✅ Zrobione (`main`, lokalnie, bez wdrożenia i bez pusha):** sprawdzenie linkowania wpisów do usług (punkt 3 z listy działań SEO): wszystkie 6 wpisów PL i EN już linkuje do pasującej usługi, więc nic nie dopisywano. Znaleziony i poprawiony błąd: angielski wpis o KSeF linkował do polskiej strony `/wpisy/automatyczny-odczyt-dokumentow/` zamiast do `/en/posts/automated-document-reading/`. Nowy test `linki-en.test.ts` pilnuje, żeby żaden `en.md` nie prowadził do polskiej strony (czerwony przed poprawką, zielony po). `npm test` 236, kontrola tłumaczeń 0 błędów.

**🚧 Nie zrobione:** wdrożenie tej poprawki (jedna linia w jednym wpisie EN). Usługa „strony i aplikacje” nie ma żadnego linku z wpisu, bo nie ma wpisu o tym temacie.

**🎯 Następny krok:** za zgodą Roberta wdrożenie poprawki; jutro Search Console po podpięciu AdLoopa.

## 2026-11-17 18:00, Claude Code

**✅ Zrobione (gałąź `seo-audyt-en`, bez wdrożenia):** uwagi niskiej wagi z audytu. BreadcrumbList (schema.org) na wszystkich podstronach w PL i EN (`src/lib/okruszki.ts`, wstawiany w `Strona.astro`; strony główne i 404 bez niego; test `okruszki.test.ts`). Nowe tytuły i opisy list wpisów: PL „Wpisy o automatyzacji i AI w firmie | Robert Dębicki” (52 znaki, opis 141), EN „Posts on automation and AI for business | Robert Dębicki” (56, opis 148). `npm test` 235, e2e bez błędów, `sprawdz:tresc` 0, `sprawdz:sekrety` 0.

Raport Lighthouse z 17.11 zapisany w `docs/lighthouse/2026-11-17.md`.

**🚧 Nie zrobione:** strony `/uslugi/` i `/en/services/` zostają krótkie (to strony-spisy z trzema kartami); dłuższy wstęp wymaga faktów od Roberta, więc bez zgadywania. Wdrożenie czeka na zgodę.

**🎯 Następny krok:** wdrożenie `seo-audyt-en` za zgodą Roberta, potem ręczne sprawdzenie przekierowań 301 starych adresów `/en/posts/` i odczyt Search Console (jutro).

## 2026-11-17 17:00, Claude Code

**✅ Zrobione (gałąź `seo-audyt-en`, bez wdrożenia):** audyt strony skillem `seo-audit` (wtyczka `marketing` Anthropic, osiem skilli w `.claude/skills/`, bez `.mcp.json`; nieskomitowane do decyzji Roberta) i porównanie z zasadami DNK. Poprawki: skrócone tytuły EN czterech wpisów do najwyżej 58 znaków z marką, opis EN wpisu o KSeF z 194 do 143 znaków; angielskie adresy wpisów w `/en/posts/` (pole `adresEn` w `en.md`, jak w usługach; pole w panelu; `hreflang` i mapa strony z nowymi adresami; linki wewnętrzne w treści zaktualizowane); przekierowania 301 ze starych polskich slugów w `hosting/htaccess` i `public/_redirects`. Lighthouse mobile (`sprawdz:lighthouse`, mediana z 3 przebiegów): `/` 98, 100, 100, 100 i `/en/` 98, 100, 100, 100. `npm test`: 230 testów, e2e: 189, `sprawdz:tresc` 0, `sprawdz:sekrety` 0, `sprawdz:tlumaczenia` 0 błędów.

**🚧 Nie zrobione:** wdrożenie (po nim sprawdzić ręcznie, czy `Redirect 301` ze starych adresów działa, bo Apache nie był testowany lokalnie); odczyt Search Console przez AdLoop (Robert: jutro); niskie uwagi audytu: krótki tytuł i opis list `/wpisy/` i `/en/posts/`, cienkie strony `/uslugi/` i `/en/services/`, brak BreadcrumbList.

**🎯 Następny krok:** decyzja Roberta o wdrożeniu `seo-audyt-en`; jutro GSC (indeksacja nowych adresów po wdrożeniu).

## 2026-11-17 16:30, Claude Code

**✅ Zrobione (wdrożenie za zgodą Roberta w wiadomości 17.11):** pięć rozbudowanych wpisów PL i EN na `main` (`c539a41`) i na żywej stronie. `npm run wdroz -- --wgraj`: 126 plików, odbiór zgodny z lokalnymi, `.htaccess` działa. `test:produkcja`: 5 z 5. Wgrywanie padło dwa razy na błędzie sieci (errno 36) i przeszło za trzecim razem.

**🚧 Nie zrobione:** wpisy polityka AI, oszustwo na prezesa i agent AI (gałąź `poprawki-dnk`, zaplanowane na 20.11 i 23.11); decyzja Roberta o treści powitania bota w rzeczywistym wdrożeniu.

**🎯 Następny krok:** Robert potwierdza, że powitanie jego bota mówi wprost o AI; trzy zaplanowane wpisy w piątek i poniedziałek.

## 2026-11-17 16:00, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** powitanie bota w tekstach mówi wprost, że to asystentka AI, czyli sztuczna inteligencja (zamiast „wirtualna asystentka”); etapy AI Act poprawione na „są stosowane etapami”; wyjątek KSeF (do 10 000 zł miesięcznie do 31.12.2026) dopisany do odczytu, PL i EN; daty odczytu usunięte z nawiasów w n8n. Pełna kontrola `npm run sprawdz`: exit 0, 229 testów, 189 e2e.

**🚧 Nie zrobione:** wypchnięcie na `main` i wdrożenie w toku.

## 2026-11-17 14:30, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** pięć wpisów rozbudowanych do 840 do 982 słów (ile-firm 899, AI Act 982, odczyt 981, voice bot ok. 840, n8n 981), prostym językiem, z faktami ze źródeł (GUS, Eurostat, PIE, art. 4, 28, 32, 50 AI Act i RODO, dokumentacja n8n, Prawo.pl, KSeF 2.0). Fakty Roberta użyte bez nowych liczb. PL i EN, `dnk.ts`: 0 błędów i 0 uwag, kontrola tłumaczeń 0 błędów, `sprawdz:tresc` 0 i 0.
- Poprawka po przeglądzie: zdanie o danych w n8n zgodne z dokumentacją (dane diagnostyczne idą do producenta domyślnie); „wirtualna asystentka” nie jest już przedstawiane jako spełnienie art. 50, bo wytyczne Komisji mówią, że samo „asystent” może nie wystarczyć.

**🚧 Nie zrobione:** decyzja Roberta, czy zmienić powitanie bota tak, żeby mówiło wprost o AI; drobne uwagi recenzenta (wyjątek 31.12.2026 dla KSeF w odczycie, „wejście w życie etapami”, przypisy z datą odczytu w tekście n8n, pseudonimizacja uproszczona); wypchnięcie i wdrożenie za zgodą.

**🎯 Następny krok:** odpowiedź Roberta w sprawie powitania bota.

## 2026-11-17 17:00, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** dopisane fakty ze źródeł, prostym językiem, z linkami: AI Act (art. 4: obowiązek zadbania o wiedzę ludzi o AI, od 2 lutego 2025; źródło artificialintelligenceact.eu, otwarte 17.11.2026); odczyt dokumentów (art. 5 RODO: minimalizacja danych; źródło gdpr-info.eu, otwarte 17.11.2026). PL i EN. `dnk.ts`: 0 błędów; kontrola tłumaczeń: 0 błędów.

**🚧 Nie zrobione:** długości: AI Act 580, odczyt 549, n8n 612, automatyzacja 499, voice bot 482 słów. Cel 700 do 1000 nieosiągnięty.

**🎯 Następny krok:** decyzja Roberta: publikacja z uwagą o długości albo kolejne fakty.

## 2026-11-17 16:30, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** fakty ze źródeł, prostym językiem, z linkami: wpis o AI Act (art. 50: bot ma powiedzieć, że jest AI, chyba że to oczywiste; źródło artificialintelligenceact.eu, otwarte 17.11.2026), wpis o odczycie dokumentów (nowa sekcja „Dane osobowe w dokumentach”: umowa powierzenia wg art. 28 RODO; źródło gdpr-info.eu, otwarte 17.11.2026). Wpis o n8n: „oznacza zamówienie jako opłacone”. PL i EN. `dnk.ts`: 0 błędów; kontrola tłumaczeń: 0 błędów.

**🚧 Nie zrobione:** długości: AI Act 547, odczyt 526, n8n 612, automatyzacja 499, voice bot 482 słów; cel 700 do 1000 nieosiągnięty. Potrzebne kolejne źródła i fakty.

**🎯 Następny krok:** decyzja Roberta, czy publikujemy przy długości poniżej celu (z uwagą), czy dopisujemy kolejne fakty.

## 2026-11-17 15:30, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** wpis o n8n, Make i Zapier: nowa sekcja „Przykład: faktura zaliczkowa z zamówienia” (Airtable, Fakturownia, Fintable porównuje przelewy z numerem zamówienia i kwotą, status i powiadomienie klienta), PL i EN. `dnk.ts`: 0 błędów. Długość 612 słów.

**🚧 Nie zrobione:** długość pozostałych wpisów poniżej 700 słów; wypchnięcie i wdrożenie za zgodą.

**🎯 Następny krok:** Robert wybiera tematy ze źródeł do długości.

## 2026-11-17 15:00, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** fakty od Roberta do trzech wpisów, PL i EN: AI Act (przekierowanie do człowieka na prośbę klienta), odczyt dokumentów (sposób liczenia zysku czasu, dwa pytania do FAQ: czas wdrożenia i zmiany u klienta, wycena z liczb zakresu), n8n, Make i Zapier (wybór narzędzia: Make dla prostych automatyzacji, n8n na własnym serwerze dla rozbudowanych, taniej niż subskrypcja Make). `dnk.ts`: 0 błędów w trzech wpisach; kontrola tłumaczeń: 0 błędów.

**🚧 Nie zrobione:** długości 515, 472 i 528 słów (cel 700 do 1000) wymagają kolejnych faktów; przykład wdrożenia n8n z fakturami zaliczkowymi czeka na wyjaśnienie nazwy „fintable” od Roberta.

**🎯 Następny krok:** wyjaśnienie „fintable” i kolejne fakty do długości.

## 2026-11-17 14:00, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** wpis o voice bocie: fakt z wdrożenia (asystentka przedstawia się jako wirtualna asystentka), dwa pytania do FAQ z odpowiedziami od Roberta (czas: średnio od 2 do 3 tygodni do pierwszego działającego agenta; zmiany w automatyzacjach: klient nie zmienia, robi je Robert na prośbę klienta), wycena indywidualna. PL i EN, 7 pytań FAQ. `dnk.ts`: 0 błędów.

**🚧 Nie zrobione:** wpisy AI Act, odczyt dokumentów i n8n czekają na fakty od Roberta; wypchnięcie i wdrożenie za zgodą.

**🎯 Następny krok:** odpowiedzi Roberta do pozostałych wpisów.

## 2026-11-17 13:30, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** wpis o automatyzacji procesów w firmie: rozwinięty opis procesu w trzech krokach (tylko z tego, co już jest w tekście i w odpowiedziach Roberta), 499 słów, PL i EN. `dnk.ts`: 0 błędów.

**🚧 Nie zrobione:** długość pozostałych wpisów (AI Act, odczyt dokumentów, voice bot, n8n) czeka na fakty Roberta.

**🎯 Następny krok:** odpowiedzi Roberta do pozostałych wpisów.

## 2026-11-17 13:10, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`):** usługa „strony i aplikacje”: opis w Google z liczbą od Roberta (prosty landing page około 1000 zł plus VAT), wezwanie do wyceny, PL i EN; frazę „aplikacja zamiast Excela” usunięto z listy (Robert: Excel już mało kto używa). `dnk.ts`: 0 błędów.

**🚧 Nie zrobione:** długość wpisów (392 do 504 słów, cel 700 do 1000) czeka na odpowiedzi Roberta na pytania; wypchnięcie na `main` i wdrożenie za zgodą.

**🎯 Następny krok:** odpowiedzi Roberta na pytania do wpisów.

## 2026-11-17 12:30, Claude Code

**✅ Zrobione (gałąź `poprawki-opublikowane`, nie wypchnięte, nie wdrożone):** poprawki DNK w 5 opublikowanych wpisach (ile-firm-uzywa-ai, ai-act-dla-malej-firmy, automatyczny-odczyt-dokumentow, voice-bot-dla-firmy, n8n-make-czy-zapier) i 3 usługach (ai-i-automatyzacja, voiceboty, strony-i-aplikacje), PL i EN. `dnk.ts`: 0 błędów w 7 z 8; build przechodzi (naprawiono `tytulSeo` EN usługi AI do 49 znaków i `opis` EN voicebota do 151). Przegląd świeżym agentem: bez Critical, Important naprawiony (pytanie FAQ z Excelem). Bez nowych faktów.

**🚧 Nie zrobione / do decyzji Roberta:**
- strony-i-aplikacje, opis: brak liczby (potrzebna prawdziwa cena albo termin);
- strony-i-aplikacje: fraza „aplikacja zamiast Excela” nie występuje w tekście, bo pytanie z Excelem usunięto (nie ma faktu, który by o Excelu mówił);
- długość wpisów 392-504 słów (cel 700 do 1000) wymaga nowych faktów od Roberta;
- frazy dodatkowe we wpisach są propozycjami do akceptacji.

**🎯 Następny krok:** Robert decyduje o frazach i o liczbie w opisie usługi „strony i aplikacje”; potem commit i wypchnięcie na `main` oraz wdrożenie za zgodą w wiadomości.

## 2026-11-17 09:35, Claude Code

**✅ Zrobione (wdrożenie za zgodą Roberta w wiadomości 17.11):** wpis o KSeF (PL i EN) jest na żywej stronie. `npm run wdroz -- --wgraj`: 126 plików, odbiór zgodny z lokalnymi, `.htaccess` działa. `test:produkcja`: 5 z 5. Strony `/wpisy/ksef-faktury-kosztowe/` i `/en/posts/ksef-faktury-kosztowe/` zwracają 200. Poprawki skryptu: porcje po 5 plików, do 3 prób na porcję, wypis porcji.

**🚧 Nie zrobione:** poprawki skryptu wdrożenia są lokalnie na `main`, nie wypchnięte; wpisy polityka AI, oszustwo i agent AI nie są na stronie; ocena z analizatora.

**🎯 Następny krok:** Robert decyduje o wypchnięciu poprawek skryptu i o kolejnych wpisach.

## 2026-11-17 09:45, Claude Code

**✅ Zrobione:** skrypt wdrożenia wypisuje każdą porcję wgrywania i wynik curl (diagnostyka). Test wgrywania bez zmian w logice.

**🚧 Nie zrobione:** wgranie na żywą stronę: po ostatniej próbie na serwerze nie ma katalogu `wpisy/ksef-faktury-kosztowe`, mimo że etap HTML przeszedł; przyczyna do ustalenia z wypisu porcji.

**🎯 Następny krok:** ponowić `npm run wdroz -- --wgraj` i przeczytać wypis porcji.

## 2026-11-17 09:30, Claude Code

**✅ Zrobione (poprawka skryptu wdrożenia):** `skrypty/wdroz.ts` wgrywa etap w porcjach po 5 plików, każda we własnej sesji curl, i ponawia porcję do 3 razy po błędzie sieci. Powód: cztery próby `--wgraj` padły w losowym miejscu (błąd 56, errno 36) na jednej długiej sesji. Test `podzielNaPorcje` (najpierw czerwony). `npm test`: wszystkie zaliczone.

**🚧 Nie zrobione:** wgranie na żywą stronę (ponowna próba po tej poprawce); pliki `.part` po przerwanych próbach mogą zostać na serwerze.

**🎯 Następny krok:** wynik ponownego wgrania; przy błędzie sprawdzić `.part` na serwerze.

## 2026-11-17 11:10, Claude Code

**✅ Zrobione (publikacja za zgodą Roberta w wiadomości 17.11):** wpis „Faktury kosztowe z KSeF: jak je pobierać” w wersji PL i EN (`src/content/wpisy/ksef-faktury-kosztowe/`), grafiki z makiety. Kontrola DNK: 0 błędów. Kontrola tłumaczeń: 0 błędów. Pozostałe wpisy (polityka AI, oszustwo na prezesa, agent AI) nie są na stronie.

**🚧 Nie zrobione:** ocena z analizatora DNK (Robert jeszcze nie wkleił); korekta native speakera dla EN; wersje EN pozostałych wpisów.

**🎯 Następny krok:** Robert wkleja okienka z analizatora dla KSeF i pozostałych wpisów; potem kolejne wpisy na `main`.

## 2026-11-16 21:40, Claude Code

**✅ Zrobione (gałąź `skill-wpis-rd`; nie wypchnięte):**
- Skill `/wpis-rd` w `.claude/skills/wpis-rd/` (decyzje Roberta 16.11: tylko ten projekt; wpisy, usługi, karty wdrożeń i projektów; wezwanie z e-mailem; na koniec EN przez `/tlumacz-strone`, build i commit, bez pusha). Plan: `docs/superpowers/plans/2026-11-16-skill-wpis-rd.md`.
- `skrypty/dnk.ts`: kontrola wpisu i usługi według progów z master promptu DNK (cel 100 pkt): tytuł strony 40 do 58 z marką, opis 125 do 150 z liczbą i wezwaniem, 4 do 6 H2, wstęp 2 do 4 zdań z pogrubioną frazą, fraza 4 do 6, dodatkowe 1 do 3, 1 albo 2 linki do stron serwisu, 2 do 4 zdjęć z podpisem, alt 30 do 110, FAQ „Najczęstsze pytania o …” 5 do 7, wezwanie z e-mailem do 200 znaków, zdania, średnik, myślniki, zakazane ciągi także w środku słów, słowa i długość z panelu. Usługa: to, co pozwala szablon, reszta jako uwagi.
- `skrypty/analizator.ts`: podpisane okienka formularza z tekstem Markdown w kolejności strony (wpis i usługa).
- `AGENTS.md`: progi DNK zamiast dawnych reguł DNK, skill i skrypty w tabeli plików.
- Testy: 37 nowych (Vitest), najpierw czerwone. Dwie rundy przeglądu przez osobnego agenta (8 + 3 usterki, poprawione z testami).
- `npm run sprawdz`: kod 0 (sekrety 0, zakazane wzorce 0, nazwy klientów 0, tłumaczenia 19 par, Vitest 227 pass / 1 skipped, build, e2e 189 pass).

**🚧 Nie zrobione:** teksty sprzed 16.11 nie spełniają nowych progów (np. odczyt dokumentów: 10 błędów); granice kontroli: „w 2026 r. Robert” liczy się jako dwa zdania, odmiana z wymianą spółgłoski („ręka”, „ręce”) nie jest łapana; analizator DNK może liczyć frazę w innych polach usługi niż kontrola (do sprawdzenia jednym wklejeniem).

**✅ Decyzja Roberta 16.11:** w publicznym repo tylko inicjały DNK (bez imienia i nazwiska), także w historii gałęzi.

**🎯 Następny krok:** PR do `main` za zgodą Roberta; pierwszy tekst skillem `/wpis-rd`.

## 2026-11-16 11:20, Claude Code

**✅ Zrobione (wdrożenie za zgodą Roberta w wiadomości 16.11):**
- PR #12 (`email-office`): CI pass (4 min), scalony do `main` (`6e6a2a5`).
- `npm run wdroz -- --wgraj`: 119 plików, kopia zapasowa `~/Backups/robert-debicki-ftp/2026-11-16T10-13-27-675Z`, odbiór zgodny, `.htaccess` działa. `test:produkcja` 5 pass.
- Żywa strona: `office@robert-debicki.pl` na `/`, `/en/`, w polityce PL i EN, na `/dla-rekruterow/` i w `llms.txt`; starego adresu 0 trafień.

**🚧 Nie zrobione:** próbny mail na `office@` (Robert); jeśli poczta jest przekierowana do zewnętrznego dostawcy, dopisać go do polityki prywatności. Dalej otwarte: `klik_telefon` w GTM.

**🎯 Następny krok:** Robert potwierdza próbny mail i miejsce odbioru poczty; GTM: `klik_telefon` w wyzwalaczu (za zgodą Roberta).

## 2026-11-16 11:30, Claude Code

**✅ Zrobione (gałąź `email-office`; nie wdrożone):**
- Adres kontaktowy zmieniony na `office@robert-debicki.pl` (nowa skrzynka Roberta) w `ustawienia/pl.md` i `en.md`; `zrodlo` w `en.md` przeliczone. Adres trafia stąd do kontaktu, polityki prywatności PL i EN, JSON-LD i `llms.txt`. Fikstury i 4 testy e2e zaktualizowane; w `src` i `testy` nie ma już starego adresu (zostaje w `docs/makieta` i historii).
- Zamianę uruchomił Robert w terminalu, bo wtyczka prywatności blokuje polecenia czytające pliki z jego prywatnym adresem.
- `npm run sprawdz`: exit 0 (vitest 190 pass/1 skipped, e2e 189 pass). W `dist` 0 plików ze starym adresem. `/code-review` bez błędów.

**🚧 Nie zrobione:** próbny mail na `office@` (Robert); jeśli skrzynka przekierowuje do zewnętrznej poczty, dopisać tego dostawcę do polityki prywatności; PR i wdrożenie za zgodą Roberta.

**🎯 Następny krok:** Robert potwierdza, że próbny mail doszedł i gdzie poczta jest odbierana; potem PR, scalenie i `npm run wdroz -- --wgraj`.

## 2026-11-16 10:55, Claude Code

**✅ Zrobione (wdrożenie za zgodą Roberta w wiadomości 16.11):**
- PR #11 (`pagespeed-desktop-raster`): CI „Kontrole, testy i Lighthouse” pass (3 min 25 s), scalony do `main` (`2ef2af1`).
- `npm run wdroz -- --wgraj`: 119 plików, kopia zapasowa serwera `~/Backups/robert-debicki-ftp/2026-11-16T09-46-23-161Z`, odbiór: wszystkie pliki zgodne z lokalnymi, `.htaccess` działa. `test:produkcja` 5 pass.
- PageSpeed po wdrożeniu (16.11, 10:52, Lighthouse 13.6): desktop 100/100/100/100 (TBT 0 ms, było 69 i 2800 ms), mobile 100/100/100/100.

**🚧 Nie zrobione:** bez zmian z wpisu 13.11 (`klik_telefon` w GTM, zadania 9 i 10).

**🎯 Następny krok:** GTM: dopisać `klik_telefon` do wyzwalacza „Kliknięcia kontaktu” i opublikować kontener (za zgodą Roberta); GSC: zgłosić do indeksowania strony usług i `/dla-rekruterow/`.

## 2026-11-16 10:30, Claude Code

**✅ Zrobione (PageSpeed desktop; nie wdrożone):**
- Raport PageSpeed desktop z 15.11 (Lighthouse 13.6): wydajność 69, reszta 100. Przyczyna: Total Blocking Time 2800 ms, 20 długich zadań po ~70 ms przez cały pomiar, 26 s czasu procesora w „Other”. Animowany raster tła (`Raster.astro`, ok. 10 tys. kółek 30 razy na sekundę) na serwerze bez GPU rysuje każdą klatkę dłużej niż 50 ms.
- Odtworzone lokalnie: Lighthouse desktop z `--disable-gpu` i spowolnieniem CPU x4 dał 70 (TBT 4460 ms). Bez spowolnienia 100, stąd różnica z pomiarem na Macu.
- Poprawka: raster sam mierzy odstępy między klatkami; po 5 odstępach powyżej 40 ms z rzędu zostaje nieruchomy na ostatniej klatce (jak przy `prefers-reduced-motion`), bez przerysowania przy przewijaniu, z przerysowaniem przy zmianie rozmiaru i motywu. Na sprawnym sprzęcie animacja bez zmian (sprawdzone w przeglądarce z GPU).
- Pomiar po poprawce (lokalny build, rzeczywiste spowolnienie, bez GPU): x2 5/5 przebiegów 100, TBT 20 ms; x4 87 (przed: 70, produkcja w tym trybie nie skończyła pomiaru).
- Test e2e `animacje.spec.ts`: przy spowolnieniu CPU x6 raster przestaje się zmieniać (czerwony na starym kodzie). `npm run sprawdz`: exit 0, vitest 190 pass/1 skipped, e2e 189 pass. Dwie rundy `/code-review`, uwagi naniesione.

**🚧 Nie zrobione:** zgoda Roberta na zmianę zachowania wyglądu (raster nieruchomy na słabym sprzęcie); scalenie i wdrożenie; ponowny pomiar w PageSpeed po wdrożeniu.

**🎯 Następny krok:** po zgodzie Roberta scalić `pagespeed-desktop-raster` z `main`, `npm run wdroz -- --wgraj`, potem „Analizuj ponownie” w PageSpeed (desktop i mobile).

## 2026-11-13 20:00, Claude Code

**✅ Zrobione (wdrożenie za zgodą Roberta w wiadomości 13.11):**
- PR #10 (`widocznosc-klienci-rekruterzy`): CI „Kontrole, testy i Lighthouse” pass (3 min 46 s), scalony do `main` (`9c20428`).
- `npm run wdroz -- --wgraj`: 119 plików, kopia zapasowa serwera `~/Backups/robert-debicki-ftp/2026-11-13T16-45-38-441Z`, odbiór: wszystkie pliki zgodne z lokalnymi, `.htaccess` działa.
- `test:produkcja` 5 pass. Żywa strona: 200 na `/`, `/uslugi/` i trzech usługach, `/dla-rekruterow/`, czterech adresach EN, polityce; `tel:+48665780129` na stronie głównej; 10 nowych adresów w mapie strony; CV `X-Robots-Tag: noindex, nofollow`, strona główna bez tego nagłówka.

**🚧 Nie zrobione:** `klik_telefon` w regexie wyzwalacza GTM i zdarzenia kluczowe w GA4 (zmiana w kontenerze do akceptacji Roberta); wybór wdrożeń na stronie rekrutera w działającym panelu `/admin/` do ręcznego sprawdzenia; zadania 9 (po serii 2) i 10 (po starcie sklepu).

**🎯 Następny krok:** GTM: dopisać `klik_telefon` do wyzwalacza „Kliknięcia kontaktu” i opublikować kontener (za zgodą Roberta); GSC: zgłosić do indeksowania strony usług i `/dla-rekruterow/`.

## 2026-11-13 19:50, Claude Code

**✅ Zrobione (poprawki po końcowym przeglądzie całej gałęzi; nie wdrożone):**
- Przegląd całej gałęzi (85d4a24..6ba0c1e): bez uwag krytycznych; sekrety 0, nazwy klientów 0, build z indeksowaniem bez metatagu robots na nowych stronach, mapa strony i `llms.txt` z nowymi stronami, canonical i hreflang poprawne, brak przewijania w bok na 10 nowych adresach, reguła `/cv/` w `<IfModule>`.
- Uwaga ważna: polityka prywatności (`src/lib/polityka.ts`, PL i EN) wymienia teraz kliknięcia w numer telefonu obok e-maila i LinkedIn („bez treści wiadomości i rozmów”), bo strona wysyła `klik_telefon`. Test w `zgoda.spec.ts` najpierw czerwony. Komentarz w `src/scripts/zgoda.ts` zaktualizowany.
- Drobna: listy `/uslugi/` i `/en/services/` z tytułem i opisem zgodnym z regułą SEO (53/54 i 150/149 znaków).
- `npm run sprawdz`: exit 0, vitest 190 pass/1 skipped, e2e 188 pass.

**🚧 Odłożone (z przeglądu, drobne):** wybór wdrożeń w panelu (`relation`) niesprawdzony w działającym Sveltii; CV po angielsku (dziś EN linkuje do polskiego PDF); testy przewijania stron usług tylko na fiksturach.

**🎯 Następny krok:** zgoda Roberta na scalenie z `main` i wdrożenie; po wdrożeniu `curl -I` na CV (X-Robots-Tag) i `klik_telefon` w GTM.

## 2026-11-13 19:15, Claude Code

**✅ Zrobione (zadanie 7 krok 3: linki z wpisów do usług, zdania zaakceptowane przez Roberta 13.11; nie wdrożone):**
- Po jednym zdaniu z linkiem (fraza usługi w kotwicy) na końcu FAQ: `n8n-make-czy-zapier`, `automatyczny-odczyt-dokumentow`, `ile-firm-uzywa-ai` → `/uslugi/ai-i-automatyzacja/`; `voice-bot-dla-firmy` → `/uslugi/voiceboty/`. EN z linkami do `/en/services/...`. `ai-act-dla-malej-firmy` bez linku (nie pasuje do usługi). `zrodlo` przeliczone, kontrola tłumaczeń bez błędów, linki obecne w zbudowanym HTML.
- `npm run sprawdz`: exit 0, vitest 190 pass/1 skipped, e2e 188 pass.

**🎯 Następny krok:** przegląd całej gałęzi; potem scalenie z `main` i wdrożenie za zgodą Roberta; po wdrożeniu `klik_telefon` w GTM i sprawdzenie nagłówka noindex dla `/cv/`.

## 2026-11-13 18:50, Claude Code

**✅ Zrobione (treść zaakceptowana przez Roberta 13.11; nie wdrożone):**
- Robert zaakceptował teksty strony dla rekrutera.
- Wdrożenie `kampanie-google-ads` ujednolicone z przykładem na stronie AI i automatyzacja (propozycja zaakceptowana): tytuł „Agenci AI do kampanii, SEO i bloga”, branża „Producent mebli dla branży HoReCa” zamiast nazwy usługi, opis z trzema agentami i wynikiem po miesiącu, AdLoop w stosie. EN tak samo; tekst linku na stronie usługi PL i EN zaktualizowany; `zrodlo` przeliczone, kontrola tłumaczeń bez błędów.
- Porównanie z makietą podmienia w kopii makiety także tę kartę (jak inne celowo zmienione teksty); wzorce zrzutów bez zmian.
- `npm run sprawdz`: exit 0.

**🎯 Następny krok:** linki z wpisów do usług (zdania do akceptacji Roberta), przegląd całej gałęzi, wdrożenie za zgodą Roberta.

## 2026-11-13 18:20, Claude Code

**✅ Zrobione (CV na serwerze, za zgodą Roberta w wiadomości 13.11):**
- `~/Robert_CV/Robert_Debicki_CV.pdf` (wersja z 16.10, identyczna z ATS; bez adresu i daty urodzenia) wgrane na home.pl jako `/cv/Robert-Debicki-CV.pdf` jednorazowym wywołaniem funkcji z `skrypty/wdroz.ts` (transfer przez `.part`, nic nie usunięte). Sprawdzone: `https://robert-debicki.pl/cv/Robert-Debicki-CV.pdf` daje 200 `application/pdf`, SHA-256 zgodny z plikiem lokalnym, listing `/cv` bez `.part`. CV nie jest w repozytorium.
- `ustawienia.rekruter.cvUrl` w PL i EN: przycisk „Pobierz CV (PDF)” / „Download resume (PDF)” na stronie dla rekrutera. `zrodlo` przeliczone.
- Nagłówek `X-Robots-Tag: noindex` dla `/cv/` zadziała dopiero po wdrożeniu nowego `.htaccess` (dziś na serwerze go nie ma, sprawdzone `curl -I`).
- `npm run sprawdz`: exit 0, vitest 190 pass/1 skipped, e2e 188 pass.

**🎯 Następny krok:** Robert akceptuje teksty strony dla rekrutera; linki z wpisów do usług; przegląd całej gałęzi; wdrożenie za zgodą.

## 2026-11-13 17:40, Claude Code

**✅ Zrobione (zadanie 8, poprawki po przeglądzie; nie wdrożone):**
- Przegląd strony dla rekrutera: zatwierdzone, walidacja `cvUrl` po nazwie hosta bez obejść, escape JSON-LD poprawny.
- Uwaga ważna (treść): nagłówek „Systemy, które zbudowałem i przekazałem” i akapit „Wdrożenia poniżej działają u klientów na co dzień” obejmowały obieg rozliczeń w fazie testów. Teraz „Wybrane wdrożenia i projekty” i „Wybrane prace poniżej pokazują, jak pracuję: …”; EN „Selected deployments and projects”, `zrodlo` przeliczone, kontrola tłumaczeń bez błędów. Do akceptacji Roberta.
- `hosting/htaccess`: noindex dla `/cv/` przez `SetEnvIf` + `Header … env=CV_NOINDEX` zamiast `<If>` (wymaga Apache 2.4; błąd składni dałby 500 na całej stronie). Sprawdzone lokalnie na Apache 2.4.67: `Syntax OK`, nagłówek `X-Robots-Tag: noindex, nofollow` tylko na `/cv/`. Wersji Apache na home.pl nie sprawdzono; po wgraniu: `curl -I` na plik CV.
- Test: `cvUrl` z `https://robert-debicki.pl@evil.com/…` odrzucony; test reguły `/cv/` najpierw czerwony.
- `npm run sprawdz`: exit 0, vitest 190 pass/1 skipped, e2e 188 pass.

**🎯 Następny krok:** Robert akceptuje teksty strony dla rekrutera i wgrywa CV na home.pl; potem krok 3 zadania 7 (linki z wpisów do usług) i przegląd całej gałęzi.

## 2026-11-13 17:00, Claude Code

**✅ Zrobione (usługa voiceboty, fakt od Roberta; nie wdrożone):**
- Robert 13.11: bot na początku przedstawia się jako asystentka AI i pyta, czy może kontynuować. Krok 1 i odpowiedź FAQ „Czy klient pozna, że rozmawia z botem?” mówią to teraz jako fakt (wcześniej „powinien”). EN tak samo, `zrodlo` przeliczone, kontrola tłumaczeń bez błędów.

**🎯 Następny krok:** przegląd zadania 8 (strona dla rekrutera), potem akceptacja tekstów rekrutera przez Roberta.

## 2026-11-13 16:35, Claude Code

**✅ Zrobione (zadanie 8 planu widoczności, podstrona dla rekrutera; ryzyko średnie, nie wdrożone):**
- `/dla-rekruterow/` i `/en/for-recruiters/` według widoku 3 podglądu `docs/makieta/uslugi.html`: H1, rola, wstęp, przyciski CV i LinkedIn, karta kandydata (telefon z kontaktu dopisuje się sam), narzędzia z ustawień, wybrane wdrożenia i projekty z kolekcji, etapy doświadczenia (bez zasad pracy), kontakt z własnym tytułem i linkiem do CV. JSON-LD `ProfilePage` z `mainEntity` = osoba (`/#osoba`), strony w `/llms.txt`.
- Schemat `ustawienia.rekruter` (opcjonalny; bez niego podstrony i linków nie ma): tytuł SEO do 60 znaków i opis 120-155 jak w usługach, `cvUrl` tylko https na `robert-debicki.pl` albo R2, najwyżej trzy wdrożenia i trzy projekty (nazwy folderów; literówka zatrzymuje build komunikatem `Podstrona rekrutera: nie ma wdrożenia "…".`). Panel: blok „Podstrona dla rekrutera”, wybór pozycji przez `relation` (⚠️ w działającym panelu niesprawdzone).
- Menu jak w podglądzie: „Dla rekruterów” zamiast „Doświadczenie” (sekcja zostaje na stronie głównej), nowe barwy kwadracików. Kontakt na stronie głównej i na stronach usług linkuje do podstrony.
- `hosting/htaccess`: pliki w `/cv/` dostają `X-Robots-Tag: noindex, nofollow`. CV nie trafia do repo; `cvUrl` w treści puste, więc przycisk się nie pokazuje.
- Treść PL z podglądu, wybór: `monitoring-temperatur`, `reaktywacja-klientow`, `obieg-rozliczen`. Zmiany względem podglądu: wstęp „…w firmach jako Automation Developer.” (fraza we wstępie), akapit „Wdrożenia poniżej działają…” zamiast „Systemy…” (obieg rozliczeń jest w testach). EN przez zasady `/tlumacz-strone` (`tlumaczenie: ai`), `zrodlo` przeliczone, kontrola tłumaczeń bez błędów.
- SEO (zbudowany HTML): tytuł 60/53 znaki, opis 147/152, 1 H1, 4 H2, „Automation Developer” 5 razy, myślniki 0. Lighthouse mobile (lhci ręcznie, 3 przebiegi): PL 99/100/100/100, EN 98-99/100/100/100.
- Porównanie z makietą: kopia makiety dostaje nowe menu, link do podstrony ukryty. Test zgody klika LinkedIn po `data-zdarzenie` (w kontakcie są teraz dwa linki).
- `npm run sprawdz`: exit 0, vitest 190 pass/1 skipped, e2e 188 pass/1 skipped.

**🚧 W toku / nie wdrożone:** teksty `rekruter` (PL i EN) do akceptacji Roberta; CV: Robert wgrywa PDF do `/cv/` na home.pl i podaje adres; korekta EN przez native speakera.

**🎯 Następny krok:** przegląd zadania 8, akceptacja tekstów i adres CV od Roberta.

## 2026-11-13 16:20, Claude Code

**✅ Zrobione (zadanie 7, poprawki po przeglądzie treści PL i EN; nie wdrożone):**
- Przegląd: fakty, liczby, twarde zasady i linki EN zgodne ze źródłami; jedna uwaga ważna. Voiceboty krok 1: „Bot powinien przedstawić się…” zamiast twierdzenia, że bot Roberta to robi (źródło mówi tylko o dobrym zwyczaju). Tak samo w EN.
- Drobne: strony i aplikacje „Nowe strony i aplikacje piszę z Claude Code” (platforma szkoleń powstała wcześniej), czas teraźniejszy przy obiegu rozliczeń (projekt w testach), branża „Producent mebli dla branży HoReCa” jak na stronie AI (EN „Hospitality furniture manufacturer”). `zrodlo` w dwóch `en.md` przeliczone, kontrola tłumaczeń bez błędów.
- `npm run sprawdz`: exit 0, vitest 177 pass/1 skipped, e2e 164 pass.

**🎯 Następny krok:** zadanie 8 (strona dla rekrutera); CV Robert wgrywa na home.pl i podaje adres. Krok 3 zadania 7 (linki z wpisów do usług) do akceptacji Roberta.

## 2026-11-13 15:55, Claude Code

**✅ Zrobione (tłumaczenie EN trzech usług, zadanie 7 planu widoczności; `tlumaczenie: ai`, nie wdrożone):**
- Nowe `en.md`: `uslugi/ai-i-automatyzacja` (`adresEn: ai-automation`), `uslugi/strony-i-aplikacje` (`websites-and-apps`), `uslugi/voiceboty` (`ai-voice-agents`). Teksty pod angielskie frazy z `docs/seo/frazy-uslug.md` (AI automation, custom websites and apps, AI voice agent), pytania FAQ w formie angielskich podpowiedzi Google; fakty i odpowiedzi jak w PL.
- `ustawienia/en.md`: dodany blok `uslugi`, `zrodlo` przeliczone.
- Linki w EN prowadzą do `/en/posts/...` i `/en/#wdrozenia`, `/en/#teraz`.
- SEO EN (z zbudowanego HTML): tytuły 57/55/45 znaków, opisy 146/153/147, 6 H2, FAQ 6/6/7, brak myślników; fraza główna 5/3/7 razy.
- Kontrola tłumaczeń: 4 pary bez błędów; `sprawdz:tresc` 0; `npm run sprawdz` bez błędów.

**🚧 W toku / nie wdrożone:** korekta native speakera (stan `ai`, nie `sprawdzone`); linki z wpisów do usług (krok 3 zadania 7).

**🎯 Następny krok:** przegląd zadania 7, potem linki z wpisów do usług i wdrożenie za zgodą Roberta.

## 2026-11-13 15:30, Claude Code

**✅ Zrobione (zadanie 7 planu widoczności, treść PL trzech usług; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- `src/content/uslugi/`: `ai-i-automatyzacja` (tekst z zatwierdzonego podglądu), `strony-i-aplikacje`, `voiceboty`; `ustawienia.uslugi` (tytuł „Wdrażam AI i automatyzuję procesy” i wstęp z podglądu). Teksty z faktów Roberta, źródło każdego zdania w raporcie zadania.
- Odpowiedzi Roberta 13.11 wpisane: rozmowy voicebota nie są nagrywane (zostaje tylko notatka), ElevenLabs i Twilio na kontach klienta; każda wycena indywidualna; trzy zdania opisowe zostają; przykład agentów HoReCa to wdrożenie „Claude Code do prowadzenia kampanii i analityki” (link i Claude Code w stosie); obieg rozliczeń „w fazie testów”.
- Kontrola SEO (reguły z bloga): tytuły 54 znaki, opisy 144-152, 4 H2, FAQ 6/6/7, fraza główna 3-6 razy i we wstępie, myślniki 0. Na stronie AI fraza nie stoi w H1 (zatwierdzony nagłówek).
- Testy: porównanie z makietą ukrywa sekcję usług i link „Usługi” (makieta ich nie ma, wygląd usług ma osobny podgląd). Test kontrastu z ograniczonym ruchem: animowany raster zabierał procesor i w pełnym przebiegu axe przekraczał 30 s (osobno 3 s); sprawdzone, że celowo zły kontrast nadal daje 6 błędów.
- `npm run sprawdz`: exit 0, vitest 177 pass/1 skipped, e2e 164 pass (`uslugi-puste` pomija się przy prawdziwej treści).

**🚧 W toku / nie wdrożone:** wersje EN trzech usług (po angielskich frazach z `docs/seo/frazy-uslug.md`), linki z wpisów do usług (krok 3 zadania 7, zdania do akceptacji Roberta).

**🎯 Następny krok:** EN usług przez `/tlumacz-strone` z adresami `ai-automation`, `websites-and-apps`, `ai-voice-agents`.

## 2026-11-13 14:10, Claude Code

**✅ Zrobione (przekaz AI na stronie głównej i zasada SEO, ryzyko niskie; nie wdrożone):**
- `ustawienia/pl.md` (teksty zaakceptowane przez Roberta 13.11): opis otwarcia „Agentów AI wdrażam bezpośrednio w zespołach klientów. Aplikacje, strony i narzędzia z AI tworzę z Claude Code. Procesy automatyzuję w n8n i Make.com.”, tytuł kontaktu „Powiedz, co robicie ręcznie. Sprawdzę, co przejmie automatyzacja, a co AI.”, wstęp kontaktu zaczyna się od „Firmom wdrażam AI i automatyzuję procesy: agenci AI, voiceboty, aplikacje i strony.”
- `ustawienia/en.md`: te same trzy teksty po angielsku, `zrodlo` przeliczone, kontrola tłumaczeń bez błędów.
- Porównanie z makietą (`strona-glowna.spec.ts`) podmienia w kopii makiety cztery teksty zamiast trzech; wzorce zrzutów bez zmian.
- `AGENTS.md`: zasada SEO dla każdego tekstu na stronę (reguły z bloga), decyzja Roberta. Plan: krok 1b w zadaniu 7.
- Zadanie 6 (kolekcja usług, wpis 12:55 niżej) przeszło przegląd: zatwierdzone, bez uwag krytycznych i ważnych.
- `npm run sprawdz`: exit 0, vitest 177 pass/1 skipped, e2e 165 pass.

**🎯 Następny krok:** zadanie 7, treść trzech usług z kontrolą SEO, do akceptacji Roberta.

## 2026-11-13 12:55, Claude Code

**✅ Zrobione (zadanie 6 planu widoczności, ryzyko średnie; nie wdrożone):**
- Kolekcja `uslugi` (schemat w `src/lib/schematy.ts`, panel `/admin/` „Usługi”): tytuł H1, krótka nazwa, tytuł SEO do 60 znaków, opis 120-155 znaków, karta usługi, problemy, kroki, przykłady wdrożeń (co najmniej jeden), FAQ (co najmniej trzy pytania), `adresEn` tylko w en.md.
- Strony `/uslugi/<adres>/` i `/en/services/<adresEn>/` według widoku 1 podglądu `docs/makieta/uslugi.html`, listy `/uslugi/` i `/en/services/`, sekcja usług na stronie głównej po otwarciu (widok 2), link „Usługi” w menu, JSON-LD `Service` i `FAQPage`, strony usług w `/llms.txt`. Wezwanie na końcu to sekcja kontaktu z ustawień.
- Ustawienia: opcjonalny nagłówek sekcji usług (`uslugi.tytul`, `uslugi.wstep`); prawdziwe ustawienia bez zmian.
- CSS: tylko trzy modyfikatory z podglądu (`.trzy`, `.dalej`, `.okruszki` z `.hero.podstrona`).
- Bez prawdziwych usług nic się nie zmienia: brak sekcji, linku w menu i stron (test `uslugi-puste.spec.ts`). Testy na fiksturach `testy/fikstury/jezyki/uslugi/`.
- Lighthouse mobile na fiksturowej stronie usługi: 98 / 100 / 100 / 100.

**🎯 Następny krok:** zadanie 7 planu (prawdziwe treści usług w `src/content/uslugi/` i nagłówek sekcji w ustawieniach).

## 2026-11-13 13:20, Claude Code

**✅ Zrobione (zadanie 5 planu widoczności zatwierdzone; dokumenty, bez kodu; nie wdrożone):**
- Robert zatwierdził podgląd `docs/makieta/uslugi.html` (z menu bez „Doświadczenie” i zawijaniem nagłówka rekrutera przy 390 px).
- Spec: usługi pierwszej fali to AI i automatyzacja (jedna strona), aplikacje strony i narzędzia z AI, voiceboty AI; fakty Roberta o wycenie i bezpieczeństwie danych.
- `docs/seo/frazy-uslug.md`: sekcja 0 z frazami AI (podpowiedzi Google 13.11, bez wolumenów), adres `/uslugi/ai-i-automatyzacja/` i `/en/services/ai-automation/`, tytuły SEO 54 i 57 znaków.
- Plan: zadanie 5 odhaczone, zadanie 7 z nowymi usługami.

**🎯 Następny krok:** zadanie 6 planu (kolekcja `uslugi`, strony usług, dane strukturalne, sekcja na stronie głównej, menu).

## 2026-11-13 13:00, Claude Code

**✅ Zrobione (podgląd usług, ryzyko niskie; nie wdrożone):**
- `docs/makieta/uslugi.html`: branża klienta z agentami AI: „Producent mebli dla branży HoReCa” (podana przez Roberta). W podglądzie nie ma już miejsc do uzupełnienia poza przykładowym numerem telefonu.

**🎯 Następny krok:** akceptacja podglądu przez Roberta; potem spec, frazy i plan zadań 6-8.

## 2026-11-13 12:50, Claude Code

**✅ Zrobione (podgląd usług, ryzyko niskie; nie wdrożone):**
- `docs/makieta/uslugi.html`: odpowiedź FAQ „Czy dane firmy są bezpieczne?” z zasad, które Robert potwierdził, że stosuje: umowa powierzenia, API na koncie firmowym i minimum danych, agent tylko do odczytu ze zmianami zatwierdzanymi przez człowieka, szkolenie zespołu. Bez twierdzeń o warunkach dostawców modeli.

**🎯 Następny krok:** Robert podaje branżę klienta z agentami AI i akceptuje podgląd; potem spec, frazy i plan zadań 6-8.

## 2026-11-13 12:35, Claude Code

**✅ Zrobione (podgląd usług, fakty od Roberta, ryzyko niskie; nie wdrożone):**
- `docs/makieta/uslugi.html`, strona usługi AI i automatyzacja: drugi przykład wdrożenia (3 agenci AI: Google Ads i SEO przez AdLoop, wpisy na blog i opisy realizacji, tłumaczenia), problemy 2 i 3 z tego wdrożenia, odpowiedź o wycenie (za projekt, indywidualnie, duży projekt na etapy z kwotą w częściach), początek odpowiedzi o bezpieczeństwie danych. Nazwa klienta pominięta, branża do potwierdzenia przez Roberta. Brak przewijania w bok przy 360-1440 px.

**🎯 Następny krok:** Robert podaje branżę klienta i wybiera zasady bezpieczeństwa do FAQ; potem akceptacja podglądu.

## 2026-11-13 12:15, Claude Code

**✅ Zrobione (podgląd usług, runda 4 uwag Roberta, ryzyko niskie; nie wdrożone):**
- Decyzja Roberta: AI i automatyzacja to jedna usługa i jedna strona (adres roboczy `/uslugi/ai-i-automatyzacja/`), bo tytuł „Wdrożenia AI w firmie” prowadził tylko w stronę AI.
- `docs/makieta/uslugi.html`: tytuł strony usługi „AI i automatyzacja w Twojej firmie”, sekcja usług z powrotem 3 karty (AI i automatyzacja, Aplikacje strony i narzędzia z AI, Voiceboty AI). Brak przewijania w bok przy 360, 390, 1024 i 1440 px.

**🎯 Następny krok:** akceptacja podglądu; potem spec, badanie fraz (strona AI i automatyzacja zamiast samej automatyzacji) i plan zadań 6-8.

## 2026-11-13 12:00, Claude Code

**✅ Zrobione (podgląd usług, runda 3 uwag Roberta, ryzyko niskie; nie wdrożone):**
- Uwaga Roberta: „wdrażam AI i automatyzuję”, bo nie zawsze potrzebne jest AI; czasem wystarczy ułożyć proces i prosta automatyzacja.
- `docs/makieta/uslugi.html`: wstęp strony usługi, krok 1 „Najpierw proces, potem narzędzie”, nowe pytanie FAQ „Czy moja firma w ogóle potrzebuje AI?”, tytuł kontaktu „Sprawdzę, co przejmie automatyzacja, a co AI.”, nagłówek sekcji usług „Wdrażam AI i automatyzuję procesy” z wyjaśnieniem pod spodem. Brak przewijania w bok przy 390 i 1440 px.

**🎯 Następny krok:** akceptacja podglądu przez Roberta i brakujące fakty (przykład agenta AI, bezpieczeństwo danych, wycena).

## 2026-11-13 11:45, Claude Code

**✅ Zrobione (podgląd usług, runda 2 uwag Roberta, ryzyko niskie; nie wdrożone):**
- `docs/makieta/uslugi.html`, widok 1: wzorem strony usługi jest teraz „Wdrożenia AI w firmie” (adres roboczy `/uslugi/wdrozenia-ai/`) zamiast automatyzacji. Treść tylko z faktów w `ustawienia/pl.md` i wdrożenia z wnioskami o dofinansowanie; brakujące problemy oraz odpowiedzi o bezpieczeństwie danych i cenie oznaczone do uzupełnienia przez Roberta. Tytuł kontaktu w podglądzie: „Powiedz, co robicie ręcznie. Sprawdzę, co może przejąć AI.” Brak przewijania w bok przy 390 i 1440 px.

**🎯 Następny krok:** Robert ocenia podgląd i uzupełnia przykład wdrożenia agenta AI, bezpieczeństwo danych i wycenę; potem spec, frazy AI i plan.

## 2026-11-13 11:20, Claude Code

**✅ Zrobione (podgląd usług, runda 1 uwag Roberta, ryzyko niskie; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- Uwaga Roberta: najważniejsze jest teraz AI (wdrożenia AI, aplikacje i strony z AI), automatyzacje n8n i Make schodzą na dalszy plan.
- `docs/makieta/uslugi.html`, sekcja usług na stronie głównej: cztery karty w siatce 2 x 2 (bez nowego CSS) w kolejności Wdrożenia AI w firmie, Aplikacje strony i narzędzia z AI, Voiceboty AI, Automatyzacja procesów. Nagłówek „AI, które pracuje w Twojej firmie”. Opisy tylko z faktów w `ustawienia/pl.md` i wypowiedzi Roberta. Brak przewijania w bok przy 390 i 1440 px.

**🚧 W toku:** widok strony usługi nadal pokazuje automatyzację jako przykład; teksty kontaktu, opis na górze strony, spec i badanie fraz (brak fraz AI) czekają na decyzję Roberta.

**🎯 Następny krok:** Robert ocenia nową sekcję i propozycje tekstów; potem aktualizacja specu, fraz i planu (nowa usługa „Wdrożenia AI” w pierwszej fali).

## 2026-11-13 10:37, Claude Code

**✅ Zrobione (zadanie 11 planu widoczności: lista działań z linkami zewnętrznymi, bez kodu, ryzyko niskie; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- Nowy plik `docs/seo/linki-zewnetrzne.md`: 10 pozycji w kolejności wartość do wysiłku (GitHub, LinkedIn, prośba do klientów, Make Solution Partner, n8n, Dev.to, spotkania we Wrocławiu, Bulldogjob, Useme, do sprawdzenia). Przy każdej adres, co wpisać, gotowy tekst, koszt i źródło sprawdzenia z datą. Rodzaj linku (`rel`) nigdzie niezmierzony, do sprawdzenia po rejestracji. Katalog ekspertów n8n pominięty (pilotaż zamknięty, Polska poza regionami).
- Nic nie zostało zarejestrowane ani wysłane.
- Poprawki po przeglądzie (2 rundy): z gotowych tekstów usunięto lub oznaczono jako przesłankę (⚠️) twierdzenia, których nie ma w `ustawienia/pl.md` i `wdrozenia/*/pl.md` albo w sprawdzonym źródle (grupa docelowa szablonu n8n, "bezpieczny dla SEO", opis Bulldogjob, korzyści ze spotkań, klienci Useme); lokalizacja zawsze "Wrocław albo zdalnie"; niepotwierdzone zakresy oznaczone "[do potwierdzenia przez Roberta]".

**🎯 Następny krok:** Robert przegląda listę i rejestruje się (pozycje 1 i 2 od razu; linki do stron usług i `/dla-rekruterow/` po ich wdrożeniu).

## 2026-11-13 10:40, Claude Code

**✅ Zrobione (zadanie 2 planu widoczności: przekaz dla klienta i rekrutera, ryzyko niskie; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- `ustawienia/pl.md`: tytuł kontaktu „Powiedz, co robicie ręcznie. Sprawdzę, co da się zautomatyzować.”, wstęp kontaktu z ofertą dla firm i otwartością na rolę Automation Developer albo AI Engineer, tytuł wdrożeń „Systemy, które działają u klientów” (bez liczby). Wiersz karty „Szukam” bez zmian.
- `ustawienia/en.md` przetłumaczone według `/tlumacz-strone`, `zrodlo` przeliczone; kontrola tłumaczeń bez błędów.
- Testy: nagłówek wdrożeń w `jezyki-prawdziwa-tresc.spec.ts`; porównanie z makietą podmienia w kopii makiety trzy zmienione teksty (jak przy logo i kolorze), wzorce zrzutów bez zmian.

**🎯 Następny krok:** zadanie 3 planu (wg planu w `docs/superpowers/plans/`); krok 6 wcześniejszego zadania czeka na `klik_telefon` w GTM po wdrożeniu.

## 2026-11-13 10:45, Claude Code

**✅ Zrobione (zadanie 1, krok 6: numer telefonu na stronie, ryzyko średnie; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- Numer od Roberta w `src/content/ustawienia/pl.md` i `en.md`; telefon widoczny w kontakcie na `/` i `/en/`, w JSON-LD (`telephone`) i w `llms.txt`.
- Testy na prawdziwej treści: link `tel:` ze zdarzeniem (`strona-glowna.spec.ts`), `telephone` w JSON-LD (`seo.spec.ts`). Porównanie z makietą ukrywa blok telefonu (makieta go nie ma), jak ukrywa wpisy; wzorce zrzutów bez zmian.

**🎯 Następny krok:** po wdrożeniu dopisać `klik_telefon` do wyzwalacza w GTM i oznaczyć w GA4; potem zadanie 2.

## 2026-11-13 10:21, Claude Code

**✅ Zrobione (zadanie 5 planu widoczności: podgląd wyglądu, bez kodu strony, ryzyko niskie; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- Nowy plik `docs/makieta/uslugi.html`: trzy widoki jeden pod drugim (strona usługi „Automatyzacja procesów”, sekcja usług na stronie głównej z trzema kartami, podstrona `/dla-rekruterow/`), przełącznik trybu jasny/ciemny w pasku podglądu. Tylko style z makiety (płyty, etykiety mono, `sec-title`, karta, `.job`, `.now`, `.road`, `.skills`, płyta kontaktu), paleta z `src/styles/tokeny.css`; nowe są trzy modyfikatory (`.trzy`, `.dalej`, `.okruszki`).
- Treść tylko z wdrożeń, projektów i ustawień; telefon `+48 600 100 200` to numer przykładowy, odpowiedź FAQ o koszcie zostawiona Robertowi.
- Brak przewijania w bok przy 360, 390, 1024, 1440 px (scrollWidth = clientWidth); zrzuty 1440 i 390, jasny i ciemny.

**🎯 Następny krok:** Robert akceptuje wygląd (pętla poprawek, najwyżej 3 rundy), potem zadanie 6.

## 2026-11-13 12:00, Claude Code

**✅ Zrobione (zadanie 4 planu widoczności: badanie fraz, bez kodu, ryzyko niskie; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- Nowy plik `docs/seo/frazy-uslug.md`: frazy PL i EN dla trzech usług pierwszej fali (podpowiedzi Google i WebSearch, 2026-11-13, każda ze źródłem), konkurencja w wynikach, propozycja frazy głównej, adresów PL/EN, tytułów SEO (z liczbą znaków) i 5 pytań FAQ na usługę.
- Luki zapisane w pliku: brak wolumenów wyszukiwań i brak bloku „Ludzie pytają też” w użytych narzędziach.

**🎯 Następny krok:** Robert akceptuje adresy (`/uslugi/automatyzacja-procesow/`, `/uslugi/voiceboty/`, `/uslugi/strony-i-aplikacje/` i odpowiedniki EN); po wdrożeniu ich zmiana wymaga 301. Potem zadanie 5.

## 2026-11-13 11:15, Claude Code

**✅ Zrobione (zadanie 3 planu widoczności: BlogPosting we wpisach, ryzyko niskie; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- Nowy komponent `src/components/DaneWpisu.astro`: JSON-LD `BlogPosting` na stronach wpisów PL i EN (tytuł, zajawka, data, język, autor z tym samym `@id` co Person na stronie głównej, bezwzględny adres wpisu, obraz z miniatury tylko gdy jest). Adres budowany z przekazanego `adres`.
- Testy e2e na fiksturach (`wpisy.spec.ts`): wpis PL z miniaturą, PL bez miniatury, EN, brak bloku na liście.

**🎯 Następny krok:** zadanie 4 planu.

## 2026-11-13 10:30, Claude Code

**✅ Zrobione (zadanie 1 planu widoczności: telefon, ryzyko średnie; gałąź `widocznosc-klienci-rekruterzy`, nie wdrożone):**
- Opcjonalne pole `kontakt.telefon` (schemat z komunikatem błędu, pole w panelu), `hrefTelefonu` w `src/lib/telefon.ts`, link `tel:` ze zdarzeniem `klik_telefon` nad e-mailem w kontakcie, `telephone` w JSON-LD i telefon w linii Kontakt w `llms.txt`. Bez numeru nic się nie wyświetla.
- Poprawka po przeglądzie: schemat przyjmuje też pusty `telefon: ""` (czyszczenie pola w panelu nie psuje budowania); szablony i `llms.txt` traktują pusty tekst jak brak telefonu.
- Testy: jednostkowe (`telefon.test.ts`, `llms.test.ts`) i e2e na fiksturach (`jezyki.spec.ts`: link, JSON-LD, zdarzenie po zgodzie); fikstura PL ma numer testowy. `npm run sprawdz` przechodzi. W `AGENTS.md` opis regexu GTM dopisany o `klik_telefon`.

**🎯 Następny krok:** numer od Roberta do `src/content/ustawienia/pl.md` (i decyzja, czy też do `en.md`); po wdrożeniu dopisać `klik_telefon` do wyzwalacza w GTM i oznaczyć w GA4; polityka prywatności i `ciasteczkaGoogle` do sprawdzenia przy zmianie kontenera. Potem zadanie 2.

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
