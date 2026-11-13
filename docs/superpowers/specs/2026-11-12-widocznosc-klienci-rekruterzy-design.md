# Widoczność w Google i wyszukiwarkach AI: klienci i rekruterzy

Data: 12.11.2026. Gałąź: `widocznosc-klienci-rekruterzy`. Status: projekt do akceptacji Roberta.

## Po co

Robert chce, żeby strona `robert-debicki.pl` była wysoko w Google i w wyszukiwarkach AI (ChatGPT, Perplexity, Gemini) i przyciągała dwie grupy:

- **Klient** (mała lub średnia firma) ma poczuć: „chcę do niego napisać albo zadzwonić”.
- **Rekruter** ma poczuć: „chcę go zatrudnić”, mimo że Robert ma też własne zlecenia.

**Sukces po 3 miesiącach (od wdrożenia):** Robert dostaje maile i telefony z propozycjami współpracy. Pomiar: zdarzenia `klik_email`, `kopiuj_email`, `klik_telefon` w GA4 (oznaczone jako kluczowe) oraz wyświetlenia i kliknięcia w GSC dla stron usług i wpisów. GA4 widzi tylko osoby, które dały zgodę, więc ostateczną miarą są wiadomości, które Robert faktycznie dostaje.

**Typowy klient (z rozmowy):** firma sprzedająca sterowniki, z przestarzałą stroną bez sprzedaży, każde zamówienie właściciel przeklikiwał ręcznie. Robert zbudował stronę na WordPressie z WooCommerce, połączył ją z Małą Księgowością Rzeczpospolitej (MKR) i zbudował w MKR magazyn, tak że zamówienie ze sklepu samo zamienia się w fakturę wysłaną klientowi. Klient przyszedł z polecenia.

**Rodzaje zleceń, których Robert chce więcej (jego słowa):** automatyzacje, agenci AI wielozadaniowi, voiceboty, strony i aplikacje budowane z Claude Code, spersonalizowane narzędzia, gdy gotowe nie spełniają oczekiwań klienta albo są za drogie.

**Tło:** strona specjalisty od marketingu, wysoko w Google mimo wielu agencji, ma 220 adresów w mapie witryny, głównie strony „usługa + miasto”. Strona Roberta ma 16 adresów (stan 12.11). Indeksowanie włączone 11.11, mapa witryny przesłana ponownie 12.11, GA4 połączone z GSC.

## Cele

1. **Strony usług** (nowe): po jednej na każdy rodzaj zlecenia, w PL i EN.
2. **Telefon** na stronie: klikalny, mierzony, w danych strukturalnych.
3. **Przekaz dla obu grup** na stronie głównej: koniec z nagłówkiem, który odstrasza klienta („Szukam stałej pracy…”), i wyraźna ścieżka dla rekrutera.
4. **Dane strukturalne** dla Google i AI: `BlogPosting` we wpisach, `Service` i `FAQPage` na stronach usług, `telephone` w `Person`.
5. **Treść:** wydanie szkiców serii 2 (osobny tor, już w toku na gałęzi `blog-cztery-wpisy`) i nowy wpis o wdrożeniu WooCommerce + MKR.
6. **Angielskie adresy wpisów** po angielsku, z przekierowaniem 301 ze starych.
7. **Linki z zewnątrz:** lista działań dla Roberta (bez kodu).

## Poza zakresem

- Strony „usługa + miasto” (np. „automatyzacja n8n Wrocław”, „…Kraków”). Ryzyko kary Google za doorway pages i masowe treści.
- Reklamy, remarketing, narzędzie do zgód (CMP), zmiana banera zgody.
- Formularz kontaktowy, czat, kalendarz rezerwacji. Kontakt to e-mail, telefon, LinkedIn.
- Zmiana wyglądu istniejących sekcji poza tym, czego wymaga nowa treść.

## Porażka, nawet jeśli działa

- Nazwa klienta przy wdrożeniu lub usłudze (także nazwa firmy ani nazwisko osoby, która poleciła). Klienta opisujemy branżą.
- Liczba projektów w treści. Zmyślone metryki albo fakty, których Robert nie podał.
- Wygląd jak szablon (lista z `AGENTS.md`) albo odejście od makiety.
- Długie i krótkie myślniki w treści.
- Lighthouse mobile poniżej 95 w którejkolwiek kategorii, przewijanie w bok przy 360/390/1024/1440.
- Rekruter ma wrażenie „to freelancer, nie szuka etatu” albo klient ma wrażenie „on zaraz zniknie na etat”.

## Ograniczenia (z `AGENTS.md`, obowiązują w całości)

Fonty, paleta, makieta `docs/makieta/index.html`, treść z panelu `/admin/` (Sveltia CMS), PL pod `/`, EN pod `/en/` (brak `en.md` ukrywa pozycję w EN), `npm run sprawdz:tresc` i `sprawdz:sekrety` na 0, commit z wpisem w `CHANGELOG.md`, push i wdrożenie tylko za zgodą Roberta w danej wiadomości. Proces przy designie: statyczny podgląd HTML do akceptacji przed kodem.

