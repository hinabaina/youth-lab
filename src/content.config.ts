import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  committeeSchema,
  eventSchema,
  homeSchema,
  jurySchema,
  partnerSchema,
  programSchema,
  registrationSchema,
  resultsSchema,
  rulesSchema,
  translated,
} from './lib/schemas';

/** Отдельный файл из src/content/site — например, event.yml. */
const siteFile = (name: string) => glob({ pattern: `${name}.yml`, base: './src/content/site' });

export const collections = {
  event: defineCollection({ loader: siteFile('event'), schema: translated(eventSchema) }),
  registration: defineCollection({
    loader: siteFile('registration'),
    schema: translated(registrationSchema),
  }),
  home: defineCollection({ loader: siteFile('home'), schema: translated(homeSchema) }),
  program: defineCollection({ loader: siteFile('program'), schema: translated(programSchema) }),
  rules: defineCollection({ loader: siteFile('rules'), schema: translated(rulesSchema) }),
  results: defineCollection({ loader: siteFile('results'), schema: translated(resultsSchema) }),

  committees: defineCollection({
    loader: glob({ pattern: '*.yml', base: './src/content/committees' }),
    schema: translated(committeeSchema),
  }),
  jury: defineCollection({
    loader: glob({ pattern: '*.yml', base: './src/content/jury' }),
    schema: translated(jurySchema),
  }),
  partners: defineCollection({
    loader: glob({ pattern: '*.yml', base: './src/content/partners' }),
    schema: partnerSchema,
  }),
};
