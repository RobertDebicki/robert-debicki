// Wypisuje wartość pola `zrodlo` dla en.md: skrót SHA-256 treści pl.md (nagłówek jako kanoniczny JSON plus treść), liczony tak samo jak w buildzie.
// Użycie: npx tsx skrypty/skrot.ts src/content/wdrozenia/voice-bot/pl.md
import { readFileSync } from 'node:fs';
import { skrotTresci } from '../src/lib/skrot';

const plik = process.argv[2];
if (!plik) {
  console.error('Podaj ścieżkę do pl.md, np. npx tsx skrypty/skrot.ts src/content/wdrozenia/voice-bot/pl.md');
  process.exit(2);
}
console.log(skrotTresci(readFileSync(plik, 'utf8')));
