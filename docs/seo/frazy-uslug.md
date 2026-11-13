# Frazy dla stron usług (pierwsza fala)

Data badania: 2026-11-13. Zadanie 4 planu widoczności.

## Metoda i ograniczenia

- **Podpowiedzi Google** (autouzupełnianie): `suggestqueries.google.com`, `hl=pl` i `hl=en`, 2026-11-13. Pokazują, co ludzie wpisują, ale **bez liczby wyszukiwań**.
- **WebSearch** (tryb standard, 2026-11-13): tytuły i typy stron z wyników. To wyszukiwarka z USA, więc kolejność wyników PL może różnić się od tego, co widzi użytkownik w Polsce.
- **Wolumeny: brak danych.** Nie użyto Planera słów kluczowych ani Search Console dla tych fraz. Żadna fraza poniżej nie ma wolumenu i nie wolno go zakładać. Do ustalenia później: Planer słów kluczowych (konto Google Ads) albo dane GSC po wdrożeniu stron.
- **„Ludzie pytają też” (PAA): niedostępne** w użytych narzędziach (WebSearch nie zwraca tego bloku, endpoint podpowiedzi też nie). Pytania FAQ poniżej pochodzą z **podpowiedzi Google w formie pytań** (tam, gdzie istniały) oraz z tematów powtarzających się w wynikach wyszukiwania. Każde ma oznaczone źródło. Robert lub kontroler może je zweryfikować w przeglądarce przy PAA.
- Fraza z podpowiedzi nie jest dowodem popytu na usługę. Część podpowiedzi dotyczy szukania pracy, kursów lub studiów (oznaczone „intencja: nie klient”).
- Bez stron „usługa + miasto”. Wrocław może pojawić się tylko jako kontekst w treści.

Oznaczenia pewności: ✅ zmierzone (źródło podane) · ⚠️ przesłanka · 🔴 nie wiem.

---

## 1. Automatyzacja procesów (n8n, Make.com, integracje)

### Frazy PL

| Fraza | Źródło (2026-11-13) | Uwaga |
|---|---|---|
| automatyzacja procesów biznesowych | podpowiedź Google hl=pl, 1. pozycja dla „automatyzacja procesów” | ⚠️ obok są też „studia podyplomowe”, „praca” (intencja: nie klient) |
| automatyzacja procesów księgowych | podpowiedź Google hl=pl | ✅ pasuje do przykładu faktur |
| automatyzacja faktur / automatyzacja wystawiania faktur / automatyzacja fakturowania | podpowiedź Google hl=pl dla „automatyzacja faktur” | ✅ |
| automatyzacja zamówień / automatyzacja obsługi zamówień | podpowiedź Google hl=pl | ✅ |
| automatyzacja n8n, automatyzacja z n8n, automatyzacja procesów n8n, automatyzacja ai n8n | podpowiedź Google hl=pl dla „automatyzacja n8n” | ✅ (jest też „automatyzacja n8n praca”, nie klient) |
| automatyzacja w make, automatyzacja ai make | podpowiedź Google hl=pl dla „automatyzacja make” | ✅ (jest też „kurs”, nie klient) |
| fakturownia integracja z woocommerce | podpowiedź Google hl=pl dla „integracja woocommerce z fakturownia” | ✅ konkretna integracja (nazwa narzędzia, nie klienta) |
| automatyzacja pozyskiwania leadów, automatyzacja leadów | podpowiedź Google hl=pl | ✅ |
| integracja crm, integracja crm z erp | podpowiedź Google hl=pl | ✅ |
| n8n czy make, n8n make zapier | podpowiedź Google hl=pl | ✅ porównanie, dobry temat FAQ |
| n8n co to jest, n8n cloud, n8n docker, n8n pricing | podpowiedź Google hl=pl dla „n8n” | ⚠️ mieszana intencja (informacyjna, techniczna) |

Zero podpowiedzi: „automatyzacja procesów w firmie”, „make.com integracje”, „automatyzacja faktur woocommerce”, „automatyzacja sklepu internetowego”, „integracja sklepu z księgowością”, „automatyzacja pipedrive”, „ile kosztuje automatyzacja procesów” (wynik 0 to też wynik: te sformułowania nie wchodzą do podpowiedzi, nie znaczy to, że nikt ich nie wpisuje).

### Frazy EN

