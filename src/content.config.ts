import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { SCHEMATY } from './lib/schematy';

// Ustawienia to pojedyncze pliki pl.md i en.md bez folderu.
// Folder na pozycję: src/content/<kolekcja>/<adres>/{pl,en}.md. Id wpisu to `<adres>/<pl|en>`.
const kolekcja = (nazwa: keyof typeof SCHEMATY) =>
  defineCollection({
    loader: glob({ pattern: nazwa === 'ustawienia' ? '{pl,en}.md' : '*/{pl,en}.md', base: `./src/content/${nazwa}` }),
    schema: SCHEMATY[nazwa],
  });

export const collections = {
  wdrozenia: kolekcja('wdrozenia'),
  projekty: kolekcja('projekty'),
  referencje: kolekcja('referencje'),
  wpisy: kolekcja('wpisy'),
  ustawienia: kolekcja('ustawienia'),
};
