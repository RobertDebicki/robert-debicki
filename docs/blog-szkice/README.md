# Szkice wpisów na bloga

Pięć wpisów opublikowanych 12.11 w `src/content/wpisy/` (daty wstecz 14.10 do 11.11). **Źródłem treści jest teraz panel `/admin/` i `src/content/wpisy/`**, nie te szkice. Szkice i makieta (`podglad/`) zostają jako historia i do odtworzenia grafik: `generuj.py` → `zrzuty.mjs` (PNG do `src/assets/wpisy/`) → `eksport.py` (nie nadpisuje istniejących wpisów bez `--nadpisz`).

| Plik | Fraza główna | Źródła zewnętrzne |
|---|---|---|
| ai-act-dla-malej-firmy.md | AI Act dla małej firmy | Prawo.pl 11.08.2026, iFirma (art. 50, terminy, kary) |
| ile-firm-uzywa-ai.md | automatyzacja procesów w firmie | podatki.biz (GUS 8,7% za 2025, Eurostat, PIE); liczby z wdrożeń z `src/content/wdrozenia` |
| automatyczny-odczyt-dokumentow.md | automatyczny odczyt dokumentów | wdrożenie „obieg wniosków” (`src/content/wdrozenia`) |
| voice-bot-dla-firmy.md | voice bot dla firmy | wdrożenie „voice bot” (`src/content/wdrozenia`), AI Act jak wyżej |
| n8n-make-czy-zapier.md | n8n, Make czy Zapier | digidop.com (blog dostawcy, ceny celowo pominięte) |

## Weryfikacja faktów (11.11.2026)
✅ potwierdzone w źródle · ⚠️ uogólnienie bez źródła, do decyzji Roberta. Źródła zewnętrzne czytane narzędziem, które streszcza stronę; cytatów dosłownych nie porównywano.

- AI Act: daty (02.02.2025, 02.08.2026, 02.12.2026, 02.12.2027, 02.08.2028), wytyczne KE z 20.07.2026, kara 15 mln € albo 3%, niższy limit dla MŚP, brak obowiązku rejestru: ✅ Prawo.pl. Informacja przy pierwszym kontakcie, opis produktu bez automatycznego obowiązku: ✅ iFirma. Tekstu art. 50 nie czytano.
- GUS 8,7%, 5,3%, 2,1%; Eurostat PL 8,36%, UE 19,95%, małe 17,13%, średnie 30,36%, duże 55,03%; PIE 77%: ✅ podatki.biz (źródło wtórne, publikacji GUS nie otwarto).
- Zapier: wyzwalacz nie zużywa zadań, każda akcja to 1 zadanie: ✅ help.zapier.com. Make: wyzwalacz to 1 operacja, każdy moduł to operacja: ✅ help.make.com. n8n liczy uruchomienie całego scenariusza, ok. 1000 integracji, Make i Zapier bez własnego serwera: ✅ Digidop. Zapier 10 496+ aplikacji: ✅ zapier.com/apps; Make 3500+: ✅ make.com/integrations.
- Liczby i opisy wdrożeń: ✅ karty w `src/content/wdrozenia` (fakty podane przez Roberta).
- ⚠️ „Porównania opisują Zapiera jako najprostszy”, „Make: edytor graficzny, kompromis”: z wyników wyszukiwania (blogi), bez jednego źródła.
- ⚠️ FAQ odczytu dokumentów: „najlepiej radzi sobie z powtarzalnym układem”, „skany słabej jakości częściej trafiają do potwierdzenia”: wiedza ogólna.
- ⚠️ Voice bot: „Bot nie sprzedaje i nie negocjuje”: wniosek z opisu wdrożenia, do potwierdzenia.
- ⚠️ Makieta ekranu „Zatwierdź / Popraw” i notatki w CRM: ilustracje, nie zrzuty. Podpisane jako przykład.

Poprawione 11.11 po weryfikacji: Zapier i Make „ponad 8000 / około 3000” (błędne, oficjalnie 10 000+ / 3500+); „scenariusz z 5 kroków = 5 zadań w Zapierze” (błędne, wyzwalacz nie zużywa zadań: 4 zadania, Make 5 operacji); „AI najczęściej służy do” (źródło nie mówi „najczęściej”); ALT „28 klientów odzyskanych” (karta mówi „ponad ręczną listę”); zdania dopisane bez źródła: opiekun widzi dokument obok danych, szukanie w plikach, „dodanie zdania to mała zmiana”, „pomyłka wychodzi po roku”, „najtańszy bywa n8n”.

## Reguły DNK zastosowane do bloga Roberta
Sprawdzone skryptem: tytuł ze znacznikiem marki 30 do 60 znaków, opis 120 do 155, jeden H1 z szablonu strony, minimum 3 H2, fraza pogrubiona we wstępie, fraza 3 do 6 razy, 5 pytań FAQ, brak myślników i waty. Nie dotyczy: ALT (wpisy bez zdjęć), analizator ocen 0 do 100 (zakładka z innego systemu, niedostępna tutaj).