| Fraza | Źródło (2026-11-13) | Uwaga |
|---|---|---|
| business process automation (examples, services, meaning) | podpowiedź Google hl=en | ✅ („jobs”, „course”, „analyst”: nie klient) |
| workflow automation for small business, ai automation for small businesses, automation software for small business | podpowiedź Google hl=en dla „automation for small business” | ✅ |
| n8n automation developer, n8n workflow automation developer | podpowiedź Google hl=en | ⚠️ w większości rynek pracy (jobs, salary) |
| hire dedicated n8n developers | podpowiedź Google hl=en dla „hire n8n developer” | ✅ intencja klienta |
| make com automation expert, make com automation specialist | podpowiedź Google hl=en | ✅ |
| n8n vs make, n8n vs make vs zapier, n8n vs make pricing | podpowiedź Google hl=en | ✅ |
| what is workflow automation (n8n, make com) | podpowiedź Google hl=en | ✅ pytanie informacyjne |

### Konkurencja w wynikach (WebSearch, „automatyzacja procesów w firmie n8n make wdrożenie”; „hire automation developer n8n Make.com…”)

PL: strony usługowe firm wdrażających n8n/automatyzację (np. podstrona „n8n automatyzacja” z etapami: rozmowa, koncepcja z ofertą, wdrożenie, testy, utrzymanie), porównania narzędzi n8n vs Make, ogłoszenia zleceń na platformie freelancerskiej, poradniki o mapowaniu procesów. EN: katalogi freelancerów (Upwork, Fiverr), forum społeczności Make z zapytaniami o wykonawcę, strony wykonawców. Samodzielnych stron pojedynczych freelancerów z konkretnym przykładem wdrożenia w pierwszej dziesiątce nie widać, ale to tylko jedno zapytanie przez wyszukiwarkę z USA (⚠️).

### Propozycja

- **Fraza główna:** automatyzacja procesów (wspierająco: automatyzacja procesów biznesowych, n8n, Make, integracja sklepu z księgowością).
- **Adres PL:** `/uslugi/automatyzacja-procesow/`
- **Adres EN:** `/en/services/process-automation/` (fraza EN: business process automation / workflow automation)
- **Tytuł SEO PL (59 znaków):** `Automatyzacja procesów w firmie: n8n, Make | Robert Dębicki`
- **Tytuł SEO EN (55 znaków):** `Business process automation: n8n, Make | Robert Dębicki`
- **FAQ (5):**
  1. Co to jest automatyzacja procesów biznesowych? (źródło: podpowiedź hl=pl „co to jest automatyzacja procesów biznesowych”, 2026-11-13)
  2. n8n czy Make: co wybrać do mojej firmy? (podpowiedź hl=pl „n8n czy make”, „n8n vs make which is better”, 2026-11-13)
  3. Czy da się połączyć sklep internetowy z programem do faktur? (podpowiedź hl=pl „fakturownia integracja z woocommerce”, „automatyzacja wystawiania faktur”, 2026-11-13)
  4. Które procesy w małej firmie najlepiej zacząć automatyzować? (temat z wyników WebSearch 2026-11-13: zacząć od procesu, który zabiera najwięcej czasu, a dopiero potem dobrać narzędzie; brak formy pytania w podpowiedziach)
  5. Czy n8n jest darmowe i ile kosztują automatyzacje? (podpowiedź hl=pl „czy n8n jest darmowe”, 2026-11-13; wycenę Robert podaje sam, bez liczb z tego badania)

---

## 2. Voiceboty

### Frazy PL

| Fraza | Źródło (2026-11-13) | Uwaga |
|---|---|---|
| voicebot, voicebot ai, voiceboty ai | podpowiedź Google hl=pl | ✅ |
| voicebot co to | podpowiedź Google hl=pl | ✅ informacyjna |
| voicebot cena | podpowiedź Google hl=pl | ✅ intencja zakupowa |
| voicebot dla firm, voicebot ai dla firm, voicebot firma | podpowiedź Google hl=pl | ✅ |
| voicebot medyczny | podpowiedź Google hl=pl | ⚠️ branża, poza pierwszą falą |
| ile kosztuje voicebot | podpowiedź Google hl=pl (dokładne zapytanie) | ✅ |
| voicebot czy chatbot | podpowiedź Google hl=pl („voicebot chatbot”) | ⚠️ |

Zero podpowiedzi: „voicebot telefoniczny”, „wdrożenie voicebota”, „jak działa voicebot”, „czy voicebot może dzwonić”.

### Frazy EN

| Fraza | Źródło (2026-11-13) | Uwaga |
|---|---|---|
| ai voice agent for business, for small business, services for businesses | podpowiedź Google hl=en | ✅ |
| voice ai agents (for developers, companies) | podpowiedź Google hl=en | ⚠️ część to rynek deweloperski |
| ai receptionist, ai receptionist for small business, ai receptionist cost | podpowiedź Google hl=en | ✅ pokrewna fraza o dużej widoczności w podpowiedziach |
| how much does an ai voice agent cost | podpowiedź Google hl=en | ✅ (zapytanie dokładne zostało uzupełnione) |

