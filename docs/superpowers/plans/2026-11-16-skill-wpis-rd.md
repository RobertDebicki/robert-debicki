# Plan 16.11.2026: skill `/wpis-rd` do tekstów na robert-debicki.pl

Decyzje Roberta 16.11: skill tylko w tym projekcie (`.claude/skills/wpis-rd/`), nazwa `/wpis-rd` (globalny `/wpis` służy innemu projektowi); zakres: wpisy, usługi, wdrożenia, projekty; zasady DNK z jego master promptu (cel 100 pkt w analizatorze,
przy kolizji wygrywa DNK); wezwanie na końcu: e-mail; na koniec plik PL, `/tlumacz-strone` (EN), build, testy, commit bez pusha.

Zasada podziału: pełne zasady DNK i analizator tylko tam, gdzie tekst ma własny adres w Google (wpis `/wpisy/<adres>/`,
usługa `/uslugi/<adres>/`). Wdrożenia i projekty to karty na stronie głównej: zasady z `AGENTS.md` (branża zamiast klienta,
tylko fakty Roberta, bez liczby projektów, bez myślników).

- [x] 1. `skrypty/dnk.ts` (kontrola wpisu i usługi według progów DNK) z testami Vitest, najpierw czerwonymi
      → verify: `npx vitest run testy/jednostkowe/dnk.test.ts`
- [x] 2. `skrypty/analizator.ts` (podpisane okienka formularza: tytuł, opis, adres, fraza, frazy dodatkowe, tekst w Markdownie
      w kolejności strony) z testami → verify: testy analizatora
- [x] 3. `.claude/skills/wpis-rd/` (SKILL.md, zasady, formaty, wywiad) → verify: przegląd pliku i próba na wymyślonym temacie
      bez zapisu do treści
- [x] 4. `AGENTS.md` (progi DNK zamiast dawnych, skill w tabeli), `npm run sprawdz` bez nowych błędów, przegląd świeżym
      agentem, CHANGELOG, commit → verify: wynik `npm run sprawdz`
