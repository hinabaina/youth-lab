/**
 * Кладёт админку Sveltia CMS из node_modules в public/admin, чтобы она открывалась с нашего сайта.
 * Версия админки зафиксирована в package-lock.json и обновляется через npm.
 * Скрипт запускается сам перед `npm run dev` и `npm run build`.
 */
import { cp, mkdir, rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const from = new URL('node_modules/@sveltia/cms/dist/', root);
const to = new URL('public/admin/', root);

await mkdir(to, { recursive: true });
await rm(new URL('chunks/', to), { recursive: true, force: true });
await cp(new URL('sveltia-cms.js', from), new URL('sveltia-cms.js', to));
// Дополнительные модули, которые админка подгружает по мере надобности.
await cp(new URL('chunks/', from), new URL('chunks/', to), {
  recursive: true,
  filter: (source) => !source.endsWith('.map'),
});

console.log('Sveltia CMS скопирована в public/admin/');
