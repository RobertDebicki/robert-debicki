# Strona osobista Roberta Dębickiego: projekt

Data: 2026-10-23. Stan: do akceptacji Roberta.
Po założeniu repozytorium strony ten plik przenosimy do niego (`docs/superpowers/specs/`).

## Po co i dla kogo

Strona przedstawia Roberta jako Automation Developera i AI Engineera. Ma pokazać, że dowozi działające systemy u klientów. Ma też różnić się od typowych stron developerów: ciemne tło z zielonym akcentem, czcionka terminalowa i nagłówki `// komentarz` to wzorzec, którego unikamy.

Strona nie kończy się na rekrutacji. Strona ma być rozwijana także po zatrudnieniu: dodawać wpisy, kolejne projekty i referencje od klientów. Rozwój odbywa się po godzinach, więc dodawanie treści ma być szybkie i bez otwierania kodu.

Repozytorium jest publiczne. Ma być drugim dowodem umiejętności: czysty kod, sensowna historia commitów, testy.

## Cele

1. Przenieść zatwierdzony wygląd 1:1 do kodu, który da się rozwijać. Źródłem prawdy wyglądu jest `docs/makieta/index.html` (wersja wdrożona 23.10.2026 pod https://robert-debicki.robert-debicki7.workers.dev).
2. Panel w przeglądarce do dodawania i edycji: wpisów, projektów, referencji.
3. Wersja polska i angielska od początku.
4. Strona statyczna i szybka, z animacjami takimi jak w makiecie.
5. Publiczne repo, które samo w sobie dobrze świadczy o autorze.

## Poza zakresem (na teraz)

- Własna domena. Strona zostaje pod obecnym adresem `.workers.dev` (decyzja Roberta 23.10).
- Formularz kontaktowy. Kontakt to e-mail z przyciskiem kopiowania i LinkedIn, jak w makiecie.
- Kolejne języki poza PL i EN.
- Komentarze pod wpisami, newsletter, logowanie dla odwiedzających.
- Zmiana wyglądu. Uwagi grafika przyjdą osobno i wejdą jako osobne zadania.

## Czego nie wolno (porażka, nawet jeśli technicznie działa)

- Wygląd jak szablon: siatka kropek, `// komentarze`, zielony neon, Inter, Space Grotesk, karty z poświatą.
- Nazwy klientów przy projektach. Klientów opisujemy branżą.
- Fakty, których Robert nie podał albo których nie ma w jego materiałach. Bez zmyślonych metryk.
- Długie i krótkie myślniki (`—`, `–`) w treści. Tylko zwykły dywiz w zakresach dat.
- Klucze, tokeny albo dane klientów w publicznym repo.

## Ustalone przez Roberta

- Rozwój po zatrudnieniu: tak, strona ma żyć dalej.
- Treści, które będą przybywać: wpisy, projekty, referencje.
- Dodawanie treści: przez panel w przeglądarce, bez otwierania kodu. Strona ma przy tym zostać optymalna i zgodna z dobrymi praktykami.
- Animacje z makiety mają zostać.
- Języki: polski i angielski od początku. Tłumaczenie według pakietu zasad tłumaczenia z wcześniejszego projektu.
- Repozytorium: publiczne.
- Referencje: papierowe listy z podpisem klienta.
- Domena: na razie brak, zostaje obecny adres.
- Wygląd: makieta zatwierdzona 23.10 (fonty zestaw E: Anybody rozszerzony, Onest, Spline Sans Mono; paleta pomarańcz `#ff5a1f`, czerwień `#d0201a`, żółty `#ffc400`, czarny; logo „rd”).
- **Brak wersji EN (23.10, wariant a):** treść PL wychodzi od razu. Dopóki nie ma tłumaczenia, pozycja jest ukryta w wersji angielskiej: nie ma jej na listach EN, w mapie strony ani w `hreflang`, a przełącznik języka na jej stronie prowadzi do listy EN. Gdy PL zmieni się po przetłumaczeniu, EN dostaje stan `do aktualizacji` i dalej się wyświetla. Brak tłumaczenia nie blokuje wdrożenia. CI blokuje tylko istniejące tłumaczenie z niezgodnymi liczbami albo nazwami.
- **Skany referencji poza repo (23.10, wariant a):** pliki leżą w magazynie Cloudflare (np. R2), a w repo jest tylko odnośnik. Usunięcie pliku z magazynu usuwa go naprawdę. Jeśli Sveltia nie potrafi zapisywać do takiego magazynu, wykonawca proponuje sposób wgrywania i pyta Roberta, zanim ruszy dalej.
- **Angielski amerykański (23.10).** Zasady z tego pakietu przestawiamy z en-GB na en-US.

## Decyzje Claude (do potwierdzenia przy akceptacji)

- **Astro + Sveltia CMS + GitHub + Cloudflare.** Astro generuje statyczny HTML. Sveltia działa pod `/admin/`, zapisuje treść jako pliki w repo przez GitHub, a Cloudflare przebudowuje stronę po każdym commicie. Bez bazy danych i serwera. Ten sam zestaw działa już we wcześniejszym projekcie (Astro + Sveltia + Cloudflare), więc wzorujemy się na nim. Odrzucony wariant: Next.js + Payload CMS, bo wymaga bazy i stale działającego serwera.
- **Referencje na stronie** to skan listu (podgląd, pełny plik po kliknięciu) plus jedno zdanie cytatu wpisane jako tekst, imię i nazwisko, funkcja, firma i data. Panel wymaga zaznaczenia, że klient zgodził się na publikację razem z nazwą firmy. Referencja nie linkuje do żadnego wdrożenia i nie wskazuje, którego projektu dotyczy, żeby nie łączyć firmy z projektem opisanym branżą. ⚠️ Robert nie odpowiedział, czy nazwa firmy może się pojawić. To wariant ostrożny.
- **Dostępność wygrywa z wyglądem 1:1.** Jeśli audyt wykaże za słaby kontrast tekstu, wykonawca przyciemnia odcień w ramach tej samej barwy i zapisuje zmianę w CHANGELOG. Większe zmiany wyglądu zgłasza Robertowi.
- **Pakiet tłumacza w publicznym repo:** kopiujemy tylko ogólne zasady języka angielskiego i skrypt kontroli. Bez fraz, przykładów i danych z tamtego projektu.
- **Repozytorium:** nowe, `RobertDebicki/robert-debicki`, publiczne, z czystą historią. Nie przenosimy historii innych repozytoriów. Do nowego repo trafia tylko makieta, ten dokument i plan.
- **Doświadczenie** (NoCodeWork, własna działalność, trzy zasady pracy) jest częścią strony ustawień w panelu.
- **`noindex` do czasu akceptacji grafika i Roberta**, potem wyłączany jednym przełącznikiem w konfiguracji.

## Treść i jej struktura

Strona główna zachowuje układ makiety: otwarcie z nazwiskiem i kartą zlecenia, wdrożenia, ostatnie projekty, doświadczenie, narzędzia, kontakt. Dochodzą dwie sekcje: referencje i najnowsze wpisy. Pojawiają się dopiero wtedy, gdy jest w nich treść.

Rodzaje treści w panelu (każdy w wersji PL i EN):

| Rodzaj | Pola | Gdzie widać |
|---|---|---|
| Wdrożenie | tytuł, branża, liczba główna, podpis liczby, opis, stack, ikona, kolor płyty, kolejność | sekcja wdrożeń |
| Projekt bieżący | tytuł, branża, opis, stack, etap (tekst pieczątki), stan: w toku / na produkcji | sekcja ostatnich projektów |
| Referencja | skan (obraz albo PDF), cytat, osoba, funkcja, firma, data, zgoda na publikację (wymagana), podpis zamazany (tak/nie) | sekcja referencji, osobna podstrona z pełną listą |
| Wpis | tytuł, data, zajawka, treść, zdjęcia z opisem alternatywnym, stan tłumaczenia | lista wpisów i strona wpisu |

Treść obecnej makiety (6 wdrożeń, 4 projekty, doświadczenie, narzędzia, karta zlecenia) staje się pierwszą zawartością panelu. Teksty stałe (otwarcie, karta zlecenia, narzędzia, kontakt) też są edytowalne w panelu jako jedna strona ustawień.

## Adresy i języki

- Polski pod `/`, angielski pod `/en/`. Przełącznik prowadzi do odpowiednika strony. Gdy odpowiednika EN jeszcze nie ma, prowadzi do listy EN tego rodzaju treści.
- `hreflang`, `canonical`, mapa strony, `lang` w `<html>`.
- Wpisy: `/wpisy/<adres>/` i `/en/posts/<adres>/`. Referencje: `/referencje/` i `/en/references/`.

## Tłumaczenie

Według pakietu zasad tłumaczenia z wcześniejszego projektu.

- Zasada: tłumaczysz, nie piszesz. Każdy fakt z oryginału (liczba, nazwa, termin, zastrzeżenie) jest w tłumaczeniu i nic nie jest dopisane.
- Zasady języka: `references/jezyki/en.md`, przestawione na en-US. Kontrola: `scripts/kontrola_tlumaczenia.py` (zgodność liczb i nazw, typografia, słowa zakazane) z `scripts/jezyki.json`.
- Każda wersja EN ma pole stanu: `ai` (przetłumaczone, niesprawdzone przez native speakera), `sprawdzone` albo `do aktualizacji` (PL zmieniono po tłumaczeniu).
- Przebieg: Robert dodaje treść po polsku w panelu i strona PL wychodzi od razu. Tłumaczenie robi skill w Claude Code, uruchamiany jednym poleceniem, który znajduje pozycje bez EN albo z EN do aktualizacji i zapisuje wersję EN do repo przez commit. Kontrola tłumaczenia działa też w CI i zatrzymuje wdrożenie, gdy istniejące tłumaczenie ma niezgodne liczby albo nazwy.

## Wygląd i zachowanie

- Wszystko z makiety: raster dwóch farb na `<canvas>` (pomarańcz 15°, żółty 75°), który słabnie po zejściu poniżej otwarcia, wjazd płyt nazwiska w pasery, belki pod liczbami wysuwające się przy wejściu w widok, pieczątki, pasek kontrolny barw, znaczniki cięcia, logo „rd”, ikony wdrożeń.
- Jasny i ciemny motyw zależny od systemu, jak w makiecie.
- Przy ustawieniu „ogranicz ruch” raster jest statyczny, a animacje wyłączone.
- Skrypt rastra ładuje się po wyświetleniu treści i nie blokuje jej.

## Jakość (warunki odbioru)

- Lighthouse na telefonie: wydajność, dostępność, dobre praktyki i SEO co najmniej 95. Wynik zapisany w repo.
- Brak przewijania w bok przy 360, 390, 1024 i 1440 px. Brak błędów w konsoli. Wszystkie trzy fonty się ładują. Sprawdzane testem Playwright w CI.
- Zero `—` i `–` w treści, sprawdzane w CI.
- Wdrożenie zatrzymane, gdy brakuje opisu alternatywnego zdjęcia, gdy referencja nie ma zaznaczonej zgody, gdy w repo pojawi się plik skanu referencji albo gdy kontrola tłumaczenia znajdzie niezgodną liczbę w istniejącym tłumaczeniu.
- Repo: README po polsku i angielsku (co to, jak uruchomić, jak dodać treść), licencja, brak sekretów (skan przed pierwszym pushem).

## Wdrażanie

- Ten sam Worker co dziś (`robert-debicki`), ten sam adres.
- Commit na gałęzi głównej uruchamia build i wdrożenie automatycznie.
- Logowanie do panelu przez GitHub, przez `sveltia-cms-auth` na Cloudflare. We wcześniejszym projekcie ten krok odłożono, więc tu trzeba go zrobić od początku.

## Zostawione wykonawcy

Struktura katalogów, wybór biblioteki do obrazów, sposób zapisu treści (Markdown czy JSON), nazwy komponentów, CI na GitHub Actions czy Cloudflare Builds, kolejność kroków budowy.
