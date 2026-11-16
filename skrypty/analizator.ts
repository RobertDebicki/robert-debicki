// Okienka do analizatora tekstów DNK z pliku pl.md: każde pole formularza podpisane i w osobnym bloku do skopiowania.
// Analizator ocenia strukturę tylko z Markdownu (# H1, ## H2, ### pytania, ![alt](plik)), więc tekst składamy
// w kolejności, w jakiej rysuje go strona.
// Użycie: npx tsx skrypty/analizator.ts <src/content/wpisy|uslugi/<adres>/pl.md> --fraza "<fraza>" --dodatkowe "<fraza 1>" ["<fraza 2>"]
import { readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARKA, opcjeZArgumentow, rozbierz, tekstUslugi, type DaneUslugi } from './dnk';

export { tekstUslugi };

const DOMENA = 'https://robert-debicki.pl';
const nazwaPliku = (p: string) => p.split('/').at(-1) ?? p;

/** Wpis: H1 z pola tytul, treść, potem zdjęcia z pola zdjecia (szablon rysuje je pod treścią). */
export function tekstWpisu(plik: string): string {
  const { fm, tresc } = rozbierz(plik);
  const zdjecia = ((fm.zdjecia as { plik: string; alt: string }[] | undefined) ?? []).map((z) => `![${z.alt}](${nazwaPliku(z.plik)})`);
  return [`# ${fm.tytul}`, tresc.trim(), ...zdjecia].join('\n\n') + '\n';
}

const blok = (t: string, jezyk = '') => `${t.includes('```') ? '~~~~' : '```'}${jezyk}\n${t.trim()}\n${t.includes('```') ? '~~~~' : '```'}`;

type Zrodlo = { rodzaj: 'wpisy'; plik: string } | { rodzaj: 'uslugi'; dane: Parameters<typeof tekstUslugi>[0] & { tytulSeo: string; opis: string } };

/** Instrukcja dla Roberta: co wkleić do którego okienka w analizatorze. */
export function okienka(z: Zrodlo & { adres: string; fraza: string; dodatkowe: string[] }): string {
  let tytul: string, opis: string, tekst: string;
  if (z.rodzaj === 'wpisy') {
    const { fm } = rozbierz(z.plik);
    [tytul, opis, tekst] = [`${fm.tytul}${MARKA}`, String(fm.zajawka ?? ''), tekstWpisu(z.plik)];
  } else {
    [tytul, opis, tekst] = [z.dane.tytulSeo, z.dane.opis, tekstUslugi(z.dane)];
  }
  return [
    '# Co wkleić do analizatora DNK',
    'Każdy blok skopiuj i wklej do okienka o tej samej nazwie.',
    '## 1. Okienko „Tytuł strony”', blok(tytul),
    '## 2. Okienko „Opis w Google”', blok(opis),
    '## 3. Okienko „Adres strony”', blok(`${DOMENA}/${z.rodzaj}/${z.adres}/`),
    '## 4. „Ustawienia frazy i konkurencji”',
    'Okienko „Fraza główna”:', blok(z.fraza),
    'Okienko „Frazy dodatkowe”:', blok(z.dodatkowe.join(', ')),
    'W okienku „Nie podpowiadaj słów” wpisz słowa spoza Twojego zakresu, które panel pokaże w zakładce „Słowa”.',
    '## 5. Duże okienko „Tekst”',
    'Wklej całość razem z #, ** i nawiasami: po nich analizator widzi nagłówki, pytania i zdjęcia.',
    blok(tekst, 'markdown'),
    '## 6. Co dalej',
    'Wklej mi ocenę i zakładkę „Podpowiedzi”. Poprawię tekst i dam nowe bloki. Celujemy w 100 punktów, publikować można od 85.',
  ].join('\n\n') + '\n';
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { plik, opcje } = opcjeZArgumentow(process.argv.slice(2));
    const adres = basename(dirname(plik));
    const tekst = readFileSync(plik, 'utf8');
    if (!plik.endsWith('pl.md')) throw new Error('Analizator dostaje tekst polski (pl.md).');
    const rodzaj = /[\\/]uslugi[\\/]/.test(plik) ? 'uslugi' : /[\\/]wpisy[\\/]/.test(plik) ? 'wpisy' : null;
    if (!rodzaj) throw new Error('Analizator dotyczy wpisów (src/content/wpisy) i usług (src/content/uslugi).');
    const zrodlo: Zrodlo = rodzaj === 'wpisy' ? { rodzaj, plik: tekst } : { rodzaj, dane: rozbierz(tekst).fm as unknown as DaneUslugi };
    console.log(okienka({ ...zrodlo, adres, fraza: opcje.fraza, dodatkowe: opcje.dodatkowe }));
  } catch (e) {
    console.error((e as Error).message);
    process.exit(2);
  }
}
