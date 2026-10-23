import { z } from 'astro/zod';

/** Dozwolone końcówki hostów magazynu R2 dla skanów referencji. */
export const HOSTY_R2 = ['.r2.dev', '.r2.cloudflarestorage.com'];

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

export const wpisy = z.object({
  tytul: z.string(),
  data: z.coerce.date(),
  zajawka: z.string(),
  zdjecia: z
    .array(
      z.object({
        plik: z.string(),
        alt: z
          .string({ error: 'Pole alt jest wymagane: opisz zdjęcie (tekst alternatywny).' })
          .min(5, { error: 'Pole alt musi mieć co najmniej 5 znaków: opisz zdjęcie.' }),
      }),
    )
    .default([]),
  ...tlumaczenie,
});

const naglowekSekcji = z.object({ tytul: z.string(), wstep: z.string() });

/** Ustawienia strony głównej: teksty sekcji, które nie są pozycjami kolekcji. Wszystkie pola wymagane. */
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
    wiersze: z.array(z.object({ etykieta: z.string(), wartosc: z.string() })).min(1),
  }),
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
  kontakt: z.object({
    tytul: z.string(),
    wstep: z.string(),
    email: z.email({ error: 'Pole email musi być adresem e-mail.' }),
    linkedinUrl: z.url({ protocol: /^https$/, error: 'Pole linkedinUrl musi być adresem https.' }),
    linkedinTekst: z.string(),
  }),
  ...tlumaczenie,
});

export const SCHEMATY = { wdrozenia, projekty, referencje, wpisy, ustawienia } as const;
export type NazwaKolekcji = keyof typeof SCHEMATY;
