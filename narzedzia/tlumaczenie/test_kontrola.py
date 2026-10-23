"""Testy kontroli tłumaczenia PL na EN (en-US).

Uruchomienie: python3 -m pytest narzedzia/tlumaczenie -q
albo bez pytest: python3 -m unittest discover -s narzedzia/tlumaczenie -p 'test_*.py'
"""
import tempfile
import unittest
from pathlib import Path

import kontrola_tlumaczenia as k

PL = """---
tytul: "Reaktywacja klientów"
liczba: "+28"
podpisLiczby: "klientów, z historią zamówień 174 717 zł"
opis: "Proces dzieli 230 klientów, model językowy włącza przy 29 z nich."
kolejnosc: 3
---
"""

EN = """---
tytul: "Win-back of dormant clients"
liczba: "+28"
podpisLiczby: "clients, with an order history of 174,717 PLN"
opis: "The process splits 230 clients and calls the language model for 29 of them."
kolejnosc: 3
tlumaczenie: ai
zrodlo: 2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881
---
"""


class KontrolaTlumaczenia(unittest.TestCase):
    def test_liczba_174_717_zl_w_pl_i_174_717_pln_w_en_przechodzi(self):
        self.assertEqual(k.bledy(PL, EN), [])
        self.assertEqual(k.bledy(PL, EN.replace("174,717 PLN", "PLN 174,717")), [])

    def test_brak_liczby_230_w_en_nie_przechodzi(self):
        bledy = k.bledy(PL, EN.replace("splits 230 clients", "splits the clients"))
        self.assertTrue(any("230" in b for b in bledy), bledy)

    def test_dopisana_liczba_w_en_nie_przechodzi(self):
        bledy = k.bledy(PL, EN.replace("for 29 of them", "for 29 of them in 48 hours"))
        self.assertTrue(any("48" in b for b in bledy), bledy)

    def test_zgubione_28_przy_plusie_nie_przechodzi(self):
        bledy = k.bledy(PL, EN.replace('"+28"', '"more"'))
        self.assertTrue(any("28" in b for b in bledy), bledy)

    def test_pisownia_colour_w_en_jest_zglaszana_jako_en_gb(self):
        bledy = k.bledy(PL, EN.replace("dormant clients", "colour clients"))
        self.assertTrue(any("colour" in b and "en-GB" in b for b in bledy), bledy)

    def test_amerykanska_pisownia_i_slowa_typu_analysis_przechodza(self):
        tekst = EN.replace("dormant clients", "color analysis center, enterprise expertise")
        self.assertEqual(k.bledy(PL, tekst), [])

    def test_pauza_w_en_nie_przechodzi(self):
        for znak in ("\u2014", "\u2013"):
            bledy = k.bledy(PL, EN.replace("Win-back of", f"Win-back {znak} of"))
            self.assertTrue(any("myślnik" in b for b in bledy), (znak, bledy))

    def test_data_miesiac_rok_po_polsku_i_po_amerykansku_to_ta_sama_data(self):
        pl = '---\nokres: "10.2026"\nwstep: "Stan na październik 2026."\nkiedy: "od 08.2026"\n---\n'
        en = '---\nokres: "10/2026"\nwstep: "As of October 2026."\nkiedy: "since August 2026"\n---\n'
        self.assertEqual(k.bledy(pl, en), [])
        bledy = k.bledy(pl, en.replace("August", "September"))
        self.assertTrue(any("08.2026" in b for b in bledy), bledy)

    def test_pola_techniczne_nie_sa_porownywane(self):
        # zrodlo (skrót SHA-256) i kolejnosc są tylko w nagłówku; ich cyfry nie są faktami z treści.
        self.assertEqual(k.bledy(PL, EN.replace("kolejnosc: 3", "kolejnosc: 12")), [])

    def test_cudzyslow_polski_w_en_jest_uwaga_nie_bledem(self):
        tekst = EN.replace("dormant clients", "„quoted” clients")
        self.assertEqual(k.bledy(PL, tekst), [])
        self.assertTrue(any("cudzysłów" in u for u in k.uwagi(tekst)))


class PolecenieIKatalog(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.baza = Path(self.tmp.name)

    def tearDown(self):
        self.tmp.cleanup()

    def para(self, folder: str, pl: str, en: str = None) -> Path:
        d = self.baza / folder
        d.mkdir(parents=True)
        (d / "pl.md").write_text(pl, encoding="utf-8")
        if en is not None:
            (d / "en.md").write_text(en, encoding="utf-8")
        return d

    def test_polecenie_zwraca_0_dla_zgodnej_pary_i_1_dla_niezgodnej(self):
        d = self.para("a", PL, EN)
        self.assertEqual(k.main(["--zrodlo", str(d / "pl.md"), "--tlumaczenie", str(d / "en.md")]), 0)
        (d / "en.md").write_text(EN.replace("230", "200"), encoding="utf-8")
        self.assertEqual(k.main(["--zrodlo", str(d / "pl.md"), "--tlumaczenie", str(d / "en.md")]), 1)

    def test_katalog_sprawdza_pary_z_en_md_i_pomija_te_bez(self):
        self.para("wdrozenia/zgodna", PL, EN)
        self.para("wdrozenia/tylko-pl", PL)
        self.assertEqual(k.main(["--katalog", str(self.baza)]), 0)
        self.para("projekty/zla", PL, EN.replace("230", "231"))
        self.assertEqual(k.main(["--katalog", str(self.baza)]), 1)

    def test_en_md_bez_pl_md_to_blad(self):
        d = self.baza / "sierota"
        d.mkdir()
        (d / "en.md").write_text(EN, encoding="utf-8")
        self.assertEqual(k.main(["--katalog", str(self.baza)]), 1)


if __name__ == "__main__":
    unittest.main()
