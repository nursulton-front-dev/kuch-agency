# KUCH

Сайт маркетингового агентства [KUCH](https://kuchgroup.uz) (`kuchgroup.uz`).

Репозиторий: https://github.com/kindhub/kuch-uz

## Стек

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- MDX для блога
- Vitest + Testing Library
- Статический экспорт (`output: 'export'`) для хостинга на cPanel без Node.js на сервере

Нужен **Node.js 20.19 или новее**.

## Запуск локально

```bash
git clone https://github.com/kindhub/kuch-uz.git
cd kuch-uz
npm ci
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Если в системе несколько версий Node, переключитесь на 20:

```bash
nvm use 20
```

## Полезные команды

```bash
npm run dev            # локальная разработка
npm test               # тесты
npm run lint           # ESLint
npm run deploy:check   # lint + тесты + production-сборка в out/
```

## Структура

```
app/            # страницы (главная, услуги, кейсы, блог, контакты…)
components/v1/  # UI, секции, формы, шапка/футер
data/           # контент сайта: команда, услуги, цены, кейсы, клиенты
content/blog/   # тексты статей (MDX)
lib/            # SEO, форматирование цен
public/         # статика: шрифты, фото, видео манифеста
```

Данные правятся в файлах `data/*.ts`, не в CMS.

## Деплой на хостинг

Подробно: [DEPLOY.md](./DEPLOY.md).

Кратко: `npm run deploy:check` собирает сайт в `out/`. Содержимое `out/` загружается в корень домена (`public_html`) на cPanel.

## Заметки

- Формы заявок пока заглушки: отправка в почту / Telegram / CRM не подключена.
- Видео манифеста: `public/videos/ru-video.mp4` и `public/videos/uzb-video.mp4`.
- Старые URL вида `/v1/...` на Apache редиректятся в корень через `public/.htaccess`.
