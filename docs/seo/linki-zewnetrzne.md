# Lista działań: linki i wzmianki zewnętrzne

Stan na 2026-11-13. Lista dla Roberta: rejestracje i wysyłki robisz Ty, nic nie zostało zgłoszone ani założone. Przy każdej pozycji: adres, co wpisać, gotowy tekst, koszt, rodzaj linku, źródło sprawdzenia.

## Zasady przed startem

- Tekst do wklejenia nie zawiera nazw klientów ani liczb, których nie podałeś. Klienta opisuj branżą.
- Pozycje 1 i 2 możesz zrobić od ręki. Linki do podstron usług (`/uslugi/...`, `/en/services/...`) i `/dla-rekruterow/` wstawiaj dopiero po wdrożeniu tych stron. Do tego czasu linkuj do `https://robert-debicki.pl/` i `https://robert-debicki.pl/wpisy/`.
- Oznaczenia: ✅ sprawdzone (źródło w polu) · ⚠️ częściowo sprawdzone · 🔴 nie wiem, trzeba zajrzeć na miejscu.
- Rodzaj linku (`dofollow` / `nofollow`): przy żadnej pozycji nie mierzyłem atrybutu `rel`, więc wszędzie "nie wiem". Po założeniu profilu sprawdź kod strony (inspekcja elementu na linku). Wartość pozycji liczymy też bez tego: wzmianka na zewnętrznej stronie może mieć sens nawet bez linku (⚠️ przesłanka, niezmierzona).
- Płatnych miejsc nie polecam. Gdyby jakieś się pojawiło, tylko jako ogłoszenie z oznaczeniem `sponsored` albo `nofollow`.
- Nie wchodzić w katalogi "dodaj stronę za darmo, 200 linków", sieci blogów, wymiany linków. Skill `directory-submissions` jest pisany pod produkty SaaS (Product Hunt, G2, katalogi AI); dla osoby prywatnej to w większości nietrafione, dlatego lista jest krótka i oparta o platformy, na których rekruter i klient faktycznie szukają ludzi.

## Kolejność: wartość do wysiłku

| # | Miejsce | Wysiłek | Powód miejsca na liście |
|---|---|---|---|
| 1 | Profil GitHub (README, pole Website, przypięte repo) | 20 min | Miejsce, gdzie rekruter techniczny może sprawdzić kod (⚠️ przesłanka); repo strony jest publiczne i świadczy o autorze |
| 2 | LinkedIn: Website, Featured, nagłówek | 30 min | Miejsce, w którym rekruter i właściciel firmy mogą sprawdzić osobę (⚠️ przesłanka) |
| 3 | Prośba do klientów o wzmiankę z linkiem | 1 mail na klienta | Link od prawdziwego wdrożenia jest tematycznie trafny i tani (⚠️ przesłanka) |
| 4 | Make: program Solution Partner | 1 h + szkolenie | Oficjalna lista ekspertów "Hire an expert" (jeśli przyjmą) |
| 5 | n8n: szablony w portalu twórców i wątki na forum | 2 h na szablon | Wzmianka w miejscu tematycznie bliskim n8n (⚠️ wpływ niezmierzony) |
| 6 | Dev.to: przedruk wpisów z `canonical` | 20 min na wpis | Darmowy zasięg wpisów, bezpieczny dla SEO dzięki `canonical` |
| 7 | Wrocławskie spotkania (WAIT, meet.js) | zależy | Lokalne kontakty i link w opisie wystąpienia |
| 8 | Bulldogjob Readme: artykuł autorski | 4 h na tekst | Polskie medium dla rekruterów IT, ale warunki do sprawdzenia |
| 9 | Useme: profil wykonawcy | 30 min | Polska platforma zleceń, ale prowizja od zleceń |
| 10 | Just Join IT, No Fluff Jobs, Freelanceria | do sprawdzenia | Nie potwierdziłem, że istnieje profil kandydata z linkiem do strony |

## 1. Profil GitHub

