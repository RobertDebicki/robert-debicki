import { describe, expect, it } from 'vitest';
import { podzielZdania, sprawdzUsluge, sprawdzWpis, tekstUslugi, wzorFrazy, type Opcje } from '../../skrypty/dnk';

// Wpis zgodny z zasadami DNK (master prompt, 16.11.2026). Treść zmyślona, tylko do testu.
const WPIS = `---
tytul: "Automatyzacja faktur w małej firmie"
data: 2026-11-16
zajawka: "Automatyzacja faktur w małej firmie: odczyt PDF, dane w arkuszu i 4 kroki wdrożenia. Napisz, ile faktur miesięcznie przepisujesz ręcznie."
---
**Automatyzacja faktur** zdejmuje z księgowej przepisywanie kwot z plików PDF do arkusza w każdym miesiącu. Opisuję, jak buduję taki proces w n8n dla małej firmy usługowej. Masz stos faktur do przepisania i mało czasu? Napisz do mnie.

## Skąd bierze się ręczne przepisywanie faktur

Faktury przychodzą mailem jako pliki PDF od kilkunastu dostawców z różnych branż. Każdą ktoś otwiera, czyta kwotę i termin, a potem wpisuje je ręcznie do arkusza. Przy kilkudziesięciu fakturach w miesiącu to kilka godzin pracy w każdym tygodniu.

![Stos faktur PDF w skrzynce pocztowej obok pustego arkusza do uzupełnienia](/src/assets/wpisy/przyklad-1.png)

*Punkt wyjścia: faktury w poczcie, dane w arkuszu.*

## Jak działa odczyt faktur w n8n

Scenariusz w n8n pobiera załączniki z poczty raz dziennie, zawsze o tej samej porze. Model językowy czyta z każdej faktury kwotę, termin płatności i numer konta dostawcy. Dane trafiają do arkusza, a niepewne odczyty czekają na potwierdzenie człowieka. Więcej o takich procesach piszę przy usłudze [wdrożenie AI i automatyzacja](/uslugi/ai-i-automatyzacja/).

![Schemat procesu: poczta, odczyt faktury przez model językowy, arkusz i potwierdzenie człowieka](/src/assets/wpisy/przyklad-2.png)

*Cztery kroki od maila do wiersza w arkuszu.*

## Co zmienia się w pracy biura

Księgowa sprawdza już tylko te odczyty, które system oznaczył jako niepewne. Reszta danych trafia do arkusza bez jej udziału i bez przepisywania. Nie podaję liczby zaoszczędzonych godzin, bo zależy od liczby faktur w danej firmie.

## Najczęstsze pytania o automatyzację faktur

### Czy automatyzacja faktur działa z każdym dostawcą?
Tak, jeśli faktura jest plikiem PDF albo skanem dobrej jakości. Nietypowe układy częściej trafiają do potwierdzenia przez człowieka.

### Ile trwa wdrożenie u mnie w firmie?
Zwykle kilka dni roboczych od pierwszej rozmowy. Czas zależy od liczby skrzynek pocztowych i miejsc zapisu danych.

### Czy muszę zmieniać program, którego używa biuro?
Nie. Dane mogą trafiać do arkusza albo bazy, z której biuro korzysta już dzisiaj.

### Co się dzieje, gdy model źle odczyta kwotę?
Niepewny odczyt czeka na potwierdzenie człowieka, zanim trafi do arkusza. Pewne odczyty sprawdzaj wyrywkowo raz w miesiącu.

### Gdzie trafiają dane z faktur i kto je widzi?
Do arkusza albo bazy, którą wskażesz przed startem prac. Przed wdrożeniem ustalamy razem, które usługi mogą widzieć te dane.

**Napisz do mnie: office@robert-debicki.pl** i podaj, ile faktur miesięcznie przepisujesz. Odpowiem z wyceną.
`;
const OPCJE_WPISU: Opcje = { fraza: 'automatyzacja faktur', dodatkowe: ['odczyt faktur', 'n8n'] };
const wpis = (zmiana: (t: string) => string = (t) => t, o: Partial<Opcje> = {}) => sprawdzWpis(zmiana(WPIS), { ...OPCJE_WPISU, ...o });
const blad = (w: { bledy: string[] }, fragment: string) => expect(w.bledy.join('\n')).toContain(fragment);

