import { describe, expect, it } from 'vitest';
import { z } from 'astro/zod';
import { SCHEMATY, HOSTY_R2, type NazwaKolekcji } from '../../src/lib/schematy';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { konfiguracjaPanelu, SRI_SVELTII } from '../../src/lib/panel';

type Pole = Record<string, any>;
const konfig = konfiguracjaPanelu() as Pole;
const kolekcje: Pole[] = konfig.collections;

/** Pola panelu dla kolekcji o danej nazwie schematu. `ustawienia` to kolekcja plikowa z jednym plikiem. */
function polaPanelu(nazwa: NazwaKolekcji): Pole[] {
  const k = kolekcje.find((c) => c.name === nazwa)!;
  expect(k, `brak kolekcji ${nazwa} w panelu`).toBeTruthy();
  return k.files ? k.files[0].fields : k.fields;
}

/** Porównuje schemat Zod (JSON Schema liczony ze schematu, nie przepisana lista) z polami panelu. */
function porownaj(js: Pole, pola: Pole[], sciezka: string, bledy: string[], pomijane: string[] = []) {
  const wymagane = new Set<string>(js.required ?? []);
  for (const [nazwa, podschemat] of Object.entries<Pole>(js.properties ?? {})) {
    const gdzie = `${sciezka}.${nazwa}`;
    const pole = pola.find((p) => p.name === nazwa);
    if (!pole) {
      bledy.push(`${gdzie}: brak pola w panelu`);
      continue;
    }
    if ((pole.required !== false) !== wymagane.has(nazwa)) {
      bledy.push(`${gdzie}: schemat ${wymagane.has(nazwa) ? 'wymaga' : 'nie wymaga'} pola, panel odwrotnie`);
    }
    if (pole.widget === 'hidden') continue; // pola ustawiane przez skill: sprawdza je osobny test
    if (podschemat.enum) {
      const opcje = (pole.options ?? []).map((o: Pole) => (typeof o === 'string' ? o : o.value));
      if (pole.widget !== 'select' || JSON.stringify(opcje) !== JSON.stringify(podschemat.enum)) bledy.push(`${gdzie}: opcje wyboru różnią się od enum schematu`);
    } else if (podschemat.type === 'number' && pole.widget !== 'number') bledy.push(`${gdzie}: liczba, a widget ${pole.widget}`);
    else if (podschemat.type === 'boolean' && pole.widget !== 'boolean') bledy.push(`${gdzie}: boolean, a widget ${pole.widget}`);
    else if (podschemat.type === 'object') {
      if (pole.widget !== 'object') bledy.push(`${gdzie}: obiekt, a widget ${pole.widget}`);
      else porownaj(podschemat, pole.fields, gdzie, bledy);
    } else if (podschemat.type === 'array') {
      // lista nazw folderów może być wyborem z innej kolekcji (relation z multiple)
      const wybor = pole.widget === 'relation' && pole.multiple === true && podschemat.items?.type === 'string';
      if (pole.widget !== 'list' && !wybor) bledy.push(`${gdzie}: tablica, a widget ${pole.widget}`);
      if (podschemat.minItems !== undefined && pole.min !== podschemat.minItems) bledy.push(`${gdzie}: min ${pole.min} zamiast ${podschemat.minItems}`);
      if (podschemat.maxItems !== undefined && pole.max !== podschemat.maxItems) bledy.push(`${gdzie}: max ${pole.max} zamiast ${podschemat.maxItems}`);
      if (podschemat.items?.type === 'object') porownaj(podschemat.items, pole.fields ?? [], gdzie, bledy);
    }
  }
  // pole panelu spoza schematu panel zapisałby do pliku, a build by go odrzucił
  for (const p of pola) if (!(p.name in (js.properties ?? {})) && !pomijane.includes(p.name)) bledy.push(`${sciezka}.${p.name}: pole panelu nie istnieje w schemacie`);
}

