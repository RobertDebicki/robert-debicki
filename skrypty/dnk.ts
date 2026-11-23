// Kontrola tekstu według zasad DNK (master prompt jego analizatora, 16.11.2026: progi, za które panel daje
// 100 punktów). Przybliżenie analizatora: sprawdza to, co da się zmierzyć w pliku. Ocenę wystawia analizator.
// Pełne zasady: wpis (`src/content/wpisy/<adres>/pl.md`). Usługa (`src/content/uslugi/<adres>/pl.md`): to, co pozwala
// szablon strony usługi: pogrubienie w polu lead, zdjęcia w polu zdjecia, wezwanie po FAQ w polu wezwanie.
// Użycie: npx tsx skrypty/dnk.ts <pl.md> --fraza "<fraza>" --dodatkowe "<fraza 1>" ["<fraza 2>"] [--slowa słowo=1-3 …] [--dlugosc 700-1000]
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { parse } from 'yaml';

export interface Opcje {
  fraza: string;
  dodatkowe: string[];
  /** Słowa z zakładki „Słowa” w panelu: słowo → [od, do] wystąpień, z odmianą. */
  slowa?: Record<string, [number, number]>;
  /** Długość tekstów konkurencji z panelu, w słowach. */
  dlugosc?: [number, number];
}
export interface Wynik { bledy: string[]; uwagi: string[] }

export const MARKA = ' | Robert Dębicki';
export const EMAIL = 'office@robert-debicki.pl';
const bezGwiazdek = (t: string) => t.replace(/\*\*(.+?)\*\*/g, '$1');
// Panel szuka tych ciągów liter w całym tekście, także w środku słów („gotowe” zawiera „oto”).
const WATA = ['warto', 'kluczow', 'w dzisiejszych czasach', 'podsumow', 'reasumując', 'oto', 'poniżej', 'dla jasności',
  'po ludzku', 'co ważne', 'co ciekawe', 'nie tylko', 'kompleksow', 'szeroki wybór', 'najwyższej jakości',
  'idealne rozwiązanie', 'idealnym rozwiązaniem', 'doskonał', 'niezawodn', 'innowacyj', 'zapraszamy do', 'nie czekaj',
  'gwarantujemy satysfakcję'];
