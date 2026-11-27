import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { KLUCZ, czytajMape } from '../../src/lib/indexnow';

const A = 'https://robert-debicki.pl';

describe('czytajMape', () => {
  it('zwykła mapa (urlset z hreflang): adresy stron, bez adresów z xhtml:link', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
      `<url><loc>${A}/</loc><xhtml:link rel="alternate" hreflang="en" href="${A}/en/" /></url>\n` +
      `<url><loc>${A}/en/</loc><xhtml:link rel="alternate" hreflang="pl" href="${A}/" /></url>\n</urlset>\n`;
    expect(czytajMape(xml)).toEqual({ mapy: [], adresy: [`${A}/`, `${A}/en/`] });
  });

  it('indeks map (sitemap-index.xml z Astro): adresy map podrzędnych', () => {
    const xml = `<sitemapindex><sitemap><loc>${A}/sitemap-0.xml</loc></sitemap><sitemap><loc>${A}/sitemap-1.xml</loc><lastmod>2026-11-27</lastmod></sitemap></sitemapindex>`;
    expect(czytajMape(xml)).toEqual({ mapy: [`${A}/sitemap-0.xml`, `${A}/sitemap-1.xml`], adresy: [] });
  });

  it('&amp; w <loc> zamieniane na &', () => {
    expect(czytajMape(`<urlset><url><loc>${A}/?a=1&amp;b=2</loc></url></urlset>`).adresy).toEqual([`${A}/?a=1&b=2`]);
  });
});

it('plik klucza w public/ zawiera dokładnie klucz', () => {
  expect(KLUCZ).toMatch(/^[0-9a-f]{32}$/);
  expect(readFileSync(`public/${KLUCZ}.txt`, 'utf8')).toBe(KLUCZ);
});