describe('panel Sveltia: zgodność ze schematami', () => {
  for (const nazwa of Object.keys(SCHEMATY) as NazwaKolekcji[]) {
    it(`${nazwa}: wymagane pola, enumy i długości list jak w schemacie Zod`, () => {
      const js = z.toJSONSchema(SCHEMATY[nazwa], { io: 'input', unrepresentable: 'any' }) as Pole;
      const bledy: string[] = [];
      // `body` to treść Markdown pod frontmatterem, której schemat nie opisuje
      porownaj(js, polaPanelu(nazwa), nazwa, bledy, ['body']);
      expect(bledy).toEqual([]);
    });
  }

  it('schemat referencji faktycznie wymaga zgody (sanity: porównanie nie jest puste)', () => {
    const js = z.toJSONSchema(SCHEMATY.referencje, { io: 'input', unrepresentable: 'any' }) as Pole;
    expect(js.required).toEqual(expect.arrayContaining(['zgoda', 'skanUrl', 'cytat', 'data']));
    expect(js.required).not.toContain('tlumaczenie');
  });
});

describe('panel Sveltia: referencje', () => {
  const pola = () => polaPanelu('referencje');
  it('zgoda jest wymagana i ma podpowiedź o zgodzie klienta i zamazaniu podpisu', () => {
    const zgoda = pola().find((p) => p.name === 'zgoda')!;
    expect(zgoda.widget).toBe('boolean');
    expect(zgoda.required).not.toBe(false);
    expect(zgoda.hint).toMatch(/zgod/i);
    expect(zgoda.hint).toMatch(/zama[żz]/i);
    expect(zgoda.hint).toMatch(/podpis/i);
  });
  it('skanUrl to zwykłe pole tekstowe z adresem https i hostem R2 zgodnym ze schematem', () => {
    const skan = pola().find((p) => p.name === 'skanUrl')!;
    expect(skan.widget).toBe('string');
    const [wzor] = skan.pattern as [string, string];
    const re = new RegExp(wzor);
    for (const h of HOSTY_R2) expect(re.test(`https://pub-abc${h}/skan.pdf`)).toBe(true);
    expect(re.test('http://pub-abc.r2.dev/skan.pdf')).toBe(false);
    expect(re.test('https://example.com/skan.pdf')).toBe(false);
    expect(re.test('https://example.com/.r2.dev')).toBe(false);
  });
  it('skany nie mają folderu w repozytorium', () => {
    const k = kolekcje.find((c) => c.name === 'referencje')!;
    expect(JSON.stringify(k)).not.toMatch(/"widget":"(image|file)"/);
    expect(k.media_folder).toBeUndefined();
  });
});

describe('panel Sveltia: wpisy i zdjęcia', () => {
  const zdjecia = () => polaPanelu('wpisy').find((p) => p.name === 'zdjecia')!;
  it('alt jest wymagany, a plik wskazuje src/assets/wpisy ze ścieżką publiczną jak w polu plik', () => {
    const [plik, alt] = [zdjecia().fields.find((f: Pole) => f.name === 'plik'), zdjecia().fields.find((f: Pole) => f.name === 'alt')];
    expect(alt.required).not.toBe(false);
    expect(alt.hint).toBeTruthy();
    expect(plik.widget).toBe('image');
    expect(plik.media_folder).toBe('src/assets/wpisy');
    expect(plik.public_folder).toBe('/src/assets/wpisy');
    expect(konfig.media_folder).toBe('src/assets/wpisy');
    expect(konfig.public_folder).toBe('/src/assets/wpisy');
  });
  it('alt wymusza w panelu minimalną długość ze schematu Zod', () => {
    const min = (z.toJSONSchema(SCHEMATY.wpisy, { io: 'input', unrepresentable: 'any' }) as Pole).properties.zdjecia.items.properties.alt.minLength as number;
    expect(min).toBeGreaterThan(0);
    const alt = zdjecia().fields.find((f: Pole) => f.name === 'alt');
    const re = new RegExp(alt.pattern[0]);
    expect(re.test('a'.repeat(min))).toBe(true);
    expect(re.test('a'.repeat(min - 1))).toBe(false);
    expect(alt.pattern[1]).toMatch(new RegExp(String(min)));
  });
  it('miniatura jest opcjonalna, ma plik w src/assets/wpisy i alt z minimalną długością ze schematu', () => {
    const miniatura = polaPanelu('wpisy').find((p) => p.name === 'miniatura')!;
    expect(miniatura.widget).toBe('object');
    expect(miniatura.required).toBe(false);
    const [plik, alt] = [miniatura.fields.find((f: Pole) => f.name === 'plik'), miniatura.fields.find((f: Pole) => f.name === 'alt')];
    expect(plik.widget).toBe('image');
    expect(plik.media_folder).toBe('src/assets/wpisy');
    expect(plik.public_folder).toBe('/src/assets/wpisy');
    const min = (z.toJSONSchema(SCHEMATY.wpisy, { io: 'input', unrepresentable: 'any' }) as Pole).properties.miniatura.properties.alt.minLength as number;
    expect(min).toBeGreaterThan(0);
    expect(new RegExp(alt.pattern[0]).test('a'.repeat(min - 1))).toBe(false);
    expect(new RegExp(alt.pattern[0]).test('a'.repeat(min))).toBe(true);
  });
  it('wpis ma treść Markdown', () => {
    expect(polaPanelu('wpisy').find((p) => p.name === 'body')?.widget).toBe('markdown');
  });
});

