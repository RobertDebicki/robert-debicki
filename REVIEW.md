# REVIEW.md: Strona osobista Roberta Dębickiego

Kryteria przeglądu zmian dla Claude Code i Codex. Czytaj przed każdym przeglądem (`/code-review`, subagent, review w Codex).
Ocena ryzyka i limity rund są w globalnych zasadach (`~/.claude/CLAUDE.md`, sekcja „Przegląd zmian, ryzyko i limity pętli”).

## Prawdziwy błąd w tym projekcie
- Wygląd niezgodny z makietą `docs/makieta/index.html`.
- Treść, której nie da się edytować z `/admin/` (Sveltia CMS).
- Fakt o projekcie lub kliencie bez potwierdzenia Roberta.

## Ryzyko wysokie (zawsze pełny przegląd)
- Klucz lub token w repo.
- Dane klientów, których Robert nie zgodził się pokazać.

## Jak sprawdzać
- `npm test`, `npm run build`.
- `npm run sprawdz:sekrety` (musi dać 0).

## Czego nie zgłaszać
- Styl i formatowanie zgodne z istniejącym kodem.
- Sugestie refaktoru, za którymi nie stoi błąd.
- Uwagi już zgłoszone w poprzedniej rundzie.

## Format raportu
Każde znalezisko: plik:linia · typ błędu · ryzyko (wysokie/średnie/niskie) · scenariusz awarii · dowód. Bez dowodu oznacz ⚠️.

## Reguły nauczone
<!-- Jedna linia na regułę: data, co przegląd przepuścił albo fałszywie zgłosił, czego pilnować. Dopisywane po zgodzie Roberta. -->
