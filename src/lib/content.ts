import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { localize } from './localize';
import {
  committeeSchema,
  eventSchema,
  homeSchema,
  jurySchema,
  programSchema,
  registrationSchema,
  resultsSchema,
  rulesSchema,
} from './schemas';

type SiteFile = 'event' | 'registration' | 'home' | 'program' | 'rules' | 'results';

async function requireSiteFile<C extends SiteFile>(collection: C): Promise<CollectionEntry<C>['data']> {
  const entry = await getEntry(collection, collection);
  if (!entry) {
    throw new Error(`Не найден файл src/content/site/${collection}.yml`);
  }
  // TypeScript не сужает тип записи по обобщённому имени коллекции, поэтому уточняем его сами.
  return entry.data as CollectionEntry<C>['data'];
}

export async function getEvent(lang: Lang) {
  return localize(await requireSiteFile('event'), lang, eventSchema, 'event.yml');
}

export async function getRegistration(lang: Lang) {
  const data = localize(
    await requireSiteFile('registration'),
    lang,
    registrationSchema,
    'registration.yml',
  );
  // Без ссылки на форму регистрироваться некуда, поэтому «открыта» без ссылки показываем как «скоро».
  const status = data.status === 'open' && !data.formUrl ? 'soon' : data.status;
  return { ...data, status };
}

export async function getHome(lang: Lang) {
  return localize(await requireSiteFile('home'), lang, homeSchema, 'home.yml');
}

export async function getProgram(lang: Lang) {
  return localize(await requireSiteFile('program'), lang, programSchema, 'program.yml');
}

export async function getRules(lang: Lang) {
  return localize(await requireSiteFile('rules'), lang, rulesSchema, 'rules.yml');
}

export async function getResults(lang: Lang) {
  return localize(await requireSiteFile('results'), lang, resultsSchema, 'results.yml');
}

type Ordered = { id: string; order: number; sortName: string };

function byOrder(a: Ordered, b: Ordered) {
  return a.order - b.order || a.sortName.localeCompare(b.sortName);
}

/**
 * Порядок задаётся перетаскиванием в админке: она пишет поле order в русскую версию файла.
 * Поле order в корне файла читаем на случай, если файл правили вручную.
 */
function orderOf(data: { order?: number; ru: { order?: number } }) {
  return data.ru.order ?? data.order ?? Number.MAX_SAFE_INTEGER;
}

export async function getCommittees(lang: Lang) {
  const entries = await getCollection('committees');
  return entries
    .map((entry) => {
      const data = localize(entry.data, lang, committeeSchema, `committees/${entry.id}.yml`);
      return { ...data, id: entry.id, order: orderOf(entry.data), sortName: data.title };
    })
    .sort(byOrder);
}

export async function getJury(lang: Lang) {
  const entries = await getCollection('jury');
  return entries
    .map((entry) => {
      const data = localize(entry.data, lang, jurySchema, `jury/${entry.id}.yml`);
      return { ...data, id: entry.id, order: orderOf(entry.data), sortName: data.name };
    })
    .sort(byOrder);
}

export async function getPartners() {
  const entries = await getCollection('partners');
  return entries
    .map((entry) => ({
      ...entry.data,
      id: entry.id,
      order: entry.data.order ?? Number.MAX_SAFE_INTEGER,
      sortName: entry.data.name,
    }))
    .sort(byOrder);
}