describe('panel Sveltia: usługi', () => {
  const pola = () => polaPanelu('uslugi');
  it('adresEn jest opcjonalny, ma podpowiedź o angielskim adresie i wzorzec jak w schemacie', () => {
    const p = pola().find((f) => f.name === 'adresEn')!;
    expect(p.required).toBe(false);
    expect(p.hint).toMatch(/angielski adres strony, małe litery i dywizy/);
    const re = new RegExp(p.pattern[0]);
    expect(re.test('ai-and-automation')).toBe(true);
    expect(re.test('AI and automation')).toBe(false);
  });
  it('opis i tytulSeo pilnują w panelu długości ze schematu', () => {
    const opis = new RegExp(pola().find((f) => f.name === 'opis')!.pattern[0]);
    expect(opis.test('a'.repeat(119))).toBe(false);
    expect(opis.test('a'.repeat(120))).toBe(true);
    expect(opis.test('a'.repeat(155))).toBe(true);
    expect(opis.test('a'.repeat(156))).toBe(false);
    const seo = new RegExp(pola().find((f) => f.name === 'tytulSeo')!.pattern[0]);
    expect(seo.test('a'.repeat(60))).toBe(true);
    expect(seo.test('a'.repeat(61))).toBe(false);
  });
  it('ikona i kolejność są kopiowane z pl.md, teksty tłumaczone', () => {
    expect(pola().find((f) => f.name === 'ikona')!.i18n).toBe('duplicate');
    expect(pola().find((f) => f.name === 'kolejnosc')!.i18n).toBe('duplicate');
    expect(pola().find((f) => f.name === 'tytul')!.i18n).toBe(true);
  });
});

describe('panel Sveltia: podstrona rekrutera', () => {
  const rekruter = () => polaPanelu('ustawienia').find((p) => p.name === 'rekruter')!;
  const pole = (nazwa: string) => rekruter().fields.find((f: Pole) => f.name === nazwa)!;
  it('blok jest opcjonalny, a cvUrl to opcjonalny adres https na robert-debicki.pl albo w R2', () => {
    expect(rekruter().required).toBe(false);
    const cv = pole('cvUrl');
    expect(cv.required).toBe(false);
    const re = new RegExp(cv.pattern[0]);
    expect(re.test('https://robert-debicki.pl/cv/Robert-Debicki-CV.pdf')).toBe(true);
    for (const h of HOSTY_R2) expect(re.test(`https://pub-abc${h}/cv.pdf`)).toBe(true);
    expect(re.test('http://robert-debicki.pl/cv/cv.pdf')).toBe(false);
    expect(re.test('https://example.com/cv.pdf')).toBe(false);
    expect(re.test('https://zlyrobert-debicki.pl/cv.pdf')).toBe(false);
    expect(re.test('https://example.com/.r2.dev')).toBe(false);
  });
  it('wdrożenia i projekty wybiera się z listy pozycji (nazwa folderu), najwyżej trzy', () => {
    for (const [nazwa, kolekcja] of [['wdrozenia', 'wdrozenia'], ['projekty', 'projekty']]) {
      expect(pole(nazwa)).toMatchObject({ widget: 'relation', collection: kolekcja, value_field: '{{slug}}', multiple: true, max: 3 });
    }
  });
});

