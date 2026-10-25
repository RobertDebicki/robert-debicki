"""Kontrola tłumaczenia PL na EN (en-US): czy fakty z pl.md są w en.md i czy en.md nie dopisuje nowych.

Użycie:
  python3 narzedzia/tlumaczenie/kontrola_tlumaczenia.py --zrodlo pl.md --tlumaczenie en.md
  python3 narzedzia/tlumaczenie/kontrola_tlumaczenia.py --katalog src/content
Kod wyjścia: 0 brak błędów, 1 są błędy, 2 złe argumenty. UWAGA nie jest błędem.

W trybie --katalog para, której en.md ma `zrodlo` inne niż skrót obecnego pl.md (PL zmieniony po tłumaczeniu,
stan "do aktualizacji"), dostaje różnice faktów jako UWAGA, nie BŁĄD: edycja samego PL nie blokuje wdrożenia,
a EN poprawi /tlumacz-strone. Gdy skrót się zgadza (EN jest aktualny), różnica faktów zostaje błędem.
Skrót liczy `zrodlo_pl` tak samo jak strona (`src/lib/skrot.ts`).

BŁĄD: liczba albo data z jednej strony nie występuje po drugiej, pisownia brytyjska, długi albo krótki myślnik.
UWAGA: cudzysłów spoza en-US, przecinek dziesiętny, polski zapis daty.
Liczby do `slownie_do` (en-US: 9) są pomijane, bo angielski pisze je zwykle słowami.
Kwota jest liczbą jak każda inna: „174 717 zł”, „PLN 174,717” i „174,717 PLN” to ta sama wartość.
Biblioteka standardowa Pythona (3.9+) i PyYAML (nagłówek pl.md do skrótu, `requirements.txt`).
"""
import argparse
import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path

import yaml

JEZYKI = json.loads((Path(__file__).resolve().parent / "jezyki.json").read_text(encoding="utf-8"))
JEZYK = "en-US"

# Pola nagłówka bez tekstu do czytania (ścieżki, adresy, skróty, kolejność, wartości z listy).
POLA_TECHNICZNE = {"zrodlo", "tlumaczenie", "kolejnosc", "ikona", "plyta", "stan", "email", "linkedinUrl",
                   "skanUrl", "zgoda", "podpisZamazany", "plik", "data"}
_LICZBA = r"\d{1,3}(?:[   .,]\d{3})+(?:[.,]\d{1,2})?(?!\d)|\d+(?:[.,]\d{1,2})?(?!\d)"
# Godziny: „10:00”, „do 14.30”, „10 a.m.”.
_CZAS = re.compile(r"\b\d{1,2}:\d{2}\b|\b(?:do|o|od|by|at)\s+\d{1,2}\.\d{2}\b"
                   r"|\b\d{1,2}\s?(?:a\.m\.|p\.m\.|am\b|pm\b)", re.I)
_SAMA_LICZBA = re.compile(rf"(?<![A-Za-zÀ-ž\d])(?:{_LICZBA})")
# Kierunkowy kraju przed numerem telefonu („+48 600…”); „+28” jako wynik zostaje liczbą.
_KIERUNKOWY = re.compile(r"\+\d{1,3}\s(?=\d)")

# Miesiąc z rokiem: po polsku „10.2026” albo „październik 2026”, w en-US „October 2026”, „Oct. 2026”, „10/2026”.
_MIESIACE_PL = [r"stycz\w*", r"lut\w*", r"mar(?:zec|ca|cu)", r"kwie\w*", r"maj\w*", r"czerw\w*", r"lip\w*",
                r"sierp\w*", r"wrze[sś]\w*", r"pa[zź]dziernik\w*", r"listopad\w*", r"grud\w*"]
_MIESIACE_EN = ["jan(?:uary|\\.)?", "feb(?:ruary|\\.)?", "mar(?:ch|\\.)?", "apr(?:il|\\.)?", "may",
                "june?", "july?", "aug(?:ust|\\.)?", "sep(?:tember|t?\\.)?", "oct(?:ober|\\.)?",
                "nov(?:ember|\\.)?", "dec(?:ember|\\.)?"]
_DATA_PL_CYFRY = re.compile(r"(?<![\d.])(0?[1-9]|1[0-2])\.(\d{4})(?![\d.])")
_DATA_EN_CYFRY = re.compile(r"(?<![\d/])(0?[1-9]|1[0-2])/(\d{4})(?![\d/])")


