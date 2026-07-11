-- LiveAssist AI · waitlist table
-- Запусти это в Supabase SQL Editor один раз.
-- Обязателен только email. biggest_pain необязателен.
-- name / company / crm оставлены nullable для обратной совместимости — новая
-- форма их не запрашивает.

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  email         text not null,
  biggest_pain  text,
  source        text not null default 'waitlist_site',
  locale        text not null default 'ru',
  -- необязательные исторические поля (новая форма их не шлёт)
  name          text,
  company       text,
  crm           text
);

-- Защита от повторной отправки одного email (case-insensitive).
create unique index if not exists waitlist_email_unique
  on public.waitlist (lower(email));

-- Быстрая выборка последних заявок.
create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

-- biggest_pain: либо NULL, либо один из известных вариантов.
alter table public.waitlist
  drop constraint if exists waitlist_biggest_pain_check;
alter table public.waitlist
  add constraint waitlist_biggest_pain_check
  check (biggest_pain is null or biggest_pain in ('search', 'crm_fill', 'whatsapp', 'scripts'));

-- Row Level Security: включаем и НЕ добавляем публичных политик.
-- Запись идёт только через server-side route handler с service_role key.
alter table public.waitlist enable row level security;

comment on table public.waitlist is
  'Ранний доступ LiveAssist AI. Обязателен только email. Пишется только сервером (service role). RLS без публичных политик.';

-- ─────────────────────────────────────────────────────────────
-- МИГРАЦИЯ существующей таблицы (если раньше name/company/crm были NOT NULL):
--
--   alter table public.waitlist alter column name    drop not null;
--   alter table public.waitlist alter column company drop not null;
--   alter table public.waitlist alter column crm     drop not null;
--   alter table public.waitlist alter column biggest_pain drop not null;
--   alter table public.waitlist drop constraint if exists waitlist_biggest_pain_check;
--   alter table public.waitlist add constraint waitlist_biggest_pain_check
--     check (biggest_pain is null or biggest_pain in ('search','crm_fill','whatsapp','scripts'));
-- ─────────────────────────────────────────────────────────────
