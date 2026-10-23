import { createHash } from 'node:crypto';

/** Skrót SHA-256 (hex) treści po normalizacji końców linii (CRLF na LF). Tylko w czasie budowania. */
export function skrotTresci(tekst: string): string {
  return createHash('sha256').update(tekst.replace(/\r\n/g, '\n'), 'utf8').digest('hex');
}
