"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { downloadPage as t } from "@/lib/content";
import {
  DOWNLOAD_URLS,
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5.48l7.42-1.01v7.16H3V5.48zm0 13.04l7.42 1.01v-7.07H3v6.06zM11.27 4.35L21 3v8.63h-9.73V4.35zm0 15.3L21 21v-8.55h-9.73v7.2z" />
    </svg>
  );
}
function LinuxIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z" />
    </svg>
  );
}

function platformIcon(os: DetectedOs) {
  if (os === "mac") return <AppleIcon />;
  if (os === "windows") return <WindowsIcon />;
  return <LinuxIcon />;
}

function PlatformCard({ def }: { def: PlatformDef }) {
  return (
    <a
      href={def.url}
      className="tile !min-h-0 flex-row items-center gap-3.5 !p-4 hover:!-translate-y-0.5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-line bg-milk text-ink">
        {platformIcon(def.os)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
          {t.download}
        </span>
        <span className="block text-[15px] font-extrabold leading-tight tracking-tight text-ink">
          {def.name}
        </span>
        <span className="block text-[11.5px] font-medium text-ink-soft">{def.arch}</span>
      </span>
      <Download size={16} className="shrink-0 text-ink-soft" aria-hidden="true" />
    </a>
  );
}

export default function DownloadSection() {
  const [os, setOs] = useState<DetectedOs>("unknown");

  useEffect(() => {
    setOs(detectOs(navigator.userAgent, navigator.platform));
  }, []);

  const recommended = recommendedForOs(os);
  const linuxPlatforms = PLATFORMS.filter((p) => p.os === "linux");
  const desktopPlatforms = PLATFORMS.filter((p) => p.os !== "linux");

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
        <section className="mx-auto mt-10 max-w-[720px] text-center">
          <p className="eyebrow mb-3 justify-center">
            <span className="eyebrow__dot" />
            {t.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink">
            {t.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[56ch] text-[clamp(15px,1.4vw,17px)] leading-[1.6] text-ink-soft">
            {t.subtitle}
          </p>
        </section>

        {/* Рекомендованная сборка */}
        {recommended ? (
          <section className="mx-auto mt-11 max-w-[520px]">
            <div className="lime-glow rounded-[26px] border border-line bg-surface/90 p-6 text-center backdrop-blur-sm sm:p-8">
              <p className="eyebrow justify-center !text-ink-soft">
                {t.recommendedFor} {OS_NAME[os]}
              </p>
              <a
                href={recommended.url}
                className="btn-primary mt-5 w-full"
                aria-label={`${t.download} ${recommended.name}`}
              >
                <span aria-hidden="true">{platformIcon(recommended.os)}</span>
                {t.download} {recommended.name}
              </a>
              <p className="mt-3 text-[12px] font-medium text-ink-soft">{recommended.arch}</p>
              <p className="mx-auto mt-4 max-w-[46ch] text-[12px] leading-[1.5] text-ink-soft/80">
                {t.recommendedNote}
              </p>
            </div>
          </section>
        ) : null}

        {/* Все платформы */}
        <section className="mt-16">
          <div className="mb-6 text-center">
            <h2 className="font-display text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.03em] text-ink">
              {t.choose}
            </h2>
            <p className="mt-2 text-[14px] text-ink-soft">{t.chooseSub}</p>
          </div>

          <div className="mx-auto grid max-w-[640px] gap-3 sm:grid-cols-2">
            {desktopPlatforms.map((def) => (
              <PlatformCard key={def.key} def={def} />
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-[640px]">
            <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.14em] text-ink-soft">
              {t.linux}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {linuxPlatforms.map((def) => (
                <PlatformCard key={def.key} def={def} />
              ))}
            </div>
          </div>
        </section>

        {/* Проверка + заметка macOS */}
        <section className="mx-auto mt-16 max-w-[640px] space-y-4">
          <div className="rounded-[20px] border border-line bg-surface/75 p-5 sm:p-6">
            <p className="eyebrow !text-ink-soft">{t.verifyTitle}</p>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">{t.verifyBody}</p>
            <code className="mono mt-3 block overflow-x-auto rounded-lg bg-milk px-3 py-2 text-[12px] text-ink">
              {t.verifyCmd}
            </code>
            <a
              href={DOWNLOAD_URLS.checksums}
              className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-ink transition-colors hover:text-ink-soft"
            >
              {t.checksums}
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="rounded-[20px] border border-line bg-surface/75 p-5 sm:p-6">
            <p className="eyebrow !text-ink-soft">{t.macNoteLabel}</p>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">{t.macNote}</p>
            <code className="mono mt-3 block overflow-x-auto rounded-lg bg-milk px-3 py-2 text-[12px] text-ink">
              {t.macNoteCmd}
            </code>
          </div>
        </section>

        <p className="mx-auto mt-12 text-center text-[12px] text-ink-soft">
          {t.versionLabel}: v{DOWNLOAD_VERSION}
        </p>
      </div>
    </main>
  );
}
