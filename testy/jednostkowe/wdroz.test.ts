import { describe, expect, it } from 'vitest';
import { adresPliku, cytujDlaCurl, konfiguracjaTransferow, parsujListing, plikiDoWgrania, wczytajKonfiguracje } from '../../skrypty/wdroz';

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

  it('wymusza TLS i wypisuje kod wyniku każdego transferu', () => {
    expect(wynik.match(/ssl-reqd/g)).toHaveLength(2);
    expect(wynik.match(/write-out = "%\{exitcode\} %\{url\}\\n"/g)).toHaveLength(2);
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
