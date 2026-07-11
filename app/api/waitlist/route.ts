import { NextResponse } from "next/server";
import { validateWaitlist } from "@/lib/validation";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  isProd,
  demoModeAllowed,
} from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "waitlist";

export async function POST(request: Request) {
  // 1. Разбор тела
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // 2. Серверная валидация
  const result = validateWaitlist(payload);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 422 },
    );
  }
  const data = result.data;

  // 3. Нет Supabase → честное поведение
  if (!isSupabaseConfigured()) {
    if (isProd()) {
      // В production запрещено делать вид, что заявка сохранена
      console.error("[waitlist] Supabase не настроен — заявка не сохранена.");
      return NextResponse.json(
        { ok: false, error: "not_configured" },
        { status: 503 },
      );
    }
    if (demoModeAllowed()) {
      // Явный demo-режим только в development
      console.warn(
        "[waitlist] DEMO MODE: Supabase не настроен, заявка не сохранена:",
        { email: data.email, biggestPain: data.biggest_pain },
      );
      return NextResponse.json({ ok: true, demo: true }, { status: 200 });
    }
  }

  // 4. Запись в Supabase
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const { error } = await supabase.from(TABLE).insert({
    email: data.email,
    biggest_pain: data.biggest_pain,
    source: data.source,
    locale: data.locale,
  });

  if (error) {
    // 23505 — нарушение unique-ограничения (email уже есть)
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "duplicate" },
        { status: 409 },
      );
    }
    console.error("[waitlist] Ошибка вставки в Supabase:", error.message);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
