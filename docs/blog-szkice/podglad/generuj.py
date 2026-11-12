"""Składa podgląd szkiców wpisów (podglad.html) z plików .md w folderze wyżej i grafik z tego pliku.
Uruchom: python3 docs/blog-szkice/podglad/generuj.py"""
import html
import re
from pathlib import Path

KATALOG = Path(__file__).resolve().parent
SZKICE = KATALOG.parent

KOLEJNOSC = [
    'ai-act-dla-malej-firmy',
    'ile-firm-uzywa-ai',
    'automatyczny-odczyt-dokumentow',
    'voice-bot-dla-firmy',
    'n8n-make-czy-zapier',
]


def figura(alt, tresc, podpis=''):
    """Grafika z propozycją ALT (reguła DNK: 15 do 125 znaków) i podpisem."""
    assert 15 <= len(alt) <= 125, (len(alt), alt)
    p = f'<figcaption>{podpis}</figcaption>' if podpis else ''
    return (f'<figure class="graf" role="img" aria-label="{html.escape(alt)}">{tresc}{p}'
            f'<p class="alt mono">ALT: {html.escape(alt)}</p></figure>')


# ---------- Wpis 1: AI Act ----------
CZAT = figura(
    'Okno czatu na stronie firmy, w którym bot zaczyna rozmowę zdaniem, że jest asystentem AI',
    '''<div class="czat">
  <div class="czat-gora mono"><span class="kropka"></span>Czat na stronie</div>
  <div class="dymek bot"><b>Dzień dobry, jestem asystentem AI.</b> Odpowiem na pytania o ofertę albo przekażę sprawę do zespołu.</div>
  <div class="dymek klient">Ile trwa realizacja zamówienia?</div>
  <div class="dymek bot">Sprawdzę to dla Ciebie.</div>
</div>
<div class="czat-opis"><p class="mono">Wystarczy jedno zdanie</p><p>Klient wie od pierwszej wiadomości, że rozmawia z AI. Tego wymaga artykuł 50 AI Act, gdy nie jest to oczywiste.</p></div>''',
)

OS_CZASU = figura(
    'Oś czasu AI Act od lutego 2025 do sierpnia 2028 z zaznaczonym 2 sierpnia 2026 jako obowiązującym teraz',
    '''<ol class="os">
  <li><time class="mono">02.02.2025</time><b>Kompetencje AI</b><span>Art. 4 obowiązuje.</span></li>
  <li class="teraz"><time class="mono">02.08.2026</time><b>Przejrzystość</b><span>Klient wie, że rozmawia z AI. Obowiązuje teraz.</span></li>
  <li><time class="mono">02.12.2026</time><b>Oznaczanie treści</b><span>Koniec okresu przejściowego dla dostawców.</span></li>
  <li class="pozniej"><time class="mono">02.12.2027</time><b>Wysokie ryzyko</b><span>Np. rekrutacja, dostęp do usług.</span></li>
  <li class="pozniej"><time class="mono">02.08.2028</time><b>Produkty regulowane</b><span>AI wbudowana w produkty.</span></li>
</ol>''',
    'Źródło: Prawo.pl, 11.08.2026.',
)

DOSTAWCA_TY = figura(
    'Porównanie obowiązków AI Act: co należy do dostawcy narzędzia, a co do firmy, która z niego korzysta',
    '''<div class="dwie">
  <div class="kol"><p class="mono">Dostawca narzędzia</p><ul><li>Techniczne oznaczanie treści z AI</li><li>Informacja o AI zaprojektowana w produkcie</li></ul></div>
  <div class="kol ty"><p class="mono">Ty</p><ul><li>Sprawdzasz, czy bot się przedstawia</li><li>Czytasz umowę z dostawcą</li><li>Ujawniasz deepfake'i</li></ul></div>
</div>''',
)