const WEZWANIE = /(?<![\p{L}\p{N}])(zadzwoń|napisz|wyślij|zapytaj|wyceń|sprawdź|zobacz|zamów)(?![\p{L}\p{N}])/iu;
const ANCHOR_PUSTY = /^(tutaj|tu|więcej|czytaj więcej|kliknij|kliknij tutaj|zobacz|link|strona)$/i;
const SKROT = /(?<![\p{L}\p{N}])(ok|np|ul|al|tj|tzw|m\.in|godz|tel|wg|ds|dr|inż|mgr|prof|św|pkt|poz|ust|art|zob)\./giu;
const LINK = /(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g;
const ZDJECIE = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/;
const PODPIS = /^\*[^*].*\*$/;

// Krótkie słowa bez odmiany: przyimki i spójniki porównujemy dosłownie, inne krótkie słowa („bot”) z końcówką.
const NIEODMIENNE = new Set(['dla', 'pod', 'nad', 'bez', 'czy', 'lub', 'ani', 'oraz', 'przy', 'jak', 'co']);

/** Wzór frazy z odmianą: „automatyzacja faktur” łapie też „automatyzację faktur”. */
export function wzorFrazy(fraza: string): RegExp {
  const czesci = fraza.toLowerCase().split(/\s+/).filter(Boolean).map((s) => {
    const e = (x: string) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (s.length <= 2 || NIEODMIENNE.has(s)) return e(s);
    // Rdzeń: słowa do 3 liter całe („bot”), 4 do 6 liter bez ostatniej, dłuższe bez dwóch („odczyt” → „odczy”).
    // Końcówka krótkiego słowa najwyżej 3 litery („baza” łapie „bazie”, „make” nie łapie „makietę”).
    if (s.length <= 3) return e(s) + '[\\p{L}\\p{N}]{0,3}';
    if (s.length <= 4) return e(s.slice(0, -1)) + '[\\p{L}\\p{N}]{0,3}';
    return e(s.length <= 6 ? s.slice(0, -1) : s.slice(0, -2)) + '[\\p{L}\\p{N}]*';
  });
  // Między słowami frazy dopuszczamy przecinek („n8n, Make czy Zapier”).
  return new RegExp(`(?<![\\p{L}\\p{N}])${czesci.join('[\\s,]+')}(?![\\p{L}\\p{N}])`, 'iu');
}
const ile = (wzor: RegExp, tekst: string) => (tekst.match(new RegExp(wzor.source, 'giu')) ?? []).length;
const ma = (wzor: RegExp, tekst: string) => new RegExp(wzor.source, 'iu').test(tekst);

/** Zdania; kropka po skrócie („ok. 2”, „np. Paris”) nie kończy zdania. */
export function podzielZdania(tekst: string): string[] {
  const t = tekst.replace(SKROT, (_m, s: string) => `${s}\u0000`);
  // Nowe zdanie zaczyna się wielką literą, cyfrą albo słowem z cyfrą („n8n liczy…”). Po „itp.”, „sp. z o.o.” czy „1.”
  // stoi mała litera, więc zdanie trwa dalej. Granica: „w 2026 r. Robert” daje dwa zdania.
  return t.split(/(?<=[.!?])\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ0-9„*]|\p{Ll}+\p{N})|\n+/u)
    .map((z) => z.replace(/\u0000/g, '.').trim()).filter((z) => /[\p{L}\p{N}]/u.test(z));
}
const bezZnacznikow = (t: string) => t.replace(LINK, '$1').replace(/\*\*|\*/g, '');
const slowa = (t: string) => t.split(/\s+/).filter((s) => /[\p{L}\p{N}]/u.test(s)).length;

export function rozbierz(plik: string): { fm: Record<string, unknown>; tresc: string } {
  const m = plik.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('Plik bez nagłówka --- na początku.');
  return { fm: (parse(m[1]) ?? {}) as Record<string, unknown>, tresc: m[2] };
}

// Wspólne dla wpisu i usługi -------------------------------------------------------------------------------------

function tytulIOpis(w: Wynik, o: Opcje, tytul: string, opis: string) {
  const glowna = wzorFrazy(o.fraza);
  if (o.dodatkowe.length < 1 || o.dodatkowe.length > 3) w.bledy.push(`DNK 1: potrzebna 1 do 3 fraz dodatkowych, podano ${o.dodatkowe.length}`);
  if (tytul.length < 40 || tytul.length > 58) w.bledy.push(`DNK 2: tytuł strony „${tytul}” ma ${tytul.length} znaków, ma mieć 40 do 58 (z „${MARKA.trim()}”)`);
  if (!new RegExp(`^${glowna.source}`, 'iu').test(tytul)) w.bledy.push('DNK 2: tytuł strony ma zaczynać się od frazy głównej');
  if (!tytul.endsWith(MARKA)) w.bledy.push(`DNK 2: tytuł strony kończy się „${MARKA}”`);
  if (opis.length < 125 || opis.length > 150) w.bledy.push(`DNK 2: opis ma ${opis.length} znaków, ma mieć 125 do 150`);
  if (!ma(glowna, opis)) w.bledy.push('DNK 2: opis ma zawierać frazę główną');
  if (!WEZWANIE.test(opis)) w.bledy.push('DNK 2: opis bez wezwania: użyj jednego z: zadzwoń, napisz, wyślij, zapytaj, wyceń, sprawdź, zobacz, zamów');
  if (!/\d/.test(opis)) w.bledy.push('DNK 2: w opisie brak liczby (cena od albo termin, zawsze prawdziwa)');
}

