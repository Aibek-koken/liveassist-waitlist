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

export const flow = {
  eyebrow: "После звонка",
  title: ["Один звонок.", "Три следующих шага."],
  coreLabel: "Итог разговора",
  coreItems: [
    "Интересуется пилотом",
    "Возражение: долгая настройка",
    "Отправить предложение до пятницы",
    "Следующий звонок во вторник",
  ],
  directions: [
    {
      id: "crm",
      title: "CRM",
      caption: "Заметка, задача и следующий шаг",
      status: "Работает сейчас",
      statusKind: "available" as const,
    },
    {
      id: "scripts",
      title: "Скрипты",
      caption: "Учится на успешных разговорах",
      status: "В разработке",
      statusKind: "future" as const,
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      caption: "Продолжает диалог через CRM",
      status: "В разработке",
      statusKind: "future" as const,
    },
  ],
  // мини-сцена скриптов
  scripts: {
    weak: "«Дороговато у вас…»",
    strong: "«Сравним с тем, что вы теряете без этого»",
    into: "Скрипт команды",
  },
  // мини-сцена WhatsApp
  whatsapp: {
    clientMsg: "Здравствуйте! Ещё актуально?",
    agentMsg: "Да, держим место в пилоте 🙂",
    handoff: "Передано менеджеру",
    handoffMsg: "Сложный вопрос по договору",
  },
};

export const demo = {
  eyebrow: "Главная функция",
  title: ["Звонок закончен.", "CRM заполнена."],
  microline: "Проверьте. Подтвердите. Готово.",
  lead: "Acme Corp · Иван П.",
  factsLabel: "Итог разговора",
  actionsLabel: "Действия",
  crmLabel: "amoCRM",
  // факты слева
  facts: [
    { id: "f-note", text: "Интересуется пилотом" },
    { id: "f-task", text: "Отправить предложение до пятницы" },
    { id: "f-call", text: "Следующий звонок во вторник" },
    { id: "f-obj", text: "Возражение: долгая настройка" },
  ],
  // действия по центру; from — id факта-источника (общая подсветка)
  actions: [
    { id: "note", type: "Добавить заметку", from: "f-note", applied: "Добавлено", duplicate: false },
    { id: "task", type: "Создать задачу", from: "f-task", applied: "Создана", duplicate: false },
    { id: "call", type: "Запланировать звонок", from: "f-call", applied: "Запланирован", duplicate: false },
    { id: "obj", type: "Сохранить возражение", from: "f-obj", applied: "Уже существует", duplicate: true },
  ],
  confirmCta: "Подтвердить действия",
  confirmingLabel: "Записываем…",
  doneBanner: "CRM обновлена",
  replayCta: "Заново",
  trustInline: "Все изменения требуют подтверждения",
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