KROKI_AI_ACT = figura(
    'Trzy kroki dostosowania małej firmy do AI Act: lista miejsc z AI, zdanie powitalne, przegląd grafik',
    '''<ol class="kroki">
  <li><span class="nr">1</span><b>Spisz miejsca z AI</b><span>Czat, bot w telefonie, automatyczne maile.</span></li>
  <li><span class="nr">2</span><b>Dodaj jedno zdanie</b><span>„Jestem asystentem AI” na starcie rozmowy.</span></li>
  <li><span class="nr">3</span><b>Przejrzyj media</b><span>Obraz i dźwięk udające ludzi wymagają ujawnienia.</span></li>
</ol>
<div class="kara"><span class="duza">15 mln €</span><span>albo 3% obrotu to <b>maksymalna</b> kara za brak przejrzystości. Dla MŚP limit jest niższy.</span></div>''',
)

# ---------- Wpis 2: automatyzacja procesów ----------
SLUPKI = [('Polska', 8.36, True), ('UE, wszystkie', 19.95, False), ('UE, małe', 17.13, False),
          ('UE, średnie', 30.36, False), ('UE, duże', 55.03, False)]


def wykres():
    rzedy = ''.join(
        f'<div class="rz" title="{n}: {str(v).replace(".", ",")}%"><span class="etk">{n}</span>'
        f'<span class="tor"><span class="sl{" pl" if pl else ""}" style="width:{v / 60 * 100:.1f}%"></span></span>'
        f'<span class="wart mono">{str(v).replace(".", ",")}%</span></div>'
        for n, v, pl in SLUPKI)
    return figura(
        'Wykres słupkowy: AI stosuje 8,36 procent firm w Polsce wobec 19,95 procent w Unii Europejskiej',
        f'<p class="graf-tyt">Firmy, które stosują AI w 2025 roku</p><div class="slupki">{rzedy}</div>',
        'Firmy od 10 osób. Źródło: Eurostat za podatki.biz.',
    )


TRZY_PYTANIA = figura(
    'Trzy pytania przed pierwszą automatyzacją: ile godzin zajmuje zadanie, skąd są dane, co jeśli system się pomyli',
    '''<ol class="kroki">
  <li><span class="nr">1</span><b>Ile godzin?</b><span>Ile miesięcznie zajmuje to zadanie.</span></li>
  <li><span class="nr">2</span><b>Skąd dane?</b><span>Zawsze z tego samego miejsca: poczta, formularz.</span></li>
  <li class="wazne"><span class="nr">3</span><b>Co przy pomyłce?</b><span>Kto ją zauważy. Tu decyduje człowiek.</span></li>
</ol>''',
)

EFEKTY = figura(
    'Trzy wyniki wdrożeń: 60 godzin mniej pracy miesięcznie, model AI przy 29 z 230 klientów, 28 klientów ponad ręczną listę',
    '''<div class="liczby">
  <div><span class="duza">60 h</span><span>mniej ręcznej pracy miesięcznie w firmie szkoleniowej, według właściciela</span></div>
  <div><span class="duza">29 z 230</span><span>klientów, przy których włącza się model językowy</span></div>
  <div><span class="duza">+28</span><span>klientów ponad ręczną listę, historia zamówień 174 717 zł</span></div>
</div>''',
)

# ---------- Wpis 3: odczyt dokumentów ----------
PRZED_PO = figura(
    'Porównanie przed i po: ręczne przepisywanie wniosków z plików kontra jedna baza z opiekunem każdego wniosku',
    '''<div class="dwie">
  <div class="kol"><p class="mono">Przed</p><ul><li>Dane przepisywane ręcznie</li><li>Pliki w poczcie i na SharePoincie</li><li>Brak wspólnej bazy</li></ul></div>
  <div class="kol ty"><p class="mono">Po</p><ul><li>Dokumenty pobierane codziennie</li><li>Jedna baza w Airtable</li><li>Każdy wniosek ma opiekuna</li></ul></div>
</div>''',
)