describe('panel Sveltia: języki', () => {
  it('struktura multiple_files, pl domyślny, en dodatkowy, nowa pozycja tylko po polsku', () => {
    expect(konfig.i18n).toMatchObject({ structure: 'multiple_files', locales: ['pl', 'en'], default_locale: 'pl', initial_locales: 'default' });
  });
  it('kolekcje folderowe zapisują folder na pozycję z pl.md i en.md, a ustawienia pliki {{locale}}.md', () => {
    for (const nazwa of ['wdrozenia', 'projekty', 'referencje', 'wpisy', 'uslugi']) {
      const k = kolekcje.find((c) => c.name === nazwa)!;
      expect(k.folder).toBe(`src/content/${nazwa}`);
      expect(k.path).toBe('{{slug}}/{{locale}}');
      expect(k.extension).toBe('md');
      expect(k.format).toBe('frontmatter');
      expect(k.i18n).toBe(true);
    }
    const u = kolekcje.find((c) => c.name === 'ustawienia')!;
    expect(u.files[0].file).toBe('src/content/ustawienia/{{locale}}.md');
    expect(u.files[0].i18n).toBe(true);
  });
  it('tlumaczenie i zrodlo są ukryte i opcjonalne w każdej kolekcji (ustawia je skill, nie człowiek)', () => {
    for (const nazwa of Object.keys(SCHEMATY) as NazwaKolekcji[]) {
      for (const pole of ['tlumaczenie', 'zrodlo']) {
        const p = polaPanelu(nazwa).find((f) => f.name === pole)!;
        expect(p, `${nazwa}.${pole}`).toBeTruthy();
        expect(p.widget).toBe('hidden');
        expect(p.required).toBe(false);
        expect(p.i18n, `${nazwa}.${pole} musi trafiać do en.md`).toBe(true);
      }
    }
  });
  it('każde pole najwyższego poziomu ma ustawione i18n (bez tego trafiłoby tylko do pl.md)', () => {
    for (const nazwa of Object.keys(SCHEMATY) as NazwaKolekcji[]) {
      for (const p of polaPanelu(nazwa)) {
        if (p.name === 'body') continue;
        expect(p.i18n, `${nazwa}.${p.name}`).toBeDefined();
      }
    }
  });
});

describe('panel Sveltia: backend', () => {
  it('GitHub, repo RobertDebicki/robert-debicki, gałąź main', () => {
    expect(konfig.backend).toMatchObject({ name: 'github', repo: 'RobertDebicki/robert-debicki', branch: 'main' });
  });
  it('base_url tylko wtedy, gdy podano adres logowania', () => {
    expect((konfig.backend as Pole).base_url).toBeUndefined();
    const z = konfiguracjaPanelu({ adresLogowania: 'https://panel-logowanie.example.workers.dev' }) as Pole;
    expect(z.backend.base_url).toBe('https://panel-logowanie.example.workers.dev');
  });
  it('adresy pozycji tylko z ASCII, polskie znaki zamieniane na litery bez ogonków', () => {
    expect(konfig.slug).toEqual({ encoding: 'ascii', clean_accents: true });
  });
  it('w konfiguracji nie ma sekretów ani znaków zakazanych w treści', () => {
    const tekst = JSON.stringify(konfig);
    expect(tekst).not.toMatch(/secret|token|[\u2014\u2013]/i);
  });
});

describe('panel Sveltia: skrypt z CDN', () => {
  it('ma sumę SRI sha384 i crossorigin, a strona panelu jej używa', () => {
    expect(SRI_SVELTII).toMatch(/^sha384-[A-Za-z0-9+/]{64}$/);
    const astro = readFileSync(join(import.meta.dirname, '../../src/pages/admin/index.astro'), 'utf8');
    expect(astro).toContain('integrity={SRI_SVELTII}');
    expect(astro).toContain('crossorigin="anonymous"');
  });
});
