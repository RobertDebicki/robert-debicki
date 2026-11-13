/**
 * Konfiguracja panelu Sveltia CMS pod /admin/. Obiekt TypeScript, który `src/pages/admin/config.yml.ts` zamienia na YAML.
 * Listy opcji (ikona, płyta, stan) i host skanów R2 pochodzą ze schematów w `schematy.ts`, więc nie mogą się rozjechać z buildem.
 * Wymagalność pól pilnuje `testy/jednostkowe/panel.test.ts`, który liczy ją ze schematu Zod.
 *
 * Każda pozycja to folder `src/content/<kolekcja>/<adres>/` z `pl.md` i opcjonalnie `en.md` (i18n `multiple_files`).
 * Pola `tlumaczenie` i `zrodlo` są ukryte: ustawia je skill `/tlumacz-strone`, człowiek ich nie edytuje.
 */
import { HOSTY_R2, wdrozenia, projekty, uslugi } from './schematy';

export const WERSJA_SVELTII = '0.221.8';
/** Suma kontrolna SRI pliku sveltia-cms.js 0.221.8 z jsDelivr. Przy zmianie wersji przelicz ją z pobranego pliku. */
export const SRI_SVELTII = 'sha384-9Rn/H7VOK428tVMQ+jv0XKxagP5YQWbYKPbl/S80lmnId57tCgfJlzBbvVubYKIh';
export const REPO = 'RobertDebicki/robert-debicki';
/** Folder zdjęć wpisów w repozytorium i ścieżka zapisywana w polu `plik` (od korzenia repozytorium, jak w `wpisy.ts`). */
export const FOLDER_ZDJEC = 'src/assets/wpisy';
export const SCIEZKA_ZDJEC = `/${FOLDER_ZDJEC}`;

type Pole = Record<string, unknown>;

const tekst = (name: string, label: string, dod: Pole = {}): Pole => ({ name, label, widget: 'string', ...dod });
const dlugi = (name: string, label: string, dod: Pole = {}): Pole => ({ name, label, widget: 'text', ...dod });
const liczba = (name: string, label: string, dod: Pole = {}): Pole => ({ name, label, widget: 'number', value_type: 'int', ...dod });
const ukryte = (name: string): Pole => ({ name, widget: 'hidden', required: false });
const lista = (name: string, label: string, dod: Pole = {}): Pole => ({ name, label, widget: 'list', ...dod });
const obiekt = (name: string, label: string, fields: Pole[]): Pole => ({ name, label, widget: 'object', fields });

/** Opcje wyboru z wartości enuma schematu; etykieta po polsku, a gdy jej brak, sama wartość. */
function opcje(wartosci: readonly string[], etykiety: Record<string, string>): Pole[] {
  return wartosci.map((value) => ({ label: etykiety[value] ?? value, value }));
}

const TLUMACZENIE = [ukryte('tlumaczenie'), ukryte('zrodlo')];

/**
 * Ustawia, co dzieje się z polem najwyższego poziomu w en.md: teksty są tłumaczone (`true`), wartości nietekstowe
 * kopiowane z pl.md (`duplicate`), ukryte pola przechodzą do en.md bez edycji (`true`, widget hidden nic nie pokazuje).
 */
function zJezykami(pola: Pole[], kopiowane: string[] = []): Pole[] {
  return pola.map((p) => (p.name === 'body' ? { ...p, i18n: true } : { ...p, i18n: kopiowane.includes(p.name as string) ? 'duplicate' : true }));
}

const body = (label: string): Pole => ({ name: 'body', label, widget: 'markdown', required: false, hint: 'Śródtytuły ##, pogrubienie **tekst**, link [tekst](adres). Grafika: przycisk obrazu; nazwa pliku małymi literami, bez spacji i polskich znaków (np. wykres-1.png), typ png, jpg, webp, avif, gif albo svg, inaczej strona się nie zbuduje.' });
const data = (name: string, label: string, hint?: string): Pole => ({ name, label, widget: 'datetime', date_format: 'YYYY-MM-DD', time_format: false, picker_utc: false, ...(hint ? { hint } : {}) });

/** Plik i alt: zdjęcia pod wpisem i miniatura na liście. Grafikę w treść wstawia przycisk obrazu w edytorze treści. */
const POLA_ZDJECIA: Pole[] = [
  { name: 'plik', label: 'Plik', widget: 'image', choose_url: false, media_folder: FOLDER_ZDJEC, public_folder: SCIEZKA_ZDJEC },
  tekst('alt', 'Opis zdjęcia (alt)', {
    hint: 'Co widać na zdjęciu, jednym zdaniem, co najmniej 5 znaków. Czytają to wyszukiwarki i osoby niewidome.',
    pattern: ['^.{5,}$', 'Opis musi mieć co najmniej 5 znaków: opisz, co widać na zdjęciu.'],
  }),
];

