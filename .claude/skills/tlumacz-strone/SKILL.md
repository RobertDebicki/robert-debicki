---
name: tlumacz-strone
description: Tłumaczy treść strony z pl.md na en.md (en-US) dla pozycji bez angielskiej wersji albo z nieaktualnym tłumaczeniem, sprawdza fakty skryptem i commituje z wpisem w CHANGELOG. Użyj po wpisaniu /tlumacz-strone albo gdy Robert prosi o angielską wersję wdrożeń, projektów, referencji, wpisów lub ustawień strony. Nigdy nie pushuje.
---

# /tlumacz-strone: angielska wersja treści strony

Tłumaczysz pliki `pl.md` z `src/content/` na `en.md` w amerykańskim angielskim. Rozmawiasz z Robertem po polsku.
Niczego nie publikujesz: commit tak, push nigdy.

## Najważniejsza zasada

Tłumaczysz, nie piszesz. Każdy fakt z `pl.md` (liczba, kwota, data, nazwa narzędzia, branża, warunek) jest w `en.md`,
a niczego, czego nie ma w `pl.md`, nie dopisujesz. Klienta opisujesz branżą, jak w PL; nazw klientów nie ma i nie będzie.
Zdanie niejasne: zapytaj Roberta, zamiast zgadywać.

## Przebieg

### 1. Co jest do przetłumaczenia

```bash
npx tsx skrypty/stan-tlumaczen.ts
```

Do pracy bierzesz wiersze ze stanem `brak` (nie ma `en.md`) i `do-aktualizacji` (`pl.md` zmienił się po tłumaczeniu).
`ai` i `sprawdzone` zostawiasz. Jeśli Robert wskazał konkretne pozycje, tłumaczysz tylko je.
Przy `do-aktualizacji` porównaj `pl.md` z wersją z czasu tłumaczenia (`git log -p -- <folder>/pl.md`)
i zmień w `en.md` tylko to, co zmieniło się w PL. Przy `sprawdzone` uprzedź Roberta, że nadpiszesz poprawki korektora.

### 2. Zasady

Przeczytaj `narzedzia/tlumaczenie/jezyki/en.md` (en-US, typografia, kalki z polskiego) i `AGENTS.md` (zakazane treści).

### 3. Tłumaczenie

Dla każdej pozycji utwórz `en.md` obok `pl.md`:
- ten sam frontmatter; pola tekstowe przetłumaczone, pola techniczne (`ikona`, `plyta`, `kolejnosc`, `stan`, `email`,
  `linkedinUrl`, `skanUrl`, `zgoda`, `data`, `podpisZamazany`) skopiowane bez zmian;
- nazwy narzędzi w `stack` bez zmian; tłumaczysz tylko opisowe pozycje (np. „model językowy” → „language model”);
- na końcu frontmattera:
  ```yaml
  tlumaczenie: ai
  zrodlo: <wynik: npx tsx skrypty/skrot.ts <folder>/pl.md>
  ```
  Skrót liczysz z `pl.md` dokładnie w tej postaci, którą tłumaczyłeś. Nigdy `tlumaczenie: sprawdzone`: to ustawia
  Robert po przeczytaniu tekstu przez osobę z USA.
- treść pod frontmatterem (wpisy) tłumaczysz akapit po akapicie, z tymi samymi nagłówkami i linkami.

Po napisaniu przeczytaj `en.md` jeszcze raz jako rekruter z USA: czy brzmi naturalnie, czy nic nie przybyło i nic nie zginęło.

### 4. Kontrola

```bash
python3 narzedzia/tlumaczenie/kontrola_tlumaczenia.py --zrodlo <folder>/pl.md --tlumaczenie <folder>/en.md
npx tsx skrypty/stan-tlumaczen.ts      # pozycja ma teraz stan ai
npm run sprawdz:tresc                  # zakazane słowa i myślniki
```

`BŁĄD` poprawiasz w tłumaczeniu (nie w `pl.md` i nie w skrypcie). `UWAGA` rozważasz: zwykle to typografia do poprawy.
Na koniec `npm run sprawdz` (pełny łańcuch, w tym kontrola wszystkich par i build `/en/`).

### 5. Commit

Dopisz na górze `CHANGELOG.md` wpis w formacie projektu (`## RRRR-MM-DD GG:MM, Claude Code`, sekcje
**✅ Zrobione:**, **🚧 W toku / nie wdrożone:**, **🎯 Następny krok:**): które pozycje przetłumaczone, wynik kontroli,
co czeka na korektę native speakera. Commit `en.md` razem z `CHANGELOG.md`, komunikat po polsku,
np. „Tłumaczenie EN: voice-bot, sklep-b2b”. Nie pushujesz i nie wdrażasz.

### 6. Wynik dla Roberta

Napisz po polsku: które pozycje mają teraz EN, wynik kontroli, pytania o niejasne zdania i przypomnienie, że stan `ai`
zmienia się na `sprawdzone` dopiero po przeczytaniu tekstu przez osobę z USA (prośba do korektora jest na końcu
`narzedzia/tlumaczenie/jezyki/en.md`).

## Czego nie robisz

- Nie zmieniasz `pl.md` ani zasad w `jezyki/en.md`, żeby kontrola przeszła.
- Nie przeliczasz złotych na dolary i nie zaokrąglasz liczb.
- Nie dopisujesz efektów, metryk ani przymiotników, których nie ma w PL.
- Nie pushujesz, nie wdrażasz, nie czytasz `.env`.
