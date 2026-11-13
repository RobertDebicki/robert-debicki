# Strona osobista Roberta Dębickiego

> Kryteria przeglądu zmian: `REVIEW.md` w tym folderze. Czytaj przed każdym przeglądem.

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
npm run wdroz -- --na-sucho   # hosting home.pl (FTPS): lista plików; też --lista, --wgraj (tylko za zgodą Roberta w danej wiadomości)
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
- `noindex` steruje zmienna `PUBLIC_INDEKSUJ` (domyślnie `false`). **Zdjęty 11.11 na domenie głównej `robert-debicki.pl` decyzją Roberta:** `npm run wdroz -- --wgraj` buduje domyślnie z `PUBLIC_INDEKSUJ=true` i sprawdza po wgraniu, że żywa strona jest w tym trybie; powrót do `noindex` (np. na czas przebudowy): `npm run wdroz -- --wgraj --noindex`. `/admin/` ma `noindex` w metatagu i nie jest blokowany w `robots.txt` (blokada uniemożliwiłaby crawlerowi odczyt `noindex`). Kopia na Cloudflare (workers.dev, CI `strona.yml`) zostaje z `noindex` (pętla zabezpieczenia w workflow nadal zabrania `PUBLIC_INDEKSUJ`). `testy/e2e/produkcja.spec.ts` oczekuje braku metatagu `robots` na `robert-debicki.pl` i `noindex` na pozostałych adresach. `site` i `Sitemap` wskazują `https://robert-debicki.pl`.
- Analityka: GA4 przez kontener Menedżera tagów Google `GTM-T7N4RZD8` (`ID_TAGU` w `src/lib/zgoda.ts`; w kontenerze: Tag Google `G-4CQH9ZBDBC` na Initialization i tag zdarzenia GA4 `{{Event}}` z wyzwalaczem Zdarzenie niestandardowe `klik_email|klik_linkedin|kopiuj_email|klik_telefon` jako regex; zdarzenia kliknięć wysyła `src/scripts/zgoda.ts` przez `dataLayer.push({ event })` tylko po zgodzie), ładowany dopiero po „Akceptuję” w banerze (`Zgoda.astro`, `src/scripts/zgoda.ts`, Consent Mode domyślnie `denied`). Polityka prywatności: `src/lib/polityka.ts` (strony `/polityka-prywatnosci/` i `/en/privacy-policy/`, e-mail z ustawień PL). Testy: `zgoda.spec.ts` czyści stan, pozostałe testy startują z wyborem „nie” (`playwright.config.ts`). Nowy tag w kontenerze GTM oznacza aktualizację polityki i `ciasteczkaGoogle`.
- SEO: tytuły stron głównych w `src/pages/index.astro` i `src/pages/en/[...glowna].astro`, Open Graph i Twitter w `src/layouts/Strona.astro`, JSON-LD (Person, WebSite) w `src/components/DaneStrukturalne.astro` z danych `ustawienia`. Obraz podglądu `public/og.png` (1200 x 630) generuje `node skrypty/obraz-og.mjs`; uruchomić ponownie po zmianie logo albo roli.
- Lighthouse mobile co najmniej 95 w czterech kategoriach. Brak przewijania w bok przy 360, 390, 1024, 1440 px.
- Hosting: home.pl (Apache), host `serwer2643459.hosting-home.pl`, FTPS, domena główna `robert-debicki.pl`, `.com` i `.com.pl` przekierowuje panel home.pl. Wdrożenie lokalne `npm run wdroz` (`skrypty/wdroz.ts`), dane logowania w `~/.config/robert-debicki-ftp` (poza repo, `chmod 600`; nie czytać, nie wklejać do rozmowy). Skrypt niczego nie usuwa na serwerze. Reguły Apache: `hosting/htaccess` (wgrywany jako `.htaccess`). Cloudflare (`workers.dev`) zostaje drugą, testową kopią przez CI.
- Commit dopiero z wpisem w `CHANGELOG.md`. Push na `main` i wdrożenie tylko za zgodą Roberta w danej wiadomości.
