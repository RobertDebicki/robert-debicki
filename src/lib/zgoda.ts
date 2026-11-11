// Zgoda na analitykę (Google Analytics 4 wdrożone przez kontener Menedżera tagów Google, identyfikator GTM-…; tagi i wyzwalacze są w panelu GTM, konto robert-debicki). Kontener nie jest ładowany, dopóki odwiedzający nie kliknie „Akceptuję”.
export const ID_TAGU = 'GTM-T7N4RZD8';
export const KLUCZ_WYBORU = 'zgoda-analityka';

export type Wybor = 'tak' | 'nie';

/** Adres kontenera tagu Google (gtm.js) w formie, którą podaje GA4 przy ręcznej instalacji. Wymaga identyfikatora GTM-…, nie G-… (ten pomiaru GA4 ma inny skrypt). */
export function adresTagu(id: string): string {
  if (!/^GTM-[A-Z0-9]+$/.test(id)) throw new Error(`Nieprawidłowy identyfikator tagu: ${id}`);
  return `https://www.googletagmanager.com/gtm.js?id=${id}`;
}

/** Zapisana wartość inna niż dokładnie „tak” lub „nie” to brak decyzji (pytamy ponownie, analityka wyłączona). */
export function odczytajWybor(wartosc: string | null): Wybor | null {
  return wartosc === 'tak' || wartosc === 'nie' ? wartosc : null;
}

type Pamiec = Pick<Storage, 'getItem' | 'setItem'>;

/** Pamięć może być zablokowana (tryb prywatny, wyczyszczone dane): wtedy zwraca false i strona działa dalej. */
export function zapiszWybor(pamiec: Pamiec, wybor: Wybor): boolean {
  try {
    pamiec.setItem(KLUCZ_WYBORU, wybor);
    return true;
  } catch {
    return false;
  }
}

/** Nazwy ciasteczek analityki Google (_ga i _ga_*) z ciągu document.cookie. */
export function ciasteczkaGoogle(ciag: string): string[] {
  return ciag
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((nazwa) => nazwa === '_ga' || /^_ga_.+/.test(nazwa));
}

/** Wartości atrybutu domain do próby usunięcia ciasteczka: bez domeny, host i jego domeny nadrzędne (bez samej końcówki, np. pl). */
export function domenyDoUsuniecia(host: string): string[] {
  const wynik = ['', host, `.${host}`];
  const czesci = host.split('.');
  for (let i = 1; i <= czesci.length - 2; i++) {
    const sufiks = czesci.slice(i).join('.');
    wynik.push(sufiks, `.${sufiks}`);
  }
  return wynik;
}
