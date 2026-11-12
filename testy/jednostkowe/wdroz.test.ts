import { describe, expect, it } from 'vitest';
import { adresPliku, cytujDlaCurl, konfiguracjaTransferow, parsujListing, plikiDoWgrania, podzielNaEtapy, sprawdzZgodnosc, srodowiskoBuildu, transferWgrania, wczytajKonfiguracje, zgodnoscRobots } from '../../skrypty/wdroz';

describe('wczytajKonfiguracje', () => {
  it('czyta HOST, USER, PASSWORD i KATALOG, ignoruje komentarze i puste linie', () => {
    const k = wczytajKonfiguracje('# komentarz\n\nHOST=ftp.example.pl\nUSER=login@x\nPASSWORD=ha=sło "1"\nKATALOG=/domains/x/public_html\n');
    expect(k).toEqual({ host: 'ftp.example.pl', user: 'login@x', password: 'ha=sło "1"', katalog: '/domains/x/public_html' });
  });

  it('bez KATALOG używa głównego katalogu konta', () => {
    expect(wczytajKonfiguracje('HOST=h\nUSER=u\nPASSWORD=p').katalog).toBe('/');
  });

  it('zgłasza brakujące pole, bez wartości hasła w komunikacie', () => {
    expect(() => wczytajKonfiguracje('HOST=h\nUSER=u')).toThrow(/PASSWORD/);
  });

  it('odrzuca katalog z .. i katalog bez początkowego ukośnika', () => {
    expect(() => wczytajKonfiguracje('HOST=h\nUSER=u\nPASSWORD=p\nKATALOG=/a/../b')).toThrow(/KATALOG/);
    expect(() => wczytajKonfiguracje('HOST=h\nUSER=u\nPASSWORD=p\nKATALOG=a/b')).toThrow(/KATALOG/);
  });

  it('usuwa końcowy ukośnik z katalogu', () => {
    expect(wczytajKonfiguracje('HOST=h\nUSER=u\nPASSWORD=p\nKATALOG=/a/b/').katalog).toBe('/a/b');
  });
});

describe('plikiDoWgrania', () => {
  it('pomija pliki Cloudflare (_headers, _redirects)', () => {
    const wynik = plikiDoWgrania(['_headers', '_redirects', 'index.html', 'og.png']);
    expect(wynik).not.toContain('_headers');
    expect(wynik).not.toContain('_redirects');
  });

  it('wgrywa strony HTML na końcu, żeby żadna nie wskazywała na brakujący plik', () => {
    const wynik = plikiDoWgrania(['index.html', '_astro/a.css', 'en/index.html', 'og.png', '404.html']);
    const pierwszyHtml = wynik.findIndex((p) => p.endsWith('.html'));
    expect(wynik.slice(pierwszyHtml).every((p) => p.endsWith('.html'))).toBe(true);
    expect(wynik).toHaveLength(5);
  });

  it('pomija .htaccess z dist/, bo skrypt wgrywa własny z hosting/htaccess', () => {
    expect(plikiDoWgrania(['index.html', '.htaccess'])).toEqual(['index.html']);
  });
});

describe('parsujListing', () => {
  it('rozpoznaje katalogi i pliki z listingu w formacie ls -l, pomija . i ..', () => {
    const l = [
      'drwxr-xr-x    2 u g     4096 Nov 11 17:00 .',
      'drwxr-xr-x    5 u g     4096 Nov 11 17:00 ..',
      'drwxr-xr-x    2 u g     4096 Nov 11 17:00 _astro',
      '-rw-r--r--    1 u g      612 Nov 11 17:00 plik ze spacją.html',
    ].join('\r\n');
    expect(parsujListing(l)).toEqual([
      { nazwa: '_astro', katalog: true },
      { nazwa: 'plik ze spacją.html', katalog: false },
    ]);
  });
});

