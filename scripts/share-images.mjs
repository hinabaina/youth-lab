/**
 * Картинки для превью ссылки в WhatsApp, Telegram и Instagram:
 * public/brand/share-ru.jpg, share-kk.jpg, share-en.jpg (1200×630, как просят соцсети).
 *
 * Стиль — как у первого экрана сайта: ровный тёмно-синий фон, сова Youth Lab, «Research» золотым курсивом.
 * Название, город и подзаголовок берутся из src/content/site/event.yml (раздел «Основное» в админке).
 * Даты на картинке нет нарочно: если дату перенесут, старая картинка не будет вводить в заблуждение.
 * Дата и город показываются в подписи под ссылкой, а её сайт собирает сам из админки.
 *
 * Запускать вручную, когда меняется название, город или подзаголовок:
 *   npm i --no-save playwright && npx playwright install chromium
 *   node scripts/share-images.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

// Playwright не входит в зависимости сайта: подключаем тот, что установлен рядом или глобально.
const { chromium } = createRequire(import.meta.url)('playwright');

const root = fileURLToPath(new URL('..', import.meta.url));
const LANGS = ['ru', 'kk', 'en'];

const dataUri = async (path, type) => `data:${type};base64,${(await readFile(root + path)).toString('base64')}`;

/** CSS шрифта Fontsource, где файлы шрифта вставлены прямо в CSS. */
async function inlineFontCss(pkg, file = 'index.css') {
  const dir = `node_modules/@fontsource-variable/${pkg}/`;
  const css = await readFile(root + dir + file, 'utf8');
  const files = [...new Set([...css.matchAll(/url\(\.\/files\/([^)]+)\)/g)].map((match) => match[1]))];
  let result = css;
  for (const file of files) {
    result = result.replaceAll(`url(./files/${file})`, `url(${await dataUri(dir + 'files/' + file, 'font/woff2')})`);
  }
  return result;
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);

/** «Youth Research Summit» → «Youth Research / Summit», слово Research — золотым курсивом, как на сайте. */
function titleHtml(name) {
  return name
    .split(/\s+/)
    .map((word) => (/^research$/i.test(word) ? `<em>${escapeHtml(word)}</em>` : escapeHtml(word)))
    .join(' ');
}

function pageHtml({ name, tagline, city, fonts, owl, logo }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
${fonts}
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; }
body { position: relative; overflow: hidden; background: #0a1d36; color: #fbfaf6; font-family: 'Inter Variable', sans-serif; }
.content { position: absolute; left: 80px; top: 0; bottom: 0; width: 740px; display: flex; flex-direction: column; justify-content: center; }
.logo { width: 258px; height: 32px; background: url(${logo}) no-repeat; background-size: 258px auto; background-position: 0 -151.6px; }
.city { margin-top: 34px; font-weight: 500; font-size: 26px; color: #ead08a; }
h1 { margin-top: 12px; font-family: 'Literata Variable', serif; font-weight: 600; font-size: 96px; line-height: 1.02; letter-spacing: -0.02em; }
h1 em { font-weight: 500; color: #dfb853; }
.tagline { margin-top: 30px; max-width: 640px; font-weight: 500; font-size: 29px; line-height: 1.3; color: #fbfaf6; }
.owl { position: absolute; right: 84px; top: 50%; width: 300px; transform: translateY(-50%); }
</style></head>
<body>
  <div class="content">
    <div class="logo" role="img" aria-label="Youth Lab"></div>
    ${city ? `<p class="city">${escapeHtml(city)}</p>` : ''}
    <h1>${titleHtml(name)}</h1>
    ${tagline ? `<p class="tagline">${escapeHtml(tagline)}</p>` : ''}
  </div>
  <img class="owl" src="${owl}" alt="">
</body></html>`;
}

const event = parse(await readFile(root + 'src/content/site/event.yml', 'utf8'));
const fonts = [
  await inlineFontCss('literata'),
  await inlineFontCss('literata', 'wght-italic.css'),
  await inlineFontCss('inter'),
].join('\n');
const owl = await dataUri('public/brand/owl-cream-lg.webp', 'image/webp');
const logo = await dataUri('public/brand/logo-cream.png', 'image/png');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const lang of LANGS) {
  // Пустые поля перевода берутся из русского — как на сайте.
  const pick = (key) => event[lang]?.[key] || event.ru[key] || '';
  await page.setContent(pageHtml({ name: pick('name'), tagline: pick('tagline'), city: pick('city'), fonts, owl, logo }));
  await page.evaluate(() => document.fonts.ready);
  const out = `public/brand/share-${lang}.jpg`;
  await writeFile(root + out, await page.screenshot({ type: 'jpeg', quality: 88 }));
  console.log('готово:', out);
}
await browser.close();
