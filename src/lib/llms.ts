// Plik /llms.txt: krótki opis strony dla asystentów AI (format llmstxt.org). Powstaje z ustawień strony, więc nie rozjeżdża się z treścią.
export interface DaneLlms {
  imie: string;
  nazwisko: string;
  rola: string;
  lead: string;
  opis: string;
  miejsce: string;
  email: string;
  linkedinUrl: string;
  narzedzia: { nazwa: string; wartosc: string }[];
  strony: { nazwa: string; adres: string }[];
}

export function llmsTxt(d: DaneLlms): string {
  const linie = [
    `# ${d.imie} ${d.nazwisko}`,
    '',
    `> ${d.rola}. ${d.lead}`,
    '',
    d.opis,
    '',
    `Miejsce: ${d.miejsce}.`,
    `Kontakt: ${d.email}, LinkedIn: ${d.linkedinUrl}`,
    '',
    '## Czym pracuję',
    '',
    ...d.narzedzia.map((n) => `- ${n.nazwa}: ${n.wartosc}`),
    '',
    '## Strony',
    '',
    ...d.strony.map((s) => `- [${s.nazwa}](${s.adres})`),
    '',
  ];
  return linie.join('\n');
}