- Adres: https://github.com/RobertDebicki (nazwa użytkownika wzięta ze ścieżki repo `RobertDebicki/robert-debicki`; popraw, jeśli profil nazywa się inaczej).
- Koszt: bezpłatnie. Link: nie wiem (linki w README i polu Website to zwykle zwykłe odnośniki, sprawdź).
- Źródło: ✅ docs.github.com, "Managing your profile README", 2026-11-13: repozytorium musi nazywać się dokładnie jak nazwa użytkownika, być publiczne i mieć `README.md` z treścią.
- Co zrobić:
  1. Nowe publiczne repo `RobertDebicki` z `README.md` (tekst niżej).
  2. W ustawieniach profilu: pole Website = `https://robert-debicki.pl`, Location = Wrocław (albo zdalnie), krótki Bio.
  3. Przypiąć repo `robert-debicki` i dwa inne, które chcesz pokazać (wybierz sam, nie wiem, jakie masz).
  4. W opisie (About) repo `robert-debicki` wpisać adres strony i tematy (topics): `astro`, `portfolio`, `automation`, `n8n`.
- Bio (do 160 znaków): `Automation Developer i AI Engineer. n8n, Make, Claude Code, voiceboty, WordPress, Next.js. Wrocław lub zdalnie.`
- README (do wklejenia):

```markdown
# Robert Dębicki

Automation Developer i AI Engineer. Dowożę działające systemy u klientów: automatyzacja procesów w n8n i Make, agenci AI, voiceboty, WordPress i WooCommerce, Next.js.

Wrocław lub zdalnie.

- Strona: https://robert-debicki.pl
- Wpisy o automatyzacji i AI: https://robert-debicki.pl/wpisy/
- LinkedIn: https://www.linkedin.com/in/robert-d%C4%99bicki/
- Kod strony (testy, historia zmian): https://github.com/RobertDebicki/robert-debicki

Szukam roli Automation Developer albo AI Engineer oraz zleceń od firm na automatyzację procesów.
```

Po wdrożeniu stron usług dopisz trzy linki: automatyzacja procesów, voiceboty, strony i aplikacje.

## 2. LinkedIn

- Adres: https://www.linkedin.com/in/robert-d%C4%99bicki/ (profil istnieje).
- Koszt: bezpłatnie. Link: LinkedIn zwykle oznacza linki wychodzące jako `nofollow` (⚠️ z ogólnej wiedzy, nie zmierzone). Wartość to ruch od rekruterów i klientów (⚠️ niezmierzone).
- Co zrobić:
  1. Contact info: Website = `https://robert-debicki.pl`, etykieta "Portfolio".
  2. Featured: dodać link do strony, do wpisu "n8n, Make czy Zapier: jak wybrać do firmy" i do wpisu o voice botach; po wdrożeniu także do `/dla-rekruterow/` i strony usługi.
  3. Nagłówek (headline), do 220 znaków: `Automation Developer | AI Engineer | n8n, Make, Claude Code, voiceboty | Automatyzuję procesy w firmach | Wrocław albo zdalnie`
  4. Sekcja "Informacje" (tekst niżej).
  5. Dodać umiejętności: n8n, Make, Claude Code, WordPress, WooCommerce, Next.js (tylko te, które faktycznie masz).
- Informacje (do wklejenia):

```
Dowożę działające systemy u klientów. Prowadzę wdrożenie od analizy procesu do uruchomienia i przekazania go zespołowi: automatyzacje w n8n i Make.com, agenci AI, voiceboty, strony i sklepy na WordPressie i WooCommerce, aplikacje w Next.js.

Dla firm: opisz proces, który zabiera czas, a sprawdzę, co da się zautomatyzować. Dla rekruterów: szukam roli Automation Developer albo AI Engineer. Wrocław lub zdalnie.

Strona z opisem wdrożeń i wpisami: https://robert-debicki.pl
```

- Rozważ wpis na LinkedIn z linkiem do jednego z wpisów raz na tydzień lub dwa; nie planuj liczby linków, liczy się treść.

