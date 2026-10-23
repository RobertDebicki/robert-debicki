import type { Jezyk } from './tresc';
export type { Jezyk };

/** Stałe teksty interfejsu, które nie są treścią z panelu. Zadanie 6 dopisuje wersję angielską. */
const ETYKIETY = {
  pl: {
    wdrozenia: 'Wdrożenia',
    projekty: 'Projekty',
    doswiadczenie: 'Doświadczenie',
    narzedzia: 'Narzędzia',
    kontakt: 'Kontakt',
    zobaczWdrozenia: 'Zobacz wdrożenia',
    napiszDoMnie: 'Napisz do mnie',
    kartaZlecenia: 'Karta zlecenia',
    kopiujAdres: 'Kopiuj adres',
  },
};

export function etykiety(jezyk: Jezyk) {
  return ETYKIETY[jezyk as 'pl'] ?? ETYKIETY.pl;
}
