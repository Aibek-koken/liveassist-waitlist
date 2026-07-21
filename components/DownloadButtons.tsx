"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { hero } from "@/lib/content";
import {
  DOWNLOAD_VERSION,
  OS_NAME,
  detectOs,
  recommendedForOs,
  type DetectedOs,
} from "@/lib/downloads";

/* Бренд-иконки ОС (currentColor). */
function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.85 2.33-4.22 2.44-4.29-1.33-1.95-3.4-2.22-4.14-2.25-1.76-.18-3.44 1.04-4.33 1.04-.89 0-2.27-1.02-3.74-.99-1.92.03-3.7 1.12-4.69 2.84-2 3.47-.51 8.6 1.43 11.42.95 1.38 2.08 2.93 3.56 2.87 1.43-.06 1.97-.92 3.7-.92 1.72 0 2.21.92 3.72.89 1.54-.03 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.15 1.56-3.23-.03-.01-2.99-1.15-3.02-4.56zM14.2 3.78c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.33 1.71-.73.85-1.37 2.21-1.2 3.51 1.27.1 2.57-.65 3.35-1.6z" />
    </svg>
  );
}
function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5.48l7.42-1.01v7.16H3V5.48zm0 13.04l7.42 1.01v-7.07H3v6.06zM11.27 4.35L21 3v8.63h-9.73V4.35zm0 15.3L21 21v-8.55h-9.73v7.2z" />
    </svg>
  );
}
function LinuxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z" />
    </svg>
  );
}

function osIcon(os: DetectedOs) {
  if (os === "mac") return <AppleIcon />;
  if (os === "windows") return <WindowsIcon />;
  if (os === "linux") return <LinuxIcon />;
  return <Download size={16} />;
}

type Props = {
  /** id-якорь для этого блока. Только один блок на странице должен нести
   *  "download" (сюда ведут /account и /signup) — остальным передавай null. */
  anchorId?: string | null;
  align?: "left" | "center";
  /** "lg" — крупная, максимально заметная кнопка (для hero). */
  size?: "md" | "lg";
};

export default function DownloadButtons({
  anchorId = "download",
  align = "left",
  size = "md",
}: Props) {
  // На сервере и до гидрации ОС неизвестна — показываем нейтральную сборку,
  // чтобы не было рассинхрона гидрации.
  const [os, setOs] = useState<DetectedOs>("unknown");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOs(detectOs(navigator.userAgent, navigator.platform));
    setReady(true);
  }, []);

  const rec = recommendedForOs(os);
  const t = hero.download;

  const primaryLabel = rec ? `${t.forOs} ${OS_NAME[os]}` : t.generic;
  // Пока ОС не определена (или мобильный/неизвестно) — ведём на страницу выбора.
  const primaryHref = rec ? rec.url : "/download";

  const centered = align === "center";
  const lg = size === "lg";
  const iconSize = lg ? 19 : 16;

  return (
    <div {...(anchorId ? { id: anchorId } : {})} className="scroll-mt-24">
      <div className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <a
          href={primaryHref}
          className={`btn-primary ${lg ? "!min-h-[60px] !gap-2.5 !px-9 !text-[16.5px] !font-extrabold" : ""}`}
          aria-label={primaryLabel}
        >
          <span className="inline-flex items-center" aria-hidden="true">
            {ready ? osIcon(os) : <Download size={iconSize} />}
          </span>
          {primaryLabel}
        </a>
        <Link
          href="/download"
          className={`btn-ghost ${lg ? "!min-h-[60px] !px-7" : ""}`}
        >
          {t.allPlatforms}
        </Link>
      </div>
      <p className={`mono mt-3 text-[12px] text-ink-soft ${centered ? "text-center" : ""}`}>
        macOS · Windows · Linux · v{DOWNLOAD_VERSION} · {t.free}
      </p>
    </div>
  );
}