const etapy = ['w-toku', 'produkcja'];
const WDROZENIA: Pole = {
  name: 'wdrozenia',
  label: 'Wdrożenia',
  label_singular: 'wdrożenie',
  folder: 'src/content/wdrozenia',
  identifier_field: 'tytul',
  summary: '{{kolejnosc}}. {{tytul}}',
  sortable_fields: ['kolejnosc', 'tytul'],
  fields: zJezykami(
    [
      tekst('tytul', 'Tytuł'),
      tekst('branza', 'Branża klienta', { hint: 'Opisz branżę, nie nazwę klienta.' }),
      tekst('liczba', 'Liczba główna', { hint: 'Krótko, np. 60 h albo 2 min. Dłuższe wartości są wyświetlane mniejszą czcionką.' }),
      tekst('podpisLiczby', 'Podpis pod liczbą'),
      dlugi('opis', 'Opis: problem klienta, co zbudowałem, efekt'),
      lista('stack', 'Narzędzia', { label_singular: 'narzędzie' }),
      { name: 'ikona', label: 'Ikona', widget: 'select', options: opcje(wdrozenia.shape.ikona.options, { powrot: 'powrót', sluchawka: 'słuchawka' }) },
      { name: 'plyta', label: 'Kolor płyty', widget: 'select', options: opcje(wdrozenia.shape.plyta.options, { pomarancz: 'pomarańcz', czerwien: 'czerwień', zolty: 'żółty' }) },
      liczba('kolejnosc', 'Kolejność', { min: 1, hint: '1 = pierwsze na liście.' }),
      ...TLUMACZENIE,
    ],
    ['ikona', 'plyta', 'kolejnosc'],
  ),
};

const PROJEKTY: Pole = {
  name: 'projekty',
  label: 'Projekty',
  label_singular: 'projekt',
  folder: 'src/content/projekty',
  identifier_field: 'tytul',
  summary: '{{kolejnosc}}. {{tytul}}',
  sortable_fields: ['kolejnosc', 'tytul'],
  fields: zJezykami(
    [
      tekst('tytul', 'Tytuł'),
      tekst('branza', 'Branża klienta', { hint: 'Opisz branżę, nie nazwę klienta.' }),
      dlugi('opis', 'Opis'),
      lista('stack', 'Narzędzia', { label_singular: 'narzędzie' }),
      tekst('etap', 'Napis na pieczątce (etap)', { hint: 'Np. Przed premierą.' }),
      { name: 'stan', label: 'Stan', widget: 'select', options: opcje(projekty.shape.stan.options, { 'w-toku': 'w toku', produkcja: 'na produkcji' }) },
      liczba('kolejnosc', 'Kolejność', { min: 1, hint: '1 = pierwszy na liście.' }),
      ...TLUMACZENIE,
    ],
    ['stan', 'kolejnosc'],
  ),
};

/** Pole skanu: zwykły adres, bo skany leżą w R2, a nie w repozytorium. Wzorzec z tych samych hostów co schemat. */
const HOST_R2 = HOSTY_R2.map((h) => h.replace(/\./g, '\\.')).join('|');
const REFERENCJE: Pole = {
  name: 'referencje',
  label: 'Referencje',
  label_singular: 'referencja',
  folder: 'src/content/referencje',
  identifier_field: 'firma',
  summary: '{{firma}}, {{osoba}}',
  sortable_fields: ['data', 'firma'],
  fields: zJezykami(
    [
      dlugi('cytat', 'Cytat', { hint: 'Jedno zdanie z listu, tak jak napisał klient.' }),
      tekst('osoba', 'Imię i nazwisko'),
      tekst('funkcja', 'Funkcja'),
      tekst('firma', 'Firma'),
      data('data', 'Data listu'),
      tekst('skanUrl', 'Adres skanu listu (R2)', {
        hint: 'Pełny adres https skanu w magazynie R2. Skan nie trafia do repozytorium.',
        pattern: [`^https://[^/:?#]+(${HOST_R2})(/.*)?$`, 'Adres zaczyna się od https:// i wskazuje na magazyn R2 (.r2.dev albo .r2.cloudflarestorage.com).'],
      }),
      {
        name: 'zgoda',
        label: 'Klient zgodził się na publikację',
        widget: 'boolean',
        default: false,
        hint: 'Zaznacz tylko, gdy klient zgodził się na publikację listu razem z nazwą firmy. Przed wgraniem skanu zamaż podpis. Bez zaznaczenia strona się nie zbuduje.',
      },
      { name: 'podpisZamazany', label: 'Podpis na skanie jest zamazany', widget: 'boolean', default: false },
      ...TLUMACZENIE,
    ],
    ['data', 'skanUrl', 'zgoda', 'podpisZamazany'],
  ),
};