Zero podpowiedzi: „voice bot appointment”, „can ai voice agent make outbound calls”.

### Konkurencja w wynikach (WebSearch, „voicebot dla firm wdrożenie cena”; „AI voice agent outbound calls lead qualification CRM n8n”)

PL: cenniki i podstrony dostawców voicebotów (SaaS i agencje), blogi o kosztach wdrożenia, poradniki operatorów telekomunikacyjnych i dostawców narzędzi, serwis porównujący ceny usług. Strony pokazują ceny w modelu abonament plus minuty, to są deklaracje dostawców (⚠️). EN: blogi i case studies agencji automatyzacji (n8n plus platforma głosowa plus CRM), szablon w bibliotece n8n, oferty na Upwork. Typowy schemat: formularz → n8n → rozmowa wychodząca → notatka w CRM, co pokrywa się z przykładem Roberta. Tematy zgodności (zgody na kontakt telefoniczny) nie pojawiły się w wynikach, treść strony powinna je ostrożnie ująć (🔴 wymaga osobnego sprawdzenia przez Roberta, nie przez to badanie).

### Propozycja

- **Fraza główna:** voicebot (wspierająco: voicebot dla firm, voicebot ai).
- **Adres PL:** `/uslugi/voiceboty/`
- **Adres EN:** `/en/services/ai-voice-agents/` (fraza EN: ai voice agent for business; „voice bot” po angielsku ma słabszy sygnał w podpowiedziach)
- **Tytuł SEO PL (54 znaki):** `Voiceboty dla firm: telefon, CRM, n8n | Robert Dębicki`
- **Tytuł SEO EN (45 znaków):** `AI voice agents for business | Robert Dębicki`
- **FAQ (5):**
  1. Co to jest voicebot? (podpowiedź hl=pl „voicebot co to”, 2026-11-13)
  2. Ile kosztuje voicebot dla firmy? (podpowiedź hl=pl „ile kosztuje voicebot”, „voicebot cena”, 2026-11-13; wycenę podaje Robert, w wynikach ceny dostawców są rozbieżne i niezależnie niezweryfikowane)
  3. Czym voicebot różni się od chatbota? (podpowiedź hl=pl „voicebot chatbot”, 2026-11-13)
  4. Czy voicebot może sam zadzwonić do osoby, która wypełniła formularz, i zapisać notatkę w CRM? (temat z WebSearch 2026-11-13: schemat formularz, n8n, rozmowa, zapis w CRM; brak formy pytania w podpowiedziach; odpowiedź musi opisać zgody i zakres, wymaga potwierdzenia przez Roberta)
  5. Dla jakiej firmy voicebot się opłaca? (temat z WebSearch 2026-11-13: opłacalność zależy od liczby rozmów; konkretne progi z blogów dostawców nie są niezależne i nie wchodzą do treści)

---

## 3. Strony i aplikacje z Claude Code

### Frazy PL

| Fraza | Źródło (2026-11-13) | Uwaga |
|---|---|---|
| strona na wordpress cena, strona internetowa na wordpress cena, strona wizytówka wordpress cena | podpowiedź Google hl=pl | ✅ intencja zakupowa |
| ile kosztuje strona na wordpressie / prosta strona na wordpress | podpowiedź Google hl=pl | ✅ |
| ile kosztuje sklep woocommerce, ile kosztuje sklep internetowy woocommerce | podpowiedź Google hl=pl | ✅ |
| strona internetowa z ai, strona internetowa przez ai | podpowiedź Google hl=pl | ⚠️ mieszana intencja (generatory za darmo, „kreator”) |
| aplikacja dla firmy, aplikacja mobilna dla firmy | podpowiedź Google hl=pl | ⚠️ rozproszona (branże, aplikacje urzędowe) |
| aplikacja zamiast excela | podpowiedź Google hl=pl | ✅ blisko „narzędzie, gdy gotowe jest za drogie lub nie pasuje” |
| claude code cena, claude code | podpowiedź Google hl=pl | ⚠️ ludzie szukają produktu, nie wykonawcy |

Zero podpowiedzi: „strona wordpress na zamówienie”, „aplikacja na zamówienie dla firmy”, „narzędzie dla firmy na zamówienie”, „sklep woocommerce wykonanie”, „program na zamówienie”, „ile kosztuje aplikacja dla firmy”, „ile kosztuje dedykowane oprogramowanie”.

