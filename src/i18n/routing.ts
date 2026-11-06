import { DEFAULT_LANG, LOCALES, type Lang } from './ui';

/** Страницы сайта. Порядок задаёт порядок пунктов меню. */
export const PAGES = {
  home: '/',
  committees: '/committees/',
  rules: '/rules/',
  register: '/register/',
  results: '/results/',
  journal: '/journal/',
} as const;

export type PageKey = keyof typeof PAGES;

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Язык из параметра маршрута: русский живёт в корне сайта, остальные — в /kk/ и /en/. */
export function getLang(param: string | undefined): Lang {
  return isLang(param) ? param : DEFAULT_LANG;
}

/** Пути для getStaticPaths() во всех трёх языках. */
export function localeStaticPaths() {
  return LOCALES.map((lang) => ({
    params: { locale: lang === DEFAULT_LANG ? undefined : lang },
  }));
}

/** Адрес страницы на нужном языке: '/rules/' → '/kk/rules/'. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === DEFAULT_LANG ? clean : `/${lang}${clean}`;
}

/** Убирает языковой префикс из адреса: '/kk/rules/' → '/rules/'. */
export function stripLangPrefix(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (isLang(first) && first !== DEFAULT_LANG) {
    return `/${rest.join('/')}`;
  }
  return pathname;
}
