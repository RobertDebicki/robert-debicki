/**
 * Konfiguracja panelu Sveltia CMS pod /admin/. Obiekt TypeScript, który `src/pages/admin/config.yml.ts` zamienia na YAML.
 * Listy opcji (ikona, płyta, stan) i host skanów R2 pochodzą ze schematów w `schematy.ts`, więc nie mogą się rozjechać z buildem.
 * Wymagalność pól pilnuje `testy/jednostkowe/panel.test.ts`, który liczy ją ze schematu Zod.
 *
 * Każda pozycja to folder `src/content/<kolekcja>/<adres>/` z `pl.md` i opcjonalnie `en.md` (i18n `multiple_files`).
 * Pola `tlumaczenie` i `zrodlo` są ukryte: ustawia je skill `/tlumacz-strone`, człowiek ich nie edytuje.
 */
import { HOSTY_R2, wdrozenia, projekty } from './schematy';

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

const body = (label: string): Pole => ({ name: 'body', label, widget: 'markdown', required: false, hint: 'Śródtytuły ##, pogrubienie **tekst**, link [tekst](adres).' });
const data = (name: string, label: string, hint?: string): Pole => ({ name, label, widget: 'datetime', date_format: 'YYYY-MM-DD', time_format: false, picker_utc: false, ...(hint ? { hint } : {}) });

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
      lista('zdjecia', 'Zdjęcia', {
        label_singular: 'zdjęcie',
        required: false,
        summary: '{{fields.alt}}',
        fields: [
          { name: 'plik', label: 'Plik', widget: 'image', choose_url: false, media_folder: FOLDER_ZDJEC, public_folder: SCIEZKA_ZDJEC },
          tekst('alt', 'Opis zdjęcia (alt)', {
            hint: 'Co widać na zdjęciu, jednym zdaniem, co najmniej 5 znaków. Czytają to wyszukiwarki i osoby niewidome.',
            pattern: ['^.{5,}$', 'Opis musi mieć co najmniej 5 znaków: opisz, co widać na zdjęciu.'],
          }),
        ],
      }),
      ...TLUMACZENIE,
      body('Treść wpisu'),
    ],
    ['data'],
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
  const kolekcje = [WDROZENIA, PROJEKTY, REFERENCJE, WPISY].map((k) => ({
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
    site_url: sr.adresStrony ?? 'https://robert-debicki.robert-debicki7.workers.dev',
    media_folder: FOLDER_ZDJEC,
    public_folder: SCIEZKA_ZDJEC,
    media_libraries: {
      default: { config: { max_file_size: 15_000_000, slugify_filename: true } },
      stock_assets: { providers: [] },
    },
    i18n: { structure: 'multiple_files', locales: ['pl', 'en'], default_locale: 'pl', initial_locales: 'default' },
    // Cudzysłowy w YAML: bez nich data 2026-10-23 byłaby czytana jako data, a nie tekst.
    output: { omit_empty_optional_fields: true, yaml: { quote: 'double' } },
    collections: [...kolekcje, USTAWIENIA],
  };
}