## 3. Prośba do klientów o wzmiankę z linkiem

- Gdzie: strony klientów, na których już jest podpis wykonawcy (stopka, "O nas", wpis o wdrożeniu), albo ich profil LinkedIn (rekomendacja).
- Koszt: bezpłatnie. Link: zależy od klienta, nie wiem.
- Zasady: pytasz tylko klientów, którzy sami są zadowoleni; nic w zamian za link (towar lub usługa za link to płatny link i wymaga `rel="sponsored"`); anchor zostawiasz klientowi. Referencja wymaga `zgoda: true` w CMS, link i nazwa firmy też tylko za wyraźną zgodą.
- Mail (do wysłania po Twojej akceptacji, dopasuj imię):

```
Temat: Prośba o drobną rzecz po wdrożeniu

Dzień dobry [imię],

cieszę się, że automatyzacja działa u Państwa. Mam prośbę: jeśli uważa Pan/Pani, że warto, czy mógłbym dostać krótką rekomendację na LinkedIn albo jedno zdanie w stopce lub w zakładce "O nas" z odnośnikiem do mojej strony (https://robert-debicki.pl)? Sformułowanie zostawiam Państwu.

Jeśli wolicie nie, to oczywiście bez problemu.

Pozdrawiam
Robert Dębicki
```

- Wzór zdania, które klient może wziąć za podstawę: `Automatyzację [procesu] wdrożył Robert Dębicki (robert-debicki.pl).`

## 4. Make: program Solution Partner

- Adres: https://www.make.com/en/solution-partners ; formularz: https://partner-portal.make.com/concierge/ucm/#/cms/CMSCreateAccountnew ; katalog: https://www.make.com/partners-directory (⚠️ adres z linku w stopce strony partnerów, sam katalog nie otwierany).
- Koszt: ✅ bezpłatny dla kwalifikujących się (strona programu, 2026-11-13). Link: nie wiem.
- Wymagania ✅ ze strony: co najmniej jeden ekspert od automatyzacji, doświadczenie w usługach automatyzacji, wypełniony formularz, obowiązkowe szkolenie partnerskie; więcej certyfikatów to lepsza pozycja. 🔴 Strona nie mówi, czy każdy partner trafia do katalogu, ani czy jednoosobowa firma zostanie przyjęta. Sprawdzisz to tylko składając wniosek.
- Co wpisać (EN, w formularzu):

```
Independent Make and n8n automation developer in Wroclaw or remote, working with companies. I deliver process automation, AI agents and voice bots, plus WordPress/WooCommerce and Next.js work. Website: https://robert-debicki.pl
```

