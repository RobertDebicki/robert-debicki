# Braki po audycie SEO z 23.11: plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Uzupełnić na robert-debicki.pl to, czego brakuje według audytu: ceny i czas wdrożenia na stronach usług, link do usługi „strony i aplikacje”, wpis o kosztach wdrożenia AI, indeksacja EN i stały pomiar widoczności.

**Architecture:** Zmiany wyłącznie w treści (`src/content/**/pl.md` i `en.md`) i w dokumentacji `docs/seo/`. Szablony i schemat zostają bez zmian: cena mieści się w istniejących polach `karta[]` i `faq.pozycje[]` strony usługi. Działania poza repozytorium (GitHub, LinkedIn, przycisk w GSC) robi Robert według gotowych tekstów.

**Tech Stack:** Astro (kolekcje treści), `skrypty/dnk.ts`, skille `/wpis-rd` i `/tlumacz-strone`, AdLoop (GSC, odczyt), Treg (cloro, DataForSEO).

**Spec:** `docs/seo/audyt-2026-11-23.md` (punkt 7, plan działań).

**Ryzyko: średnie.** Ceny na stronie to deklaracja handlowa widoczna dla klientów, więc tylko liczby podane przez Roberta. Testy, `npm run sprawdz`, `/code-review`, wdrożenie tylko za zgodą Roberta w danej wiadomości.

## Global Constraints

- Fakty i liczby tylko od Roberta. Bez zmyślonych metryk i cen (`AGENTS.md`, twarde zasady).
- Bez nazw klientów, bez liczby projektów, bez długich i krótkich myślników w treści.
- Zasady DNK dla usług i wpisów: `.claude/skills/wpis-rd/references/zasady.md` (wstęp usługi `lead` + `akapit` razem 2 do 4 zdań, FAQ 5 do 7 pozycji, odpowiedź 1 do 3 zdań i zaczyna się od konkretu, wpis: 1 albo 2 linki w treści).
- Każda zmiana PL ma wersję EN (en-US) zrobioną `/tlumacz-strone`; brak `en.md` ukrywa pozycję w EN.
- Commit dopiero z wpisem w `CHANGELOG.md`. Push na `main` i `npm run wdroz -- --wgraj` tylko za zgodą Roberta w danej wiadomości.

## Review Focus

- Kwota w `karta` różna od kwoty w FAQ albo w EN: ta sama liczba wszędzie (audyt, sekcja 6 „Facts in one version”). Sprawdzenie w Task 1 i 2, krok z `grep` po `dist/`.
- Netto i brutto: każda kwota ma dopisek „netto” albo „brutto”, w EN „net” / „gross” (decyzja z Task 0).
- Dodanie zdania do `akapit` łamie limit 2 do 4 zdań wstępu: cena idzie do `karta` i FAQ, nie do wstępu.
- Dane strukturalne FAQ (`FAQPage`) mają odpowiedź z ceną: sprawdzenie w zbudowanym HTML w Task 1.
- Link w wpisie n8n łamie limit 2 linków DNK: dziś wpis ma 1 link, po zmianie 2 (Task 3, kontrola `dnk.ts`).

---

### Task 0: Decyzje Roberta (blokuje Task 1, 2 i 4)

**Files:** brak; odpowiedzi zapisać w `docs/seo/ceny-uslug.md` (Create).

- [ ] **Step 1: Zadać Robertowi pytania i zapisać odpowiedzi w `docs/seo/ceny-uslug.md`**

| Usługa | Pytanie |
|---|---|
| Voiceboty | Wdrożenie voicebota: od ilu zł? Czy jest koszt miesięczny (minuty, utrzymanie) i ile? Ile trwa wdrożenie? |
| AI i automatyzacja | Automatyzacja jednego procesu: widełki w zł? Pilot: ile tygodni? |
| Strony i aplikacje | Strona WordPress od ilu zł? Sklep WooCommerce od ilu zł? Ile trwa typowa strona? |
| Wszystkie | Netto czy brutto? Czy wolno pisać „od X zł”, czy tylko widełki „X do Y zł”? |
| Wpis | Zgoda na wpis „Ile kosztuje wdrożenie AI w firmie” z tymi liczbami i z przykładem z jednego wdrożenia (branża, bez nazwy klienta)? |

Done: każda komórka ma odpowiedź Roberta albo „nie podaję” (wtedy dana kwota nie trafia na stronę).

- [ ] **Step 2: Commit** `docs/seo/ceny-uslug.md` + wpis w `CHANGELOG.md`, komunikat `docs: ceny usług od Roberta`.

### Task 1: Ceny i czas na 3 stronach usług PL

