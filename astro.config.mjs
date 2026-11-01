// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * Адрес сайта для абсолютных ссылок: canonical, hreflang и картинка превью, когда ссылку
 * отправляют в WhatsApp, Telegram или Instagram (без полного адреса картинку не покажут).
 * 1. Переменная SITE_URL из настроек Cloudflare Pages — задайте её, когда подключите свой домен.
 * 2. Иначе адрес, который Cloudflare сам передаёт в сборку: CF_PAGES_URL — это адрес конкретной
 *    сборки вида https://1a2b3c4d.youth-lab.pages.dev. Для основной ветки убираем первую часть
 *    и получаем адрес сайта https://youth-lab.pages.dev; для превью веток оставляем как есть.
 * 3. Локально адреса нет, и абсолютные ссылки не выводятся.
 */
function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  const deployment = process.env.CF_PAGES_URL;
  if (!deployment) return undefined;
  if (process.env.CF_PAGES_BRANCH !== 'main') return deployment;
  const host = new URL(deployment).hostname;
  return host.endsWith('.pages.dev') && host.split('.').length > 3
    ? `https://${host.split('.').slice(1).join('.')}`
    : deployment;
}

const site = siteUrl();

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
