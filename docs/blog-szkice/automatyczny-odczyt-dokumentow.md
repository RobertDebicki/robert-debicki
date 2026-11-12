---
tytul: "Automatyczny odczyt dokumentów przez AI"
data: 2026-10-28
zajawka: "Automatyczny odczyt dokumentów przez AI: setki wniosków trafia do jednej bazy, a niepewne odczyty sprawdza człowiek. Napisz, co masz do przepisywania."
---
**Automatyczny odczyt dokumentów** oszczędza czas wszędzie tam, gdzie ktoś przepisuje kwoty i terminy z PDF do tabeli. Opisuję wdrożenie, w którym system codziennie czyta setki wniosków i zapisuje dane w jednej bazie. Pokazuję też, co się dzieje, gdy odczyt jest niepewny. Przepisujesz dokumenty ręcznie? Napisz do mnie.

## Problem: dane w plikach i brak wspólnej bazy

Zespół, dla którego pracowałem, wyciągał dane z wniosków o dofinansowanie dla gmin ręcznie. Dokumenty przychodziły mailem i leżały na SharePoincie. Zespół nie miał wspólnej bazy danych.

## Jak działa automatyczny odczyt dokumentów

System działa w czterech krokach:

1. Pobiera dokumenty z poczty i SharePointa, codziennie.
2. Odczytuje je przez OCR razem z modelem językowym.
3. Wyciąga kwoty, terminy i dane kontrahentów.
4. Zapisuje dane w Airtable i przypisuje opiekuna wniosku.

Całość stoi na n8n. Do odczytu używam modelu Gemini.

## Co z odczytem, którego system nie jest pewny

Model językowy może się pomylić, a pomyłka w kwocie kosztuje. Dlatego gdy odczyt jest niepewny, system prosi wskazaną osobę o potwierdzenie.

Dzięki temu automatyzacja nie udaje nieomylnej. Pewne odczyty idą same, niepewne trafiają do człowieka.

## Co zmienia się dla zespołu

Automatyczny odczyt dokumentów zdejmuje z zespołu przepisywanie. Zespół ma jedną bazę zamiast folderów z plikami. System przypisuje opiekuna do każdego wniosku. Nie podaję tu liczby zaoszczędzonych godzin, bo nie mam zmierzonej wartości. Wiem natomiast, że proces obsługuje setki wniosków i działa codziennie.

## Pytania i odpowiedzi

### Czy automatyczny odczyt dokumentów obejmuje każdy typ?
Nie. Najlepiej radzi sobie z dokumentami o powtarzalnym układzie, jak wnioski, faktury czy umowy. Skany słabej jakości częściej trafiają do potwierdzenia przez człowieka.

### Co jeśli system źle odczyta kwotę?
Przy niepewnym odczycie system pyta człowieka. Gdy odczyt wygląda na pewny, kwoty okresowo sprawdzaj wyrywkowo.

### Czy muszę zmieniać program, którego używam?
Zwykle nie. W opisanym wdrożeniu system pobiera dokumenty z poczty i SharePointa, a dane zapisuje w Airtable.

### Ile kosztuje takie wdrożenie?
Cena zależy od liczby typów dokumentów i miejsc zapisu. Napisz, jakie dokumenty przepisujesz, a podam wycenę.

### Czy dane z dokumentów są bezpieczne?
To zależy od wybranych usług i umów z ich dostawcami. Przed wdrożeniem ustalam z Tobą, gdzie dane mogą trafiać. Przy danych osobowych to ważne ze względu na RODO.
