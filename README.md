# LiveAssist AI — Waitlist

Короткий презентационный waitlist-сайт для **LiveAssist AI** — AI-ассистента для
отделов продаж. Сайт создан для холодного outreach: основатель лично пишет
менеджерам и руководителям, а затем отправляет ссылку. Задача сайта — за 30–60
секунд объяснить идею, показать единый workflow вокруг звонка, продемонстрировать
главную функцию и собрать заявки на ранний доступ.

Это отдельный greenfield-проект, не связанный с десктопным приложением LiveAssist.

## Стек

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — только для сложных анимационных последовательностей
- **Lucide React** — служебные иконки
- **next/font** — шрифты Manrope (display) + Inter (body)
- **next/image** — две editorial-фотографии (см. раздел «Фотографии»)
- **Supabase** — хранение заявок waitlist (через серверный route handler)

Дизайн-принцип: ~70% визуала (фото, product scenes, анимация) и ~30% короткого
текста. Смысл показывается сценами, а не абзацами.

## Установка

```bash
npm install
```

## Локальный запуск

```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

Без настроенного Supabase форма работает в **явном demo-режиме** (только в
development): заявка не сохраняется, сервер отвечает `{ ok: true, demo: true }` и
пишет предупреждение в консоль. Фальшивой «успешной» отправки в production нет.

## Production build

```bash
npm run build
npm run start
```

## Проверки

```bash
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Форма (только email + необязательная боль)

Основная форма запрашивает **только рабочий email** — единственное обязательное
поле. Под формой находится необязательный шаг: заметные selectable tiles «Что
сейчас мешает продавать больше?». Выбор можно сбросить повторным кликом и он
отправляется вместе с email, если сделан.

Payload запроса `POST /api/waitlist`:

```json
{ "email": "you@company.com", "biggestPain": "crm_fill", "source": "waitlist_site", "locale": "ru" }
```

- `email` — обязателен, валидируется на сервере ([lib/validation.ts](lib/validation.ts)).
- `biggestPain` — необязателен; если задан, должен быть одним из
  `search | crm_fill | whatsapp | scripts`.
- Состояния формы: loading, success, error (с кнопкой «Повторить»).
- Повторная отправка одного email отсекается unique-индексом по `lower(email)`
  (сервер отвечает 409 и показывает success — «вы уже в списке»).

## Подключение Supabase

1. Скопируй `.env.example` в `.env.local` и заполни:
   - `SUPABASE_URL` — в формате `https://<project-ref>.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` — service role key
2. Выполни SQL из [`supabase/waitlist.sql`](supabase/waitlist.sql) в Supabase SQL Editor.
   Он создаёт таблицу `waitlist`, unique-индекс по `lower(email)` (защита от
   повторной отправки), CHECK «`biggest_pain` is null или из набора» и включает
   RLS без публичных политик. Если таблица уже существовала со старыми
   обязательными колонками — в конце файла есть блок миграции (сделать
   `name`/`company`/`crm`/`biggest_pain` nullable).
3. Форма постит `POST /api/waitlist`; route handler валидирует данные на сервере
   и сохраняет заявку.

**Безопасность:** `SUPABASE_SERVICE_ROLE_KEY` используется только на сервере
внутри route handler. Никогда не помещай его в клиентский код и не префикси через
`NEXT_PUBLIC_`.

### Поля таблицы `waitlist`

- **Обязательные:** `id`, `created_at`, `email`.
- **Необязательные:** `biggest_pain` (nullable), `source`, `locale`.
- **Исторические (nullable, новая форма их не шлёт):** `name`, `company`, `crm`.

## Фотографии

Использованы две editorial-фотографии из **Unsplash** (лицензия Unsplash —
свободное коммерческое использование, атрибуция не требуется):

