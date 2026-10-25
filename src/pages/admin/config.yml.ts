/**
 * Konfiguracja panelu jako YAML, budowana z `src/lib/panel.ts`.
 * Zmienne środowiska buildu: PUBLIC_PANEL_LOGOWANIE (opcjonalna; bez niej config nie ma `base_url`, a panel loguje się
 * tokenem GitHub, zob. docs/panel-instrukcja.md), PANEL_GALAZ (domyślnie main).
 */
import type { APIRoute } from 'astro';
import { stringify } from 'yaml';
import { konfiguracjaPanelu } from '../../lib/panel';

export const GET: APIRoute = () =>
  new Response(
    stringify(
      konfiguracjaPanelu({
        galaz: process.env.PANEL_GALAZ || undefined,
        adresLogowania: import.meta.env.PUBLIC_PANEL_LOGOWANIE || undefined,
      }),
      { lineWidth: 0 },
    ),
    { headers: { 'Content-Type': 'application/yaml; charset=utf-8' } },
  );
