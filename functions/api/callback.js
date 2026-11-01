/**
 * Вход в админку, шаг 2: GET /api/callback?code=…&state=…
 * Сюда GitHub возвращает организатора после «Разрешить доступ». Функция проверяет state,
 * обменивает одноразовый код на токен и передаёт его в окно админки.
 */
import { PROVIDER, STATE_COOKIE, errorPage, readCookie, resultPage, stateCookie } from '../_shared/oauth.js';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const { origin } = url;
  // state одноразовый: удаляем cookie при любом исходе.
  const clearState = { 'Set-Cookie': stateCookie('', 0) };
  const fail = (code, message) => errorPage(origin, code, message, clearState);

  const githubError = url.searchParams.get('error');
  if (githubError) {
    return fail('AUTH_CODE_REQUEST_FAILED', url.searchParams.get('error_description') || githubError);
  }

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state) {
    return fail('AUTH_CODE_REQUEST_FAILED', 'GitHub не вернул код авторизации.');
  }

  const savedState = readCookie(request.headers.get('Cookie'), STATE_COOKIE);
  if (!savedState || savedState !== state) {
    return fail('CSRF_DETECTED', 'проверка безопасности не пройдена. Попробуйте войти ещё раз.');
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return fail('MISCONFIGURED_CLIENT', 'на сервере не заданы GITHUB_CLIENT_ID и GITHUB_CLIENT_SECRET.');
  }

  let data;
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'youth-lab-cms-auth',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${origin}/api/callback`,
      }),
    });
    data = await response.json();
  } catch {
    return fail('TOKEN_REQUEST_FAILED', 'GitHub не ответил. Попробуйте позже.');
  }

  if (!data?.access_token) {
    return fail('TOKEN_REQUEST_FAILED', data?.error_description || data?.error || 'GitHub не выдал токен.');
  }

  return resultPage({
    origin,
    status: 'success',
    content: { token: data.access_token, provider: PROVIDER },
    text: 'Вход выполнен. Это окно закроется само.',
    headers: clearState,
  });
}
