import { z } from 'astro/zod';

/**
 * Схемы содержимого сайта. Они проверяют файлы из src/content при сборке:
 * если в файле чего-то не хватает, сборка остановится с понятной ошибкой,
 * а на сайте останется прошлая рабочая версия.
 *
 * Поля здесь должны совпадать с полями админки в public/admin/config.yml.
 */

/** Пустые значения из админки ('' или null) считаем «не заполнено». */
const emptyToUndefined = (value: unknown) =>
  value === '' || value === null ? undefined : value;

const text = z.preprocess((value) => (value == null ? '' : value), z.string().trim());
const requiredText = z.string().trim().min(1);
const urlOrEmpty = z.preprocess(
  (value) => (value == null ? '' : value),
  z.union([z.literal(''), z.url()]),
);
const emailOrEmpty = z.preprocess(
  (value) => (value == null ? '' : value),
  z.union([z.literal(''), z.email()]),
);
const optionalDate = z.preprocess(emptyToUndefined, z.coerce.date().optional());
const optionalOrder = z.preprocess(emptyToUndefined, z.coerce.number().optional());
const stringList = z.preprocess(
  (value) => (value == null ? [] : value),
  z.array(z.string().trim()).transform((items) => items.filter(Boolean)),
);
const list = <T extends z.ZodType>(item: T) =>
  z.preprocess((value) => (value == null ? [] : value), z.array(item));

/** Основное: дата, место, цена, контакты. */
export const eventSchema = z.object({
  name: requiredText,
  tagline: text,
  date: z.coerce.date(),
  timeStart: text,
  timeEnd: text,
  venue: requiredText,
  city: text,
  address: text,
  mapUrl: urlOrEmpty,
  audience: text,
  teamSize: text,
  fee: z.coerce.number().int().nonnegative(),
  feeNote: text,
  phone: text,
  instagram: text,
  email: emailOrEmpty,
});

/** Регистрация: статус, ссылка на форму, даты. */
export const registrationSchema = z.object({
  status: z.enum(['soon', 'open', 'closed']).default('soon'),
  formUrl: urlOrEmpty,
  opensOn: optionalDate,
  deadline: optionalDate,
  note: text,
  body: text,
});

/** Главная страница: блоки идут в том порядке, в каком их видит посетитель. */
export const homeSchema = z.object({
  /** Одна-две фразы под названием: что делает команда на саммите. */
  lead: text,
  about: text,
  facts: list(z.object({ value: requiredText, label: requiredText })),
  /** «Формат»: три этапа дня — исследовать, написать, защитить. */
  format: list(z.object({ icon: text, title: requiredText, meta: text, text: text })),
  /** «Как принять участие»: шаги от сбора команды до итогов. */
  steps: list(z.object({ title: requiredText, text: text })),
  /** «Что получат участники». */
  benefits: list(z.object({ icon: text, title: requiredText, text: text })),
  /** «Вопросы и ответы»; ответ — Markdown. */
  faq: list(z.object({ question: requiredText, answer: text })),
});

/** Программа дня. */
export const programSchema = z.object({
  note: text,
  stages: list(
    z.object({
      time: text,
      duration: text,
      title: requiredText,
      description: text,
      /** session — основной этап (выделяется), break — перерыв, пусто — обычный этап. */
      kind: text,
    }),
  ),
});

/** Правила и оценка. */
export const rulesSchema = z.object({
  intro: text,
  sections: list(z.object({ title: requiredText, body: text })),
  rubrics: list(
    z.object({
      title: requiredText,
      criteria: list(
        z.object({
          name: requiredText,
          max: z.coerce.number().nonnegative(),
          focus: text,
        }),
      ),
    }),
  ),
  awards: stringList,
  document: text,
});

/** Итоги (заполняются после саммита). */
export const resultsSchema = z.object({
  published: z.boolean().default(false),
  intro: text,
  winners: list(
    z.object({
      committee: text,
      award: z.enum(['research', 'oral', 'team']),
      team: requiredText,
      school: text,
    }),
  ),
  // Одна фотография может прийти строкой, несколько — списком.
  photos: z.preprocess((value) => (typeof value === 'string' ? [value] : value), stringList),
});

/** Комитет. */
export const committeeSchema = z.object({
  title: requiredText,
  /** Название иконки из src/icons/icons.ts; если пусто или неизвестно — лампочка. */
  icon: text,
  topics: stringList,
  sources: stringList,
  language: z.preprocess(
    (value) => (value == null ? '' : value),
    z.enum(['', 'ru', 'kk', 'en']),
  ),
  order: optionalOrder,
});

/** Член жюри. */
export const jurySchema = z.object({
  name: requiredText,
  role: text,
  photo: text,
  order: optionalOrder,
});

/** Партнёр (без перевода: название и логотип одинаковы на всех языках). */
export const partnerSchema = z.object({
  name: requiredText,
  logo: text,
  url: urlOrEmpty,
  order: optionalOrder,
});

/**
 * Файл с переводами: русская версия обязательна и проверяется строго,
 * казахская и английская могут быть неполными — пустые поля берутся из русской.
 */
export const translated = <T extends z.ZodType>(schema: T) =>
  z.looseObject({
    ru: schema,
    kk: z.unknown().optional(),
    en: z.unknown().optional(),
    order: optionalOrder,
  });
