/**
 * Мост между секциями «Скоро» и формой waitlist.
 * Клик по «Хочу это первым» отмечает нужный вариант в форме и скроллит к ней,
 * поэтому интерес к нерелизнутой фиче доезжает до Supabase (waitlist.biggest_pain).
 * Значения обязаны совпадать с ALLOWED_PAIN в lib/validation.ts.
 */

export const INTEREST_EVENT = "liveassist:interest";

export type InterestValue = "search" | "crm_fill" | "whatsapp" | "scripts";

export function requestInterest(value: InterestValue) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<InterestValue>(INTEREST_EVENT, { detail: value }));
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
