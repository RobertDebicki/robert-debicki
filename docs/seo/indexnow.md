# IndexNow (Bing, Yandex, Seznam i inne), od 27.11.2026

Wzór: wdrożenie IndexNow u innego klienta (27.11). Bing indeksuje nowe strony szybciej po zgłoszeniu IndexNow, a z indeksu Binga korzysta wyszukiwarka w ChatGPT. Google nie obsługuje IndexNow, dla Google bez zmian (mapa w Search Console).

- Plik klucza: `public/d9bb7b1cd4a874f455321b207af337d9.txt` (treść = klucz bez znaku nowej linii, stała `KLUCZ` w `src/lib/indexnow.ts`). Musi być na serwerze, skrypt to sprawdza przed wysyłką.
- Po każdym wgraniu z nowymi lub zmienionymi stronami: `npx tsx skrypty/indexnow.ts` (cała mapa witryny). Oczekiwana odpowiedź: 200 albo 202.
- Mapa to `sitemap-index.xml` z Astro (indeks z mapami podrzędnymi, bez `<lastmod>`), więc nie ma trybu „ostatnie 7 dni”. Bez argumentów idzie cała mapa (38 adresów 27.11). `/admin/` nie jest w mapie.
- Wybrane adresy: `npx tsx skrypty/indexnow.ts https://robert-debicki.pl/adres/ ...`. Skrypt sprawdza tylko domenę, nie `noindex`. `--sucho` tylko wypisuje.
- Pusta mapa, mapa z błędem HTTP, adres spoza `robert-debicki.pl` albo nieznana flaga kończą skrypt kodem 1 bez wysyłki.
- Test: `testy/jednostkowe/indexnow.test.ts`.
