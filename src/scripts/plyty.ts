// Płyty nazwiska, wejście liczb w widok i kopiowanie adresu. Port skryptu z docs/makieta/index.html.
const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Płyty wskakują w pasery po załadowaniu
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('ready')));

// Liczby rejestrują się, gdy wchodzą w widok
const items = document.querySelectorAll('.job, .now-item');
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -15% 0px' },
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Kopiowanie adresu
const btn = document.getElementById('copy-email');
const el = document.getElementById('email');
if (btn && el) {
  const tekst = btn.textContent ?? '';
  btn.addEventListener('click', () => {
    const gotowe = () => {
      btn.textContent = btn.dataset.skopiowano ?? 'Skopiowano';
      setTimeout(() => (btn.textContent = tekst), 1800);
    };
    const zapas = () => {
      const r = document.createRange();
      r.selectNodeContents(el);
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
      btn.textContent = btn.dataset.zaznaczony ?? 'Adres zaznaczony';
    };
    try {
      navigator.clipboard.writeText(el.textContent ?? '').then(gotowe, zapas);
    } catch {
      zapas();
    }
  });
}
