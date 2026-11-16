# Formaty plików

Schematy: `src/lib/schematy.ts` (build zatrzymuje plik niezgodny ze schematem). Folder na pozycję:
`src/content/<kolekcja>/<adres>/pl.md`, angielska wersja `en.md` obok (robi ją `/tlumacz-strone`).

## Wpis (`wpisy`)

```markdown
---
tytul: "Fraza główna i dopowiedzenie"
data: 2026-11-16
zajawka: "Opis w Google, 125 do 150 znaków, z frazą, liczbą i wezwaniem."
miniatura:
  plik: "/src/assets/wpisy/<adres>-miniatura.png"
  alt: "Opis miniatury na liście wpisów"
---
**Fraza główna** w pierwszym zdaniu wstępu. …

## Nagłówek z frazą

…

![Alt 30 do 110 znaków](/src/assets/wpisy/<adres>-1.png)

*Podpis kursywą.*

## Najczęstsze pytania o [fraza w bierniku]

### Pytanie?
Odpowiedź od konkretu.

**Napisz do mnie: office@robert-debicki.pl** i …
```

`miniatura` jest opcjonalna (lista `/wpisy/` i obraz przy udostępnianiu, nie liczy się do zdjęć na stronie). Pole
`zdjecia` (lista `plik` i `alt`) szablon rysuje pod treścią, bez podpisu; zdjęcia z podpisem wstawiaj w treści.
Wzór gotowego wpisu: `src/content/wpisy/automatyczny-odczyt-dokumentow/pl.md` (sprzed zasad DNK z 16.11: ma stary
nagłówek FAQ i wezwanie w ostatniej odpowiedzi).

## Usługa (`uslugi`)

Pola: `tytul` (H1), `nazwa` (karta, okruszki), `tytulSeo`, `opis` (120 do 155 w schemacie, DNK chce 125 do 150),
`zajawka` (karta na stronie głównej), `ikona` (`ai`, `aplikacje`, `telefon`, `dokument`), `sektor`, `rola`,
`rolaWyroznienie`, `lead`, `akapit`, `karta` (lista `etykieta`, `wartosc`), `problemy` (`tytul`, `wstep`, `pozycje`),
`kroki` (`tytul`, `pozycje`), `przyklady` (`tytul`, `pozycje` z `ikona`, `sektor`, `tytul`, `tekst`, `stos`, opcjonalnie
`liczba`, `liczbaOpis`, `link` z `tekst` i `adres`; co najmniej jeden przykład), `faq` (`tytul`, `pozycje` z `pytanie`
i `odpowiedz`, co najmniej 3, DNK chce 5 do 7), `kolejnosc`. Bez treści Markdown pod nagłówkiem.
Wzór: `src/content/uslugi/ai-i-automatyzacja/pl.md`. `adresEn` tylko w `en.md`.

## Wdrożenie (`wdrozenia`)

Pola: `tytul`, `branza` (branża, nigdy nazwa klienta), `liczba` i `podpisLiczby` (wynik, tylko prawdziwy), `opis`
(problem, co zbudowane, jak działa), `stack` (lista narzędzi), `ikona` (`naczepa`, `kalendarz`, `powrot`, `sluchawka`,
`dokument`, `wykres`), `plyta` (`pomarancz`, `czerwien`, `zolty`), `kolejnosc`. Wzór: `src/content/wdrozenia/obieg-wnioskow/pl.md`.

## Projekt (`projekty`)

Pola: `tytul`, `branza`, `opis`, `stack`, `etap` (np. „Przed publikacją”), `stan` (`w-toku` albo `produkcja`),
`kolejnosc`. Wzór: `src/content/projekty/sklep-b2b/pl.md`.
