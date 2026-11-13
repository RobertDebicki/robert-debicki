// Adres tel: z numeru zapisanego dla ludzi: zostają cyfry i wiodący plus.
export function hrefTelefonu(numer: string): string {
  const t = numer.trim();
  return `tel:${t.startsWith('+') ? '+' : ''}${t.replace(/\D/g, '')}`;
}