const WPISY: Pole = {
  name: 'wpisy',
  label: 'Wpisy',
  label_singular: 'wpis',
  folder: 'src/content/wpisy',
  identifier_field: 'tytul',
  summary: '{{data}} {{tytul}}',
  sortable_fields: ['data', 'tytul'],
  fields: zJezykami(
    [
      tekst('tytul', 'Tytuł'),
      data('data', 'Data publikacji'),
      dlugi('zajawka', 'Zajawka', { hint: 'Jedno lub dwa zdania na liście wpisów.' }),
      { ...obiekt('miniatura', 'Miniatura na liście wpisów', POLA_ZDJECIA), required: false, hint: 'Obraz 16:9 obok tytułu na liście /wpisy/. Bez miniatury karta ma sam tekst.' },
      lista('zdjecia', 'Zdjęcia', {
        label_singular: 'zdjęcie',
        required: false,
        summary: '{{fields.alt}}',
        fields: POLA_ZDJECIA,
      }),
      ...TLUMACZENIE,
      body('Treść wpisu'),
    ],
    ['data'],
  ),
};

/** Wzorzec długości dla panelu: te same granice co w schemacie usług (`.min` / `.max` w `schematy.ts`). */
const dlugosc = (min: number, max: number, komunikat: string): Pole => ({ pattern: [`^.{${min},${max}}$`, komunikat] });
const OPIS_USLUGI = uslugi.shape.opis;
const SEO_USLUGI = uslugi.shape.tytulSeo;
const ETYKIETY_IKON_USLUG = { ai: 'AI (robot)', aplikacje: 'aplikacje (kalendarz)', telefon: 'telefon', dokument: 'dokument' };
const ikonaUslugi = (): Pole => ({ name: 'ikona', label: 'Ikona', widget: 'select', options: opcje(uslugi.shape.ikona.options, ETYKIETY_IKON_USLUG) });
const pozycjeTekstu = (label: string, singular: string): Pole =>
  lista('pozycje', label, { label_singular: singular, min: 1, summary: '{{fields.tytul}}', fields: [tekst('tytul', 'Tytuł'), dlugi('tekst', 'Tekst')] });

