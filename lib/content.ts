/**
 * Единая точка правды для всех текстов сайта (RU).
 * Принцип: 70% визуала, 30% текста. Держи копирайт коротким —
 * заголовок ≤ 8–10 слов, подзаголовок 1–2 фразы, описание функции — одна строка.
 * Дизайн-токены живут в tailwind.config.ts и app/globals.css.
 */

export const site = {
  name: "LiveAssist",
  fullName: "LiveAssist AI",
  locale: "ru",
};

export const header = {
  brand: "LiveAssist",
  nav: [
    { label: "Как работает", href: "#how" },
    { label: "WhatsApp-агент", href: "#agent" },
    { label: "Ранний доступ", href: "#waitlist" },
  ],
  cta: "Получить доступ",
};

export const hero = {
  eyebrow: "AI-ассистент для продаж",
  title: ["Слушайте клиента.", "Остальное запомнит LiveAssist."],
  subtitle: "Подскажет во время звонка и подготовит CRM после него.",
  primaryCta: "Получить ранний доступ",
  secondaryCta: "Смотреть в действии",
  // подписи для плавающего overlay поверх фотографии
  scene: {
    live: "LiveAssist",
    liveHint: "во время звонка",
    clientLine: "«А с amoCRM интегрируется?»",
    assistLine: "Да. Заметки и задачи уйдут в amoCRM.",
    factLabel: "Итог разговора",
    factItem: "Отправить предложение до пятницы",
    crmAction: "Задача в amoCRM",
    crmDone: "Добавлено",
  },
};

export const how = {
  eyebrow: "Как это работает",
  title: ["Вы говорите с клиентом.", "LiveAssist делает остальное."],
  subtitle: "Один ассистент на звонке. Три шага — и сделка в amoCRM обновлена.",
  steps: [
    {
      n: "01",
      title: "Слушает звонок",
      text: "Работает в фоне, пока вы говорите. Ничего записывать вручную не нужно.",
    },
    {
      n: "02",
      title: "Подсказывает ответ",
      text: "Клиент спрашивает про интеграцию или цену — ответ уже на экране.",
    },
    {
      n: "03",
      title: "Заполняет amoCRM",
      text: "Заметка, задача и следующий звонок — после вашего подтверждения.",
    },
  ],
};

/** Флагманская идея: автономный агент в WhatsApp. Ещё не релиз — меряем спрос. */
export const agent = {
  eyebrow: "Автономный агент",
  badge: "В разработке",
  title: ["Клиент пишет в WhatsApp.", "Агент отвечает сам."],
  subtitle:
    "Не подсказка менеджеру, а полноценный ответ клиенту. Цена, сроки, условия — за секунды и круглосуточно.",
  bullets: [
    "Отвечает через 5 секунд, а не через два часа",
    "Сложный вопрос сразу передаёт менеджеру",
    "Каждый диалог сам ложится в сделку amoCRM",
  ],
  cta: "Хочу это первым",
  ctaHint: "Отметим вас в списке — позовём в пилот раньше остальных",
  panelTop: "клиент пишет · агент отвечает · 24/7",
  panelBottom: "менеджер подключается только там, где он нужен",
  chat: {
    contact: "Иван П. · Acme Corp",
    presence: "LiveAssist отвечает",
    clientFirst: "Здравствуйте! Сколько стоит на 5 менеджеров?",
    agentReply: "5 мест — 45 000 ₸ в месяц. Подключаем за один день 🙂",
    replySpeed: "ответ за 5 сек",
    clientSecond: "А скидку за год дадите?",
    handoff: "Передано менеджеру",
    handoffWhy: "Вопрос про скидку — решает человек",
    crm: "amoCRM · сделка обновлена",
  },
};

/** Вторая идея из роадмапа — скрипты. Тоже с замером спроса. */
export const scripts = {
  eyebrow: "Скрипты",
  badge: "В разработке",
  title: ["Скрипт, который пишут", "ваши лучшие звонки."],
  subtitle:
    "LiveAssist слушает сделки, которые закрылись, и превращает удачные формулировки в скрипт для всей команды.",
  weak: "«Дороговато у вас…»",
  weakLabel: "Что отвечали раньше",
  strong: "«Сравним с тем, что вы теряете без этого»",
  strongLabel: "Что сработало у Айгуль — 7 сделок",
  cta: "Хочу это первым",
};

export const demo = {
  eyebrow: "Главная функция",
  title: ["Звонок закончен.", "CRM заполнена."],
  lead: "Acme Corp · Иван П.",
  leadStage: "Переговоры",
  fromLabel: "Услышал на звонке",
  crmLabel: "Запишет в amoCRM",
  // одна строка = один факт из разговора и одна запись в CRM
  rows: [
    {
      id: "note",
      fact: "Интересуется пилотом",
      crm: "Заметка · итог звонка",
      applied: "Добавлено",
      duplicate: false,
    },
    {
      id: "task",
      fact: "Отправить предложение до пятницы",
      crm: "Задача · до пятницы",
      applied: "Создана",
      duplicate: false,
    },
    {
      id: "call",
      fact: "Следующий звонок во вторник",
      crm: "Звонок · вторник",
      applied: "Запланирован",
      duplicate: false,
    },
    {
      id: "obj",
      fact: "Возражение: долгая настройка",
      crm: "Возражение · в карточке",
      applied: "Уже есть",
      duplicate: true,
    },
  ],
  confirmCta: "Подтвердить и записать",
  confirmingLabel: "Записываем…",
  doneBanner: "CRM обновлена",
  replayCta: "Заново",
  trustInline: "Ничего не уходит в CRM без вашего подтверждения",
};

export const waitlist = {
  eyebrow: "Ранний доступ",
  title: "Хотите попробовать первыми?",
  subtitle: "Оставьте email — пригласим вас в пилот.",
  emailLabel: "Рабочий email",
  emailPlaceholder: "you@company.com",
  cta: "Получить ранний доступ",
  submitting: "Отправляем…",
  disclaimer: "Без спама. Только приглашение в пилот.",
  success: {
    title: "Вы в списке.",
    body: "Напишем, когда откроем следующую группу.",
  },
  errors: {
    email: "Укажите корректный рабочий email.",
    generic: "Не удалось отправить. Попробуйте ещё раз.",
    retry: "Повторить",
  },
  pain: {
    title: "Что сейчас мешает продавать больше?",
    hint: "Необязательно — выберите один вариант.",
    confirm: "Это тоже наша главная боль",
    options: [
      { value: "search", label: "Ищу ответы во время звонка", scene: "tabs" as const },
      { value: "crm_fill", label: "Забываю заполнить CRM", scene: "crm" as const },
      { value: "whatsapp", label: "Теряю клиентов в WhatsApp", scene: "whatsapp" as const },
      { value: "scripts", label: "Скрипты не отражают реальные разговоры", scene: "scripts" as const },
    ],
  },
};

export const footer = {
  brand: "LiveAssist AI",
  tagline: "Ранний доступ для небольших отделов продаж.",
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  copyright: "© 2026 LiveAssist AI",
};
