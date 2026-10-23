import { expect, test } from '@playwright/test';
import { parse } from 'yaml';

test('/admin/ ma noindex i wskazuje konfigurację panelu', async ({ request }) => {
  const html = await (await request.get('/admin/')).text();
  expect(html).toMatch(/<meta name="robots" content="noindex, nofollow"/);
  expect(html).toContain('rel="cms-config-url"');
  expect(html).toContain('@sveltia/cms@0.221.8');
  expect(html).toMatch(/integrity="sha384-[A-Za-z0-9+/]{64}"/);
  expect(html).toContain('crossorigin="anonymous"');
});

test('/admin/config.yml to poprawny YAML z backendem GitHub i i18n multiple_files', async ({ request }) => {
  const odp = await request.get('/admin/config.yml');
  expect(odp.ok()).toBe(true);
  const konfig = parse(await odp.text());
  expect(konfig.backend).toMatchObject({ name: 'github', repo: 'RobertDebicki/robert-debicki', branch: 'main' });
  expect(konfig.i18n.structure).toBe('multiple_files');
  expect(konfig.collections.map((k: { name: string }) => k.name)).toEqual(['wdrozenia', 'projekty', 'referencje', 'wpisy', 'ustawienia']);
});

test('mapa witryny nie zawiera /admin/', async ({ request }) => {
  const indeks = await (await request.get('/sitemap-index.xml')).text();
  const mapy = [...indeks.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(mapy.length).toBeGreaterThan(0);
  for (const sciezka of mapy) {
    const xml = await (await request.get(sciezka)).text();
    expect(xml).toContain('<loc>');
    expect(xml).not.toContain('/admin');
  }
});
