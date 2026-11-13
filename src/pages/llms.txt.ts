import type { APIRoute } from 'astro';
import { llmsTxt } from '../lib/llms';
import { maStroneGlownaEn, ustawienia } from '../lib/pozycje';
import { prefiksUslug, uslugiWJezyku } from '../lib/uslugi';
import { adresRekrutera, rekruter } from '../lib/rekruter';

export const GET: APIRoute = async ({ site }) => {
  const { otwarcie: o, karta, narzedzia, kontakt: k } = await ustawienia('pl');
  const adres = (sciezka: string) => new URL(sciezka, site).href;
  // Lista usług i strona każdej usługi w danym języku. Bez usług nic nie dopisujemy (tych stron wtedy nie ma).
  const stronyUslug = async (jezyk: 'pl' | 'en', lista: string, usluga: string) => {
    const uslugi = await uslugiWJezyku(jezyk);
    if (uslugi.length === 0) return [];
    const prefiks = prefiksUslug(jezyk);
    return [{ nazwa: lista, adres: adres(prefiks) }, ...uslugi.map((u) => ({ nazwa: `${usluga}: ${u.entry.data.nazwa}`, adres: adres(`${prefiks}${u.adres}/`) }))];
  };
  const strony = [
    { nazwa: 'Strona główna (polski)', adres: adres('/') },
    ...((await maStroneGlownaEn()) ? [{ nazwa: 'Home page (English)', adres: adres('/en/') }] : []),
    ...(await stronyUslug('pl', 'Usługi', 'Usługa')),
    ...(await stronyUslug('en', 'Services (English)', 'Service')),
    ...((await rekruter('pl')) ? [{ nazwa: 'Dla rekruterów', adres: adres(adresRekrutera('pl')) }] : []),
    ...((await rekruter('en')) ? [{ nazwa: 'For recruiters (English)', adres: adres(adresRekrutera('en')) }] : []),
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
    telefon: k.telefon,
    linkedinUrl: k.linkedinUrl,
    narzedzia: narzedzia.wiersze.map((w) => ({ nazwa: w.nazwa, wartosc: w.wartosc })),
    strony,
  });
  return new Response(tekst, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