PRZEPLYW = figura(
    'Schemat odczytu dokumentów: poczta i SharePoint, OCR z modelem językowym, dane w Airtable, niepewne do człowieka',
    '''<div class="przeplyw">
  <div class="wezel"><span class="mono">1</span><b>Poczta i SharePoint</b><span>pobieranie codziennie</span></div>
  <div class="strz" aria-hidden="true"></div>
  <div class="wezel"><span class="mono">2</span><b>OCR i model językowy</b><span>Gemini czyta dokument</span></div>
  <div class="strz" aria-hidden="true"></div>
  <div class="wezel"><span class="mono">3</span><b>Kwoty, terminy, kontrahenci</b><span>wyciągnięte dane</span></div>
  <div class="strz" aria-hidden="true"></div>
  <div class="rozwidlenie">
    <div class="wezel ok"><span class="mono">pewny odczyt</span><b>Airtable</b><span>zapis i opiekun wniosku</span></div>
    <div class="wezel czlowiek"><span class="mono">niepewny odczyt</span><b>Człowiek potwierdza</b><span>wskazana osoba zatwierdza</span></div>
  </div>
</div>''',
    'Całość działa w n8n.',
)

POTWIERDZENIE = figura(
    'Makieta ekranu potwierdzenia: skan wniosku obok odczytanej kwoty oznaczonej jako niepewna do zatwierdzenia',
    '''<div class="potw">
  <div class="skan" aria-hidden="true"><i></i><i></i><i class="kr"></i><i></i><i class="kr"></i><i></i></div>
  <dl class="pola">
    <div><dt class="mono">Kontrahent</dt><dd>Gmina, przykład</dd></div>
    <div><dt class="mono">Termin</dt><dd>30.11</dd></div>
    <div class="niep"><dt class="mono">Kwota</dt><dd>12 400 zł <em class="mono">niepewne</em></dd></div>
    <div class="przyc"><span class="btn solid">Zatwierdź</span><span class="btn">Popraw</span></div>
  </dl>
</div>''',
    'Ilustracja zasady, nie zrzut z systemu klienta. Dane przykładowe.',
)

# ---------- Wpis 4: voice bot ----------
DWIE_MINUTY = figura(
    'Oś czasu voice bota: formularz o 0:00, telefon bota o 2:00, notatka z potrzebą i budżetem trafia do Pipedrive',
    '''<ol class="minuty">
  <li><time class="mono">0:00</time><b>Formularz</b><span>Klient wysyła zapytanie.</span></li>
  <li class="teraz"><time class="mono">2:00</time><b>Bot dzwoni</b><span>Pytania kwalifikujące.</span></li>
  <li><time class="mono">po rozmowie</time><b>Notatka</b><span>Potrzeba i budżet.</span></li>
  <li><time class="mono">n8n</time><b>Pipedrive</b><span>Przy właściwej szansie sprzedaży.</span></li>
</ol>
<div class="kara"><span class="duza">15</span><span>rozmów dziennie w opisanym wdrożeniu</span></div>''',
)

NOTATKA = figura(
    'Makieta notatki voice bota w CRM z polami potrzeba, budżet i następny krok dla handlowca',
    '''<div class="ticket">
  <header class="mono"><span>Notatka z rozmowy bota</span><span>Pipedrive</span></header>
  <dl>
    <div><dt>Potrzeba</dt><dd>Opis potrzeby klienta</dd></div>
    <div><dt>Budżet</dt><dd>Kwota podana w rozmowie</dd></div>
    <div><dt>Status</dt><dd>Rozmowa zakończona albo do ponowienia</dd></div>
    <div><dt>Następny krok</dt><dd>Telefon handlowca</dd></div>
  </dl>
</div>''',
    'Ilustracja pól notatki. Treść przykładowa.',
)

