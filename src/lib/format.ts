import { marked } from 'marked';
import { INTL_LOCALE, type Lang } from '../i18n/ui';

/** Дата без времени: «5 декабря 2026 г.», «2026 ж. 5 желтоқсан», «5 December 2026». */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** День недели для даты: «суббота», «сенбі», «Saturday». */
export function formatWeekday(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], { weekday: 'long', timeZone: 'UTC' }).format(date);
}

/** Дата для атрибута datetime: 2026-12-05. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatNumber(value: number, lang: Lang): string {
  return new Intl.NumberFormat(INTL_LOCALE[lang]).format(value);
}

/** Телефон для ссылки tel: — только цифры и плюс. */
export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** Казахстанский номер в читаемом виде: +7 747 665 34 63. */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    const d = digits.slice(1);
    return `+7 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}`;
  }
  return phone;
}

/** Имя аккаунта Instagram без @ и ссылки, даже если в админке вставили полный адрес. */
export function instagramHandle(value: string): string {
  return value
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
    .replace(/^@/, '')
    .replace(/[/?#].*$/, '');
}

export function instagramUrl(value: string): string {
  return `https://www.instagram.com/${instagramHandle(value)}/`;
}

/** Текст из админки в формате Markdown → HTML. */
export function renderMarkdown(source: string): string {
  if (!source.trim()) return '';
  return marked.parse(source, { async: false, gfm: true });
}