def _miesiace_slowem(miesiace: list) -> re.Pattern:
    return re.compile(r"\b(" + "|".join(f"(?:{m})" for m in miesiace) + r")\s*,?\s+(\d{4})\b", re.I)


_DATA_PL_SLOWEM = _miesiace_slowem(_MIESIACE_PL)
_DATA_EN_SLOWEM = _miesiace_slowem(_MIESIACE_EN)

MYSLNIKI = {"\u2014": "długi myślnik (U+2014)", "\u2013": "krótki myślnik (U+2013)"}
_CUDZYSLOWY = "\"„“”«»‘’‚‹›"


def _tekst(surowy: str) -> str:
    """Treść i wartości tekstowych pól nagłówka; bez adresów, znaczników HTML i pól technicznych."""
    wiersze, wynik, w_naglowku = surowy.replace("\r\n", "\n").split("\n"), [], False
    for i, w in enumerate(wiersze):
        if i == 0 and w.strip() == "---":
            w_naglowku = True
            continue
        if w_naglowku:
            if w.strip() == "---":
                w_naglowku = False
                continue
            m = re.match(r"^\s*-?\s*([A-Za-z_]\w*):\s*(.*)$", w)
            if m and m.group(1) not in POLA_TECHNICZNE:
                wartosc = m.group(2).strip()
                if len(wartosc) > 1 and wartosc[0] == wartosc[-1] and wartosc[0] in "'\"":
                    wartosc = wartosc[1:-1]  # cudzysłów YAML wokół wartości, nie w tekście
                elif wartosc.startswith("[") and wartosc.endswith("]"):
                    wartosc = re.sub(r'"([^"]*)"', r"\1", wartosc[1:-1])  # lista YAML: cudzysłów wokół pozycji
                wynik.append(wartosc)
            continue
        wynik.append(w)
    tekst = "\n".join(wynik)
    tekst = re.sub(r"<[^>]*>", " ", tekst)
    tekst = re.sub(r"\]\([^)]*\)", "]", tekst)
    # Adresy i ścieżki („/en/”, „https://…”); „10/2026” zostaje, bo ukośnik stoi po cyfrze.
    return re.sub(r"https?://\S+|(?<![\w/])/[\w./%-]*\d[\w./%-]*", " ", tekst)


def _norma(zapis: str) -> str:
    """„174 717”, „174,717”, „174.717” → „174717”; „12,5” i „12.5” → „12.5”."""
    z = re.sub(r"[   ]", "", zapis)
    if m := re.fullmatch(r"(\d{1,3}(?:[.,]\d{3})+)([.,]\d{1,2})?", z):
        calosc = re.sub(r"[.,]", "", m.group(1))
        z = calosc + (("." + m.group(2)[1:]) if m.group(2) else "")
    z = z.replace(",", ".")
    return z.rstrip("0").rstrip(".") if "." in z else z


def _wyjmij_daty(tekst: str, cyfry: re.Pattern, slowem: re.Pattern, miesiace: list) -> tuple:
    """Zamienia „miesiąc rok” na znaczniki „MM.RRRR”, żeby PL i EN dało się porównać mimo innego zapisu."""
    daty = Counter()

    def z_cyfr(m):
        daty[f"{int(m.group(1)):02d}.{m.group(2)}"] += 1
        return " "

    def ze_slowa(m):
        nr = next(i for i, wzor in enumerate(miesiace, 1) if re.fullmatch(wzor, m.group(1), re.I))
        daty[f"{nr:02d}.{m.group(2)}"] += 1
        return " "

    return slowem.sub(ze_slowa, cyfry.sub(z_cyfr, tekst)), daty


def fakty(surowy: str, zrodlowy: bool, slownie_do: int = 9) -> Counter:
    """Liczby większe niż `slownie_do` i daty miesiąc-rok (klucz „data MM.RRRR”)."""
    tekst = _KIERUNKOWY.sub(" ", _CZAS.sub(" ", _tekst(surowy)))
    if zrodlowy:
        tekst, daty = _wyjmij_daty(tekst, _DATA_PL_CYFRY, _DATA_PL_SLOWEM, _MIESIACE_PL)
    else:
        tekst, daty = _wyjmij_daty(tekst, _DATA_EN_CYFRY, _DATA_EN_SLOWEM, _MIESIACE_EN)
    wynik = Counter({f"data {d}": n for d, n in daty.items()})
    for m in _SAMA_LICZBA.finditer(tekst):
        n = _norma(m.group(0))
        if float(n) > slownie_do:
            wynik[f"liczba {n}"] += 1
    return wynik


