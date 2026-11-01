/**
 * Картинки для превью ссылки в WhatsApp, Telegram и Instagram:
 * public/brand/share-ru.jpg, share-kk.jpg, share-en.jpg (1200×630, как просят соцсети).
 *
 * Стиль — как у первого экрана сайта: тёмно-синий фон, сова Youth Lab, золотое «Research».
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
async function inlineFontCss(pkg) {
  const dir = `node_modules/@fontsource-variable/${pkg}/`;
  const css = await readFile(root + dir + 'index.css', 'utf8');
  const files = [...new Set([...css.matchAll(/url\(\.\/files\/([^)]+)\)/g)].map((match) => match[1]))];
  let result = css;
  for (const file of files) {
    result = result.replaceAll(`url(./files/${file})`, `url(${await dataUri(dir + 'files/' + file, 'font/woff2')})`);
  }
  return result;
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);

/** «Youth Research Summit» → «Youth / Research / Summit», слово Research — золотом, как на сайте. */
function titleHtml(name) {
  return name
    .split(/\s+/)
    .map((word) => (/^research$/i.test(word) ? `<span class="gold">${escapeHtml(word)}</span>` : escapeHtml(word)))
    .join('<br>');
}

function pageHtml({ name, tagline, city, fonts, owl, logo }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
${fonts}
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; }
body { position: relative; overflow: hidden; background: #0a1d36; color: #fbfaf6; font-family: 'Montserrat Variable', sans-serif; }
.glow { position: absolute; border-radius: 50%; filter: blur(110px); }
.glow-a { width: 720px; height: 720px; right: -180px; top: -320px; background: rgb(61 100 153 / 0.5); }
.glow-b { width: 620px; height: 620px; left: -280px; bottom: -330px; background: rgb(42 79 128 / 0.6); }
.grid { position: absolute; inset: 0;
  background-image: linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(ellipse 75% 75% at 65% 45%, #000 25%, transparent 75%); }
.content { position: absolute; left: 76px; top: 0; bottom: 0; width: 640px; display: flex; flex-direction: column; justify-content: center; }
.logo { width: 258px; height: 32px; background: url(${logo}) no-repeat; background-size: 258px auto; background-position: 0 -151.6px; }
.eyebrow { margin-top: 26px; display: flex; align-items: center; gap: 14px; font-weight: 700; font-size: 19px; letter-spacing: 0.2em; text-transform: uppercase; color: #dfb853; }
.eyebrow::before { content: ''; width: 34px; height: 3px; border-radius: 2px; background: currentColor; }
h1 { margin-top: 18px; font-weight: 800; font-size: 92px; line-height: 0.98; letter-spacing: -0.025em; }
.gold { background: linear-gradient(90deg, #ead08a, #d4a63a); -webkit-background-clip: text; background-clip: text; color: transparent; }
.tagline { margin-top: 26px; max-width: 590px; font-weight: 600; font-size: 28px; line-height: 1.32; color: #f1dfae; }
.emblem { position: absolute; right: 64px; top: 105px; width: 420px; height: 420px; }
.ring { position: absolute; border-radius: 50%; }
.ring-a { inset: 0; border: 2px dashed rgb(212 166 58 / 0.38); }
.ring-b { inset: 36px; border: 1.5px solid rgb(251 250 246 / 0.12); }
.disc { position: absolute; inset: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(circle at 50% 30%, #1b3c68, #102c51 72%);
  box-shadow: 0 0 110px -8px rgb(212 166 58 / 0.42), inset 0 0 0 1px rgb(251 250 246 / 0.1); }
.disc img { width: 178px; height: auto; transform: translate(4px, 4px); }
.dot { position: absolute; border-radius: 50%; background: #d4a63a; box-shadow: 0 0 18px 2px rgb(212 166 58 / 0.7); }
.dot-a { width: 14px; height: 14px; left: 18px; top: 128px; }
.dot-b { width: 9px; height: 9px; right: 70px; top: 30px; background: #f4f1e8; box-shadow: none; opacity: 0.7; }
.dot-c { width: 11px; height: 11px; right: 6px; bottom: 150px; }
</style></head>
<body>
  <div class="glow glow-a"></div><div class="glow glow-b"></div><div class="grid"></div>
  <div class="content">
    <div class="logo" role="img" aria-label="Youth Lab"></div>
    ${city ? `<p class="eyebrow">${escapeHtml(city)}</p>` : ''}
    <h1>${titleHtml(name)}</h1>
    ${tagline ? `<p class="tagline">${escapeHtml(tagline)}</p>` : ''}
  </div>
  <div class="emblem">
    <div class="ring ring-a"></div><div class="ring ring-b"></div>
    <div class="disc"><img src="${owl}" alt=""></div>
    <span class="dot dot-a"></span><span class="dot dot-b"></span><span class="dot dot-c"></span>
  </div>
</body></html>`;
}

const event = parse(await readFile(root + 'src/content/site/event.yml', 'utf8'));
const fonts = await inlineFontCss('montserrat');
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