### Frazy EN

| Fraza | Źródło (2026-11-13) | Uwaga |
|---|---|---|
| woocommerce developer freelance | podpowiedź Google hl=en | ✅ |
| how much does a custom web app cost, how much does a custom website cost | podpowiedź Google hl=en | ✅ |
| build website with claude code, build wordpress website with claude code | podpowiedź Google hl=en | ⚠️ głównie poradniki „zrób to sam” |
| can ai build a website (for me, in wordpress) | podpowiedź Google hl=en | ⚠️ intencja DIY |

Zero podpowiedzi: „custom web app development small business”, „custom internal tools” (jedyna podpowiedź to to samo zapytanie).

### Konkurencja w wynikach (WebSearch, „aplikacja na zamówienie dla małej firmy…”; „strona internetowa WordPress WooCommerce Next.js Astro…”)

PL: strony dużych firm software house z ogólnymi tekstami „oprogramowanie na zamówienie” (kilka podstron jednej domeny, w tym wersje językowe), poradniki o kosztach i kiedy opłaca się własne oprogramowanie. Freelancerzy: strony osobiste z ofertą WordPress/WooCommerce plus Astro lub Next.js, w tym warianty „usługa + miasto” (nie kopiujemy), oferty zleceń z wymogiem pracy z AI, artykuł o sklepie WooCommerce zbudowanym z Claude Code. EN: gigi na Fiverr „claude code web app, wordpress, woocommerce”. Frazy z „Claude Code” w ofercie wykonawcy jeszcze nie są w pierwszej dziesiątce rozstrzygnięte (⚠️ jedno zapytanie).

### Propozycja

- **Fraza główna:** strony i aplikacje na zamówienie (wspierająco: strona WordPress, sklep WooCommerce, aplikacja zamiast Excela). „Claude Code” jako element opisu metody, nie fraza główna: ludzie wpisują ją, szukając produktu.
- **Adres PL:** `/uslugi/strony-i-aplikacje/`
- **Adres EN:** `/en/services/websites-and-apps/`
- **Tytuł SEO PL (49 znaków):** `Strony i aplikacje z Claude Code | Robert Dębicki`
- **Tytuł SEO EN (58 znaków):** `Websites and custom apps with Claude Code | Robert Dębicki`
- **FAQ (5):**
  1. Ile kosztuje strona na WordPressie? (podpowiedź hl=pl „ile kosztuje strona na wordpressie”, 2026-11-13; wycenę podaje Robert)
  2. Ile kosztuje sklep na WooCommerce? (podpowiedź hl=pl „ile kosztuje sklep woocommerce”, 2026-11-13)
  3. Czy AI może zbudować stronę dla firmy? Co z tego robi Claude Code? (podpowiedź hl=en „can ai build a website”, „build website with claude code”, 2026-11-13)
  4. Kiedy aplikacja na zamówienie ma sens zamiast gotowego programu? (podpowiedź hl=pl „aplikacja zamiast excela”; temat z WebSearch 2026-11-13: sens, gdy gotowe narzędzie wymaga obejść albo jest za drogie)
  5. WordPress, Astro czy Next.js: co wybrać? (temat z WebSearch 2026-11-13: powtarzający się podział WordPress jako CMS, Astro dla lekkich stron, Next.js dla złożonych produktów; brak formy pytania w podpowiedziach)

---

## Podsumowanie adresów do akceptacji (po wdrożeniu zmiana wymaga 301)

| Usługa | PL | EN | Tytuł PL (znaki) | Tytuł EN (znaki) |
|---|---|---|---|---|
| Automatyzacja procesów | `/uslugi/automatyzacja-procesow/` | `/en/services/process-automation/` | 59 | 55 |
| Voiceboty | `/uslugi/voiceboty/` | `/en/services/ai-voice-agents/` | 54 | 45 |
| Strony i aplikacje | `/uslugi/strony-i-aplikacje/` | `/en/services/websites-and-apps/` | 49 | 58 |

Długość tytułów policzona skryptem (Python `len`), razem z końcówką ` | Robert Dębicki`.

## Luki

- Brak wolumenów wyszukiwań dla wszystkich fraz (🔴, rozstrzyga Planer słów kluczowych albo GSC po wdrożeniu).
- Brak bloku „Ludzie pytają też” (🔴, sprawdzić ręcznie w przeglądarce dla fraz głównych przed finalizacją FAQ).
- Wyniki WebSearch pochodzą z wyszukiwarki dla USA i pojedynczych zapytań, kolejność w Polsce może się różnić.