BOT_HANDLOWIEC = figura(
    'Podział pracy: voice bot zbiera informacje i robi notatkę, handlowiec prowadzi rozmowę sprzedażową',
    '''<div class="dwie">
  <div class="kol"><p class="mono">Voice bot</p><ul><li>Dzwoni w 2 minuty</li><li>Zadaje pytania kwalifikujące</li><li>Zapisuje notatkę</li></ul></div>
  <div class="kol ty"><p class="mono">Handlowiec</p><ul><li>Zna potrzebę przed telefonem</li><li>Sprzedaje i negocjuje</li><li>Oddzwania do przerwanych</li></ul></div>
</div>''',
)

# ---------- Wpis 5: n8n, Make, Zapier ----------
def kwadraty(pelne, wszystkie=5):
    return ''.join(f'<i class="{"p" if i < pelne else ""}"></i>' for i in range(wszystkie))


LICZNIK = figura(
    'Scenariusz z wyzwalaczem i czterema akcjami: 4 zadania w Zapierze, 5 operacji w Make, 1 uruchomienie w n8n',
    f'''<p class="graf-tyt">Wyzwalacz i 4 akcje, jeden rekord: ile jednostek zużyjesz</p>
<div class="licznik">
  <div class="rz"><b>Zapier</b><span class="kw">{kwadraty(4)}</span><span class="mono">4 zadania</span></div>
  <div class="rz"><b>Make</b><span class="kw">{kwadraty(5)}</span><span class="mono">5 operacji</span></div>
  <div class="rz n8n"><b>n8n</b><span class="kw"><i class="p cale"></i></span><span class="mono">1 uruchomienie</span></div>
</div>''',
    'Źródła: pomoc Zapier i Make, Digidop (n8n). Ceny sprawdź w aktualnym cenniku.',
)

TABELA = figura(
    'Tabela porównania n8n, Make i Zapier: prostota obsługi, wiedza techniczna, miejsce danych',
    '''<div class="tab-wrap"><table class="tab">
  <thead><tr><th></th><th>Zapier</th><th>Make</th><th>n8n</th></tr></thead>
  <tbody>
    <tr><th>Start</th><td>Najprostszy</td><td>Edytor graficzny</td><td>Wymaga wiedzy</td></tr>
    <tr><th>Gotowe połączenia</th><td>10 000+</td><td>3500+</td><td>ok. 1000, plus API</td></tr>
    <tr><th>Dane</th><td>Chmura dostawcy</td><td>Chmura dostawcy</td><td>Może być Twój serwer</td></tr>
    <tr><th>Dla kogo</th><td>Bez techniki</td><td>Średnia wiedza</td><td>Kontrola i skala</td></tr>
  </tbody>
</table></div>''',
)

TRANSPORT = figura(
    'Wdrożenie n8n na AWS w transporcie chłodniczym: ponad 150 pojazdów, 20 dyspozytorów, odczyt co minutę',
    '''<div class="liczby">
  <div><span class="duza">150+</span><span>pojazdów pod nadzorem</span></div>
  <div><span class="duza">20</span><span>dyspozytorów na dashboardzie</span></div>
  <div><span class="duza">1 min</span><span>odświeżanie temperatury w naczepach</span></div>
</div>''',
)

# Gdzie wstawić grafiki: 'wstep' albo tytuł sekcji H2; grafika trafia na koniec tej sekcji.
GRAFIKI = {
    'ai-act-dla-malej-firmy': {'wstep': [CZAT], 'Co obowiązuje od 2 sierpnia 2026': [OS_CZASU],
                               'Co jest po stronie dostawcy, a co po Twojej': [DOSTAWCA_TY],
                               'AI Act dla małej firmy w trzech krokach': [KROKI_AI_ACT]},
    'ile-firm-uzywa-ai': {'Ile firm używa AI i do czego': [wykres()],
                          'Jak zacząć automatyzację procesów w firmie': [TRZY_PYTANIA],
                          'Efekty automatyzacji procesów w firmie': [EFEKTY]},
    'automatyczny-odczyt-dokumentow': {'Problem: dane w plikach i brak wspólnej bazy': [PRZED_PO],
                                       'Jak działa automatyczny odczyt dokumentów': [PRZEPLYW],
                                       'Co z odczytem, którego system nie jest pewny': [POTWIERDZENIE]},
    'voice-bot-dla-firmy': {'wstep': [DWIE_MINUTY], 'Jak działa ten voice bot krok po kroku': [NOTATKA],
                            'Co robi voice bot dla firmy, a co handlowiec': [BOT_HANDLOWIEC]},
    'n8n-make-czy-zapier': {'Czym różni się n8n, Make i Zapier': [LICZNIK],
                            'n8n, Make czy Zapier: które do jakiej firmy': [TABELA],
                            'Dlaczego w moich wdrożeniach często wybieram n8n': [TRANSPORT]},
}