**Files:**
- Modify: `src/content/uslugi/voiceboty/pl.md` (`karta`, FAQ linia 63-64)
- Modify: `src/content/uslugi/ai-i-automatyzacja/pl.md` (`karta`, FAQ linia 89-90)
- Modify: `src/content/uslugi/strony-i-aplikacje/pl.md` (`karta`, FAQ linie 85-88)

**Interfaces:** Consumes: `docs/seo/ceny-uslug.md` z Task 0.

- [ ] **Step 1: W każdej `karta` dodać 2 wiersze przed „Miejsce”:** `etykieta: "Koszt"` (np. „od X zł netto”) i `etykieta: "Czas wdrożenia"` (np. „X tygodni”). Tylko wartości z `ceny-uslug.md`.
- [ ] **Step 2: Przepisać odpowiedzi FAQ „Ile kosztuje…”:** pierwsze zdanie to kwota z Task 0 („Od X zł netto za …”), drugie: od czego zależy cena, trzecie (opcjonalne): co przysłać do wyceny. Najwyżej 3 zdania.
- [ ] **Step 3: Kontrola DNK każdej usługi**

Run: `npx tsx skrypty/dnk.ts src/content/uslugi/<adres>/pl.md --fraza "<fraza usługi>"` (frazy z `docs/seo/frazy-uslug.md`; dla voiceboty i strony i aplikacje te same co przy wdrożeniu 13.11, CHANGELOG)
Expected: bez BŁĘDÓW; uwagi o braku zdjęć i wezwania po FAQ są znane (szablon).

- [ ] **Step 4: Build i sprawdzenie liczb w HTML**

Run: `npm run build && grep -o "od [0-9 ]*zł[^<\"]*" dist/uslugi/*/index.html | sort | uniq -c`
Expected: każda kwota z `ceny-uslug.md` pojawia się w karcie i w JSON-LD `FAQPage` tej samej strony, ta sama liczba.

- [ ] **Step 5: `npm run sprawdz:tresc`**: Expected: 0 trafień.
- [ ] **Step 6: Commit** z wpisem w `CHANGELOG.md`, komunikat `feat(uslugi): ceny i czas wdrożenia na stronach usług`.

### Task 2: Wersje EN usług

**Files:** Modify: `src/content/uslugi/{voiceboty,ai-i-automatyzacja,strony-i-aplikacje}/en.md`

- [ ] **Step 1: Uruchomić `/tlumacz-strone` dla 3 usług** (skill aktualizuje `en.md` po zmianie `pl.md`).
- [ ] **Step 2: Run** `npm run sprawdz:tlumaczenia` → Expected: bez błędów.
- [ ] **Step 3: Run** `npm run build && grep -o "from PLN[^<\"]*\|PLN [0-9][^<\"]*" dist/en/services/*/index.html | sort | uniq -c` → Expected: te same liczby co w PL, z „net” albo „gross” jak w Task 0.
- [ ] **Step 4: Commit** z wpisem w `CHANGELOG.md`, `feat(uslugi): ceny w wersji EN`.

### Task 3: Link do „strony i aplikacje” z wpisu o n8n

**Files:** Modify: `src/content/wpisy/n8n-make-czy-zapier/pl.md`, `en.md`

Powód: `/uslugi/strony-i-aplikacje/` ma 2 linki wewnętrzne (strona główna, `/uslugi/`), żaden z wpisu. Wpis o n8n ma dziś 1 link (limit DNK: 2).

- [ ] **Step 1: Dopisać jedno zdanie z linkiem** w miejscu, gdzie wpis mówi o granicach gotowych narzędzi: anchor 2 do 5 słów, np. `[aplikacje pisane na zamówienie](/uslugi/strony-i-aplikacje/)`. Fakt w zdaniu tylko taki, który jest już na stronie usługi (np. że piszesz aplikacje w Pythonie i React).
- [ ] **Step 2: Run** `npx tsx skrypty/dnk.ts src/content/wpisy/n8n-make-czy-zapier/pl.md --fraza "n8n, Make czy Zapier" --dodatkowe "n8n czy Make"` → Expected: bez BŁĘDÓW, 2 linki.
- [ ] **Step 3: EN przez `/tlumacz-strone`**, link na `/en/services/websites-and-apps/`; `npm run sprawdz:tlumaczenia` bez błędów.
- [ ] **Step 4: Commit** z wpisem w `CHANGELOG.md`, `feat(wpisy): link do usługi strony i aplikacje`.

### Task 4: Wpis „Ile kosztuje wdrożenie AI w firmie” (po Task 0, za zgodą Roberta)

**Files:** Create: `src/content/wpisy/<adres z /wpis-rd>/pl.md`, `en.md`

Powód: AI Overview na „wdrożenie ai w firmie” i „automatyzacja ai dla firm” odpowiada na koszt liczbami MKM Labs, AutomAIze i SimpleFast (audyt, punkt 3).

