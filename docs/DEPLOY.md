# Запуск сайта на Cloudflare Pages

Настраивается один раз, примерно за 20 минут. Понадобятся аккаунт Cloudflare (бесплатный) и доступ администратора к репозиторию `hinabaina/youth-lab` на GitHub.

Почему Cloudflare, а не Vercel: бесплатный тариф Vercel (Hobby) разрешён только для некоммерческого использования, а приём оплаты за участие (2500 ₸) по их правилам — коммерческое использование. У Cloudflare на бесплатном тарифе такого ограничения нет.

## 1. Подключить репозиторий

1. Откройте [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
   Если Cloudflare сначала предлагает создать Worker, найдите на той же странице вариант **Pages**.
2. Выберите GitHub, разрешите доступ к репозиторию `hinabaina/youth-lab` → **Begin setup**.
3. Настройки сборки:
   - Project name: например, `youth-lab` — от него зависит адрес `https://youth-lab.pages.dev`;
   - Production branch: `main`;
   - Framework preset: **Astro**;
   - Build command: `npm run build`;
   - Build output directory: `dist`.
4. **Save and Deploy**. Через 1–2 минуты сайт откроется по адресу `https://<project>.pages.dev`.

Версию Node.js Cloudflare берёт из файла `.nvmrc`. Если сборка всё же падает с ошибкой о версии Node, добавьте переменную `NODE_VERSION` со значением `22.23.4` (см. шаг 3) и пересоберите.

## 2. Создать вход через GitHub для админки

1. GitHub → аватар → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Заполните:
   - Application name: `Youth Research Summit — админка`;
   - Homepage URL: `https://<project>.pages.dev`;
   - Authorization callback URL: `https://<project>.pages.dev/api/callback`.
3. **Register application**. Скопируйте **Client ID**, затем нажмите **Generate a new client secret** и скопируйте секрет — GitHub покажет его только один раз.

## 3. Добавить переменные в Cloudflare

Cloudflare → проект → **Settings** → **Variables and Secrets** → **Add**. Добавьте переменные для окружения Production, а если админка нужна и на превью веток — то же самое для Preview:

| Имя | Значение | Тип |
| --- | --- | --- |
| `GITHUB_CLIENT_ID` | Client ID из шага 2 | Text |
| `GITHUB_CLIENT_SECRET` | секрет из шага 2 | Secret |
| `SITE_URL` | ваш домен, например `https://example.kz` — только если подключили свой домен (шаг 5) | Text |

Без `SITE_URL` сайт сам берёт свой адрес `https://<project>.pages.dev` у Cloudflare: по нему строятся ссылки на другие языки и картинка превью, которую показывают WhatsApp, Telegram и Instagram, когда отправляют ссылку на сайт. Задавайте `SITE_URL`, только когда подключите свой домен.

После этого пересоберите сайт: **Deployments** → последняя сборка → **Retry deployment**. Переменные применяются только к новым сборкам.

## 4. Дать доступ организаторам

1. Каждому организатору нужен бесплатный аккаунт на [github.com](https://github.com/signup).
2. GitHub → репозиторий `youth-lab` → **Settings** → **Collaborators** → **Add people** → логин организатора → роль **Write**.
3. Организатор принимает приглашение из письма и входит в админку: `https://<project>.pages.dev/admin/` → «Войти через GitHub».

Убрать доступ можно там же, в **Collaborators**.

## 5. Свой домен (по желанию)

Cloudflare → проект → **Custom domains** → **Set up a custom domain**. После подключения домена:

- в OAuth App на GitHub замените Homepage URL и Authorization callback URL на новый домен;
- в Cloudflare добавьте переменную `SITE_URL` с адресом домена (например, `https://example.kz`) и пересоберите сайт.

## Как публикуются правки

Каждое сохранение в админке — это коммит в ветку `main`. Cloudflare видит его и пересобирает сайт, это занимает 1–2 минуты. Бесплатный тариф даёт 500 сборок в месяц, этого хватает с большим запасом.

Если в правке ошибка (например, ссылка без `https://`), сборка остановится, а на сайте останется предыдущая версия. Причину видно в Cloudflare → **Deployments** → неудачная сборка → лог.

Превью веток и pull request'ов Cloudflare публикует на адресах вида `https://<ветка>.<project>.pages.dev`. Вход в админку работает и там: GitHub разрешает поддомены адреса из callback URL.