# Miniaturki na liście wpisów: SVG 16:9 (480 x 270) na płycie w kolorze wpisu. Kolory wpisane na stałe,
# bo plik SVG w <img> nie widzi zmiennych CSS. Tekst w SVG ma krój zapasowy na wypadek braku fontów.
K, P, M, Y = '#131412', '#f4f5f1', '#d0201a', '#ffc400'
C = '#EF7F1A'
NAG = 'font-family="Anybody, Arial Black, Arial, sans-serif" font-weight="850"'
MONO = 'font-family="Spline Sans Mono, Menlo, monospace" font-weight="600"'


def svg(tlo, tresc, alt):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" role="img" aria-label="{html.escape(alt)}">'
            f'<rect width="480" height="270" fill="{tlo}"/>{tresc}</svg>')


MINIATURY = {
    'ai-act-dla-malej-firmy': svg(C, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{K}">AI ACT · 02.08.2026</text>
<rect x="28" y="66" width="300" height="176" fill="{P}" stroke="{K}" stroke-width="4"/>
<rect x="28" y="66" width="300" height="30" fill="{K}"/><circle cx="46" cy="81" r="6" fill="{C}"/>
<rect x="44" y="114" width="268" height="46" rx="4" fill="{Y}" stroke="{K}" stroke-width="3"/>
<text x="56" y="143" {NAG} font-size="15" fill="{K}">Jestem asystentem AI</text>
<rect x="150" y="176" width="160" height="42" rx="4" fill="{K}"/>
<rect x="166" y="194" width="110" height="7" fill="{P}"/>
<circle cx="400" cy="150" r="52" fill="{K}"/><path d="M376 150l16 16 32-34" fill="none" stroke="{Y}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>''',
        'Okno czatu z botem, który mówi Jestem asystentem AI, i znak zgodności z AI Act'),
    'ile-firm-uzywa-ai': svg(M, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{P}">FIRMY Z AI · 2025</text>
<text x="28" y="132" {NAG} font-size="74" fill="{P}">8,36%</text>
<text x="30" y="160" {MONO} font-size="14" fill="{P}">POLSKA</text>
<rect x="28" y="196" width="66" height="22" fill="{Y}"/><text x="104" y="213" {MONO} font-size="14" fill="{P}">PL</text>
<rect x="28" y="228" width="158" height="22" fill="{P}"/><text x="196" y="245" {MONO} font-size="14" fill="{P}">UE 19,95%</text>
<g fill="none" stroke="{K}" stroke-width="5" stroke-linejoin="round"><rect x="330" y="70" width="120" height="150" fill="{P}"/></g>
<path d="M352 196h76M352 170h76M352 144h50" stroke="{K}" stroke-width="6"/><circle cx="420" cy="96" r="14" fill="{Y}" stroke="{K}" stroke-width="4"/>''',
        'Duża liczba 8,36 procent firm z AI w Polsce według Eurostatu i porównanie z Unią Europejską'),
    'automatyczny-odczyt-dokumentow': svg(Y, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{K}">PDF → BAZA</text>
<rect x="44" y="78" width="120" height="156" fill="{P}" stroke="{K}" stroke-width="4"/>
<rect x="30" y="66" width="120" height="156" fill="{P}" stroke="{K}" stroke-width="4"/>
<path d="M48 96h84M48 118h84M48 140h56M48 162h84M48 184h50" stroke="{K}" stroke-width="6"/>
<path d="M190 150h64" stroke="{K}" stroke-width="6"/><path d="M248 134l18 16-18 16" fill="none" stroke="{K}" stroke-width="6" stroke-linejoin="round"/>
<rect x="286" y="76" width="166" height="148" fill="{P}" stroke="{K}" stroke-width="4"/>
<path d="M286 113h166M286 150h166M286 187h166" stroke="{K}" stroke-width="3"/>
<path d="M300 96l8 8 14-14M300 133l8 8 14-14" fill="none" stroke="{C}" stroke-width="5"/>
<rect x="296" y="160" width="146" height="22" fill="{C}"/><text x="306" y="177" {MONO} font-size="14" fill="{K}">? sprawdź</text>
<path d="M300 207l8 8 14-14" fill="none" stroke="{C}" stroke-width="5"/>''',
        'Stos dokumentów, strzałka i tabela z danymi, jeden wiersz oznaczony do sprawdzenia'),
    'voice-bot-dla-firmy': svg(C, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{K}">FORMULARZ → TELEFON</text>
<text x="24" y="190" {NAG} font-size="108" fill="{K}">2:00</text>
<circle cx="404" cy="140" r="56" fill="{K}"/>
<path transform="translate(12 0)" d="M366 112c-6 6-6 18 6 34s28 26 38 22l10-10-16-14-8 6c-6-2-16-12-18-18l6-8-12-18z" fill="{Y}"/>
<path transform="translate(12 0)" d="M418 104a26 26 0 0 1 18 18M414 86a44 44 0 0 1 36 36" fill="none" stroke="{Y}" stroke-width="5" stroke-linecap="round"/>
<rect x="28" y="222" width="300" height="20" fill="{P}"/><text x="38" y="237" {MONO} font-size="13" fill="{K}">notatka: potrzeba, budżet</text>''',
        'Duży napis 2:00 i słuchawka telefonu, bot oddzwania do klienta w dwie minuty'),
    'n8n-make-czy-zapier': svg(M, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{P}">WYZWALACZ + 4 AKCJE</text>
<text x="28" y="98" {NAG} font-size="22" fill="{P}">Zapier</text>
<text x="28" y="160" {NAG} font-size="22" fill="{P}">Make</text>
<text x="28" y="222" {NAG} font-size="22" fill="{P}">n8n</text>
{"".join(f'<rect x="{130 + i * 62}" y="{y}" width="52" height="40" fill="{P}" stroke="{K}" stroke-width="3"/>' for y, n in ((70, 4), (132, 5)) for i in range(n))}
<rect x="130" y="194" width="300" height="40" fill="{Y}" stroke="{K}" stroke-width="3"/>
<text x="146" y="221" {MONO} font-size="16" fill="{K}">1 uruchomienie</text>''',
        'Porównanie jednostek: cztery zadania w Zapier, pięć operacji w Make, jedno uruchomienie w n8n'),
}

