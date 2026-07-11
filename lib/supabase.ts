import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase helper.
 *
 * ВАЖНО: SUPABASE_SERVICE_ROLE_KEY используется ТОЛЬКО на сервере (route handler).
 * Никогда не импортируй этот модуль в клиентские компоненты и не префикси ключ
 * через NEXT_PUBLIC_. Если переменных нет — возвращаем null, и route работает в
 * явно обозначенном demo-режиме (см. app/api/waitlist/route.ts).
 */

let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    cached = null;
    return cached;
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** В production без Supabase форму нельзя «успешно» отправлять по-настоящему. */
export function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

/** Явный demo-режим разрешён только вне production. */
export function demoModeAllowed(): boolean {
  return !isProd();
}