describe('parsujListing: formaty, których nie wolno pominąć po cichu', () => {
  it('zna wiersz z ACL (+) po uprawnieniach i pomija linię total', () => {
    const l = 'total 8\r\n-rw-r--r--+   1 u g      612 Nov 11 17:00 a.html';
    expect(parsujListing(l)).toEqual([{ nazwa: 'a.html', katalog: false }]);
  });

  it('rzuca błąd dla dowiązania symbolicznego, żeby nie uznać serwera za pusty', () => {
    expect(() => parsujListing('lrwxrwxrwx    1 u g       5 Nov 11 17:00 x -> y')).toThrow(/nieznanym formacie/);
  });

  it('rzuca błąd dla listingu w stylu DOS', () => {
    expect(() => parsujListing('11-11-26  05:00PM       <DIR>          a')).toThrow(/nieznanym formacie/);
  });

  it('pusta odpowiedź to pusty katalog, bez błędu', () => {
    expect(parsujListing('')).toEqual([]);
  });
});

describe('konfiguracjaTransferow', () => {
  const k = { host: 'h.pl', user: 'u@x', password: 'p"w', katalog: '/' };
  const wynik = konfiguracjaTransferow(k, [{ adres: 'ftp://h.pl/a', opcje: ['upload-file = "/tmp/a"'] }, { adres: 'ftp://h.pl/b', opcje: [] }]);

  it('daje jeden blok na transfer rozdzielony "next", z danymi logowania w każdym bloku', () => {
    expect(wynik.split('\nnext\n')).toHaveLength(2);
    expect(wynik.match(/user = "u@x:p\\"w"/g)).toHaveLength(2);
  });

  it('wymusza TLS 1.2: z TLS 1.3 serwer home.pl zrywa większe transfery (451: 24 KB przechodzi, 48 KB nie), a plik zostaje pusty', () => {
    expect(wynik.match(/tls-max = 1\.2/g)).toHaveLength(2);
  });

  it('ustawia limit czasu w każdym bloku, bo --max-time z wiersza poleceń nie obejmuje kolejnych transferów', () => {
    expect(wynik.match(/max-time = 120/g)).toHaveLength(2);
  });

  it('wymusza TLS i wypisuje kod wyniku każdego transferu', () => {
    expect(wynik.match(/ssl-reqd/g)).toHaveLength(2);
    expect(wynik.match(/write-out = "%\{exitcode\} %\{url\}\\n"/g)).toHaveLength(2);
  });
});

describe('transferWgrania', () => {
  it('wgrywa pod nazwą .part i podmienia dopiero po udanym transferze, więc błąd nie zostawia pustego pliku strony', () => {
    const t = transferWgrania('h.pl', '/', 'en/index.html', '/tmp/x/index.html');
    expect(t.adres).toBe('ftp://h.pl/en/index.html.part');
    expect(t.opcje).toEqual(['upload-file = "/tmp/x/index.html"', 'ftp-create-dirs', 'quote = "-RNFR index.html.part"', 'quote = "-RNTO index.html"']);
  });
});

describe('transferWgrania: nazwy specjalne', () => {
  it('ucieka cudzysłów i ukośnik w komendach RNFR i RNTO', () => {
    const t = transferWgrania('h.pl', '/', 'a"b.html', '/tmp/a');
    expect(t.opcje).toContain('quote = "-RNFR a\\"b.html.part"');
    expect(t.opcje).toContain('quote = "-RNTO a\\"b.html"');
  });
});

describe('podzielNaEtapy', () => {
  it('zasoby osobno, potem HTML, na końcu .htaccess, tak żeby błąd wcześniejszego etapu zatrzymał kolejne', () => {
    const e = podzielNaEtapy(['_astro/a.woff2', 'og.png', 'index.html', 'en/index.html', '.htaccess']);
    expect(e).toEqual([['_astro/a.woff2', 'og.png'], ['index.html', 'en/index.html'], ['.htaccess']]);
  });
  it('pomija puste etapy', () => {
    expect(podzielNaEtapy(['index.html', '.htaccess'])).toEqual([['index.html'], ['.htaccess']]);
  });
});

describe('sprawdzZgodnosc', () => {
  const pliki = [{ zdalny: 'index.html', tresc: Buffer.from('<html>cała strona</html>') }, { zdalny: 'og.png', tresc: Buffer.from('PNG-DANE') }];
  const ok = (tresc: Buffer) => ({ status: 200, tresc });

  it('zwraca pustą listę, gdy wszystko zgodne', async () => {
    const r = await sprawdzZgodnosc(pliki, async (z) => ok(pliki.find((p) => p.zdalny === z)!.tresc));
    expect(r).toEqual([]);
  });

  it('zgłasza pusty plik mimo statusu 200', async () => {
    const r = await sprawdzZgodnosc(pliki, async (z) => ok(z === 'index.html' ? Buffer.alloc(0) : pliki[1].tresc));
    expect(r).toHaveLength(1);
    expect(r[0]).toMatch(/index\.html/);
  });

  it('zgłasza ucięty plik i status 404', async () => {
    const r = await sprawdzZgodnosc(pliki, async (z) => (z === 'og.png' ? { status: 404, tresc: Buffer.from('nie ma') } : ok(pliki[0].tresc.subarray(0, 5))));
    expect(r).toHaveLength(2);
  });

  it('pojedynczy błąd sieci jest ponawiany raz; zgodny plik po ponowieniu nie trafia na listę', async () => {
    const proby: Record<string, number> = {};
    const r = await sprawdzZgodnosc(pliki, async (z) => {
      proby[z] = (proby[z] ?? 0) + 1;
      if (z === 'index.html' && proby[z] === 1) throw new Error('timeout');
      return ok(pliki.find((p) => p.zdalny === z)!.tresc);
    });
    expect(r).toEqual([]);
    expect(proby['index.html']).toBe(2);
  });

  it('niezgodna treść nie jest ponawiana', async () => {
    let proby = 0;
    const r = await sprawdzZgodnosc([pliki[0]], async () => { proby++; return ok(Buffer.from('inna treść')); });
    expect(r).toHaveLength(1);
    expect(proby).toBe(1);
  });

  it('błąd sieci na jednym pliku trafia na listę, a reszta nadal jest sprawdzana', async () => {
    const r = await sprawdzZgodnosc(pliki, async (z) => {
      if (z === 'index.html') throw new Error('timeout');
      return ok(Buffer.from('inna treść'));
    });
    expect(r).toHaveLength(2);
    expect(r[0]).toMatch(/timeout/);
  });
});

describe('srodowiskoBuildu', () => {
  it('domyślnie (indeksowanie) ustawia PUBLIC_INDEKSUJ=true, nadpisując wartość z otoczenia', () => {
    expect(srodowiskoBuildu({ PATH: '/bin', PUBLIC_INDEKSUJ: 'false' }, true)).toEqual({ PATH: '/bin', PUBLIC_INDEKSUJ: 'true' });
  });
  it('z --noindex usuwa PUBLIC_INDEKSUJ z otoczenia, więc build ma noindex', () => {
    const env = srodowiskoBuildu({ PATH: '/bin', PUBLIC_INDEKSUJ: 'true' }, false);
    expect(env).toEqual({ PATH: '/bin' });
  });
});

describe('zgodnoscRobots', () => {
  const zNoindex = '<head><meta name="robots" content="noindex, nofollow"></head>';
  const bez = '<head><title>x</title></head>';
  it('tryb indeksowania: brak metatagu robots jest zgodny, noindex to błąd', () => {
    expect(zgodnoscRobots(bez, true)).toBeNull();
    expect(zgodnoscRobots(zNoindex, true)).toMatch(/robots/);
  });
  it('tryb noindex: noindex jest zgodny, brak metatagu to błąd', () => {
    expect(zgodnoscRobots(zNoindex, false)).toBeNull();
    expect(zgodnoscRobots(bez, false)).toMatch(/noindex/);
  });
});

describe('cytujDlaCurl', () => {
  it('zabezpiecza cudzysłów i ukośnik odwrotny', () => {
    expect(cytujDlaCurl('a"b\\c')).toBe('a\\"b\\\\c');
  });
});

describe('adresPliku', () => {
  it('składa adres ftp z kodowaniem segmentów', () => {
    expect(adresPliku('h.pl', '/dom/public_html', 'en/plik ze spacją.html')).toBe('ftp://h.pl/dom/public_html/en/plik%20ze%20spacj%C4%85.html');
  });
  it('dla katalogu głównego nie podwaja ukośnika', () => {
    expect(adresPliku('h.pl', '/', 'index.html')).toBe('ftp://h.pl/index.html');
  });
});