function frazyWTekscie(w: Wynik, o: Opcje, widoczny: string) {
  const n = ile(wzorFrazy(o.fraza), widoczny);
  if (n < 4 || n > 6) w.bledy.push(`DNK 5: fraza główna „${o.fraza}” występuje ${n} razy, ma być 4 do 6 (z odmianą, z nagłówkami i FAQ)`);
  for (const f of o.dodatkowe) {
    const k = ile(wzorFrazy(f), widoczny);
    if (k < 1 || k > 3) w.bledy.push(`DNK 5: fraza dodatkowa „${f}” występuje ${k} razy, ma być 1 do 3`);
  }
}

function naglowekFaq(w: Wynik, o: Opcje, tytul: string) {
  if (!tytul.startsWith('Najczęstsze pytania o ')) w.bledy.push(`DNK 8: nagłówek FAQ „${tytul}” ma brzmieć „Najczęstsze pytania o [fraza główna]”`);
  else if (!ma(wzorFrazy(o.fraza), tytul)) w.bledy.push(`DNK 8: nagłówek FAQ „${tytul}” bez frazy głównej (w bierniku)`);
}

function faqPozycje(w: Wynik, pozycje: { pytanie: string; odpowiedz: string }[]) {
  if (pozycje.length < 5 || pozycje.length > 7) w.bledy.push(`DNK 8: ${pozycje.length} pytań w FAQ, ma być 5 do 7`);
  for (const p of pozycje) {
    if (!p.pytanie.trim().endsWith('?')) w.bledy.push(`DNK 8: pytanie „${p.pytanie}” bez znaku zapytania`);
    const n = podzielZdania(bezZnacznikow(p.odpowiedz)).length;
    if (n > 3) w.bledy.push(`DNK 8: odpowiedź na „${p.pytanie}” ma ${n} zdań, ma mieć 1 do 3 zdania`);
  }
}

function jezyk(w: Wynik, zdaniaTekstu: string[], caly: string) {
  if (zdaniaTekstu.length) {
    const dl = zdaniaTekstu.map(slowa);
    const srednia = dl.reduce((a, b) => a + b, 0) / dl.length;
    if (srednia > 18) w.bledy.push(`DNK 9: średnia długość zdania ${srednia.toFixed(1)} słowa, ma być 12 do 18`);
    else if (srednia < 12) w.uwagi.push(`DNK 9: średnia długość zdania ${srednia.toFixed(1)} słowa, DNK chce 12 do 18`);
    zdaniaTekstu.forEach((z, i) => { if (dl[i] > 28) w.bledy.push(`DNK 9: zdanie ma ${dl[i]} słów, najwyżej 28 słów: „${z.slice(0, 50)}”`); });
  }
  if (/\S [-–—] \S|[–—]/u.test(caly)) w.bledy.push('DNK 9: myślnik w zdaniu: zamień na kropkę albo przecinek');
  if (caly.includes(';')) w.bledy.push('DNK 9: średnik w tekście: zamień na kropkę albo przecinek');
  const zapowiedz = caly.match(/w tym (artykule|wpisie|tekście)|teraz (opowiem|opowiemy|pokażę)|w dalszej części|niniejsz/iu);
  if (zapowiedz) w.bledy.push(`DNK 9: zapowiadanie treści „${zapowiedz[0]}”: od razu pisz konkret`);
  for (const z of WATA) {
    const m = caly.match(new RegExp(`[\\p{L}\\p{N}]*${z}[\\p{L}\\p{N}]*`, 'iu'));
    if (!m) continue;
    w.bledy.push(m[0].toLowerCase() === z
      ? `DNK 9: wata „${m[0]}”: usuń albo zastąp konkretem`
      : `DNK 9: wata: „${m[0]}” zawiera „${z}”, a panel szuka tego ciągu w każdym słowie: użyj innego słowa`);
  }
}