def bledy(zrodlo: str, tlumaczenie: str, jezyk: str = JEZYK) -> list:
    d = JEZYKI[jezyk]
    z, t = fakty(zrodlo, True, d["slownie_do"]), fakty(tlumaczenie, False, d["slownie_do"])
    wynik = [f"{f} z tekstu źródłowego nie występuje w tłumaczeniu" for f in sorted(z) if f not in t]
    wynik += [f"{f} w tłumaczeniu nie występuje w tekście źródłowym" for f in sorted(t) if f not in z]
    tekst = _tekst(tlumaczenie)
    for znak, nazwa in MYSLNIKI.items():
        if znak in tlumaczenie:
            wynik.append(f"{nazwa} w tłumaczeniu: przebuduj zdanie albo użyj przecinka, dwukropka, nawiasu")
    for gb, us in d["pisownia_zakazana"].items():
        if m := re.search(rf"\b(?:{gb})\b", tekst, re.I):
            wynik.append(f"pisownia en-GB „{m.group(0)}”: w en-US {us}")
    return wynik


def uwagi(tlumaczenie: str, jezyk: str = JEZYK) -> list:
    """Typografia en-US. Nie blokuje."""
    d, wynik = JEZYKI[jezyk], []
    tekst = re.sub(r"(?<=\w)[’'](?=\w)", "", re.sub(r"`[^`]*`", " ", _tekst(tlumaczenie)))  # apostrof to nie cudzysłów
    obce = sorted({c for c in tekst if c in _CUDZYSLOWY and c not in d["cudzyslow"]})
    if obce:
        wynik.append(f"cudzysłów {' '.join(obce)}: w {d['nazwa']} {d['cudzyslow_wzor']}")
    if zly := re.search(r"(?<![\d.,])\d+,\d{1,2}(?![\d,])", tekst):
        wynik.append(f"separator dziesiętny w „{zly.group(0)}”: w en-US kropka („12.5”)")
    if zly := _DATA_PL_CYFRY.search(tekst):
        wynik.append(f"polski zapis daty „{zly.group(0)}”: w en-US „October 2026” albo „10/2026”")
    return wynik


class _Yaml12(yaml.SafeLoader):
    """Wartości bez cudzysłowu jak w schemacie core YAML 1.2 (biblioteka `yaml` w JS): daty i yes/no zostają tekstem."""


_Yaml12.yaml_implicit_resolvers = {}
for _tag, _wzor, _pierwsze in [
    ("tag:yaml.org,2002:null", r"^(?:~|null|Null|NULL|)$", ["~", "n", "N", ""]),
    ("tag:yaml.org,2002:bool", r"^(?:true|True|TRUE|false|False|FALSE)$", list("tTfF")),
    ("tag:yaml.org,2002:int", r"^(?:[-+]?[0-9]+|0o[0-7]+|0x[0-9a-fA-F]+)$", list("-+0123456789")),
    ("tag:yaml.org,2002:float", r"^(?:[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)(?:[eE][-+]?[0-9]+)?"
                                r"|[-+]?\.(?:inf|Inf|INF)|\.(?:nan|NaN|NAN))$", list("-+0123456789.")),
]:
    _Yaml12.add_implicit_resolver(_tag, re.compile(_wzor), _pierwsze)


def _int12(loader, wezel):
    tekst = loader.construct_scalar(wezel)
    if tekst.startswith(("0o", "0x")):
        return int(tekst[2:], 8 if tekst[1] == "o" else 16)
    return int(tekst, 10)


_Yaml12.add_constructor("tag:yaml.org,2002:int", _int12)


