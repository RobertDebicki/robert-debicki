import { describe, expect, it } from 'vitest';
import { okruszki } from '../../src/lib/okruszki';

const SITE = 'https://robert-debicki.pl';
const nazwy = (o: ReturnType<typeof okruszki>) => o!.itemListElement.map((e) => e.name);

describe('okruszki (BreadcrumbList)', () => {
  it('strona główna w obu językach nie ma okruszków', () => {
    expect(okruszki('pl', '/', 'Robert Dębicki | Automation Developer', SITE)).toBeNull();
    expect(okruszki('en', '/en/', 'Robert Dębicki | Automation Developer', SITE)).toBeNull();
  });
  it('wpis: strona główna, lista, wpis (tytuł bez marki), pozycje liczone od 1', () => {
    const o = okruszki('pl', '/wpisy/ksef-faktury-kosztowe/', 'Faktury kosztowe z KSeF | Robert Dębicki', SITE)!;
    expect(nazwy(o)).toEqual(['Strona główna', 'Wpisy', 'Faktury kosztowe z KSeF']);
    expect(o.itemListElement.map((e) => e.position)).toEqual([1, 2, 3]);
    expect(o.itemListElement[1].item).toBe(`${SITE}/wpisy/`);
    expect(o.itemListElement[2].item).toBe(`${SITE}/wpisy/ksef-faktury-kosztowe/`);
  });
  it('EN: lista /en/posts/ i adres wpisu z prefiksem /en/', () => {
    const o = okruszki('en', '/en/posts/n8n-make-or-zapier/', 'n8n, Make or Zapier: how to choose | Robert Dębicki', SITE)!;
    expect(nazwy(o)).toEqual(['Home page', 'Posts', 'n8n, Make or Zapier: how to choose']);
    expect(o.itemListElement[0].item).toBe(`${SITE}/en/`);
    expect(o.itemListElement[1].item).toBe(`${SITE}/en/posts/`);
  });
  it('strona pierwszego poziomu (lista, rekruter): tylko strona główna i ona sama', () => {
    expect(nazwy(okruszki('pl', '/wpisy/', 'Wpisy | Robert Dębicki', SITE))).toEqual(['Strona główna', 'Wpisy']);
    expect(nazwy(okruszki('en', '/en/for-recruiters/', 'For recruiters | Robert Dębicki', SITE))).toEqual(['Home page', 'For recruiters']);
  });
  it('usługa: lista usług jako środkowy element', () => {
    expect(nazwy(okruszki('en', '/en/services/ai-automation/', 'AI implementation | Robert Dębicki', SITE))).toEqual(['Home page', 'Services', 'AI implementation']);
  });
});
