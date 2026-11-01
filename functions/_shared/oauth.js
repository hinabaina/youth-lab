/**
 * Общий код входа в админку через GitHub (OAuth) для функций Cloudflare Pages.
 *
 * Как это работает:
 * 1. Админка открывает всплывающее окно /api/auth, функция запоминает случайный state в cookie
 *    и отправляет организатора на страницу GitHub «Разрешить доступ».
 * 2. GitHub возвращает его на /api/callback с одноразовым кодом. Функция проверяет state,
 *    обменивает код на токен и передаёт токен в окно админки через postMessage.
 *
 * Протокол обмена сообщениями тот же, что у Netlify/Decap CMS и Sveltia CMS Authenticator,
 * а коды ошибок совпадают с теми, для которых в админке есть русские тексты.
 */

export const PROVIDER = 'github';
export const STATE_COOKIE = '__Host-cms-oauth-state';

const ALLOWED_SCOPES = ['repo', 'public_repo', 'read:user', 'user:email'];

/** Оставляет только разрешённые права доступа; по умолчанию — repo. */
export function sanitizeScope(raw) {
  const scopes = String(raw ?? '')
    .split(/[\s,]+/)
    .filter((scope) => ALLOWED_SCOPES.includes(scope));
  return scopes.length > 0 ? [...new Set(scopes)].join(' ') : 'repo';
}

export function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function readCookie(header, name) {
  for (const part of String(header ?? '').split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return undefined;
}

export function stateCookie(value, maxAge) {
  return `${STATE_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

/**
 * Страница во всплывающем окне, которая передаёт результат входа в окно админки.
 * Сообщение уходит только окну с тем же адресом сайта (origin), поэтому токен
 * не может получить чужая страница.
 */
export function resultPage({ origin, status, content, text, headers = {} }) {
  const handshake = `authorizing:${PROVIDER}`;
  const message = `authorization:${PROVIDER}:${status}:${JSON.stringify(content)}`;
  const nonce = randomToken();
  const script = `(() => {
  const opener = window.opener;
  if (!opener) return;
  const origin = ${JSON.stringify(origin)};
  const handshake = ${JSON.stringify(handshake)};
  const message = ${JSON.stringify(message).replace(/</g, '\\u003c')};
  window.addEventListener('message', (event) => {
    if (event.source === opener && event.origin === origin && event.data === handshake) {
      opener.postMessage(message, origin);
    }
  });
  opener.postMessage(handshake, origin);
})();`;

  const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Вход в админку</title>
</head>
<body>
<p>${escapeHtml(text)}</p>
<script nonce="${nonce}">${script}</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`,
      ...headers,
    },
  });
}

/** Сообщает админке об ошибке: она покажет понятный текст по коду ошибки. */
export function errorPage(origin, errorCode, error, headers) {
  return resultPage({
    origin,
    status: 'error',
    content: { provider: PROVIDER, errorCode, error },
    text: `Не удалось войти: ${error}`,
    headers,
  });
}