| Файл | Назначение | Автор / источник |
|------|-----------|------------------|
| [`public/hero-manager.jpg`](public/hero-manager.jpg) | Hero: менеджер в наушниках на звонке | Unsplash, фото `IaCvRgokDBo` — https://unsplash.com/photos/IaCvRgokDBo |
| [`public/team-sales.jpg`](public/team-sales.jpg) | Waitlist: разговор отдела продаж | Unsplash, фото `aoweP90-XwM` — https://unsplash.com/photos/aoweP90-XwM |

Оба файла скачаны локально в оптимизированном размере (1920px, q≈70, ~200–240 КБ)
и отдаются через `next/image` с responsive `sizes`, blur-placeholder и warm-scrim
поверх, чтобы совпадать с тёплой палитрой сайта. Тяжёлые оригиналы на страницу не
грузятся.

## Что на сайте реально, а что — roadmap

Сайт честно разделяет текущие и будущие функции:

- **Доступно сейчас (основной сценарий):** после звонка LiveAssist собирает
  заметку о разговоре и предлагает действия для CRM (заметка, задача, тег,
  следующий шаг, сохранённое возражение). Менеджер проверяет и подтверждает
  каждое действие; повтор безопасно пропускается как дубль.
- **В разработке — скрипты из успешных разговоров:** анализ заметок реальных
  разговоров, чтобы находить работающие формулировки и собирать практические
  скрипты команды. Отдельная функция, **не** связана с WhatsApp.
- **В разработке — WhatsApp-агент через CRM:** агент читает контекст сделки и
  задачи, пишет клиенту в нужное время, ведёт простые диалоги и подключает
  менеджера в сложных ситуациях. Отдельная функция.

Обе будущие функции на сайте помечены статусом «В разработке». Продукт не
утверждает, что они уже выпущены, и не заявляет, что заменяет менеджера.

## Где менять тексты и дизайн-токены

- **Тексты (RU):** [`lib/content.ts`](lib/content.ts) — единая точка правды для
  всего копирайта.
- **Цвета / шрифты / радиусы / тени:** [`tailwind.config.ts`](tailwind.config.ts)
  и CSS-переменные + утилиты в [`app/globals.css`](app/globals.css).
- **Направление, референсы, motion-система:** [`DESIGN.md`](DESIGN.md).

## Структура

```
app/
  layout.tsx              корневой layout, шрифты, метаданные, skip-link
  page.tsx                сборка четырёх блоков
  globals.css             токены, базовые стили, утилиты, reduced-motion
  privacy/page.tsx        политика конфиденциальности
  terms/page.tsx          условия использования
  api/waitlist/route.ts   серверная валидация + запись в Supabase
components/
  Header.tsx              компактный header
  Hero.tsx                Блок 1 — hero + анимированная product scene
  SessionNoteFlow.tsx     Блок 2 — разговор → заметка → три направления
  CrmSuggestedActionsDemo.tsx  Блок 3 — интерактивный демо-mockup
  WaitlistForm.tsx        Блок 4 — форма (loading/success/error)
  Footer.tsx              footer
  Reveal.tsx              общий scroll-reveal (уважает reduced-motion)
lib/
  content.ts              весь копирайт
  validation.ts           серверная валидация заявки
  supabase.ts             server-only Supabase helper
supabase/
  waitlist.sql            схема таблицы
```

## Анимации и доступность

Главная идея движения — _conversation data becomes structured work_. Анимации
объясняют продукт, а не украшают его: в hero короткие фразы собираются в заметку
и превращаются в действия; в демо действия последовательно записываются в CRM.

Всё уважает `prefers-reduced-motion`: бесконечные циклы выключаются, показывается
финальное осмысленное состояние, контент никогда не скрывается. Форма имеет
видимые focus-состояния, label к каждому полю, серверные ошибки рядом с полем и
корректные `autocomplete`-атрибуты.

## Локализация

Первая версия — русский. Все строки собраны в `lib/content.ts`, что упрощает
добавление второго языка позже.