function slowaIDlugosc(w: Wynik, o: Opcje, widoczny: string, domyslna?: [number, number]) {
  for (const [s, [od, doIlu]] of Object.entries(o.slowa ?? {})) {
    const n = ile(wzorFrazy(s), widoczny);
    if (n < od || n > doIlu) w.bledy.push(`DNK 10: słowo „${s}” występuje ${n} razy, panel chce ${od} do ${doIlu} (z odmianą)`);
  }
  const liczba = slowa(bezZnacznikow(widoczny));
  if (o.dlugosc && (liczba < o.dlugosc[0] || liczba > o.dlugosc[1])) w.bledy.push(`DNK 10: tekst ma około ${liczba} słów, konkurencja ${o.dlugosc[0]} do ${o.dlugosc[1]}: celuj w środek`);
  else if (!o.dlugosc && domyslna && (liczba < domyslna[0] || liczba > domyslna[1])) w.uwagi.push(`DNK 10: tekst ma około ${liczba} słów; bez danych z panelu DNK chce ${domyslna[0]} do ${domyslna[1]}`);
}

/** DNK 8: akapit po FAQ zaczyna się pogrubieniem z adresem e-mail i ma do 200 znaków (wpis i usługa). */
function wezwanieKoncowe(w: Wynik, koniec: string) {
  if (!koniec.startsWith('**')) w.bledy.push(`DNK 8: ostatni akapit (po FAQ) to wezwanie z pogrubieniem, np. „**Napisz do mnie: ${EMAIL}** …”`);
  if (!koniec.includes(EMAIL)) w.bledy.push(`DNK 8: w wezwaniu na końcu brak adresu e-mail ${EMAIL}`);
  else if (!(koniec.match(/^\*\*(.+?)\*\*/)?.[1] ?? '').includes(EMAIL)) w.bledy.push(`DNK 8: adres e-mail ma stać w pogrubieniu na początku wezwania: „**Napisz do mnie: ${EMAIL}** …”`);
  if (koniec.length > 200) w.bledy.push(`DNK 8: wezwanie na końcu ma ${koniec.length} znaków, ma mieć do 200`);
}

function alty(w: Wynik, lista: string[]) {
  for (const a of lista) {
    if (a.length < 30 || a.length > 110) w.bledy.push(`DNK 7: alt ma ${a.length} znaków, ma mieć 30 do 110: „${a.slice(0, 50)}”`);
    if (/^(zdjęcie|obraz|foto)/i.test(a)) w.bledy.push(`DNK 7: alt nie zaczyna się od „Zdjęcie”, „Obraz” ani „Foto”: „${a.slice(0, 50)}”`);
  }
  for (const a of new Set(lista.filter((x, i) => lista.indexOf(x) !== i))) w.bledy.push(`DNK 7: ten sam alt na kilku zdjęciach: „${a.slice(0, 50)}”`);
}