def _json_kanoniczny(wartosc) -> str:
    """Jak `kanonicznyJson` w src/lib/skrot.ts: klucze posortowane, bez spacji, liczby całkowite bez „.0”."""
    if isinstance(wartosc, dict):
        return "{" + ",".join(json.dumps(str(k), ensure_ascii=False) + ":" + _json_kanoniczny(wartosc[k])
                              for k in sorted(wartosc, key=str)) + "}"
    if isinstance(wartosc, list):
        return "[" + ",".join(_json_kanoniczny(w) for w in wartosc) + "]"
    if isinstance(wartosc, float) and wartosc.is_integer() and abs(wartosc) < 1e21:
        return str(int(wartosc))
    return json.dumps(wartosc, ensure_ascii=False)


def zrodlo_pl(surowy: str) -> str:
    """Skrót SHA-256 pl.md liczony jak `skrotTresci` w src/lib/skrot.ts (pole `zrodlo` w en.md)."""
    tekst = surowy.replace("\r\n", "\n")
    m = re.match(r"^---\n([\s\S]*?)\n---\n?([\s\S]*)\Z", tekst)
    dane, tresc = (yaml.load(m.group(1), Loader=_Yaml12), m.group(2)) if m else ({}, tekst)
    if not isinstance(dane, dict):
        dane = {}
    naglowek = {k: v for k, v in dane.items() if k not in ("tlumaczenie", "zrodlo")}
    wejscie = _json_kanoniczny(naglowek) + "\n" + tresc.strip(" \t\n\r")
    return hashlib.sha256(wejscie.encode("utf-8")).hexdigest()


def zrodlo_en(surowy: str):
    """Wartość pola `zrodlo` z nagłówka en.md albo None."""
    m = re.search(r"^zrodlo:\s*['\"]?([0-9a-f]{64})['\"]?\s*$", surowy.replace("\r\n", "\n"), re.M)
    return m.group(1) if m else None


def sprawdz_pare(pl: Path, en: Path, tylko_uwagi: bool = False) -> int:
    """Wypisuje wynik kontroli jednej pary i zwraca liczbę błędów. `tylko_uwagi`: różnice wypisuje jako UWAGA."""
    tlumaczenie = en.read_text(encoding="utf-8")
    lista = bledy(pl.read_text(encoding="utf-8"), tlumaczenie)
    for b in lista:
        print(f"{'UWAGA' if tylko_uwagi else 'BŁĄD'} {en}: {b}")
    for u in uwagi(tlumaczenie):
        print(f"UWAGA {en}: {u}")
    return 0 if tylko_uwagi else len(lista)


def main(argv=None) -> int:
    p = argparse.ArgumentParser(description="Kontrola tłumaczenia PL na EN (en-US).")
    p.add_argument("--zrodlo", type=Path, help="pl.md")
    p.add_argument("--tlumaczenie", type=Path, help="en.md")
    p.add_argument("--katalog", type=Path, help="sprawdź każdą parę pl.md + en.md w tym katalogu (rekurencyjnie)")
    a = p.parse_args(argv)
    if a.katalog:
        if a.zrodlo or a.tlumaczenie:
            p.error("--katalog nie łączy się z --zrodlo ani --tlumaczenie")
        pary = sorted(a.katalog.rglob("en.md"))
    elif a.zrodlo and a.tlumaczenie:
        pary = [a.tlumaczenie]
    else:
        p.error("podaj --zrodlo i --tlumaczenie albo --katalog")
    liczba_bledow = 0
    for en in pary:
        pl = a.zrodlo if not a.katalog else en.with_name("pl.md")
        if not pl.exists():
            print(f"BŁĄD {en}: brak pliku źródłowego {pl}")
            liczba_bledow += 1
            continue
        nieaktualne = False
        if a.katalog:
            nieaktualne = zrodlo_en(en.read_text(encoding="utf-8")) != zrodlo_pl(pl.read_text(encoding="utf-8"))
            if nieaktualne:
                print(f"UWAGA {en}: PL zmieniony po tłumaczeniu (zrodlo inne niż skrót pl.md), EN do aktualizacji "
                      f"przez /tlumacz-strone; różnice faktów poniżej nie blokują")
        liczba_bledow += sprawdz_pare(pl, en, tylko_uwagi=nieaktualne)
    if liczba_bledow:
        print(f"Kontrola tłumaczeń: {liczba_bledow} błędów w {len(pary)} parach.")
        return 1
    print(f"OK: kontrola tłumaczeń, {len(pary)} par bez błędów.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