# Kolor płyty wpisu (jak na stronie: pomarańcz, czerwień, żółty).
PLYTY = ['var(--c)', 'var(--m)', 'var(--y)', 'var(--c)', 'var(--m)']


def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    return re.sub(r'\[(.+?)\]\((https?://[^)]+)\)', r'<a href="\2">\1</a>', t)


def md_na_html(body, grafiki):
    """Prosty Markdown szkiców: ##, ###, listy numerowane, akapity. FAQ (### po „Pytania”) jako <details>."""
    wyjscie, sekcja, lista, faq = [], 'wstep', [], False
    bloki = [b for b in body.strip().split('\n\n') if b.strip()]

    def zamknij_sekcje():
        for g in grafiki.get(sekcja, []):
            wyjscie.append(g)

    i = 0
    while i < len(bloki):
        b = bloki[i].strip()
        if b.startswith('## '):
            if faq:
                wyjscie.append('</div>')
            zamknij_sekcje()
            sekcja = b[3:].strip()
            faq = sekcja.startswith('Pytania')
            wyjscie.append(f'<h2>{inline(sekcja)}</h2>')
            if faq:
                wyjscie.append('<div class="faq">')
        elif b.startswith('### '):
            pyt, _, odp = b[4:].partition('\n')
            wyjscie.append(f'<details><summary>{inline(pyt)}</summary><p>{inline(odp.strip())}</p></details>')
        elif re.match(r'^\d+\. ', b):
            wiersze = [inline(re.sub(r'^\d+\. ', '', w)) for w in b.split('\n')]
            pozycje = ''.join(f'<li>{w}</li>' for w in wiersze)
            wyjscie.append(f'<ol class="lista">{pozycje}</ol>')
        else:
            klasa = ' class="wstep"' if sekcja == 'wstep' else ''
            wyjscie.append(f'<p{klasa}>{inline(b)}</p>')
        i += 1
    if faq:
        wyjscie.append('</div>')
    zamknij_sekcje()
    return '\n'.join(wyjscie)


