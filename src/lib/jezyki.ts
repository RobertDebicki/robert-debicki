import type { Jezyk, Para } from './tresc';
export type { Jezyk };

/** Stałe teksty interfejsu, które nie są treścią z panelu. */
export interface Etykiety {
  wdrozenia: string;
  projekty: string;
  doswiadczenie: string;
  narzedzia: string;
  kontakt: string;
  zobaczWdrozenia: string;
  napiszDoMnie: string;
  kartaZlecenia: string;
  kopiujAdres: string;
  /** Tekst przycisku po skopiowaniu adresu. */
  skopiowano: string;
  /** Tekst przycisku, gdy kopiowanie nie jest dostępne i adres został tylko zaznaczony. */
  adresZaznaczony: string;
  menuSekcje: string;
  /** Druga część nazwy dostępnej linku z logo, po imieniu i nazwisku. */
  stronaGlowna: string;
  stopkaArkusz: string;
  stopkaFarby: string;
  wpisy: string;
  wszystkieWpisy: string;
  brakWpisow: string;
  referencje: string;
  wszystkieReferencje: string;
  brakReferencji: string;
  otworzSkan: string;
  otworzSkanPdf: string;
  /** Początek tekstu alternatywnego skanu, po nim imię i nazwisko osoby. */
  altSkanu: string;
  /** Nazwa dostępna przełącznika prowadzącego do wersji w TYM języku (link ma lang tego języka, widać tylko PL/EN). */
  wersjaJezyka: string;
}

// Typ Record<Jezyk, Etykiety> sprawia, że brak klucza w którymkolwiek języku jest błędem kompilacji.
const ETYKIETY: Record<Jezyk, Etykiety> = {
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
    skopiowano: 'Skopiowano',
    adresZaznaczony: 'Adres zaznaczony',
    menuSekcje: 'Sekcje',
    stronaGlowna: 'strona główna',
    stopkaArkusz: 'arkusz 1 z 1',
    stopkaFarby: 'czarny + 3 kolory dodatkowe · raster 15° / 75°',
    wpisy: 'Wpisy',
    wszystkieWpisy: 'Wszystkie wpisy',
    brakWpisow: 'Brak wpisów w tym języku.',
    referencje: 'Referencje',
    wszystkieReferencje: 'Wszystkie referencje',
    brakReferencji: 'Brak referencji w tym języku.',
    otworzSkan: 'Otwórz pełny skan referencji',
    otworzSkanPdf: 'Otwórz skan referencji (PDF)',
    altSkanu: 'Skan listu referencyjnego od',
    wersjaJezyka: 'Wersja polska',
  },
  en: {
    wdrozenia: 'Deployments',
    projekty: 'Projects',
    doswiadczenie: 'Experience',
    narzedzia: 'Tools',
    kontakt: 'Contact',
    zobaczWdrozenia: 'See deployments',
    napiszDoMnie: 'Write to me',
    kartaZlecenia: 'Job ticket',
    kopiujAdres: 'Copy address',
    skopiowano: 'Copied',
    adresZaznaczony: 'Address selected',
    menuSekcje: 'Sections',
    stronaGlowna: 'home page',
    stopkaArkusz: 'sheet 1 of 1',
    stopkaFarby: 'black + 3 spot colors · screen 15° / 75°',
    wpisy: 'Posts',
    wszystkieWpisy: 'All posts',
    brakWpisow: 'No posts in English yet.',
    referencje: 'References',
    wszystkieReferencje: 'All references',
    brakReferencji: 'No references in English yet.',
    otworzSkan: 'Open the full reference scan',
    otworzSkanPdf: 'Open the reference scan (PDF)',
    altSkanu: 'Scan of a reference letter from',
    wersjaJezyka: 'English version',
  },
};

export function etykiety(jezyk: Jezyk): Etykiety {
  return ETYKIETY[jezyk];
}

export type Kolekcja = 'wdrozenia' | 'projekty' | 'referencje' | 'wpisy';

/** Pozycja pojawia się w danym języku: PL zawsze, EN tylko z en.md (także w stanie do-aktualizacji). */
export function widocznaWJezyku(para: Para, jezyk: Jezyk): boolean {
  return jezyk === 'pl' || para.stanEn !== 'brak';
}

/**
 * Adres, na który prowadzi przełącznik języka na stronie pozycji `para` w języku `jezyk`.
 * To strona odpowiednika albo, gdy pozycji nie ma jeszcze po angielsku, lista EN tego rodzaju treści.
 * Wdrożenia i projekty nie mają własnych stron, żyją na stronie głównej.
 */
export function adresOdpowiednika(jezyk: Jezyk, kolekcja: Kolekcja, para: Para): string {
  if (jezyk === 'pl') {
    switch (kolekcja) {
      case 'wpisy':
        return widocznaWJezyku(para, 'en') ? `/en/posts/${para.adres}/` : '/en/posts/';
      case 'referencje':
        return '/en/references/';
      default:
        return '/en/';
    }
  }
  switch (kolekcja) {
    case 'wpisy':
      return `/wpisy/${para.adres}/`;
    case 'referencje':
      return '/referencje/';
    default:
      return '/';
  }
}
