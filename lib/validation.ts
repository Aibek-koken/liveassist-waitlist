/**
 * Серверная валидация заявки в waitlist. Зависимостей нет.
 * Обязателен только email. biggestPain — необязательный.
 * Возвращает { ok: true, data } или { ok: false, errors }.
 */

export type WaitlistData = {
  email: string;
  biggest_pain: string | null;
  source: string;
  locale: string;
};

export type ValidationResult =
  | { ok: true; data: WaitlistData }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_PAIN = new Set(["search", "crm_fill", "whatsapp", "scripts"]);

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateWaitlist(input: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const body = (input ?? {}) as Record<string, unknown>;

  const email = str(body.email).toLowerCase();
  // принимаем и biggestPain (camelCase из формы), и biggest_pain
  const painRaw = str(body.biggestPain) || str(body.biggest_pain);
  const source = str(body.source) || "waitlist_site";
  const locale = str(body.locale) || "ru";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    errors.email = "Укажите корректный рабочий email.";
  }

  // biggestPain необязателен; если задан — должен быть из известного набора
  let biggest_pain: string | null = null;
  if (painRaw) {
    if (ALLOWED_PAIN.has(painRaw)) {
      biggest_pain = painRaw;
    } else {
      errors.biggestPain = "Неизвестный вариант.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      email,
      biggest_pain,
      source: source.slice(0, 80),
      locale: locale.slice(0, 12),
    },
  };
}
