"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Download, Laptop, Mail, Phone } from "lucide-react";
import { downloadPage as t, footer } from "@/lib/content";
import {
  DOWNLOAD_VERSION,
  OS_NAME,
  PLATFORMS,
  detectOs,
  recommendedForOs,
  type DetectedOs,
  type PlatformDef,
} from "@/lib/downloads";

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.85 2.33-4.22 2.44-4.29-1.33-1.95-3.4-2.22-4.14-2.25-1.76-.18-3.44 1.04-4.33 1.04-.89 0-2.27-1.02-3.74-.99-1.92.03-3.7 1.12-4.69 2.84-2 3.47-.51 8.6 1.43 11.42.95 1.38 2.08 2.93 3.56 2.87 1.43-.06 1.97-.92 3.7-.92 1.72 0 2.21.92 3.72.89 1.54-.03 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.15 1.56-3.23-.03-.01-2.99-1.15-3.02-4.56zM14.2 3.78c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.33 1.71-.73.85-1.37 2.21-1.2 3.51 1.27.1 2.57-.65 3.35-1.6z" />
    </svg>
  );
}
function WindowsIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5.48l7.42-1.01v7.16H3V5.48zm0 13.04l7.42 1.01v-7.07H3v6.06zM11.27 4.35L21 3v8.63h-9.73V4.35zm0 15.3L21 21v-8.55h-9.73v7.2z" />
    </svg>
  );
}
function LinuxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z" />
    </svg>
  );
}

function platformIcon(os: DetectedOs) {
  if (os === "mac") return <AppleIcon />;
  if (os === "windows") return <WindowsIcon />;
  return <LinuxIcon />;
}

/** Компактная кнопка ручного выбора системы. */
function PlatformPill({ def }: { def: PlatformDef }) {
  return (
    <a
      href={def.url}
      className="group flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-ink transition-colors hover:border-ink/25 hover:bg-milk"
    >
      <span aria-hidden="true">{platformIcon(def.os)}</span>
      <span className="text-[14px] font-semibold">{def.name}</span>
      <Download size={14} className="text-ink-soft" aria-hidden="true" />
    </a>
  );
}

function contactIcon(href: string) {
  if (href.startsWith("mailto:")) return <Mail size={16} aria-hidden="true" />;
  if (href.startsWith("tel:")) return <Phone size={16} aria-hidden="true" />;
  return <ArrowUpRight size={16} aria-hidden="true" />;
}

export default function DownloadSection() {
  const [os, setOs] = useState<DetectedOs>("unknown");

  useEffect(() => {
    setOs(detectOs(navigator.userAgent, navigator.platform));
  }, []);

  const recommended = recommendedForOs(os);

  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 78% 0%, rgba(198,242,78,0.16), transparent 60%), radial-gradient(45% 40% at 4% 20%, rgba(214,160,60,0.08), transparent 70%)",
        }}
      />
      <div className="shell relative pb-24 pt-10 sm:pt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} />
          {t.back}
        </Link>

        {/* Hero */}
        <section className="mx-auto mt-10 max-w-[640px] text-center">
          <p className="eyebrow mb-3 justify-center">
            <span className="eyebrow__dot" />
            {t.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-[clamp(16px,1.6vw,19px)] leading-[1.55] text-ink-soft">
            {t.subtitle}
          </p>
        </section>

        {/* Главное действие: большая кнопка под определённую систему */}
        <section className="mx-auto mt-9 max-w-[440px]">
          {recommended ? (
            <div className="lime-glow rounded-[26px] border border-line bg-surface/90 p-6 text-center backdrop-blur-sm sm:p-7">
              <p className="eyebrow justify-center !text-ink-soft">
                {t.recommendedFor} · {OS_NAME[os]}
              </p>
              <a
                href={recommended.url}
                className="btn-primary mt-4 w-full !min-h-[58px] !text-[16px]"
                aria-label={`${t.download} ${recommended.name}`}
              >
                <span aria-hidden="true">{platformIcon(recommended.os)}</span>
                {t.download} {recommended.name}
              </a>
              <p className="mono mt-3 text-[12px] text-ink-soft">
                {t.free}
                {DOWNLOAD_VERSION}
              </p>
            </div>
          ) : (
            <div className="rounded-[26px] border border-line bg-surface/90 p-6 text-center backdrop-blur-sm sm:p-7">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-milk text-ink">
                <Laptop size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-[19px] font-extrabold tracking-tight text-ink">
                {t.mobileTitle}
              </h2>
              <p className="mx-auto mt-2 max-w-[38ch] text-[14px] leading-[1.55] text-ink-soft">
                {t.mobileBody}
              </p>
            </div>
          )}
        </section>

        {/* Как установить — три простых шага */}
        <section className="mx-auto mt-16 max-w-[820px]">
          <h2 className="text-center font-display text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.03em] text-ink">
            {t.stepsTitle}
          </h2>
          <ol className="mt-7 grid gap-4 sm:grid-cols-3">
            {t.steps.map((s) => (
              <li
                key={s.n}
                className="rounded-[20px] border border-line bg-surface/80 p-5 text-center sm:text-left"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-lime-deep/40 bg-lime text-[16px] font-extrabold text-ink max-sm:mx-auto">
                  {s.n}
                </span>
                <p className="mt-4 text-[16px] font-extrabold tracking-tight text-ink">
                  {s.title}
                </p>
                <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Другая система — ручной выбор, второстепенно */}
        <section className="mx-auto mt-14 max-w-[820px] text-center">
          <p className="text-[15px] font-bold text-ink">{t.otherTitle}</p>
          <p className="mt-1 text-[13px] text-ink-soft">{t.otherSub}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {PLATFORMS.map((def) => (
              <PlatformPill key={def.key} def={def} />
            ))}
          </div>
        </section>

        {/* Помощь — личные контакты */}
        <section className="mx-auto mt-16 max-w-[560px]">
          <div className="rounded-[26px] border border-line bg-surface/90 p-6 text-center backdrop-blur-sm sm:p-8">
            <h2 className="font-display text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em] text-ink">
              {t.helpTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-[40ch] text-[15px] leading-[1.55] text-ink-soft">
              {t.helpBody}
            </p>
            <p className="mt-4 text-[13px] font-bold text-ink">{t.helpPerson}</p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {footer.contacts.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-milk px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-ink/25"
                >
                  {contactIcon(c.href)}
                  {c.label}
                </a>
              ))}
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <p className="eyebrow justify-center !text-ink-soft">{t.helpSocialLabel}</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                {footer.socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[14px] font-semibold text-ink-soft transition-colors hover:text-ink"
                  >
                    {s.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <p className="mx-auto mt-10 text-center text-[12px] text-ink-soft">
          {t.versionLabel} v{DOWNLOAD_VERSION}
        </p>
      </div>
    </main>
  );
}
