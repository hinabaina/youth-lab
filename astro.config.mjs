// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Адрес сайта нужен только для абсолютных ссылок (canonical, hreflang).
// Когда появится свой домен, задайте переменную SITE_URL в настройках Cloudflare Pages.
const site = process.env.SITE_URL || undefined;

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