function linki(w: Wynik, lista: [string, string][], wymagane: boolean) {
  for (const [a, h] of lista) if (/^(mailto|tel):/.test(h)) w.bledy.push(`DNK 6: e-mail albo telefon „${a}” jako link: zostaw sam tekst, bez linku`);
  const zwykle = lista.filter(([, h]) => !/^(mailto|tel):|^#/.test(h));
  const wewnetrzne = zwykle.filter(([, h]) => h.startsWith('/') && !h.startsWith('//'));
  if (wymagane && (wewnetrzne.length < 1 || wewnetrzne.length > 2)) w.bledy.push(`DNK 6: ${wewnetrzne.length} linków do stron serwisu, ma być 1 albo 2, każdy do innej strony`);
  for (const [a, h] of zwykle) {
    const n = a.trim().split(/\s+/).length;
    if (n < 2 || n > 5 || ANCHOR_PUSTY.test(a.trim())) w.bledy.push(`DNK 6: anchor „${a}” ma ${n} słów, ma mieć 2 do 5 słów i mówić, dokąd prowadzi`);
    if (!h.startsWith('/') || h.startsWith('//')) w.uwagi.push(`DNK 6: link „${a}” prowadzi poza stronę (${h}); DNK liczy linki do własnych stron`);
  }
  const adresy = zwykle.map(([, h]) => h);
  for (const h of new Set(adresy.filter((x, i) => adresy.indexOf(x) !== i))) w.bledy.push(`DNK 6: adres ${h} linkowany więcej niż raz`);
}

// Wpis -----------------------------------------------------------------------------------------------------------

/** Kontrola pliku wpisu (`src/content/wpisy/<adres>/pl.md`). */
export function sprawdzWpis(plik: string, o: Opcje): Wynik {
  const w: Wynik = { bledy: [], uwagi: [] };
  const { fm, tresc } = rozbierz(plik);
  const tytul = String(fm.tytul ?? ''), zajawka = String(fm.zajawka ?? '');
  const glowna = wzorFrazy(o.fraza);
  tytulIOpis(w, o, `${tytul}${MARKA}`, zajawka);
  if (!ma(glowna, tytul)) w.bledy.push('DNK 3: nagłówek H1 (pole tytul) ma zawierać frazę główną');

  const wiersze = tresc.split('\n');
  if (wiersze.some((l) => /^#\s+\S/.test(l))) w.bledy.push('DNK 3: w treści jest nagłówek H1 (#); H1 to pole tytul, w treści zaczynaj od ##');
  const naglowki = wiersze.map((l) => l.match(/^(#{2,6})\s+(.+)$/)).filter((m): m is RegExpMatchArray => !!m).map((m) => ({ poziom: m[1].length, tekst: m[2].trim() }));
  const h2 = naglowki.filter((n) => n.poziom === 2);
  if (h2.length < 4 || h2.length > 6) w.bledy.push(`DNK 3: ${h2.length} nagłówków H2 (razem z nagłówkiem FAQ), ma być 4 do 6`);
  if (!h2.some((n) => [o.fraza, ...o.dodatkowe].some((f) => ma(wzorFrazy(f), n.tekst)))) w.bledy.push('DNK 3: żaden H2 nie ma frazy głównej ani dodatkowej');
  let poprzedni = 1;
  for (const n of naglowki) {
    if (n.poziom >= 4) w.bledy.push(`DNK 3: nagłówek H${n.poziom} „${n.tekst}”: bez H4, najniżej H3 pod H2`);
    else if (n.poziom > poprzedni + 1) w.bledy.push(`DNK 3: nagłówek H${n.poziom} „${n.tekst}” przed pierwszym H2`);
    poprzedni = n.poziom;
    if (/^wstęp\b/i.test(n.tekst)) w.bledy.push(`DNK 3: sekcja „${n.tekst}”: bez nagłówka Wstęp, wstęp stoi pod H1 bez nagłówka`);
  }

  // Wstęp: tekst przed pierwszym ##
  const wstep: string[] = [];
  for (const l of wiersze) {
    if (l.startsWith('## ')) break;
    if (l.trim() && !ZDJECIE.test(l.trim()) && !PODPIS.test(l.trim())) wstep.push(l.trim());
  }
  const zdaniaWstepu = podzielZdania(wstep.join(' ').replace(LINK, '$1'));
  const pierwsze = zdaniaWstepu[0] ?? '';
  if (![...pierwsze.matchAll(/\*\*(.+?)\*\*/g)].some((m) => ma(glowna, m[1]))) w.bledy.push('DNK 4: pierwsze zdanie wstępu ma zawierać pogrubioną frazę główną (**fraza**)');
  if (zdaniaWstepu.length < 2 || zdaniaWstepu.length > 4) w.bledy.push(`DNK 4: wstęp ma ${zdaniaWstepu.length} zdań, ma mieć 2 do 4 (co robisz, dla kogo, co zrobić teraz)`);

  // Zdjęcia: w treści (z podpisem) i z pola zdjecia (szablon rysuje je pod treścią)
  const altyZdjec: string[] = [];
  wiersze.forEach((l, i) => {
    const m = l.trim().match(ZDJECIE);
    if (!m) return;
    altyZdjec.push(m[1]);
    const nastepny = wiersze.slice(i + 1).find((x) => x.trim())?.trim() ?? '';
    if (!PODPIS.test(nastepny)) w.bledy.push(`DNK 7: zdjęcie w treści bez podpisu kursywą w następnej linii (*podpis*): „${m[1].slice(0, 50)}”`);
  });
  for (const z of (fm.zdjecia as { alt?: string }[] | undefined) ?? []) altyZdjec.push(String(z.alt ?? ''));
  if (altyZdjec.length < 2 || altyZdjec.length > 4) w.bledy.push(`DNK 7: ${altyZdjec.length} zdjęć na stronie wpisu, ma być 2 do 4`);
  const miniatura = (fm.miniatura as { alt?: string } | undefined)?.alt;
  alty(w, miniatura ? [...altyZdjec, miniatura] : altyZdjec);

  // FAQ: ostatnia sekcja H2, pod nią ### pytania; po ostatniej odpowiedzi akapit z wezwaniem
  const faqStart = wiersze.findIndex((l) => l.startsWith('## ') && l.trim() === `## ${h2.at(-1)?.tekst}`);
  const akapity = tresc.split(/\n\s*\n/).map((a) => a.trim()).filter(Boolean);
  const koniec = akapity.at(-1) ?? '';
  if (h2.length) naglowekFaq(w, o, h2.at(-1)!.tekst);
  if (faqStart >= 0) {
    // Wezwanie to osobny akapit po ostatniej odpowiedzi; gdy go brak, ostatni akapit jest pytaniem i zostaje w FAQ.
    const faqTekst = wiersze.slice(faqStart + 1).join('\n').replace(koniec.startsWith('**') ? koniec : '', '');
    const pozycje = faqTekst.split(/^### /m).slice(1).map((b) => {
      const [pytanie, ...reszta] = b.split('\n');
      return { pytanie: pytanie.trim(), odpowiedz: reszta.join(' ').trim() };
    });
    faqPozycje(w, pozycje);
  }
  wezwanieKoncowe(w, koniec);

  // Linki, frazy, język
  linki(w, [...tresc.matchAll(LINK)].map((m) => [m[1], m[2]] as [string, string]), true);
  const widoczny = [tytul, ...wiersze.filter((l) => !ZDJECIE.test(l.trim()))].join('\n').replace(LINK, '$1');
  frazyWTekscie(w, o, widoczny);
  const zdania = podzielZdania(bezZnacznikow(wiersze.filter((l) => l.trim() && !/^(#|!\[|\|)/.test(l.trim())).join('\n')));
  jezyk(w, zdania, [tytul, zajawka, widoczny, ...altyZdjec].join('\n'));
  slowaIDlugosc(w, o, widoczny, [700, 1000]);
  return w;
}

// Usługa ---------------------------------------------------------------------------------------------------------

interface Pozycja { tytul: string; tekst: string }
export interface DaneUslugi {
  tytul: string; tytulSeo: string; opis: string; lead: string; akapit: string; nazwa?: string; sektor?: string; rola?: string; rolaWyroznienie?: string;
  karta?: { etykieta: string; wartosc: string }[];
  problemy: { tytul: string; wstep: string; pozycje: Pozycja[] };
  kroki: { tytul: string; pozycje: Pozycja[] };
  przyklady: { tytul: string; pozycje: (Pozycja & { sektor?: string; liczba?: string; liczbaOpis?: string; stos?: string[]; link?: { tekst: string; adres: string } })[] };
  faq: { tytul: string; pozycje: { pytanie: string; odpowiedz: string }[] };
  zdjecia?: { plik: string; alt: string }[];
  wezwanie?: string;
}

const DOMYSLNE: string[] = [];

/** Tekst strony usługi w kolejności z `src/components/StronaUslugi.astro` (bez okruszków i pola sektor: strona ich nie pokazuje w treści). */
export function tekstUslugi(d: Partial<DaneUslugi> & Pick<DaneUslugi, 'tytul' | 'lead' | 'akapit' | 'problemy' | 'kroki' | 'przyklady' | 'faq'>): string {
  const c: string[] = [`# ${d.tytul}`, [d.rola, d.rolaWyroznienie].filter(Boolean).join(' '), bezGwiazdek(d.lead), d.akapit];
  if (d.karta?.length) c.push(d.karta.map((k) => `- ${k.etykieta}: ${k.wartosc}`).join('\n'));
  c.push(`## ${d.problemy.tytul}`, d.problemy.wstep, ...d.problemy.pozycje.flatMap((p) => [`### ${p.tytul}`, p.tekst]));
  c.push(`## ${d.kroki.tytul}`, ...d.kroki.pozycje.flatMap((p) => [`### ${p.tytul}`, p.tekst]));
  c.push(`## ${d.przyklady.tytul}`, ...d.przyklady.pozycje.flatMap((p) => [
    [p.liczba, p.liczbaOpis].filter(Boolean).join(' '), p.sektor ?? '', `### ${p.tytul}`, p.tekst, (p.stos ?? DOMYSLNE).join(', '),
    ...(p.link ? [`[${p.link.tekst}](${p.link.adres})`] : [])]));
  c.push(`## ${d.faq.tytul}`, ...d.faq.pozycje.flatMap((p) => [`### ${p.pytanie}`, p.odpowiedz]));
  if (d.wezwanie) c.push(bezGwiazdek(d.wezwanie));
  return c.filter(Boolean).join('\n\n') + '\n';
}

/** Kontrola usługi (`src/content/uslugi/<adres>/pl.md`): pola strony usługi, bez treści Markdown. */
export function sprawdzUsluge(d: DaneUslugi, o: Opcje): Wynik {
  const w: Wynik = { bledy: [], uwagi: [] };
  const glowna = wzorFrazy(o.fraza);
  tytulIOpis(w, o, d.tytulSeo, d.opis);
  if (!ma(glowna, d.tytul)) w.bledy.push('DNK 3: nagłówek H1 (pole tytul) ma zawierać frazę główną');
  const h2 = [d.problemy.tytul, d.kroki.tytul, d.przyklady.tytul, d.faq.tytul];
  if (!h2.some((t) => [o.fraza, ...o.dodatkowe].some((f) => ma(wzorFrazy(f), t)))) w.bledy.push('DNK 3: żaden H2 (problemy, kroki, przykłady, FAQ) nie ma frazy głównej ani dodatkowej');
  for (const t of h2) if (/^wstęp\b|podsumow/i.test(t)) w.bledy.push(`DNK 3: sekcja „${t}”: bez nagłówków Wstęp i Podsumowanie`);

  const pierwsze = podzielZdania(d.lead)[0] ?? '';
  if (!ma(glowna, bezGwiazdek(pierwsze))) w.bledy.push('DNK 4: pierwsze zdanie leadu (pod H1) ma zawierać frazę główną');
  else if (![...pierwsze.matchAll(/\*\*(.+?)\*\*/g)].some((m) => ma(glowna, m[1]))) w.bledy.push('DNK 4: fraza główna w pierwszym zdaniu leadu ma być pogrubiona (**fraza**)');
  const zdaniaWstepu = podzielZdania(`${bezGwiazdek(d.lead)} ${d.akapit}`).length;
  if (zdaniaWstepu < 2 || zdaniaWstepu > 4) w.bledy.push(`DNK 4: wstęp (lead i akapit) ma ${zdaniaWstepu} zdań, ma mieć 2 do 4`);

  naglowekFaq(w, o, d.faq.tytul);
  faqPozycje(w, d.faq.pozycje);
  const altyZdjec = (d.zdjecia ?? []).map((z) => String(z.alt ?? ''));
  if (altyZdjec.length < 2 || altyZdjec.length > 4) w.uwagi.push(`DNK 7: ${altyZdjec.length} zdjęć w polu zdjecia, DNK chce 2 do 4`);
  alty(w, altyZdjec);
  if (!d.wezwanie) w.bledy.push(`DNK 8: brak pola wezwanie (akapit pod FAQ), np. „**Napisz do mnie: ${EMAIL}** …”`);
  else wezwanieKoncowe(w, d.wezwanie.trim());

  const linkiPrzykladow = d.przyklady.pozycje.flatMap((p) => (p.link ? [[p.link.tekst, p.link.adres] as [string, string]] : []));
  linki(w, linkiPrzykladow, false);
  if (linkiPrzykladow.length < 1 || linkiPrzykladow.length > 2) w.uwagi.push(`DNK 6: ${linkiPrzykladow.length} linków w przykładach, DNK chce 1 albo 2`);

  // Fraza liczona w tym, co dostaje analizator i co widać na stronie (bez linii z adresem linku).
  const widoczny = tekstUslugi(d).replace(/^#+\s+/gm, '').replace(LINK, '$1');
  frazyWTekscie(w, o, widoczny);
  const zdania = [bezGwiazdek(d.lead), d.akapit, d.problemy.wstep, ...d.problemy.pozycje.map((p) => p.tekst), ...d.kroki.pozycje.map((p) => p.tekst),
    ...d.przyklady.pozycje.map((p) => p.tekst), ...d.faq.pozycje.map((p) => p.odpowiedz), ...(d.wezwanie ? [bezGwiazdek(d.wezwanie)] : [])].flatMap(podzielZdania);
  jezyk(w, zdania, [d.tytulSeo, d.opis, widoczny, ...altyZdjec].join('\n'));
  slowaIDlugosc(w, o, widoczny);
  return w;
}

// Polecenie ------------------------------------------------------------------------------------------------------

function zakres(v: string): [number, number] {
  const [a, b] = v.split(/\s*[-–—]\s*/).map(Number);
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error(`Zakres „${v}”: zapisz jako od-do, np. 2-4.`);
  return [a, b];
}

export function opcjeZArgumentow(argv: string[]): { plik: string; opcje: Opcje } {
  const plik = argv[0];
  const opcje: Opcje = { fraza: '', dodatkowe: [] };
  let tryb = '';
  for (const a of argv.slice(1)) {
    if (a.startsWith('--')) { tryb = a; if (a === '--slowa') opcje.slowa = {}; continue; }
    if (tryb === '--fraza') opcje.fraza = a;
    else if (tryb === '--dodatkowe') opcje.dodatkowe.push(a);
    else if (tryb === '--slowa') { const i = a.lastIndexOf('='); opcje.slowa![a.slice(0, i).trim()] = zakres(a.slice(i + 1)); }
    else if (tryb === '--dlugosc') opcje.dlugosc = zakres(a);
  }
  if (!plik || !opcje.fraza) throw new Error('Użycie: npx tsx skrypty/dnk.ts <pl.md> --fraza "<fraza>" --dodatkowe "<fraza 1>" [--slowa słowo=1-3] [--dlugosc 700-1000]');
  return { plik, opcje };
}

export function sprawdzPlik(plik: string, opcje: Opcje): Wynik {
  if (!plik.endsWith('pl.md')) throw new Error('Zasady DNK dotyczą tekstu polskiego (pl.md). Wersję EN sprawdza npm run sprawdz:tlumaczenia.');
  const tekst = readFileSync(plik, 'utf8');
  if (/[\\/]uslugi[\\/]/.test(plik)) return sprawdzUsluge(rozbierz(tekst).fm as unknown as DaneUslugi, opcje);
  if (/[\\/]wpisy[\\/]/.test(plik)) return sprawdzWpis(tekst, opcje);
  throw new Error('Zasady DNK dotyczą wpisów (src/content/wpisy) i usług (src/content/uslugi).');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { plik, opcje } = opcjeZArgumentow(process.argv.slice(2));
    const w = sprawdzPlik(plik, opcje);
    w.bledy.forEach((b) => console.log(`BŁĄD: ${b}`));
    w.uwagi.forEach((u) => console.log(`UWAGA: ${u}`));
    console.log(w.bledy.length ? `Błędów: ${w.bledy.length}. Popraw i uruchom jeszcze raz.` : 'OK: brak błędów według zasad DNK.');
    process.exit(w.bledy.length ? 1 : 0);
  } catch (e) {
    console.error((e as Error).message);
    process.exit(2);
  }
}