const USLUGI: Pole = {
  name: 'uslugi',
  label: 'Usługi',
  label_singular: 'usługa',
  folder: 'src/content/uslugi',
  identifier_field: 'nazwa',
  summary: '{{kolejnosc}}. {{nazwa}}',
  sortable_fields: ['kolejnosc', 'nazwa'],
  fields: zJezykami(
    [
      tekst('tytul', 'Tytuł strony (H1)'),
      tekst('nazwa', 'Krótka nazwa', { hint: 'Na karcie na stronie głównej, w okruszkach i w linku do strony usługi.' }),
      tekst('tytulSeo', 'Tytuł w wyszukiwarce', {
        hint: `Tytuł karty przeglądarki i wyniku w Google, najwyżej ${SEO_USLUGI.maxLength} znaków.`,
        ...dlugosc(1, SEO_USLUGI.maxLength!, `Tytuł w wyszukiwarce ma najwyżej ${SEO_USLUGI.maxLength} znaków.`),
      }),
      dlugi('opis', 'Opis w wyszukiwarce', {
        hint: `Opis pod tytułem w Google, od ${OPIS_USLUGI.minLength} do ${OPIS_USLUGI.maxLength} znaków, bez nowych linii.`,
        ...dlugosc(OPIS_USLUGI.minLength!, OPIS_USLUGI.maxLength!, `Opis ma od ${OPIS_USLUGI.minLength} do ${OPIS_USLUGI.maxLength} znaków.`),
      }),
      dlugi('zajawka', 'Zajawka na karcie na stronie głównej'),
      ikonaUslugi(),
      tekst('sektor', 'Linia nad nazwą na karcie', { hint: 'Np. narzędzia: Agenci AI, n8n, Make.com.' }),
      tekst('rola', 'Linia pod tytułem'),
      tekst('rolaWyroznienie', 'Wyróżniony dopisek linii pod tytułem'),
      dlugi('lead', 'Zdanie główne'),
      dlugi('akapit', 'Akapit pod zdaniem głównym'),
      lista('karta', 'Karta usługi', { label_singular: 'wiersz', min: 1, summary: '{{fields.etykieta}}', fields: [tekst('etykieta', 'Etykieta'), tekst('wartosc', 'Wartość')] }),
      obiekt('problemy', 'Problem', [tekst('tytul', 'Tytuł sekcji'), dlugi('wstep', 'Wstęp'), pozycjeTekstu('Problemy', 'problem')]),
      obiekt('kroki', 'Jak to robię', [tekst('tytul', 'Tytuł sekcji'), pozycjeTekstu('Kroki', 'krok')]),
      obiekt('przyklady', 'Przykłady wdrożeń', [
        tekst('tytul', 'Tytuł sekcji'),
        lista('pozycje', 'Przykłady', {
          label_singular: 'przykład',
          min: 1,
          hint: 'Co najmniej jeden przykład wdrożenia, inaczej strona się nie zbuduje.',
          summary: '{{fields.tytul}}',
          fields: [
            ikonaUslugi(),
            tekst('liczba', 'Liczba główna', { required: false, hint: 'Krótko, np. 3 albo setki. Bez liczby zostaje sama ikona.' }),
            tekst('liczbaOpis', 'Podpis pod liczbą', { required: false }),
            tekst('sektor', 'Branża klienta', { hint: 'Opisz branżę, nie nazwę klienta.' }),
            tekst('tytul', 'Tytuł'),
            dlugi('tekst', 'Opis: problem klienta, co zbudowałem, efekt'),
            lista('stos', 'Narzędzia', { label_singular: 'narzędzie' }),
            {
              ...obiekt('link', 'Link pod opisem', [
                tekst('tekst', 'Tekst linku'),
                tekst('adres', 'Adres', { hint: 'Adres w serwisie, np. /#wdrozenia albo /wpisy/adres-wpisu/.', pattern: ['^/(en/)?[a-z0-9/#-]*$', 'Adres zaczyna się od / i ma małe litery, cyfry, dywizy, # albo /.'] }),
              ]),
              required: false,
            },
          ],
        }),
      ]),
      obiekt('faq', 'Pytania i odpowiedzi', [
        tekst('tytul', 'Tytuł sekcji'),
        lista('pozycje', 'Pytania', { label_singular: 'pytanie', min: 3, hint: 'Co najmniej trzy pytania.', summary: '{{fields.pytanie}}', fields: [tekst('pytanie', 'Pytanie'), dlugi('odpowiedz', 'Odpowiedź')] }),
      ]),
      liczba('kolejnosc', 'Kolejność', { min: 1, hint: '1 = pierwsza na liście.' }),
      tekst('adresEn', 'Adres po angielsku', {
        required: false,
        hint: 'Tylko w wersji angielskiej: angielski adres strony, małe litery i dywizy, np. ai-and-automation. W polskiej wersji zostaw puste.',
        pattern: ['^[a-z0-9-]+$', 'Tylko małe litery, cyfry i dywizy.'],
      }),
      ...TLUMACZENIE,
    ],
    ['ikona', 'kolejnosc'],
  ),
};

