import { z } from 'astro/zod';

/** Dozwolone końcówki hostów magazynu R2 dla skanów referencji. */
export const HOSTY_R2 = ['.r2.dev', '.r2.cloudflarestorage.com'];
/** Domena strony: CV Robert wgrywa ręcznie na hosting (np. /cv/), poza repozytorium. */
export const HOST_STRONY = 'robert-debicki.pl';

/** Pola wspólne pliku en.md. W pl.md są puste. */
const tlumaczenie = {
  tlumaczenie: z.enum(['ai', 'sprawdzone']).optional(),
  zrodlo: z.string().optional(),
};

const stack = z.array(z.string());

export const wdrozenia = z.object({
  tytul: z.string(),
  branza: z.string(),
  liczba: z.string(),
  podpisLiczby: z.string(),
  opis: z.string(),
  stack,
  ikona: z.enum(['naczepa', 'kalendarz', 'powrot', 'sluchawka', 'dokument', 'wykres']),
  plyta: z.enum(['pomarancz', 'czerwien', 'zolty']),
  kolejnosc: z.number(),
  ...tlumaczenie,
});

export const projekty = z.object({
  tytul: z.string(),
  branza: z.string(),
  opis: z.string(),
  stack,
  etap: z.string(),
  stan: z.enum(['w-toku', 'produkcja']),
  kolejnosc: z.number(),
  ...tlumaczenie,
});

export const referencje = z.object({
  cytat: z.string(),
  osoba: z.string(),
  funkcja: z.string(),
  firma: z.string(),
  data: z.coerce.date(),
  skanUrl: z
    .url({ protocol: /^https$/, error: 'Pole skanUrl musi być adresem https.' })
    .refine((u) => HOSTY_R2.some((h) => new URL(u).hostname.endsWith(h)), {
      error: 'Pole skanUrl musi wskazywać na magazyn R2 (skany nie trafiają do repozytorium).',
    }),
  zgoda: z.literal(true, {
    error: 'Pole zgoda musi mieć wartość true. Bez zgody osoby referencja nie może zostać opublikowana.',
  }),
  podpisZamazany: z.boolean(),
  ...tlumaczenie,
});

const zdjecie = z.object({
  plik: z.string(),
  alt: z
    .string({ error: 'Pole alt jest wymagane: opisz zdjęcie (tekst alternatywny).' })
    .min(5, { error: 'Pole alt musi mieć co najmniej 5 znaków: opisz zdjęcie.' }),
});

export const wpisy = z.object({
  tytul: z.string(),
  data: z.coerce.date(),
  zajawka: z.string(),
  /** Obraz przy wpisie na liście /wpisy/. Bez miniatury karta ma sam tekst. */
  miniatura: zdjecie.optional(),
  zdjecia: z.array(zdjecie).default([]),
  ...tlumaczenie,
});

const naglowekSekcji = z.object({ tytul: z.string(), wstep: z.string() });

