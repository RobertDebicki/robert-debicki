import type { Jezyk } from './jezyki';

export interface SekcjaPolityki {
  naglowek: string;
  akapity?: string[];
  lista?: string[];
}
export interface Polityka {
  tytul: string;
  opisMeta: string;
  etykieta: string;
  wstep: string;
  sekcje: SekcjaPolityki[];
  aktualizacja: string;
}

// Teksty prawne trzymamy w kodzie, nie w panelu: zmiana wymaga przeglądu (wyjątek od zasady „treść z panelu”, decyzja Roberta 11.11). Adres e-mail pochodzi z ustawień w panelu.
const POLITYKI: Record<Jezyk, Polityka> = {
  pl: {
    tytul: 'Polityka prywatności',
    opisMeta: 'Jak ta strona traktuje dane: kto jest administratorem, co mierzy Google Analytics (tylko za zgodą), jak cofnąć zgodę i jak się ze mną skontaktować.',
    etykieta: 'Prywatność',
    wstep: 'Ta strona jest wizytówką zawodową. Zbieram o Tobie jak najmniej, a analitykę włączam wyłącznie za Twoją zgodą.',
    sekcje: [
      {
        naglowek: 'Kto odpowiada za dane',
        akapity: ['Administratorem danych jest Robert Dębicki, Wrocław. Kontakt w sprawach danych osobowych: {{email}}.'],
      },
      {
        naglowek: 'Jakie dane i po co',
        lista: [
          'Analityka odwiedzin (Google Analytics 4, wdrożone przez kontener tagu Google, tylko po zgodzie): informacje o korzystaniu ze strony, m.in. odwiedzane podstrony, typ urządzenia i przeglądarki, przybliżona lokalizacja oraz kliknięcia w adres e-mail, numer telefonu i link do LinkedIn (bez treści wiadomości i rozmów). Cel: wiedzieć, ile osób czyta stronę i co je interesuje.',
          'Wiadomości e-mail: gdy piszesz na adres z tej strony, używam danych z wiadomości, żeby Ci odpowiedzieć i prowadzić dalszą korespondencję.',
          'Dane techniczne połączenia: strona działa na serwerach home.pl S.A., a serwer może zapisywać standardowe informacje o połączeniu (adres IP, czas, adres żądanego pliku). Cel: bezpieczeństwo i prawidłowe działanie strony.',
        ],
      },
      {
        naglowek: 'Podstawa prawna',
        lista: [
          'Analityka: Twoja zgoda (art. 6 ust. 1 lit. a RODO oraz przepisy Prawa komunikacji elektronicznej o plikach cookie).',
          'Wiadomości e-mail i dane techniczne połączenia: mój prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO), czyli kontakt z Tobą oraz bezpieczeństwo strony.',
        ],
      },
      {
        naglowek: 'Zgoda na analitykę i jej cofnięcie',
        akapity: [
          'Dopóki nie klikniesz „Akceptuję”, strona nie ładuje narzędzi Google i niczego do Google nie wysyła. Podanie danych i zgoda są dobrowolne, a brak zgody nie ogranicza korzystania ze strony.',
          'Zgodę możesz cofnąć w każdej chwili przyciskiem „Ustawienia cookies” w stopce strony. Po odrzuceniu usuwam z Twojej przeglądarki pliki cookie analityki, a jeśli analityka była już włączona w tej wizycie, odświeżam stronę, żeby przestała działać. Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania sprzed cofnięcia.',
        ],
      },
      {
        naglowek: 'Pliki cookie i pamięć przeglądarki',
        lista: [
          'Pliki cookie _ga oraz _ga_* (Google Analytics): odróżniają odwiedzających i pozwalają policzyć odwiedziny. Ustawiane tylko po zgodzie.',
          'Wpis zgoda-analityka w pamięci przeglądarki (localStorage): zapamiętuje Twój wybór, żeby nie pytać przy każdej wizycie. Jest niezbędny do działania banera i nie wymaga zgody.',
          'Czcionki są ładowane z tej samej domeny co strona, bez zewnętrznych serwerów czcionek.',
        ],
      },
      {
        naglowek: 'Komu przekazuję dane',
        akapity: [
          'Google Ireland Limited jako dostawca Google Analytics (tylko po zgodzie) oraz home.pl S.A. jako dostawca hostingu. Google może przetwarzać dane także poza Europejskim Obszarem Gospodarczym, na podstawie mechanizmów przewidzianych w RODO, takich jak standardowe klauzule umowne albo decyzja o adekwatności.',
          'Link do LinkedIn prowadzi na zewnętrzną stronę z własną polityką prywatności.',
        ],
      },
      {
        naglowek: 'Jak długo przechowuję dane',
        lista: [
          'Dane analityczne: przez okres ustawiony w usłudze Google Analytics.',
          'Twój wybór w banerze: do wyczyszczenia danych przeglądarki.',
          'Wiadomości e-mail: tak długo, jak potrzeba do odpowiedzi i ewentualnej dalszej korespondencji.',
        ],
      },
      {
        naglowek: 'Twoje prawa',
        akapity: [
          'Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie. Napisz na {{email}}.',
          'Masz też prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO).',
        ],
      },
    ],
    aktualizacja: 'Aktualizacja: 11 listopada 2026',
  },
  en: {
    tytul: 'Privacy policy',
    opisMeta: 'How this site handles data: who the controller is, what Google Analytics measures (only with consent), how to withdraw consent and how to contact me.',
    etykieta: 'Privacy',
    wstep: 'This site is a professional portfolio. I collect as little about you as possible, and I turn analytics on only with your consent.',
    sekcje: [
      {
        naglowek: 'Who is responsible for the data',
        akapity: ['The data controller is Robert Dębicki, Wrocław, Poland. Contact for personal data matters: {{email}}.'],
      },
      {
        naglowek: 'What data and why',
        lista: [
          'Visit analytics (Google Analytics 4, deployed through a Google tag container, only with consent): information about how the site is used, including pages visited, device and browser type, approximate location and clicks on the email address, the phone number and the LinkedIn link (never the content of any message or call). Purpose: to know how many people read the site and what interests them.',
          'Email messages: when you write to the address on this site, I use the data in your message to reply and to continue the correspondence.',
          'Technical connection data: the site runs on servers of home.pl S.A., and the server may record standard connection information (IP address, time, requested file). Purpose: security and correct operation of the site.',
        ],
      },
      {
        naglowek: 'Legal basis',
        lista: [
          'Analytics: your consent (Article 6(1)(a) GDPR and the provisions of the Polish Electronic Communications Law on cookies).',
          'Email messages and technical connection data: my legitimate interest (Article 6(1)(f) GDPR), which is communicating with you and keeping the site secure.',
        ],
      },
      {
        naglowek: 'Analytics consent and withdrawing it',
        akapity: [
          'Until you click "Accept", the site does not load any Google tools and sends nothing to Google. Providing data and consent are voluntary, and declining does not limit how you can use the site.',
          'You can withdraw consent at any time with the "Cookie settings" button in the page footer. After you decline, I remove the analytics cookies from your browser, and if analytics was already running in this visit, I reload the page so it stops. Withdrawing consent does not affect the lawfulness of processing before the withdrawal.',
        ],
      },
      {
        naglowek: 'Cookies and browser storage',
        lista: [
          'The _ga and _ga_* cookies (Google Analytics): they tell visitors apart and let me count visits. Set only after consent.',
          'The zgoda-analityka entry in browser storage (localStorage): it remembers your choice so I do not ask on every visit. It is necessary for the banner to work and does not require consent.',
          'Fonts are loaded from the same domain as the site, with no external font servers.',
        ],
      },
      {
        naglowek: 'Who receives the data',
        akapity: [
          'Google Ireland Limited as the provider of Google Analytics (only with consent) and home.pl S.A. as the hosting provider. Google may also process data outside the European Economic Area, relying on mechanisms provided for in the GDPR, such as standard contractual clauses or an adequacy decision.',
          'The LinkedIn link leads to an external site with its own privacy policy.',
        ],
      },
      {
        naglowek: 'How long I keep the data',
        lista: [
          'Analytics data: for the period set in the Google Analytics service.',
          'Your banner choice: until you clear your browser data.',
          'Email messages: as long as needed to reply and for any further correspondence.',
        ],
      },
      {
        naglowek: 'Your rights',
        akapity: [
          'You have the right to access your data, have it corrected or erased, restrict processing, data portability, and to object to processing based on a legitimate interest. Write to {{email}}.',
          'You also have the right to lodge a complaint with the Polish supervisory authority, the President of the Personal Data Protection Office (UODO).',
        ],
      },
    ],
    aktualizacja: 'Last updated: November 11, 2026',
  },
};

/** Tytuł i opis do metatagów (bez adresu e-mail, który pochodzi z ustawień strony). */
export function politykaMeta(jezyk: Jezyk): Pick<Polityka, 'tytul' | 'opisMeta'> {
  const { tytul, opisMeta } = POLITYKI[jezyk];
  return { tytul, opisMeta };
}

/** Pełny tekst. Adres e-mail bierzemy z ustawień strony (panel), żeby nie dublować go w kodzie. */
export function polityka(jezyk: Jezyk, email: string): Polityka {
  const wstaw = (t: string) => t.replaceAll('{{email}}', email);
  const p = POLITYKI[jezyk];
  return { ...p, sekcje: p.sekcje.map((s) => ({ ...s, akapity: s.akapity?.map(wstaw), lista: s.lista?.map(wstaw) })) };
}
