# Zasady DNK dla robert-debicki.pl

Źródło: master prompt analizatora DNK (16.11.2026), lista zasad, za które jego panel daje 100 punktów.
Decyzja Roberta 16.11: celujemy w 100, przy kolizji z dawnymi regułami wygrywa DNK, ale nie z twardymi zasadami
`AGENTS.md` (fakty, klienci, zakres). `skrypty/dnk.ts` sprawdza wszystko, co da się zmierzyć w pliku.

## Wpis na bloga

| Zasada | Próg | Gdzie w pliku |
|---|---|---|
| Tytuł strony | 40 do 58 znaków z „ \| Robert Dębicki”, zaczyna się od frazy głównej | `tytul` (szablon dokleja markę), więc `tytul` ma 24 do 42 znaki |
| Opis w Google | 125 do 150 znaków, fraza, jedna prawdziwa liczba, jedno z: zadzwoń, napisz, wyślij, zapytaj, wyceń, sprawdź, zobacz, zamów | `zajawka` |
| H1 | jeden, z frazą główną | `tytul`; w treści nie ma `#` |
| H2 | 4 do 6 razem z nagłówkiem FAQ, jeden z frazą główną albo dodatkową; bez „Wstęp” i „Podsumowanie”; H3 tylko pod H2, bez H4 | treść |
| Wstęp | 2 do 4 zdań przed pierwszym H2: co robisz, dla kogo, co zrobić teraz; pierwsze zdanie z pogrubioną frazą `**fraza**` | treść |
| Fraza główna | 4 do 6 razy z odmianą, licząc H1, nagłówki i FAQ | całość |
| Frazy dodatkowe | każda 1 do 3 razy | całość |
| Linki | 1 albo 2 w treści, do innych stron serwisu (`/uslugi/…/`, `/wpisy/…/`), anchor 2 do 5 słów mówiący, dokąd prowadzi; e-mail i telefon bez linku | treść |
| Zdjęcia | 2 do 4 na stronie; w treści osobna linia `![alt](/src/assets/wpisy/plik.png)`, a w następnej podpis kursywą `*…*`; alt 30 do 110 znaków, opisuje to, co widać, nie zaczyna się od „Zdjęcie”, „Obraz”, „Foto”, każdy inny | treść, pole `zdjecia` (szablon rysuje je pod treścią, bez podpisu) |
| FAQ | ostatnia sekcja H2: `## Najczęstsze pytania o [fraza w bierniku]`, pod nią 5 do 7 pytań `### …?`, odpowiedź od konkretu („Tak.”, „Zwykle kilka dni.”), 1 do 3 zdań | treść |
| Wezwanie | ostatni akapit po FAQ, do 200 znaków, zaczyna się pogrubieniem z e-mailem: `**Napisz do mnie: office@robert-debicki.pl** i …` | treść |
| Zdania | średnio 12 do 18 słów, żadne ponad 28 | całość |
| Znaki | bez myślnika i półpauzy w zdaniu, bez średnika | całość |
| Długość | w środku zakresu konkurencji z panelu; bez danych 700 do 1000 słów | całość |
| Słowa z panelu | każde tyle razy, ile podaje zakres, z odmianą; słowo nieprawdziwe dla Roberta pomijasz i mówisz o tym | całość |

Panel szuka tych ciągów liter wszędzie, także w środku słów: warto (też „wartość”), kluczow, w dzisiejszych czasach,
podsumow, reasumując, oto (też „gotowe”, „otoczenie”, „foto”), poniżej, dla jasności, po ludzku, co ważne, co ciekawe,
nie tylko, kompleksow, szeroki wybór, najwyższej jakości, idealne rozwiązanie, idealnym rozwiązaniem, doskonał, niezawodn,
innowacyj, zapraszamy do, nie czekaj, gwarantujemy satysfakcję. Bez zapowiadania treści („w tym artykule”).

## Strona usługi

Szablon (`src/components/StronaUslugi.astro`) ma stałe sekcje, więc część zasad działa inaczej:

| Zasada | Na stronie usługi |
|---|---|
| Tytuł strony | `tytulSeo`, 40 do 58 znaków, od frazy, z „ \| Robert Dębicki” |
| Opis | `opis`, jak we wpisie |
| H1 | `tytul`, z frazą |
| H2 | cztery stałe: `problemy.tytul`, `kroki.tytul`, `przyklady.tytul`, `faq.tytul`; jeden z frazą |
| Wstęp | `lead` i `akapit`, razem 2 do 4 zdań, fraza w pierwszym zdaniu `lead` (pogrubienia szablon nie pokazuje) |
| FAQ | `faq.tytul` = „Najczęstsze pytania o [fraza]”, 5 do 7 pozycji, odpowiedź 1 do 3 zdań |
| Linki | `przyklady.pozycje[].link`, najlepiej 1 albo 2 |
| Brak w szablonie | zdjęcia, pogrubiona fraza, wezwanie po FAQ: kontrola daje uwagę; zmiana szablonu to decyzja Roberta |

## Karta wdrożenia i projektu

Bez frazy i analizatora (to karty na stronie głównej, nie osobne strony). Obowiązują twarde zasady z `SKILL.md`, krótkie
zdania i brak waty. `liczba` w karcie wdrożenia tylko zmierzona albo podana przez Roberta (np. „setki”, gdy dokładnej nie ma).
