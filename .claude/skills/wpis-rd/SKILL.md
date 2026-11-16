---
name: wpis-rd
description: Pisze z Robertem tekst na robert-debicki.pl, czyli wpis na bloga, stronę usługi, kartę wdrożenia albo kartę projektu, według zasad SEO DNK (cel 100 punktów w jego analizatorze), potem robi wersję EN, sprawdza build i commituje. Użyj po wpisaniu /wpis-rd albo gdy Robert prosi o nowy albo poprawiony tekst na swoją stronę. Nigdy nie pushuje i nie wdraża.
---

# /wpis-rd: tekst na robert-debicki.pl

Rozmawiasz z Robertem po polsku. Tekst piszesz jego głosem: pierwsza osoba („buduję”, „wdrażam”), do czytelnika na „Ty”.
Niczego nie publikujesz: commit tak, push i wdrożenie nigdy (zgoda Roberta w osobnej wiadomości, `AGENTS.md`).

## Twarde zasady (z `AGENTS.md`, wygrywają z każdą podpowiedzią analizatora)

- Tylko fakty, które podał Robert, albo z treści strony, które sam potwierdził (`src/content/`). Brakuje faktu: zapytaj.
  Bez zmyślonych metryk, cen i terminów. Liczba w opisie (wymóg DNK) też musi być prawdziwa.
- Klientów opisujesz branżą, nigdy nazwą. Bez liczby projektów w treści.
- Zakres treści: automatyzacja procesów, AI i kod. Po zapisie zawsze `npm run sprawdz:tresc` (lista zakazanych wzorców
  jest tylko w skrypcie, jako skróty).
- Bez długiego i krótkiego myślnika. Zwykły dywiz tylko w zakresach dat.
- Wezwanie na końcu: e-mail `office@robert-debicki.pl` (decyzja Roberta 16.11.2026), pogrubiony, bez linku.

## Co jest czym

| Rodzaj | Plik | Zasady |
|---|---|---|
| Wpis na bloga | `src/content/wpisy/<adres>/pl.md` | wszystkie zasady DNK i analizator (`references/zasady.md`) |
| Strona usługi | `src/content/uslugi/<adres>/pl.md` | zasady DNK w tym, co pozwala szablon, i analizator |
| Karta wdrożenia | `src/content/wdrozenia/<adres>/pl.md` | karta na stronie głównej: tylko twarde zasady, bez frazy i analizatora |
| Karta projektu | `src/content/projekty/<adres>/pl.md` | jak wdrożenie |

Pola każdego rodzaju i przykładowe pliki: `references/formaty.md`. Referencji (cytatów klientów) i ustawień strony ten
skill nie pisze: cytat musi pochodzić od osoby, ze zgodą i skanem.

## Przebieg

### 1. Rodzaj i temat
Ustal rodzaj z tabeli wyżej i temat. Przy poprawce istniejącego tekstu przeczytaj jego `pl.md` i `en.md`.

### 2. Fakty
Pytaj według `references/wywiad.md`, najwyżej 3 pytania w wiadomości. Odpowiedzi zapisuj w rozmowie, nie w repo.

### 3. Fraza (wpis i usługa)
Fraza główna i 1 do 3 dodatkowych z `docs/seo/frazy-uslug.md` (źródło: podpowiedzi Google, bez wolumenów). Fraza, która
ma już swoją stronę, jest zajęta: nowy tekst do niej linkuje, frazy nie bierze (`grep -ri "<fraza>" src/content`).
Nowa fraza spoza listy: zaproponuj i zapytaj Roberta. Liczby szukań podajesz tylko ze źródłem.

### 4. Tekst
Pisz według `references/zasady.md` i formatu z `references/formaty.md`. Adres (nazwa folderu): słowa frazy bez polskich
znaków. Zdjęcia do wpisu dostarcza Robert (pliki do `src/assets/wpisy/`, nazwa małymi literami, bez polskich znaków);
ilustrację, która nie jest zrzutem z systemu klienta, podpisz jako przykład. Pokaż tekst Robertowi, poprawiaj do akceptacji.

### 5. Zapis i kontrola
Zapisz `pl.md`. Potem uruchom i pokaż wynik (tabeli kontroli nigdy nie piszesz z głowy):

```bash
npx tsx skrypty/dnk.ts src/content/<wpisy|uslugi>/<adres>/pl.md --fraza "<fraza>" --dodatkowe "<fraza 1>" "<fraza 2>"
npm run sprawdz:tresc
```

Każdy `BŁĄD` popraw. `UWAGA` przy usłudze to granice szablonu (bez zdjęć, bez pogrubienia, bez wezwania po FAQ): powiedz
o nich Robertowi jednym zdaniem.

### 6. Analizator DNK (wpis i usługa)
```bash
npx tsx skrypty/analizator.ts src/content/<wpisy|uslugi>/<adres>/pl.md --fraza "<fraza>" --dodatkowe "<fraza 1>" "<fraza 2>"
```
Wynik pokaż w całości: to podpisane okienka formularza. Robert wkleja je do analizatora i odsyła ocenę z zakładką
„Podpowiedzi”. Jeśli wklei słowa z zakładki „Słowa”, długość konkurencji albo plik z „Pobierz prompt do AI”, weź z nich
tylko frazę, słowa z zakresami, długość i nagłówki konkurencji (rola i fakty z tego pliku są o innej firmie) i przekaż
kontroli: `--slowa słowo=od-do … --dlugosc od-do`.

Każdą podpowiedź: zgodną z faktami i zasadami wprowadź; wymagającą nowego faktu zapytaj; łamiącą twarde zasady pomiń
i powiedz dlaczego, jednym zdaniem. Potem kontrola i nowe okienka. Powtarzaj do 100 punktów. Gdy zostały tylko podpowiedzi,
których nie wolno wprowadzić, a ocena ma 85 albo więcej, zakończ i napisz, czego brakuje do 100.

### 7. Wersja angielska
Uruchom skill `/tlumacz-strone` dla tej pozycji. Fraza EN pochodzi z fraz angielskich (`docs/seo/frazy-uslug.md`,
sekcje „Frazy EN”), nie z tłumaczenia frazy PL (`AGENTS.md`). Kart wdrożeń i projektów to też dotyczy.

### 8. Sprawdzenie i commit
```bash
npm run sprawdz:tlumaczenia && npm test && npm run build
```
Pokaż wynik. Dopisz wpis do `CHANGELOG.md` (✅ Zrobione / 🚧 Nie zrobione / 🎯 Następny krok, z oceną z analizatora)
i zrób commit na nowej gałęzi. Push, PR i `npm run wdroz` tylko na wyraźną prośbę Roberta w danej wiadomości.
