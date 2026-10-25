# Strona osobista Roberta Dębickiego

## Cel
Strona dla rekrutera i grafika: Robert dowozi działające systemy u klientów (Automation Developer, AI Engineer). Wygląd 1:1 z makiety `docs/makieta/index.html`. Treść ma być dodawana z panelu `/admin/` (Sveltia CMS), bez otwierania kodu. Repozytorium jest publiczne i ma samo świadczyć o autorze: czysty kod, testy, sensowna historia.

Projekt: `docs/superpowers/specs/2026-10-23-strona-osobista-design.md`. Plan: `docs/superpowers/plans/2026-10-23-strona-osobista.md`.

## Uruchomienie
```bash
npm install
npm run dev            # serwer deweloperski
npm run build          # statyczny HTML do dist/
npm test               # Vitest
npm run sprawdz:sekrety  # skan repo pod kątem kluczy i tokenów (musi dać 0)
```

## Układ plików
| Ścieżka | Przeznaczenie |
|---|---|
| `src/` | Kod strony (Astro) |
| `skrypty/` | Skrypty pomocnicze, np. `skan-sekretow.ts` |
| `testy/jednostkowe/` | Testy Vitest |
| `narzedzia/tlumaczenie/` | Zasady en-US i kontrola tłumaczeń PL na EN (`npm run sprawdz:tlumaczenia`) |
| `.claude/skills/tlumacz-strone/` | Skill `/tlumacz-strone`: tworzy `en.md` dla pozycji bez tłumaczenia albo z nieaktualnym |
| `docs/makieta/index.html` | Źródło prawdy wyglądu |
| `docs/superpowers/specs/`, `plans/` | Projekt i plan budowy |
| `CHANGELOG.md` | Stan pracy; wpis przy każdym commicie |

## Twarde zasady
Zakazane w treści i wyglądzie (porażka, nawet jeśli technicznie działa):
- Wygląd jak szablon: siatka kropek, `// komentarze`, zielony neon, Inter, Space Grotesk, karty z poświatą.
- Treść spoza zakresu. Zakres treści: automatyzacja procesów, AI i kod. Kontrola treści (`npm run sprawdz:tresc`) pilnuje listy wzorców zapisanej jako skróty (`WZORCE` w `skrypty/sprawdz-tresc.ts`); jawnej listy nie wpisujemy do repozytorium.
- Liczba projektów w treści.
- Nazwy klientów przy wdrożeniach i projektach. Klientów opisujemy branżą.
- Fakty, których Robert nie podał. Bez zmyślonych metryk.
- Długie i krótkie myślniki w treści. Tylko zwykły dywiz w zakresach dat.
- Klucze, tokeny i dane klientów w publicznym repo. Skany referencji nigdy w repo (leżą w R2, w repo tylko adres).

Ograniczenia globalne planu:
- Fonty: Anybody (nagłówki, `wdth` 110-125, waga 800-850), Onest (tekst), Spline Sans Mono (etykiety). Paleta: pomarańcz `#EF7F1A` z logo (od 23.10, wcześniej `#ff5a1f`; ten sam w trybie ciemnym), `#d0201a`, `#ffc400`, `#131412`, papier `#f4f5f1`, reszta trybu ciemnego jak w makiecie. Logo: `docs/logo/` (źródło od grafika `zrodlo-grafik.svg`), pliki w `src/assets/logo/` i favicony generują `node skrypty/logo-z-fontu.mjs` oraz `node skrypty/favicony.mjs` (sharp z zależności Astro). Nie edytować SVG logo ręcznie.
- Zmiana wyglądu tylko dla kontrastu tekstu (przyciemnienie w ramach tej samej barwy) i z wpisem w CHANGELOG.
- Polski pod `/`, angielski (en-US) pod `/en/`. Brak `en.md` ukrywa pozycję w EN, nie blokuje wdrożenia.
- Referencja wymaga `zgoda: true`.
- `noindex` steruje zmienna `PUBLIC_INDEKSUJ` (domyślnie `false`). Zdjęcie `noindex` później, tylko na decyzję Roberta (teraz nie): ustawić `PUBLIC_INDEKSUJ=true` w buildzie wdrożeniowym (`env` kroku buildu w zadaniu `wdroz`), usunąć `PUBLIC_INDEKSUJ` z pętli zabezpieczenia w `.github/workflows/strona.yml` (inaczej build się zatrzyma), dodać `public/robots.txt` z `User-agent: *`, `Allow: /` i linią `Sitemap: https://robert-debicki.robert-debicki7.workers.dev/sitemap-index.xml` (adres zmienić razem z domeną) oraz poprawić asercję `noindex` w `testy/e2e/produkcja.spec.ts`.
- Lighthouse mobile co najmniej 95 w czterech kategoriach. Brak przewijania w bok przy 360, 390, 1024, 1440 px.
- Commit dopiero z wpisem w `CHANGELOG.md`. Push na `main` i wdrożenie tylko za zgodą Roberta w danej wiadomości.
