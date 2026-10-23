// Serwery dla Playwright: zwykły build na porcie 4399 i build z fiksturami języków (testy/fikstury/jezyki/) na 4400.
// Buduje po kolei (budowy nie mogą się nakładać), potem uruchamia oba podglądy i zamyka je razem ze skryptem.
import { spawn, spawnSync } from 'node:child_process';

const buduj = (env) => {
  const w = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', env: { ...process.env, ...env } });
  if (w.status !== 0) process.exit(w.status ?? 1);
};
buduj({});
buduj({ TRESC_BAZA: './testy/fikstury/jezyki', WYJSCIE: './dist-fikstury' });

const podglad = (port, env) =>
  spawn('npm', ['run', 'preview', '--', '--port', String(port), '--ignore-lock'], { stdio: 'inherit', env: { ...process.env, ...env } });
const serwery = [
  podglad(4399, {}),
  podglad(4400, { TRESC_BAZA: './testy/fikstury/jezyki', WYJSCIE: './dist-fikstury' }),
];
const zamknij = () => serwery.forEach((s) => s.kill());
process.on('SIGTERM', zamknij);
process.on('SIGINT', zamknij);
process.on('exit', zamknij);