- Po przyjęciu: wpisać w opisie profilu partnera adres strony i link do wpisu "n8n, Make czy Zapier".
- Uwaga: program afiliacyjny Make (https://www.make.com/en/affiliate) to inna rzecz: prowizja za polecenia. Wchodzi w grę tylko, gdy ujawnisz powiązanie przy poleceniach; nie dodaję go do listy.

## 5. n8n: szablony i forum

- Portal twórców: https://creators.n8n.io (rejestracja: `/register`). Koszt: bezpłatnie. Źródło: ✅ docs.n8n.io, "Create workflow templates", 2026-11-13.
  - Zasady ✅ z dokumentacji: własne, oryginalne szablony; nowy twórca zgłasza po jednym i czeka na akceptację; po trzech zaakceptowanych zostaje się zweryfikowanym twórcą. Plagiat kończy się banem.
  - 🔴 Nie potwierdziłem, czy profil twórcy ma pole na adres strony. Sprawdź w portalu po rejestracji.
  - Co zrobić: wybierz jeden swój przepływ, który nie zawiera danych klienta ani kluczy, uprość go do ogólnego przypadku, opisz przez notatki w workflow. Nie używaj niczego z projektów klientów.
- Forum: https://community.n8n.io/c/built-with-n8n/15 (✅ kategoria istnieje i jest aktywna; forum pisze, że pojedyncze przepływy lepiej pokazywać w szablonach, a kategoria jest na szersze projekty). Link z forum: nie wiem. Wartość głównie w odpowiadaniu na pytania pod własnym nazwiskiem i podpisie z adresem strony w profilu.
- Katalog ekspertów n8n (https://experts.n8n.io): ✅ istnieje, ale ✅ pilotaż jest zamknięty i wymaga m.in. trzech aktywnych klientów na n8n oraz pracy w UK, Irlandii, Europie Północnej lub Ameryce Północnej (https://n8n.io/become-an-expert, 2026-11-13). Polska nie jest wymieniona, więc na razie pomijamy; wracamy, gdy n8n rozszerzy listę krajów.
- Opis szablonu (EN, szkic do dopasowania do konkretnego przepływu):

```
Short description: Automatically [what the workflow does] and notify the team. Built for small businesses that do this step by hand today.
Setup: connect [service], add credentials, run once to test.
Author: Robert Debicki, automation developer. More at https://robert-debicki.pl
```

## 6. Dev.to: przedruk wpisów

- Adres: https://dev.to (rejestracja bezpłatna). Koszt: bezpłatnie. Link: nie wiem.
- Źródło: ✅ https://dev.to/help/writing-editing-scheduling, 2026-11-13: pole "Canonical URL" w ustawieniach wpisu (lub `canonical_url` w front matter) wskazuje oryginał; zachęcają do przedruku z własnego bloga; treść wspomagana AI trzeba oznaczać zgodnie z ich zasadami.
- Co zrobić: przedrukuj wpisy po angielsku (angielska wersja `en.md` istnieje, jeśli już przetłumaczona), zawsze z `canonical` na adres wpisu w `/en/`. Najlepsze kandydatury: "n8n, Make czy Zapier" i "Voice bot dla firmy". Tagi: `n8n`, `automation`, `ai`.
- Bio (EN): `Automation developer and AI engineer. n8n, Make, Claude Code, voice bots. Wroclaw or remote. https://robert-debicki.pl`
- Na końcu przedruku: `Originally published at https://robert-debicki.pl/en/...` (adres konkretnego wpisu).

## 7. Wrocławskie spotkania

- WAIT, Wrocław AI Team: https://www.meetup.com/wait-wroclaw-ai-team ✅ istnieje, około 3,7 tys. członków, 61 minionych wydarzeń, ostatnie z października, brak zapowiedzianych (odczyt 2026-11-13). Organizatorzy odpowiadają przez wiadomość na stronie grupy. Pozycja daje kontakty i wzmiankę w opisie wydarzenia; 🔴 czy przyjmują krótkie wystąpienia, wie tylko organizator.
- meet.js Wrocław: https://meetup.com/pl-PL/meet-js-wroclaw (✅ istnieje według wyników wyszukiwania, strony nie otwierałem).
- Wiadomość do organizatora WAIT (po Twojej akceptacji):

```
Cześć,

jestem Automation Developerem i AI Engineerem (Wrocław albo zdalnie), wdrażam automatyzacje w n8n i Make.com oraz agentów AI w firmach. Mogę przygotować krótkie wystąpienie o tym, jak z ręcznego procesu zrobić działającą automatyzację z AI [temat i długość do potwierdzenia przez Roberta]. Jeśli taki temat pasuje do kolejnego spotkania, daj proszę znać.

Robert Dębicki, https://robert-debicki.pl
```

## 8. Bulldogjob Readme: artykuł autorski

- Adres: https://bulldogjob.pl/readme ; na stronach autorów jest przycisk "Zostań autorem Readme" (⚠️ z wyników wyszukiwania; strona zwróciła mi błąd 403, więc nie widziałem warunków).
- Koszt: 🔴 nie wiem. Link w biogramie autora: nie wiem. Jeśli publikacja jest płatna albo promocyjna, link musi mieć `sponsored` lub `nofollow` (zadaj to pytanie wprost).
- Pomysł: jeden techniczny tekst (np. rozwinięcie wpisu o odczycie dokumentów przez AI), bez nazw klientów, bez liczb, których nie masz. Anchory w tekście zostaw nazwą marki albo adresem; kluczowych fraz nie wciskaj w link.
- Zgłoszenie (szkic):

```
Dzień dobry,

chciałbym zgłosić artykuł do Readme: "Automatyczny odczyt dokumentów przez AI" (rozwinięcie mojego wpisu o tym samym tytule). Pisze Robert Dębicki, Automation Developer i AI Engineer (Wrocław albo zdalnie). Zakres tekstu: [do potwierdzenia przez Roberta]. Czy są wytyczne dla autorów i czy publikacja jest bezpłatna?

Robert Dębicki, https://robert-debicki.pl
```

## 9. Useme: profil wykonawcy

- Adres: https://useme.com/pl/ ✅ platforma istnieje i ma publiczne profile wykonawców (np. adresy w postaci `useme.com/pl/roles/contractor/...` w wynikach wyszukiwania); sama strona zwróciła mi błąd 403, więc cennika i pola na stronę nie sprawdziłem.
- Koszt: 🔴 nie wiem; wyszukiwanie wskazuje prowizję od rozliczanych zleceń i płatny plan Useme Plus. Link: nie wiem.
- Wartość: kontakt z małymi firmami szukającymi prostych automatyzacji w narzędziach no-code (raport platformy wymienia takie zlecenia). Wymaga uwagi: zlecenia przez platformę oznaczają prowizję, więc nie jest to czysty kanał linkowy. Rób tylko, jeśli chcesz tego kanału zleceń.
- Opis (PL):

```
Automatyzuję procesy w firmach: scenariusze w n8n i Make.com, agenci AI, voiceboty, strony i sklepy na WordPressie i WooCommerce. Opiszcie proces, który zabiera Wam czas, a sprawdzę, co da się zautomatyzować. Wrocław lub zdalnie. Więcej: https://robert-debicki.pl
```

## 10. Do sprawdzenia, bez rekomendacji teraz

- Just Join IT (https://justjoin.it) i No Fluff Jobs (https://nofluffjobs.com): ✅ działają jako portale ofert, 🔴 nie potwierdziłem, że da się założyć profil kandydata widoczny dla rekruterów z linkiem do strony (wyszukiwanie nie dało instrukcji). Sprawdź w ustawieniach konta po zalogowaniu. Jeśli jest pole "link do portfolio" albo "O mnie", wklej tekst z sekcji LinkedIn.
- Freelanceria (https://freelanceria.pl): ✅ strona działa, ale ma charakter portalu z artykułami; 🔴 czy ma katalog freelancerów z profilami z linkiem, tego nie potwierdziłem, a recenzja, którą widziałem, mówi o wielu niewypełnionych profilach. Niski priorytet.
- Meetupy i konferencje: wydarzenia z Crossweb (https://crossweb.pl) i AI Tinkerers Poland z GDG Wrocław mają tematykę zgodną ze stroną; sprawdzaj harmonogram i zgłaszaj się z wystąpieniem, jeśli otwierają nabór.

## Czego świadomie nie robimy

- Płatne wpisy w katalogach firm, pakiety "dodamy Cię do 100 katalogów", wymiany linków, artykuły sponsorowane z linkiem bez `rel="sponsored"`.
- Katalogi produktów i startupów (Product Hunt, G2, Capterra, katalogi narzędzi AI): to miejsca na produkt SaaS, nie na stronę usługowca. Gdyby powstało kiedyś narzędzie na licencji open source, wtedy wrócimy do `directory-submissions`.
- Publikacja nazw klientów bez ich wyraźnej zgody i bez `zgoda: true`.

## Śledzenie

Po każdej rejestracji dopisz do tabeli: data, adres profilu, co wpisane, co zobaczyłeś w kodzie linku (`rel`). Nie ma jeszcze pliku śledzącego; jeśli chcesz, dodam CSV w kolejnym kroku.

| Miejsce | Data | Adres profilu | `rel` linku | Uwagi |
|---|---|---|---|---|
| | | | | |