def wczytaj(nazwa):
    t = (SZKICE / f'{nazwa}.md').read_text()
    _, fm, body = t.split('---', 2)
    pole = lambda k: re.search(rf'{k}: "?(.*?)"?$', fm, re.M).group(1)
    return pole('tytul'), pole('data'), pole('zajawka'), body


def main():
    styl = (KATALOG / 'styl.css').read_text()
    menu, artykuly = [], []
    for n, nazwa in enumerate(KOLEJNOSC):
        tytul, data, zajawka, body = wczytaj(nazwa)
        d = '.'.join(reversed(data.split('-')))
        (KATALOG / 'miniatury').mkdir(exist_ok=True)
        (KATALOG / 'miniatury' / f'{nazwa}.svg').write_text(MINIATURY[nazwa])
        menu.append(f'''<article class="karta" style="--pl:{PLYTY[n]}">
  <a class="mini" href="#{nazwa}" tabindex="-1" aria-hidden="true">{MINIATURY[nazwa]}</a>
  <div><time class="mono">{d}</time><h3><a href="#{nazwa}">{inline(tytul)}</a></h3><p>{inline(zajawka)}</p></div>
</article>''')
        artykuly.append(f'''<article id="{nazwa}" class="wpis" style="--pl:{PLYTY[n]}">
  <p class="label mono">Wpis {n + 1} z 5 · /wpisy/{nazwa}/</p>
  <header><h1 class="sec-title">{inline(tytul)}</h1><time class="mono">{d}</time>
  <p class="google mono"><span>Wynik w Google</span><b>{inline(tytul)} | Robert Dębicki</b>{inline(zajawka)}</p></header>
  <div class="wpis-tresc">{md_na_html(body, GRAFIKI[nazwa])}</div>
  <p class="wroc mono"><a href="#spis">Wróć do spisu</a></p>
</article>''')
    strona = f'''<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Podgląd wpisów bloga</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,400..900&family=Onest:wght@400;500;600;700&family=Spline+Sans+Mono:wght@400;500;600&display=swap">
<style>{styl}</style></head><body>
<div class="top"><div class="bar">{"<i></i>" * 16}</div><div class="top-in"><span class="brand">Robert Dębicki</span><span class="mono">Podgląd szkiców bloga, nie jest na stronie</span></div></div>
<main class="sheet">
<section id="spis"><p class="label mono" style="--sw:var(--c)">Strona /wpisy/</p><h2 class="sec-title">Wpisy</h2>
<p class="sec-intro">Tak wyglądałaby lista z miniaturkami. Pod każdą grafiką we wpisie jest propozycja tekstu ALT.</p><div class="karty">{"".join(menu)}</div></section>
{"".join(f"<section>{a}</section>" for a in artykuly)}
</main></body></html>'''
    (KATALOG / 'podglad.html').write_text(strona)
    print('Zapisano', KATALOG / 'podglad.html')


if __name__ == '__main__':
    main()