const sekcja = (tytul: string, wstep: string): Pole[] => [tekst('tytul', tytul), dlugi('wstep', wstep)];
const USTAWIENIA: Pole = {
  name: 'ustawienia',
  label: 'Ustawienia strony głównej',
  files: [
    {
      name: 'strona-glowna',
      label: 'Teksty strony głównej',
      file: 'src/content/ustawienia/{{locale}}.md',
      format: 'frontmatter',
      i18n: true,
      fields: zJezykami([
        obiekt('otwarcie', 'Otwarcie', [
          tekst('imie', 'Imię'),
          tekst('nazwisko', 'Nazwisko'),
          tekst('rola', 'Rola'),
          tekst('rolaWyroznienie', 'Wyróżniony dopisek roli'),
          dlugi('lead', 'Zdanie główne'),
          dlugi('opis', 'Opis'),
        ]),
        obiekt('karta', 'Karta zlecenia', [
          tekst('okres', 'Okres'),
          lista('wiersze', 'Wiersze', { label_singular: 'wiersz', min: 1, summary: '{{fields.etykieta}}', fields: [tekst('etykieta', 'Etykieta'), tekst('wartosc', 'Wartość')] }),
        ]),
        { ...obiekt('uslugi', 'Sekcja usług', sekcja('Tytuł sekcji', 'Wstęp')), required: false, hint: 'Sekcja na stronie głównej pokazuje się, gdy jest ten nagłówek i choć jedna usługa w tym języku.' },
        obiekt('wdrozenia', 'Sekcja wdrożeń', sekcja('Tytuł sekcji', 'Wstęp')),
        obiekt('projekty', 'Sekcja projektów', sekcja('Tytuł sekcji', 'Wstęp')),
        obiekt('doswiadczenie', 'Doświadczenie', [
          tekst('tytul', 'Tytuł sekcji'),
          lista('etapy', 'Etapy', { label_singular: 'etap', min: 1, summary: '{{fields.stanowisko}}', fields: [tekst('kiedy', 'Kiedy'), tekst('stanowisko', 'Stanowisko'), dlugi('opis', 'Opis')] }),
          lista('zasady', 'Zasady pracy', { label_singular: 'zasada', min: 3, max: 3, summary: '{{fields.tytul}}', fields: [tekst('tytul', 'Tytuł'), dlugi('opis', 'Opis')] }),
        ]),
        obiekt('narzedzia', 'Narzędzia', [
          tekst('tytul', 'Tytuł sekcji'),
          lista('wiersze', 'Wiersze', { label_singular: 'wiersz', min: 1, summary: '{{fields.nazwa}}', fields: [tekst('nazwa', 'Nazwa'), tekst('wartosc', 'Wartość')] }),
        ]),
        obiekt('kontakt', 'Kontakt', [
          tekst('tytul', 'Tytuł sekcji'),
          dlugi('wstep', 'Wstęp'),
          tekst('telefon', 'Telefon', { required: false, hint: 'Z kierunkowym, np. +48 600 100 200. Puste pole ukrywa telefon.' }),
          tekst('email', 'Adres e-mail', { pattern: ['^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$', 'To nie wygląda na adres e-mail.'] }),
          tekst('linkedinUrl', 'Adres profilu LinkedIn', { pattern: ['^https://\\S+$', 'Adres zaczyna się od https://'] }),
          tekst('linkedinTekst', 'Napis przy linku do LinkedIna'),
        ]),
        ...TLUMACZENIE,
      ]),
    },
  ],
};

export type Srodowisko = { galaz?: string; adresLogowania?: string; adresStrony?: string };

/** Pełna konfiguracja panelu. Bez `adresLogowania` pomijamy `base_url`, więc lokalnie konfiguracja i tak się buduje. */
export function konfiguracjaPanelu(sr: Srodowisko = {}): Record<string, unknown> {
  const kolekcje = [WDROZENIA, PROJEKTY, REFERENCJE, WPISY, USLUGI].map((k) => ({
    ...k,
    path: '{{slug}}/{{locale}}',
    extension: 'md',
    format: 'frontmatter',
    i18n: true,
  }));
  return {
    backend: {
      name: 'github',
      repo: REPO,
      branch: sr.galaz ?? 'main',
      ...(sr.adresLogowania ? { base_url: sr.adresLogowania } : {}),
      commit_messages: {
        create: 'Panel: nowy wpis {{collection}} „{{slug}}”',
        update: 'Panel: zmiana {{collection}} „{{slug}}”',
        delete: 'Panel: usunięcie {{collection}} „{{slug}}”',
        uploadMedia: 'Panel: zdjęcie „{{path}}”',
        deleteMedia: 'Panel: usunięcie zdjęcia „{{path}}”',
      },
    },
    app_title: 'Panel Roberta Dębickiego',
    site_url: sr.adresStrony ?? 'https://robert-debicki.pl',
    media_folder: FOLDER_ZDJEC,
    public_folder: SCIEZKA_ZDJEC,
    media_libraries: {
      default: { config: { max_file_size: 15_000_000, slugify_filename: true } },
      stock_assets: { providers: [] },
    },
    // Adres pozycji (nazwa folderu, część URL) tylko z ASCII: "Wdrożenie łąk" daje "wdrozenie-lak", nie "wdrożenie-łąk".
    // Klucze jak w typie SlugOptions Sveltii 0.221.8 (types/public.d.ts).
    slug: { encoding: 'ascii', clean_accents: true },
    i18n: { structure: 'multiple_files', locales: ['pl', 'en'], default_locale: 'pl', initial_locales: 'default' },
    // Cudzysłowy w YAML: bez nich data 2026-10-23 byłaby czytana jako data, a nie tekst.
    output: { omit_empty_optional_fields: true, yaml: { quote: 'double' } },
    collections: [...kolekcje, USTAWIENIA],
  };
}
