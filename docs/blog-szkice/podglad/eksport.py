"""Przenosi szkice na stronę: src/content/wpisy/<adres>/pl.md z grafikami jako obrazkami PNG.
Najpierw: python3 docs/blog-szkice/podglad/generuj.py, potem node docs/blog-szkice/podglad/zrzuty.mjs (PNG do src/assets/wpisy/).
Uruchom: python3 docs/blog-szkice/podglad/eksport.py"""
import html
import re
from pathlib import Path

import generuj

KORZEN = generuj.KATALOG.parents[2]
ZDJECIA = '/src/assets/wpisy'


def opis(fig):
    alt = html.unescape(re.search(r'aria-label="([^"]*)"', fig).group(1))
    podpis = re.search(r'<figcaption>(.*?)</figcaption>', fig)
    return alt, html.unescape(podpis.group(1)) if podpis else ''


def grafiki_wpisu(nazwa):
    """Kolejność jak w zrzuty.mjs: sekcje w kolejności dodania do słownika, grafiki w kolejności listy."""
    wynik, n = {}, 0
    for sekcja, figury in generuj.GRAFIKI[nazwa].items():
        for fig in figury:
            n += 1
            alt, podpis = opis(fig)
            obraz = f'![{alt}]({ZDJECIA}/{nazwa}-{n}.png)'
            wynik.setdefault(sekcja, []).append(obraz + (f'\n\n*{podpis}*' if podpis else ''))
    return wynik


def main():
    for nazwa in generuj.KOLEJNOSC:
        t = (generuj.SZKICE / f'{nazwa}.md').read_text()
        _, fm, body = t.split('---', 2)
        grafiki = grafiki_wpisu(nazwa)
        bloki = [b.strip() for b in body.strip().split('\n\n') if b.strip()]
        wyjscie, sekcja = [], 'wstep'
        for b in bloki:
            if b.startswith('## '):
                wyjscie += grafiki.get(sekcja, [])
                sekcja = b[3:].strip()
            wyjscie.append(b)
        wyjscie += grafiki.get(sekcja, [])
        alt_mini = re.search(r'aria-label="([^"]*)"', generuj.MINIATURY[nazwa]).group(1)
        fm = fm.rstrip('\n') + f'\nminiatura:\n  plik: "{ZDJECIA}/{nazwa}-miniatura.png"\n  alt: "{html.unescape(alt_mini)}"\n'
        cel = KORZEN / 'src/content/wpisy' / nazwa / 'pl.md'
        cel.parent.mkdir(parents=True, exist_ok=True)
        cel.write_text(f'---{fm}---\n' + '\n\n'.join(wyjscie) + '\n')
        print('Zapisano', cel.relative_to(KORZEN))


if __name__ == '__main__':
    main()