## Ustalone części rozwiązania

### 1. Strony usług

- **Pięć rodzajów usług**, robocze nazwy (ostateczne brzmienie do akceptacji Roberta):
  1. Automatyzacja procesów (n8n, Make.com, integracje: sklep, księgowość, CRM).
  2. Agenci AI w firmie.
  3. Voiceboty.
  4. Strony i aplikacje z Claude Code.
  5. Narzędzia na miarę (zamiast drogiego albo niepasującego gotowca).
- **Pierwsza fala: usługi 1, 3 i 4**, bo mają działające przykłady (wdrożenia: obieg wniosków, reaktywacja klientów, monitoring temperatur, voice bot; projekty stron i aplikacji). **Usługi 2 i 5 wychodzą później**, gdy pierwsze takie wdrożenie zacznie działać. Na 13.11 Robert ma dla nich tylko plany: własny CRM do komunikacji z klientami i pokazywania wyników prac oraz rozmowy z klientem o przeniesieniu bazy zamówień z Airtable do osobnego systemu z wynikami kampanii, zgłoszeniami klientów, zarządzaniem kampaniami i analizatorem SEO strony. Do tego czasu temat agentów AI pokrywa wpis z serii 2. Schemat kolekcji ma wymagać przykładu, żeby strona bez przykładu nie przeszła walidacji.
- **Treść każdej strony:** problem klienta jego słowami, jak Robert go rozwiązuje, przykład wdrożenia opisany branżą (link do pozycji z sekcji wdrożeń albo do wpisu), pytania i odpowiedzi (FAQ), jedno wezwanie do kontaktu na końcu: telefon i e-mail.
- **Edycja z panelu:** nowa kolekcja `uslugi` w Sveltia CMS, struktura jak pozostałe (`src/content/uslugi/<adres>/{pl,en}.md`, schemat w `src/lib/schematy.ts`, walidacja jak w innych kolekcjach).
- **Adresy:** PL `/uslugi/<adres>/`, EN `/en/services/<adres-en>/`. Lista usług: `/uslugi/` i `/en/services/`.
- **Wejścia:** sekcja usług na stronie głównej (krótkie karty z linkiem), link w nawigacji, linki z pasujących wpisów i wdrożeń.
- **Teksty pisze Claude wyłącznie z faktów Roberta** (rozmowa, istniejące wdrożenia, wpisy). Każde zdanie z faktem musi mieć źródło w tym, co Robert podał. Czego brakuje, Claude pyta. Robert akceptuje treść przed wdrożeniem.

### 2. Telefon

- Nowe pole `kontakt.telefon` w ustawieniach (PL i EN), wpisywane przez Roberta w panelu.
- Pokazany w sekcji kontakt i w wezwaniu na końcu każdej strony usługi jako link `tel:`.
- Zdarzenie `klik_telefon` przez istniejący mechanizm `data-zdarzenie` (`src/scripts/zgoda.ts`), wysyłane tylko po zgodzie.
- W kontenerze GTM: regex wyzwalacza „Kliknięcia kontaktu” rozszerzony o `klik_telefon`; aktualizacja opisu w `AGENTS.md`. To nie jest nowy tag, więc polityka prywatności i `ciasteczkaGoogle` bez zmian.
- `telephone` w `Person` (`DaneStrukturalne.astro`) i w `/llms.txt` (`src/lib/llms.ts`).
- Robert świadomie godzi się, że numer będzie w publicznym repozytorium (jak dziś e-mail).

### 3. Przekaz dla obu grup

- Nagłówek sekcji kontakt (`kontakt.tytul`, dziś „Szukam stałej pracy jako Automation Developer albo AI Engineer”) i wiersz karty „Szukam” przeredagowane tak, żeby klient czuł, że może zlecić pracę, a rekruter, że Robert jest otwarty na stałą rolę. Szkic kierunku: „Wdrażam automatyzacje i AI w firmach. Jestem otwarty na stałą rolę Automation Developer albo AI Engineer.” Ostateczne brzmienie akceptuje Robert.
- **Podstrona dla rekrutera** `/dla-rekruterow/` (EN `/en/for-recruiters/`), link w nawigacji i w sekcji kontakt. Rekruter ma tam na jednym ekranie: jakiej roli Robert szuka i gdzie (Wrocław albo zdalnie), stack (z ustawień „Czym pracuję”), wybrane wdrożenia i projekty z linkami, doświadczenie, LinkedIn, przycisk „Pobierz CV” i kontakt. Treść z panelu (teksty w ustawieniach, wybór pozycji z istniejących kolekcji), bez przepisywania danych. Dane strukturalne `ProfilePage` z `mainEntity` = osoba. Cel w Google: zapytania o imię i nazwisko oraz „Automation Developer Wrocław”.
- **CV w PDF:** plik w R2 (jak skany referencji), w repozytorium tylko adres w ustawieniach. Bez pliku przycisk się nie pokazuje.
- Nagłówek „Sześć systemów, które działają u klientów” podaje liczbę, a `AGENTS.md` zabrania liczby projektów w treści. Do przeredagowania przy okazji, chyba że Robert uzna to za świadomy wyjątek.

