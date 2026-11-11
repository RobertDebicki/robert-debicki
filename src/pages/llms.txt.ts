import type { APIRoute } from 'astro';
import { llmsTxt } from '../lib/llms';
import { maStroneGlownaEn, ustawienia } from '../lib/pozycje';

export const GET: APIRoute = async ({ site }) => {
  const { otwarcie: o, karta, narzedzia, kontakt: k } = await ustawienia('pl');
  const adres = (sciezka: string) => new URL(sciezka, site).href;
  const strony = [
    { nazwa: 'Strona główna (polski)', adres: adres('/') },
    ...((await maStroneGlownaEn()) ? [{ nazwa: 'Home page (English)', adres: adres('/en/') }] : []),
    { nazwa: 'Polityka prywatności', adres: adres('/polityka-prywatnosci/') },
  ];
  const miejsce = karta.wiersze.find((w) => w.etykieta === 'Miejsce')?.wartosc ?? '';
  const tekst = llmsTxt({
    imie: o.imie,
    nazwisko: o.nazwisko,
    rola: o.rola,
    lead: o.lead,
    opis: o.opis,
    miejsce,
    email: k.email,
    linkedinUrl: k.linkedinUrl,
    narzedzia: narzedzia.wiersze.map((w) => ({ nazwa: w.nazwa, wartosc: w.wartosc })),
    strony,
  });
  return new Response(tekst, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