describe('wzorFrazy i podzielZdania', () => {
  it('łapie odmianę frazy', () => {
    expect(wzorFrazy('automatyzacja faktur').test('O automatyzację faktur pytacie często')).toBe(true);
    expect(wzorFrazy('voice bot dla firmy').test('Voice boty dla firm')).toBe(true);
  });
  it('nie tnie zdań po skrótach', () => {
    expect(podzielZdania('Tak. Trwa to ok. 2 tygodnie, np. przy fakturach. Potem koniec.')).toHaveLength(3);
  });
});

describe('sprawdzWpis', () => {
  it('wpis wzorcowy przechodzi bez błędów', () => {
    expect(wpis().bledy).toEqual([]);
  });
  it('tytuł strony z marką poza 40 do 58 znaków', () => {
    blad(wpis((t) => t.replace('tytul: "Automatyzacja faktur w małej firmie"', 'tytul: "Automatyzacja faktur"')), '40 do 58');
  });
  it('tytuł nie zaczyna się od frazy', () => {
    blad(wpis((t) => t.replace('tytul: "Automatyzacja faktur w małej firmie"', 'tytul: "Mała firma i automatyzacja faktur"')), 'zaczynać się od frazy');
  });
  it('opis bez liczby, bez wezwania, poza długością', () => {
    blad(wpis((t) => t.replace('i 4 kroki wdrożenia', 'i kroki wdrożenia')), 'liczby');
    blad(wpis((t) => t.replace('Napisz, ile faktur', 'Sprawa dotyczy tego, ile faktur')), 'wezwania');
    blad(wpis((t) => t.replace('miesięcznie przepisujesz ręcznie.', 'przepisujesz.')), '125 do 150');
  });
  it('liczba H2 poza 4 do 6', () => {
    blad(wpis((t) => t.replace('## Co zmienia się w pracy biura', 'Co zmienia się w pracy biura')), '4 do 6');
  });
  it('nagłówek Wstęp i H4', () => {
    blad(wpis((t) => t.replace('## Co zmienia się w pracy biura', '## Wstęp')), 'Wstęp');
    blad(wpis((t) => t.replace('## Co zmienia się w pracy biura', '## Co zmienia się w pracy biura\n\n#### Detal')), 'H4');
  });
  it('pogrubiona fraza nie w pierwszym zdaniu i za długi wstęp', () => {
    blad(wpis((t) => t.replace('**Automatyzacja faktur** zdejmuje', 'Automatyzacja faktur zdejmuje')), 'pierwsze zdanie');
    blad(wpis((t) => t.replace('Napisz do mnie.\n', 'Napisz do mnie. Odpowiadam szybko.\n')), 'wstęp');
  });
  it('fraza główna i dodatkowa za często', () => {
    blad(wpis((t) => t.replace('Reszta danych', 'Automatyzacja faktur działa. Automatyzacja faktur trwa. Automatyzacja faktur pomaga. Reszta danych')), '4 do 6');
    blad(wpis((t) => t.replace('Reszta danych', 'W n8n to proste. W n8n to szybkie. Reszta danych')), '1 do 3');
  });
  it('linki: zero, za dużo, mailto, za długi anchor', () => {
    blad(wpis((t) => t.replace('[wdrożenie AI i automatyzacja](/uslugi/ai-i-automatyzacja/)', 'wdrożeniu AI')), '1 albo 2');
    blad(wpis((t) => t.replace('Reszta danych', 'Zobacz [voiceboty dla firm](/uslugi/voiceboty/) i [strony i aplikacje](/uslugi/strony-i-aplikacje/). Reszta danych')), '1 albo 2');
    blad(wpis((t) => t.replace('**Napisz do mnie: office@robert-debicki.pl**', '**Napisz do mnie: [office@robert-debicki.pl](mailto:office@robert-debicki.pl)**')), 'bez linku');
    blad(wpis((t) => t.replace('[wdrożenie AI i automatyzacja]', '[wdrożenie AI i automatyzacja procesów w firmie]')), '2 do 5 słów');
  });
  it('zdjęcia: jedno, bez podpisu, alt od słowa Zdjęcie, alt za długi', () => {
    blad(wpis((t) => t.replace(/!\[Schemat[^\n]*\n\n\*Cztery[^\n]*\n/, '')), 'zdjęć');
    blad(wpis((t) => t.replace('\n\n*Cztery kroki od maila do wiersza w arkuszu.*', '')), 'podpis');
    blad(wpis((t) => t.replace('![Stos faktur', '![Zdjęcie: stos faktur')), 'Zdjęcie');
    blad(wpis((t) => t.replace('obok pustego arkusza do uzupełnienia', 'obok pustego arkusza do uzupełnienia przez księgową w biurze rachunkowym małej firmy')), '30 do 110');
  });
  it('FAQ: nagłówek bez wzoru DNK, za mało pytań, za długa odpowiedź', () => {
    blad(wpis((t) => t.replace('## Najczęstsze pytania o automatyzację faktur', '## Pytania i odpowiedzi')), 'Najczęstsze pytania o');
    blad(wpis((t) => t.replace(/### Gdzie trafiają[^\n]*\n[^\n]*\n\n/, '')), '5 do 7');
    blad(wpis((t) => t.replace('Nie. Dane mogą', 'Nie. Tak. Raczej nie. Dane mogą')), '3 zdania');
  });
  it('brak wezwania na końcu nie zmienia liczby pytań FAQ', () => {
    const w = wpis((t) => t.replace(/\n\*\*Napisz do mnie[^\n]*\n$/, '\n'));
    expect(w.bledy.join('\n')).not.toContain('pytań w FAQ');
    blad(w, 'pogrubi');
  });
  it('zakończenie: bez pogrubienia, bez e-maila, za długie', () => {
    blad(wpis((t) => t.replace('**Napisz do mnie: office@robert-debicki.pl**', 'Napisz do mnie: office@robert-debicki.pl')), 'pogrubi');
    blad(wpis((t) => t.replace('**Napisz do mnie: office@robert-debicki.pl**', '**Napisz do mnie**')), 'e-mail');
    blad(wpis((t) => t.replace('Odpowiem z wyceną.', 'Odpowiem z wyceną. ' + 'Opiszę też kolejne kroki wdrożenia. '.repeat(4))), '200');
  });
  it('język: średnik, zdanie ponad 28 słów, myślnik, wata w środku słowa', () => {
    blad(wpis((t) => t.replace('Reszta danych trafia', 'Reszta danych; trafia')), 'średnik');
    blad(wpis((t) => t.replace('Reszta danych trafia', 'Reszta danych ' + 'i kolejnych pozycji '.repeat(9) + 'trafia')), '28 słów');
    blad(wpis((t) => t.replace('Reszta danych trafia', 'Reszta danych - trafia')), 'myślnik');
    blad(wpis((t) => t.replace('Reszta danych trafia', 'Gotowe dane trafiają')), 'oto');
    blad(wpis((t) => t.replace('Reszta danych trafia', 'Wartość danych trafia')), 'warto');
  });
  it('słowa i długość z panelu', () => {
    expect(wpis(undefined, { slowa: { arkusz: [1, 20] } }).bledy).toEqual([]);
    blad(wpis(undefined, { slowa: { arkusz: [1, 2] } }), '„arkusz”');
    blad(wpis(undefined, { dlugosc: [761, 1809] }), 'słów');
  });
});

// Usługa zgodna z zasadami w tym, co pozwala szablon strony usługi. Treść zmyślona.
const USLUGA = {
  tytul: 'Automatyzacja faktur w Twojej firmie',
  nazwa: 'Automatyzacja faktur',
  tytulSeo: 'Automatyzacja faktur i odczyt PDF | Robert Dębicki',
  opis: 'Automatyzacja faktur w małej firmie: odczyt PDF przez AI, dane w arkuszu i 4 kroki wdrożenia. Napisz, ile faktur przepisujesz co miesiąc.',
  zajawka: 'Faktury czyta model językowy, dane trafiają do arkusza.',
  ikona: 'dokument',
  sektor: 'Faktury, n8n',
  rola: 'Odczyt dokumentów',
  rolaWyroznienie: '/ n8n',
  lead: '**Automatyzacja faktur** zdejmuje z biura przepisywanie kwot z plików PDF do arkusza. Buduję takie procesy w n8n dla małych firm usługowych.',
  akapit: 'Model językowy czyta kwotę, termin i konto, a niepewne odczyty czekają na człowieka. Wrocław albo zdalnie, w zależności od tego, jak wolisz pracować.',
  karta: [{ etykieta: 'Narzędzia', wartosc: 'n8n, Airtable, arkusz Google' }],
  problemy: {
    tytul: 'Faktury przepisywane ręcznie co miesiąc',
    wstep: 'Tak wygląda praca biura przed wdrożeniem, które opisuję na tej stronie.',
    pozycje: [{ tytul: 'Kwoty przepisywane z PDF', tekst: 'Ktoś otwiera każdą fakturę, czyta kwotę i termin, a potem wpisuje je do arkusza.' }],
  },
  kroki: {
    tytul: 'Jak działa odczyt faktur w praktyce',
    pozycje: [{ tytul: 'Poczta i załączniki', tekst: 'Scenariusz pobiera załączniki z poczty raz dziennie i przekazuje je do odczytu.' }],
  },
  przyklady: {
    tytul: 'Przykład wdrożenia w biurze',
    pozycje: [{
      ikona: 'dokument', sektor: 'Biuro usługowe', tytul: 'Odczyt wniosków w zespole',
      tekst: 'System czyta wnioski z poczty i zapisuje dane w jednej bazie dla całego zespołu.', stos: ['n8n', 'Airtable'],
      link: { tekst: 'zobacz opis odczytu dokumentów', adres: '/wpisy/automatyczny-odczyt-dokumentow/' },
    }],
  },
  faq: {
    tytul: 'Najczęstsze pytania o automatyzację faktur',
    pozycje: [
      { pytanie: 'Czy automatyzacja faktur działa z każdym dostawcą?', odpowiedz: 'Tak, jeśli faktura jest plikiem PDF albo dobrym skanem. Nietypowe układy trafiają do potwierdzenia.' },
      { pytanie: 'Ile trwa wdrożenie u mnie w biurze?', odpowiedz: 'Zwykle kilka dni roboczych od pierwszej rozmowy. Zależy od liczby skrzynek pocztowych.' },
      { pytanie: 'Czy muszę zmieniać program, którego używam?', odpowiedz: 'Nie. Dane trafiają do arkusza albo bazy, z której już korzystasz.' },
      { pytanie: 'Co się dzieje, gdy model pomyli kwotę?', odpowiedz: 'Niepewny odczyt czeka na potwierdzenie człowieka, zanim trafi dalej.' },
      { pytanie: 'Kto widzi dane z moich faktur?', odpowiedz: 'Tylko usługi, które razem wskażemy przed startem prac. Ustalamy to na piśmie.' },
    ],
  },
  zdjecia: [
    { plik: '/src/assets/uslugi/faktury-1.png', alt: 'Cztery kroki odczytu faktur od poczty do arkusza w n8n' },
    { plik: '/src/assets/uslugi/faktury-2.png', alt: 'Porównanie pracy biura przed i po automatyzacji faktur' },
  ],
  wezwanie: '**Napisz do mnie: office@robert-debicki.pl** i podaj, ile faktur przepisujesz co miesiąc.',
  kolejnosc: 9,
};
const OPCJE_USLUGI: Opcje = { fraza: 'automatyzacja faktur', dodatkowe: ['odczyt faktur'] };
const usluga = (zmiana: (d: typeof USLUGA) => void = () => {}) => {
  const d = structuredClone(USLUGA);
  zmiana(d);
  return sprawdzUsluge(d, OPCJE_USLUGI);
};

describe('sprawdzUsluge', () => {
  it('usługa wzorcowa przechodzi bez błędów i bez uwag o pogrubieniu, zdjęciach i wezwaniu', () => {
    const w = usluga();
    expect(w.bledy).toEqual([]);
    expect(w.uwagi.join('\n')).not.toMatch(/szablon|zdjęć|wezwani|pogrub/);
  });
  it('tytuł w wyszukiwarce, opis i H1', () => {
    blad(usluga((d) => { d.tytulSeo = 'Odczyt PDF i automatyzacja faktur | Robert Dębicki'; }), 'zaczynać się od frazy');
    blad(usluga((d) => { d.opis = d.opis.replace('4 kroki', 'kroki'); }), 'liczby');
    blad(usluga((d) => { d.tytul = 'Faktury w Twojej firmie'; }), 'H1');
  });
  it('nagłówek FAQ i liczba pytań', () => {
    blad(usluga((d) => { d.faq.tytul = 'Pytania i odpowiedzi'; }), 'Najczęstsze pytania o');
    blad(usluga((d) => { d.faq.pozycje = d.faq.pozycje.slice(0, 3); }), '5 do 7');
  });
  it('fraza w pierwszym zdaniu leadu i wata', () => {
    blad(usluga((d) => { d.lead = 'Buduję procesy w n8n dla małych firm. Automatyzacja faktur zdejmuje przepisywanie.'; }), 'pierwsze zdanie');
    blad(usluga((d) => { d.akapit = d.akapit.replace('Wrocław', 'Gotowe procesy, Wrocław'); }), 'oto');
  });
});

describe('sprawdzUsluge: pogrubienie, zdjęcia i wezwanie (Task 9, 23.11)', () => {
  it('fraza główna w leadzie bez pogrubienia to błąd DNK 4', () => {
    blad(usluga((d) => { d.lead = d.lead.replace('**Automatyzacja faktur**', 'Automatyzacja faktur'); }), 'pogrubion');
  });
  it('pogrubione inne słowa niż fraza główna to błąd DNK 4', () => {
    blad(usluga((d) => { d.lead = d.lead.replace('**Automatyzacja faktur** zdejmuje', 'Automatyzacja faktur **zdejmuje**'); }), 'pogrubion');
  });
  it('brak wezwania to błąd DNK 8', () => {
    blad(usluga((d) => { delete (d as Partial<typeof d>).wezwanie; }), 'DNK 8');
  });
  it('wezwanie bez e-maila w pogrubieniu na początku i dłuższe niż 200 znaków to błędy DNK 8', () => {
    blad(usluga((d) => { d.wezwanie = '**Napisz do mnie** na office@robert-debicki.pl i podaj liczbę faktur.'; }), 'pogrubieniu na początku');
    blad(usluga((d) => { d.wezwanie = d.wezwanie + ' a'.repeat(60); }), 'do 200');
  });
  it('zdjęcia poza 2 do 4 to uwaga DNK 7, zły alt to błąd', () => {
    const w = usluga((d) => { d.zdjecia = d.zdjecia.slice(0, 1); });
    expect(w.bledy).toEqual([]);
    expect(w.uwagi.join('\n')).toContain('DNK 7: 1 zdjęć');
    blad(usluga((d) => { d.zdjecia[0].alt = 'Krótki alt'; }), 'alt ma');
    blad(usluga((d) => { d.zdjecia[1].alt = d.zdjecia[0].alt; }), 'ten sam alt');
  });
  it('tekst strony nie ma gwiazdek, a wezwanie liczy się do frazy', () => {
    const t = tekstUslugi({ ...structuredClone(USLUGA) });
    expect(t).not.toContain('**');
    expect(t).toContain('Napisz do mnie: office@robert-debicki.pl i podaj');
    blad(usluga((d) => { d.wezwanie = '**Napisz do mnie: office@robert-debicki.pl** automatyzacja faktur, automatyzacja faktur, automatyzacja faktur, automatyzacja faktur.'; }), 'fraza główna');
  });
});

describe('po przeglądzie 16.11', () => {
  it('spacja na końcu nagłówka FAQ nie wyłącza kontroli pytań', () => {
    blad(wpis((t) => t.replace('## Najczęstsze pytania o automatyzację faktur', '## Najczęstsze pytania o automatyzację faktur ').replace('Nie. Dane mogą', 'Nie. Tak. Raczej nie. Dane mogą')), '3 zdania');
  });
  it('link zewnętrzny nie liczy się do 1 albo 2 linków', () => {
    blad(wpis((t) => t.replace('(/uslugi/ai-i-automatyzacja/)', '(https://example.com/x)')), '1 albo 2');
  });
  it('zdanie od słowa z cyfrą (n8n) jest osobnym zdaniem, „tys.” przed małą literą go nie tnie', () => {
    expect(podzielZdania('Zapier liczy zadania. n8n liczy uruchomienia. Make liczy operacje.')).toHaveLength(3);
    expect(podzielZdania('Objął 2 tys. wniosków. Koniec.')).toHaveLength(2);
    // Granica świadoma (runda 2 przeglądu): „r.” przed wielką literą kończy zdanie, bo częściej stoi na końcu zdania.
    expect(podzielZdania('W 2026 r. Robert wdrożył proces.')).toHaveLength(2);
  });
  it('fraza: bez obcych słów, z przecinkiem między słowami', () => {
    expect(wzorFrazy('make').test('makietę')).toBe(false);
    expect(wzorFrazy('odczyt faktur').test('odczucie faktury')).toBe(false);
    expect(wzorFrazy('n8n make czy zapier').test('n8n, Make czy Zapier')).toBe(true);
    expect(wzorFrazy('odczyt faktur').test('odczyty faktur')).toBe(true);
  });
  it('zapowiadanie treści i wezwanie bez e-maila w pogrubieniu', () => {
    blad(wpis((t) => t.replace('Opisuję, jak buduję', 'W tym artykule opisuję, jak buduję')), 'zapowiad');
    blad(wpis((t) => t.replace('**Napisz do mnie: office@robert-debicki.pl** i podaj', '**Napisz do mnie** na office@robert-debicki.pl i podaj')), 'pogrubi');
  });
  it('końce linii CRLF', () => {
    expect(sprawdzWpis(WPIS.replace(/\n/g, '\r\n'), OPCJE_WPISU).bledy).toEqual([]);
  });
  it('usługa: fraza liczona tylko w tym, co pokazuje strona (bez pola sektor)', () => {
    const w = usluga((d) => { d.sektor = 'automatyzacja faktur, automatyzacja faktur, automatyzacja faktur'; });
    expect(w.bledy).toEqual([]);
  });
});

describe('po przeglądzie 16.11, runda 2', () => {
  it('skróty i numeracja przed małą literą nie tną zdań, adres e-mail na końcu zdania tak', () => {
    expect(podzielZdania('Faktury, umowy itp. i inne pliki. Koniec.')).toHaveLength(2);
    expect(podzielZdania('Plan: 1. krok to rozmowa. Koniec.')).toHaveLength(2);
    expect(podzielZdania('Firma sp. z o.o. wdrożyła bota. Koniec.')).toHaveLength(2);
    expect(podzielZdania('Napisz: office@robert-debicki.pl. Odpowiem w dzień. Koniec.')).toHaveLength(3);
    expect(podzielZdania('Zapier liczy zadania. n8n liczy uruchomienia.')).toHaveLength(2);
  });
  it('odmiana krótkich słów frazy', () => {
    expect(wzorFrazy('mała firma').test('w małej firmie')).toBe(true);
    expect(wzorFrazy('baza danych').test('w bazie danych')).toBe(true);
    expect(wzorFrazy('make').test('makietę')).toBe(false);
    expect(wzorFrazy('odczyt faktur').test('odczucie faktury')).toBe(false);
  });
  it('adres //domena to link zewnętrzny, „niniejszy artykuł” to zapowiadanie', () => {
    blad(wpis((t) => t.replace('(/uslugi/ai-i-automatyzacja/)', '(//example.com/x)')), '1 albo 2');
    blad(wpis((t) => t.replace('Opisuję, jak buduję', 'W niniejszym artykule opisuję, jak buduję')), 'zapowiad');
  });
});
