/**
 * Вход в админку, шаг 1: GET /api/auth?provider=github&scope=repo
 * Отправляет организатора на страницу GitHub «Разрешить доступ».
 * Нужны переменные окружения GITHUB_CLIENT_ID и GITHUB_CLIENT_SECRET (см. docs/DEPLOY.md).
 */
import { PROVIDER, errorPage, randomToken, sanitizeScope, stateCookie } from '../_shared/oauth.js';

export function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider') ?? PROVIDER;

  if (provider !== PROVIDER) {
    return errorPage(url.origin, 'UNSUPPORTED_BACKEND', 'поддерживается только вход через GitHub.');
  }
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return errorPage(
      url.origin,
      'MISCONFIGURED_CLIENT',
      'на сервере не заданы GITHUB_CLIENT_ID и GITHUB_CLIENT_SECRET.',
    );
  }

  const state = randomToken();
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.search = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${url.origin}/api/callback`,
    scope: sanitizeScope(url.searchParams.get('scope')),
    state,
  }).toString();

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      'Set-Cookie': stateCookie(state, 600),
      'Cache-Control': 'no-store',
    },
  });
}
