import type { z } from 'astro/zod';
import { DEFAULT_LANG, type Lang } from '../i18n/ui';

type Translated<T> = { ru: T; kk?: unknown; en?: unknown };

function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0)
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date);
}

/**
 * Накладывает перевод на русскую версию.
 * Пустые поля перевода не затирают русский текст, поэтому недопереведённая
 * страница показывает русский текст там, где перевода ещё нет.
 */
export function mergeTranslation(base: unknown, override: unknown): unknown {
  if (isEmpty(override)) return base;

  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    // Списки одинаковой длины сливаем поэлементно (например, переведены не все пункты программы),
    // а если длина другая, значит в переводе свой список.
    if (base.length === override.length) {
      return base.map((item, index) => mergeTranslation(item, override[index]));
    }
    return override;
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(override)) return base;
    const result: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      result[key] = key in base ? mergeTranslation(base[key], value) : value;
    }
    return result;
  }

  // Разные типы (например, строка вместо списка) — оставляем русскую версию.
  if (typeof base !== typeof override && base !== undefined) return base;
  return override;
}

/** Возвращает содержимое файла на нужном языке, проверенное схемой. */
export function localize<S extends z.ZodType>(
  data: Translated<z.output<S>>,
  lang: Lang,
  schema: S,
  label: string,
): z.output<S> {
  if (lang === DEFAULT_LANG) return data.ru;

  const merged = mergeTranslation(data.ru, data[lang]);
  const parsed = schema.safeParse(merged);
  if (parsed.success) return parsed.data;

  console.warn(
    `[перевод] ${label} (${lang}): перевод заполнен с ошибкой, на сайте показан русский текст.`,
    parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '),
  );
  return data.ru;
}