- [ ] **Step 1: Wybrać frazę.** Sprawdzić liczbę wyszukiwań (Treg `dataforseo.google.keywords.volume`, Polska 2616, `pl`, $0.09): „ile kosztuje wdrożenie ai”, „ile kosztuje automatyzacja ai”, „koszt wdrożenia ai”, „ile kosztuje voicebot”, „cena voicebota”. Wybrać frazę z największą liczbą; przy braku danych wszędzie „ile kosztuje wdrożenie AI” (pytanie z PAA w audycie). Wynik zapisać w `docs/seo/frazy-uslug.md`.
- [ ] **Step 2: `/wpis-rd`** z faktami z `ceny-uslug.md`: odpowiedź z kwotą w pierwszym zdaniu, tabela „co wpływa na cenę”, 1 link do `/uslugi/ai-i-automatyzacja/`, drugi do `/uslugi/voiceboty/`.
- [ ] **Step 3: Kontrola DNK** (`dnk.ts` z frazą z kroku 1) bez BŁĘDÓW; analizator DNK: okienka dla Roberta przez `skrypty/analizator.ts`, ocena wpisana do CHANGELOG.
- [ ] **Step 4: EN** przez `/tlumacz-strone` (fraza EN z fraz angielskich, nie z tłumaczenia); `sprawdz:tlumaczenia` bez błędów.
- [ ] **Step 5: Commit** z wpisem w `CHANGELOG.md`.

### Task 5: Indeksacja wersji EN

**Files:** Modify: `docs/seo/audyt-2026-11-23.md` (dopisek z wynikiem)

- [ ] **Step 1: Sprawdzić stan indeksu** 16 adresów `/en/` z mapy witryny inspekcją URL w GSC (AdLoop, odczyt). Po `/mcp` → adloop → Reconnect narzędziem AdLoop; bez tego przez pakiet AdLoop z `ADLOOP_CONFIG=~/.adloop-robert/config.yaml`, jak w audycie.
- [ ] **Step 2: Listę niezaindeksowanych** wpisać do audytu i dać Robertowi; Robert w GSC klika „Poproś o zindeksowanie” (do 10 dziennie).
- [ ] **Step 3: Commit** z wpisem w `CHANGELOG.md`.

### Task 6: Pomiar widoczności (stały)

**Files:** Create: `docs/seo/pomiar-ai.md`

- [ ] **Step 1: Utworzyć `docs/seo/pomiar-ai.md`** z 10 pytaniami klientów (z FAQ usług i z PAA w audycie, np. „Ile kosztuje voicebot dla firmy?”, „Jak wdrożyć AI w firmie?”, „n8n czy Make?”) i tabelą: data, silnik (Google AI Overview, ChatGPT, Perplexity), pytanie, wynik (z nazwy / link / brak).
- [ ] **Step 2: Pomiar wyjściowy Google AI Overview** przez Treg `cloro.google.serp.organic` z `include.aioverview: true` (10 × $0.0028); ChatGPT i Perplexity wpisuje Robert ręcznie.
- [ ] **Step 3: Dopisać termin** kontroli GSC: 21.12.2026 (28 dni po zmianach), wyświetlenia stron usług i fraz z audytu, punkt 2.
- [ ] **Step 4: Commit** z wpisem w `CHANGELOG.md`.

### Task 7: Linki zewnętrzne (robi Robert)

**Files:** brak w repo; teksty gotowe w `docs/seo/linki-zewnetrzne.md`, sekcje 1 i 2.

- [ ] **Step 1: Robert:** profil GitHub (repo `RobertDebicki` z README, pole Website) i LinkedIn (Website, Featured) z adresem `https://robert-debicki.pl`.
- [ ] **Step 2: Sprawdzenie:** `curl -s https://github.com/RobertDebicki | grep -c "robert-debicki.pl"` → Expected: co najmniej 1.
- [ ] **Step 3: Odznaczyć** pozycje 1 i 2 w `linki-zewnetrzne.md`, commit z wpisem w `CHANGELOG.md`.

### Task 8: Wydanie

- [ ] **Step 1: Run** `npm run sprawdz` → Expected: wszystkie kroki zielone (jak 22.11: e2e passed, 0 błędów treści).
- [ ] **Step 2: `/code-review`** na poziomie medium (kryteria `REVIEW.md`); poprawki według pętli z `CLAUDE.md`.
- [ ] **Step 3: PR** do `main`; push i `npm run wdroz -- --wgraj` dopiero po zgodzie Roberta; po wgraniu `npm run test:produkcja` → Expected: wszystkie testy zielone, nowe kwoty widoczne na żywych adresach (`curl` + `grep`).
