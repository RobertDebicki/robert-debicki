# Angielski amerykański (en-US): zasady tłumaczenia strony

Cel: tekst ma brzmieć jak napisany przez osobę z USA dla rekrutera technicznego, nie jak przekład z polskiego.
Przy regule źródło: MS = Microsoft English (United States) Localization Style Guide, AP = AP Stylebook,
nasze = ustalenie projektu. Zasady ogólne przeniesione z pakietu `/tlumacz` (wersja brytyjska) i przestawione na en-US.

## Najważniejsza zasada: tłumaczysz, nie piszesz

- Każdy fakt z `pl.md` (liczba, kwota, data, nazwa narzędzia, branża, warunek, zastrzeżenie) jest w `en.md`.
- Niczego nie dopisujesz: żadnych nowych liczb, efektów, przymiotników „wartościujących”, nazw klientów.
- Klienta opisujesz branżą tak jak w PL. Nazwy produktów i narzędzi zostają bez zmian (n8n, Make.com, Claude Code, Airtable).
- Zdanie niejasne w PL: zapytaj Roberta, zamiast zgadywać.
- Kontrola `kontrola_tlumaczenia.py` porównuje liczby powyżej dziewięciu i daty miesiąc-rok. Przejście kontroli
  nie zwalnia z czytania: nazwy, warunki i zastrzeżenia sprawdzasz sam.

## Forma i ton

- Pierwsza osoba „I”, strona czynna, czas jak w PL („Zbudowałem” → „I built”, „Buduję” → „I'm building”) (nasze).
- Krótkie, codzienne słowa, zdania do sedna; tekst do przeglądania, potem do czytania (MS 2).
- Skróty („I'm”, „don't”) są naturalne na stronie osobistej (MS 4.1.7).
- Polskie zdania bierne i bezosobowe zamień na stronę czynną (nasze; MS 2.2).
- Idiomu z oryginału nie tłumacz dosłownie; jeśli nie jest potrzebny, pomiń go (MS 4.1.9).
- Bez napuszonych słów: utilize, leverage, purchase, commence → use, buy, start (MS 2.1.1).
- Bez słów-wypełniaczy typu „seamless”, „cutting-edge”, „robust”, „empower”. Nie ma ich w PL, nie ma ich w EN (nasze).

## Typografia i liczby

- Zero długich (U+2014) i krótkich (U+2013) myślników. Wtrącenie: przecinek, dwukropek, nawias albo nowe zdanie.
  Przedział liczb i dat: zwykły dywiz („2024-2026”) albo „to” (nasze; kontrola zgłasza jako BŁĄD).
- Cudzysłów “…”, w środku cytatu ‘…’ (MS 4.1.12; kontrola zgłasza inne jako UWAGA).
- Kropka i przecinek wewnątrz cudzysłowu: click “Save.” Dwukropek i średnik na zewnątrz (MS 4.1.12).
- Liczby od jednego do dziewięciu słownie, od 10 cyframi (AP). Liczba z jednostką zawsze cyframi („2 min”, „60 hours”).
- Separator dziesiętny kropka („12.5”), tysiące przecinkiem („1,600”, „174,717”) (MS 4.1.10).
- Kwota w złotych: kod waluty i liczba bez przeliczania („PLN 174,717” albo „174,717 PLN”); nigdy w dolarach (nasze).
- Data: „October 2026”, „Oct. 2026” albo „10/2026”; nie „10.2026” (MS 4.1.2; kontrola zgłasza polski zapis jako UWAGA).
- Oxford comma w wyliczeniu: „n8n, Make.com, and Airtable” (MS 4.1.12; AP go nie wymaga, w treści strony stosujemy).
- Tytuły i nagłówki wielką literą tylko na początku i w nazwach własnych (sentence case) (MS 4.1.4).
- Po dwukropku w zdaniu mała litera, chyba że po nim jest całe zdanie (MS 4.1.4).
- Wykrzykników i wielokropka unikaj (MS 4.1.12).

## Pisownia amerykańska

- color, favorite, behavior, center, meter, catalog, program, license, analyze, optimize, organize, customize,
  canceled, modeling (MS 2.2). Kontrola zgłasza formy brytyjskie jako BŁĄD (lista w `jezyki.json`).
- Przymiotnik złożony przed rzeczownikiem z łącznikiem („full-time role”, „AI-assisted code”), po rzeczowniku bez (MS 4.1.3).
- Bez łącznika po przysłówku na -ly („fully automated process”) (MS 4.1.12).
- Apostrof nie tworzy liczby mnogiej („APIs”, „PDFs”) (MS 4.1.12).

## Kalki z polskiego

- „aktualny/aktualnie” → current/currently; „actual” znaczy „rzeczywisty”.
- „ewentualnie” → possibly albo alternatively; „eventually” znaczy „w końcu”.
- „kompleksowy” → end-to-end albo complete, nie „complex”.
- „realizacja”, „wdrożenie” → project, deployment, rollout; nie „realisation”, nie „implementation” wszędzie po kolei.
- „dedykowany” → custom albo built for, nie „dedicated” w sensie „na zamówienie”.
- „branża” → industry albo sector; „klient” (firma) → client.
- „dofinansowania” → grants albo funding; „gmina” → municipality.
- „województwo” → region (nasze).
- „szansa sprzedaży” w CRM → deal (Pipedrive tak nazywa obiekt).
- „handlowiec” → sales rep; „dyspozytor” → dispatcher.

## Pola techniczne `en.md`

- `tlumaczenie: ai` (po przeczytaniu przez Roberta albo native speakera: `sprawdzone`).
- `zrodlo`: wynik `npx tsx skrypty/skrot.ts <ścieżka do pl.md>`. Bez tego pola EN ma stan `do-aktualizacji`.
- Pola niebędące tekstem (`ikona`, `plyta`, `kolejnosc`, `stan`, `email`, `linkedinUrl`, `skanUrl`, `zgoda`, `data`) kopiujesz bez zmian.

## Prośba do korektora

Hello, this text was translated from Polish. Please read it as if it were going on your own website:
does anything sound unnatural, stiff, or translated? Highlight those passages and suggest how you would
put them. The numbers and tool names are already checked. Thank you.

## Źródła

- Microsoft English (United States) Localization Style Guide (aka.ms/styleguides), rozdziały 2 i 4.
- AP Stylebook: liczby od jednego do dziewięciu słownie.
- Zasady ogólne: pakiet `/tlumacz` (`references/jezyki/en.md`, wersja en-GB z 22.10.2026), bez słowników klientów.
