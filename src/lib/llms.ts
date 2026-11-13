// Plik /llms.txt: krótki opis strony dla asystentów AI (format llmstxt.org). Powstaje z ustawień strony, więc nie rozjeżdża się z treścią.
export interface DaneLlms {
  imie: string;
  nazwisko: string;
  rola: string;
  lead: string;
  opis: string;
  miejsce: string;
  email: string;
  telefon?: string;
  linkedinUrl: string;
  narzedzia: { nazwa: string; wartosc: string }[];
  strony: { nazwa: string; adres: string }[];
}

const bezKropki = (t: string) => t.trim().replace(/\.+$/, '');

export function llmsTxt(d: DaneLlms): string {
  // Pola z panelu mogą być puste albo kończyć się kropką: puste pomijamy, kropkę składamy sami.
  const streszczenie = [bezKropki(d.rola), bezKropki(d.lead)].filter(Boolean).join('. ') + '.';
  const linie = [
    `# ${d.imie} ${d.nazwisko}`,
    '',
    `> ${streszczenie}`,
    '',
    ...(d.opis.trim() ? [d.opis.trim(), ''] : []),
    ...(d.miejsce.trim() ? [`Miejsce: ${bezKropki(d.miejsce)}.`] : []),
    `Kontakt: ${d.email}${d.telefon ? `, telefon: ${d.telefon}` : ''}, LinkedIn: ${d.linkedinUrl}`,
    '',
    '## Czym pracuję',
    '',
    ...d.narzedzia.filter((n) => n.wartosc.trim()).map((n) => `- ${n.nazwa}: ${n.wartosc}`),
    '',
    '## Strony',
    '',
    ...d.strony.map((s) => `- [${s.nazwa}](${s.adres})`),
    '',
  ];
  return linie.join('\n');
}