### 4. Dane strukturalne

- `BlogPosting` na stronie każdego wpisu: tytuł, opis, data, autor (`@id` osoby z `DaneStrukturalne.astro`), obraz (miniatura, jeśli jest), język.
- `Service` (dostawca: osoba) i `FAQPage` (z pól FAQ) na stronach usług.
- `/llms.txt` wymienia strony usług.

### 5. Treść

- Seria 2 (KSeF, polityka AI, oszustwo na prezesa, agent AI) idzie swoim torem na gałęzi `blog-cztery-wpisy`. Ten projekt jej nie zmienia, tylko po wydaniu dodaje linki z wpisów do pasujących stron usług.
- Nowy wpis: studium wdrożenia sklep WooCommerce + Mała Księgowość Rzeczpospolitej (zamówienie, faktura, magazyn bez klikania), klient opisany branżą. **Czeka na uruchomienie u klienta:** na 13.11 klient testuje (pierwsza faza testów bez zastrzeżeń), start po przeniesieniu na nowy hosting. Do tego czasu pozycja zostaje w `projekty` (`sklep-b2b`, stan „w toku”); po starcie przechodzi do `wdrozenia` i staje się przykładem na stronie usługi „Automatyzacja procesów”. Fakty od Roberta; Claude dopytuje o brakujące (bez zmyślonych liczb).

### 6. Angielskie adresy wpisów

- Pole na angielski adres w `en.md` wpisu. Adres EN tworzony z niego zamiast z polskiego folderu.
- Przekierowania 301 ze starych adresów `/en/posts/<polski-adres>/` w `hosting/htaccess`.
- Aktualizacja `hreflang`, mapy witryny i linków wewnętrznych.

### 7. Linki z zewnątrz (działania Roberta, bez kodu)

Lista z kolejnością: profil GitHub i LinkedIn z linkiem do strony i stron usług, społeczność n8n, katalogi firm i specjalistów (skill `directory-submissions`), artykuły gościnne (skill `link-building`), poproszenie zadowolonych klientów o polecenie z linkiem. Claude przygotowuje listę i teksty; wysyłki i rejestracje robi Robert.

## Kolejność (decyzja Claude, do zmiany)

1. Telefon + przekaz dla obu grup (szybki efekt dla kontaktu).
2. `BlogPosting` we wpisach.
3. Strony usług: badanie fraz, statyczny podgląd HTML jednej strony i sekcji na stronie głównej do akceptacji, potem kolekcja, treść trzech stron pierwszej fali, EN.
3a. Podstrona dla rekrutera (podgląd HTML razem z krokiem 3).
4. Wpis WooCommerce + MKR, gdy sklep zacznie działać u klienta.
5. Angielskie adresy wpisów.
6. Lista działań z linkami zewnętrznymi.

Każdy krok to osobny commit z wpisem w `CHANGELOG.md` i może być wdrożony osobno (za zgodą Roberta).

## Decyzje Claude po przeglądzie recenzenta (do sprawdzenia przez Roberta)

- **Badanie fraz przed treścią:** krok 3 zaczyna się od listy fraz PL i EN dla każdej usługi (podpowiedzi Google, pytania „Ludzie pytają też”, konkurencja w wynikach). Robocze nazwy usług nie są frazami docelowymi. Adresy `/uslugi/<adres>/` ustalamy dopiero po tej liście.
- **Miasto:** w treści stron usług „Wrocław albo zdalnie” (jak w ustawieniach), w `Service` pole `areaServed` = Polska. Bez celowania w wyniki lokalne.
- **GTM i GA4:** AdLoop jest zablokowany do ok. 18.11.2026, więc zmianę regexu, publikację kontenera i oznaczenie zdarzeń jako kluczowych robi Robert według instrukcji z planu albo Claude w Chrome, jeśli Robert na to pozwoli. Plan zawiera sprawdzenie na żywej stronie, że `klik_telefon` dociera do GA4.
- **Kolejność względem serii 2:** seria 2 (`blog-cztery-wpisy`) wchodzi do `main` przed krokiem 5. Krok 5 nadaje angielskie adresy wszystkim wpisom naraz, więc nowe wpisy nie potrzebują przekierowań, jeśli ich EN pojawi się po kroku 5.

## Zostawione wykonawcy

Dokładne pola schematu `uslugi`, nazwy komponentów, układ sekcji usług w ramach stylu makiety, kształt JSON-LD w granicach opisanych wyżej, testy (Vitest i e2e w stylu istniejących), sposób generowania adresów EN.