/** Link w obrębie serwisu, np. `/#wdrozenia` albo `/en/posts/adres/`. */
const linkWewnetrzny = z.string().regex(/^\/(en\/)?[a-z0-9/#-]*$/, { error: 'Link prowadzi do adresu w serwisie, np. /#wdrozenia.' });
const ikonaUslugi = z.enum(['ai', 'aplikacje', 'telefon', 'dokument']);
const pozycjaTekstu = z.object({ tytul: z.string(), tekst: z.string() });

/** Tytuł i opis w wyszukiwarce: te same granice na stronach usług i na podstronie rekrutera. */
const tytulSeo = z.string().max(60, { error: 'Tytuł w wyszukiwarce ma najwyżej 60 znaków.' });
const opisSeo = z
  .string()
  .min(120, { error: 'Opis w wyszukiwarce ma od 120 do 155 znaków.' })
  .max(155, { error: 'Opis w wyszukiwarce ma od 120 do 155 znaków.' });

/** Strona usługi (`/uslugi/<adres>/`, w EN `/en/services/<adresEn>/`) i karta w sekcji usług na stronie głównej. */
export const uslugi = z.object({
  /** H1 strony usługi. */
  tytul: z.string(),
  /** Krótka nazwa: karta na stronie głównej, okruszki, link do strony. */
  nazwa: z.string(),
  tytulSeo,
  opis: opisSeo,
  zajawka: z.string(),
  ikona: ikonaUslugi,
  sektor: z.string(),
  rola: z.string(),
  rolaWyroznienie: z.string(),
  lead: z.string(),
  akapit: z.string(),
  karta: z.array(z.object({ etykieta: z.string(), wartosc: z.string() })).min(1),
  problemy: z.object({ tytul: z.string(), wstep: z.string(), pozycje: z.array(pozycjaTekstu).min(1) }),
  kroki: z.object({ tytul: z.string(), pozycje: z.array(pozycjaTekstu).min(1) }),
  /** Co najmniej jeden przykład wdrożenia: usługa bez przykładu nie przechodzi buildu. */
  przyklady: z.object({
    tytul: z.string(),
    pozycje: z
      .array(
        z.object({
          ikona: ikonaUslugi,
          sektor: z.string(),
          tytul: z.string(),
          tekst: z.string(),
          stos: z.array(z.string()),
          liczba: z.string().optional(),
          liczbaOpis: z.string().optional(),
          link: z.object({ tekst: z.string(), adres: linkWewnetrzny }).optional(),
        }),
      )
      .min(1, { error: 'Usługa musi mieć co najmniej jeden przykład wdrożenia.' }),
  }),
  faq: z.object({
    tytul: z.string(),
    pozycje: z.array(z.object({ pytanie: z.string(), odpowiedz: z.string() })).min(3, { error: 'Pytania i odpowiedzi: co najmniej trzy.' }),
  }),
  kolejnosc: z.number(),
  /** Angielski adres strony, tylko w en.md. W pl.md pomijany. */
  adresEn: z.string().regex(/^[a-z0-9-]+$/, { error: 'Pole adresEn: małe litery, cyfry i dywizy.' }).optional(),
  ...tlumaczenie,
});

const BLAD_CV = 'Pole cvUrl musi wskazywać na plik CV na robert-debicki.pl albo w magazynie R2 (CV nie trafia do repozytorium).';
const wierszeKarty = z.array(z.object({ etykieta: z.string(), wartosc: z.string() })).min(1);

/**
 * Podstrona dla rekrutera (`/dla-rekruterow/`, w EN `/en/for-recruiters/`). Narzędzia, doświadczenie i kontakt bierze
 * z reszty ustawień; tu są tylko jej własne teksty i wybór pozycji (nazwy folderów z src/content/wdrozenia i projekty).
 */
const rekruter = z.object({
  /** H1 podstrony. */
  tytul: z.string(),
  tytulSeo,
  opis: opisSeo,
  rola: z.string(),
  rolaWyroznienie: z.string(),
  wstep: z.string(),
  akapit: z.string(),
  karta: z.object({ okres: z.string(), wiersze: wierszeKarty }),
  wybrane: naglowekSekcji,
  kontakt: naglowekSekcji,
  /** Bez adresu przycisk „Pobierz CV” się nie pokazuje. */
  cvUrl: z
    .url({ protocol: /^https$/, error: BLAD_CV })
    .refine(
      (u) => {
        const host = new URL(u).hostname;
        return host === HOST_STRONY || HOSTY_R2.some((h) => host.endsWith(h));
      },
      { error: BLAD_CV },
    )
    .optional(),
  wdrozenia: z.array(z.string()).max(3, { error: 'Podstrona rekrutera: najwyżej trzy wdrożenia.' }).default([]),
  projekty: z.array(z.string()).max(3, { error: 'Podstrona rekrutera: najwyżej trzy projekty.' }).default([]),
});

/** Ustawienia strony głównej: teksty sekcji, które nie są pozycjami kolekcji. Wymagane wszystkie pola poza nagłówkiem usług i podstroną rekrutera. */
export const ustawienia = z.object({
  otwarcie: z.object({
    imie: z.string(),
    nazwisko: z.string(),
    rola: z.string(),
    rolaWyroznienie: z.string(),
    lead: z.string(),
    opis: z.string(),
  }),
  karta: z.object({
    okres: z.string(),
    wiersze: wierszeKarty,
  }),
  /** Nagłówek sekcji usług na stronie głównej. Bez niego sekcja się nie pokazuje. */
  uslugi: naglowekSekcji.optional(),
  wdrozenia: naglowekSekcji,
  projekty: naglowekSekcji,
  doswiadczenie: z.object({
    tytul: z.string(),
    etapy: z.array(z.object({ kiedy: z.string(), stanowisko: z.string(), opis: z.string() })).min(1),
    zasady: z.array(z.object({ tytul: z.string(), opis: z.string() })).length(3, { error: 'Pole zasady musi mieć dokładnie trzy zasady pracy.' }),
  }),
  narzedzia: z.object({
    tytul: z.string(),
    wiersze: z.array(z.object({ nazwa: z.string(), wartosc: z.string() })).min(1),
  }),
  /** Bez tego bloku podstrona rekrutera i linki do niej nie powstają. */
  rekruter: rekruter.optional(),
  kontakt: z.object({
    tytul: z.string(),
    wstep: z.string(),
    email: z.email({ error: 'Pole email musi być adresem e-mail.' }),
    linkedinUrl: z.url({ protocol: /^https$/, error: 'Pole linkedinUrl musi być adresem https.' }),
    linkedinTekst: z.string(),
    telefon: z.string().regex(/^\+?[0-9][0-9 -]{7,17}$/, { error: 'Pole telefon musi być numerem, np. +48 600 100 200.' }).or(z.literal('')).optional(),
  }),
  ...tlumaczenie,
});

export const SCHEMATY = { wdrozenia, projekty, referencje, wpisy, uslugi, ustawienia } as const;
export type NazwaKolekcji = keyof typeof SCHEMATY;
