# Panel strony: instrukcja

Panel to strona pod adresem `/admin/` (pełny adres w sekcji Logowanie). Zapisuje treść jako pliki w repozytorium na GitHubie. Każdy zapis w panelu to commit na gałęzi `main`, a po nim strona buduje się i wdraża sama.

Stan na 23.10.2026: konfiguracja panelu jest gotowa w repozytorium, ale logowanie przez GitHub i magazyn na skany jeszcze nie są ustawione. Sekcje oznaczone "do uzupełnienia po konfiguracji" zawierają kroki, których wartości jeszcze nie istnieją.

## Co jest w panelu

| Kolekcja | Co to jest |
|---|---|
| Wdrożenia | Systemy z sekcji wdrożeń na stronie głównej |
| Projekty | Karty projektów z pieczątką etapu |
| Referencje | Listy od klientów (skan w magazynie, cytat i dane osoby) |
| Wpisy | Artykuły i notatki ze zdjęciami |
| Ustawienia strony głównej | Teksty otwarcia, karty zlecenia, doświadczenia, narzędzi i kontaktu |

Każda pozycja ma wersję polską i angielską. Piszesz po polsku. Angielską robi polecenie w Claude Code (sekcja Tłumaczenie).

## Logowanie (do uzupełnienia po konfiguracji)

Logowanie idzie przez konto GitHub `RobertDebicki`, za pośrednictwem małego Workera na Cloudflare (`sveltia-cms-auth`) i aplikacji OAuth na GitHubie.

Do uzupełnienia po konfiguracji:
- adres panelu,
- adres Workera logowania (ustawiany w zmiennej `PUBLIC_PANEL_LOGOWANIE` przy budowie strony),
- kroki tworzenia aplikacji OAuth na GitHubie i Workera (klik po kliku),
- gdzie wpisać identyfikator i sekret aplikacji (tylko w Cloudflare, nigdy w repozytorium).

Gdy to będzie ustawione, logowanie wygląda tak:
1. Wejdź na adres panelu i kliknij "Zaloguj się przez GitHub".
2. Przy pierwszym razie GitHub zapyta o zgodę dla aplikacji. Zatwierdź.
3. Po zalogowaniu widzisz listę kolekcji po lewej stronie.

## Dodanie wpisu

1. W menu po lewej wybierz **Wpisy**, potem **Nowy wpis**.
2. Wypełnij pola: tytuł, data publikacji, zajawka (jedno lub dwa zdania na liście wpisów).
3. Treść wpisu pisz w polu "Treść wpisu". Śródtytuły robisz znakami `##`.
4. Zdjęcia: w polu "Zdjęcia" kliknij dodanie zdjęcia, wybierz plik. Pole **Opis zdjęcia (alt)** jest obowiązkowe i musi mieć co najmniej 5 znaków. Opisz jednym zdaniem, co widać na zdjęciu. Bez opisu panel nie pozwoli zapisać wpisu, a gdyby zapis się udał, budowa strony zatrzyma się z komunikatem.
5. Kliknij **Zapisz**. Panel tworzy commit, a strona buduje się kilka minut. Wpis pojawi się na liście wpisów.

Zdjęcia trafiają do repozytorium (folder `src/assets/wpisy/`). Wgrywaj zdjęcia nie cięższe niż 15 MB. Nie wgrywaj tam skanów listów od klientów.

## Dodanie projektu (albo wdrożenia)

1. Wybierz **Projekty** (albo **Wdrożenia**), potem nowy wpis.
2. Wypełnij pola. Klienta opisuj branżą, nie nazwą. Opis ma pokazać problem klienta, co zbudowałeś i efekt.
3. Narzędzia dodajesz po jednym w polu "Narzędzia".
4. Pole "Kolejność": 1 to pierwsza pozycja na liście.
5. Kliknij **Zapisz**.

## Dodanie referencji ze zgodą klienta

Referencja to list od klienta. Strona pokazuje skan listu i jedno zdanie cytatu.

1. Zanim cokolwiek wgrasz, upewnij się, że klient zgodził się na publikację listu razem z nazwą swojej firmy.
2. Zamaż podpis na skanie, zanim go wgrasz.
3. Wgraj skan do magazynu (R2), nie do repozytorium. Panel nie wgrywa skanów do repozytorium. Do uzupełnienia po konfiguracji: dokładny sposób wgrania skanu i skopiowania jego adresu.
4. W panelu wybierz **Referencje**, potem nowy wpis. Wpisz cytat, imię i nazwisko, funkcję, firmę i datę listu.
5. W polu "Adres skanu listu (R2)" wklej pełny adres https skanu. Panel przyjmie tylko adres z magazynu R2 (końcówka `.r2.dev` albo `.r2.cloudflarestorage.com`).
6. Zaznacz **Klient zgodził się na publikację**. To pole jest obowiązkowe: bez zaznaczenia strona się nie zbuduje. Zaznacz też, czy podpis na skanie jest zamazany.
7. Kliknij **Zapisz**.

## Magazyn na skany R2 (do uzupełnienia po konfiguracji)

Skany listów leżą w magazynie Cloudflare R2, a w repozytorium jest tylko ich adres. Do uzupełnienia po konfiguracji: założenie magazynu, włączenie adresu publicznego, sposób wgrywania plików.

## Tłumaczenie na angielski

Panel zapisuje tylko wersję polską (`pl.md`). Wersję angielską tworzy polecenie w Claude Code:

1. Otwórz Claude Code w folderze projektu `robert-debicki`.
2. Wpisz `/tlumacz-strone`.
3. Polecenie sprawdza, które pozycje nie mają angielskiej wersji albo mają ją nieaktualną (po zmianie polskiej), tłumaczy je, sprawdza liczby i nazwy skryptem i robi commit. Niczego nie publikuje.
4. Wypchnięcie zmian na GitHub (a więc wdrożenie) robisz osobno, świadomie.

Co warto wiedzieć:
- Pozycja bez wersji angielskiej widnieje tylko po polsku. Nie blokuje to wdrożenia.
- Gdy po tłumaczeniu zmienisz polski tekst, angielska wersja zostaje na stronie, ale dostaje stan "do aktualizacji". Uruchom `/tlumacz-strone` ponownie.
- Pól "tlumaczenie" i "zrodlo" w panelu nie widać. Ustawia je polecenie, nie ty.

## Gdy coś nie działa

- Panel nie pozwala zapisać: popraw pole podświetlone na czerwono (brak opisu zdjęcia, brak zgody, zły adres skanu).
- Zapis się udał, ale strona się nie zmieniła: budowa mogła się zatrzymać. Komunikat po polsku mówi, który plik i które pole poprawić. Znajdziesz go w zakładce Actions repozytorium na GitHubie.
