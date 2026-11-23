# Pomiar widoczności w AI

Cel: sprawdzać raz w tygodniu, czy robert-debicki.pl pojawia się w odpowiedziach AI na pytania klientów.
Google AI Overview mierzy Claude Code przez Treg (`cloro.google.serp.organic`, gl PL, hl pl, komputer, `include.aioverview: true`, $0.0028 za pytanie). ChatGPT i Perplexity wpisuje Robert ręcznie.
Wynik: **nazwa** (wymieniony z nazwy), **link** (cytowany jako źródło), **wyniki** (w top 10 Google, bez cytatu w AI), **brak**.

Kontrola w Search Console: **21.12.2026** (28 dni po wgraniu zmian z 23.11): wyświetlenia stron usług i fraz z `audyt-2026-11-23.md`, punkt 2.

## 10 pytań

| # | Pytanie | Strona, która ma odpowiadać |
|---|---|---|
| 1 | ile kosztuje voicebot dla firmy | /uslugi/voiceboty/ |
| 2 | voicebot dla firm | /uslugi/voiceboty/ |
| 3 | wdrożenie ai w firmie | /uslugi/ai-i-automatyzacja/ |
| 4 | ile kosztuje wdrożenie ai w firmie | /uslugi/ai-i-automatyzacja/ (i planowany wpis o kosztach) |
| 5 | automatyzacja ai dla firm | /uslugi/ai-i-automatyzacja/ |
| 6 | agent ai dla firm | /uslugi/ai-i-automatyzacja/ |
| 7 | n8n czy make | /wpisy/n8n-make-czy-zapier/ |
| 8 | ile kosztuje strona wizytówka | /uslugi/strony-i-aplikacje/ |
| 9 | wdrożenie claude code w firmie | brak strony |
| 10 | szkolenie claude code | brak strony |

## Wyniki

| Data | Silnik | Pytanie | Wynik | Kogo cytuje AI |
|---|---|---|---|---|
| 2026-11-23 | Google AI Overview | 1 | brak | smart-asystenci.pl, acxcc.com, callsono.com, callfactory.pl, odbierze.ai, zleca.pl, stormit.pl |
| 2026-11-23 | Google AI Overview | 2 | brak | home.pl, callsono.com, simplefast.ai, agisona.pl, stormit.pl |
| 2026-11-23 | Google AI Overview | 3 | brak | arturjablonski.com, dokodu.it, widoczni.com, nocodework.io, krzywicka.pl, automaize.pl |
| 2026-11-23 | Google AI Overview | 4 | brak | kamikstudio.pl, xmagency.pl, kotywsieci.pl, aibox.edu.pl, herens.pl |
| 2026-11-23 | Google AI Overview | 5 | brak | dokodu.it, sagiton.pl, automatyzacje.ai, kamikstudio.pl, enovatio.com |
| 2026-11-23 | Google AI Overview | 6 | brak | agenciai.pl, dokodu.it, bonavigator.pl, supremo.pl, alterdata.com |
| 2026-11-23 | Google AI Overview | 7 | brak | dokodu.it, make.com, n8n.io, agenciai.pl, agisona.pl, webyjuice.pl |
| 2026-11-23 | Google AI Overview | 8 | brak | thenewlook.pl, thestory.is, depcore.pl, projektowaniestroncennik.pl, najszybsza.pl, 2ez.pl |
| 2026-11-23 | Google AI Overview | 9 | brak | majchrzycki.com, wartoszkolic.pl, dqh.pl, claudedlafirm.pl, opsiocloud.com |
| 2026-11-23 | Google AI Overview | 10 | brak | jsystems.pl, comarch.pl, altkomakademia.pl, sages.pl, nobleprog.pl, kurscc.pl |

Stan wyjściowy: zmiany z 23.11 (ceny, grafiki, wezwania) nie były jeszcze wgrane na serwer.

## Ceny konkurencji z tych wyników (23.11.2026)

Źródła: AI Overview i wyniki Google z pomiaru wyżej, strony SoftSolid, Claude dla Firm i Warto Szkolić odczytane 23.11.

| Usługa | Konkurencja | Robert |
|---|---|---|
| Voicebot | SimpleFast od 2500 zł netto plus utrzymanie 299 do 1500 zł/mies.; odbierze.ai 2990 zł plus 990 zł/mies.; zleca.pl przykład 3000 zł plus 900 zł/mies. plus 0,55 zł/min | od 2000 zł netto plus około 20 USD/mies. ElevenLabs i numer |
| Prosta automatyzacja / wdrożenie AI | AI Overview: prosty chatbot lub pojedyncza automatyzacja 3000 do 15 000 zł netto; Herens 5 do 15 tys. zł; kamikstudio 200 zł/h, chatbot od 3000 zł; AutomAIze 8000 do 16 000 zł | od 500 zł netto, około 3 dni |
| Strona wizytówka | AI Overview: 1000 do 5500 zł; thenewlook od 950 zł; 2ez 1500 zł netto; najszybsza od 1500 zł netto | od 800 zł netto, około 4 dni |
| Wdrożenie Claude Code ze szkoleniem | SoftSolid (ceny netto): szkolenie indywidualne 2 × 3 h od 1800 zł, warsztat dla zespołu do 8 osób od 3500 zł, wdrożenie w zespole do 5 osób z 30 dniami wsparcia od 6900 zł; otwarte szkolenia 1 dzień: Comarch 1800 zł netto, Altkom 1750 zł netto, Sages 2 dni 2450 zł netto; kurs online Claude dla Firm 1197 do 2197 zł netto (ceny z obciętej strony, niepewne); Warto Szkolić bez ceny | około 2000 zł netto (wdrożenie i szkolenie u klienta) |
