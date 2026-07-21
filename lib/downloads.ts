/**
 * Единый источник правды для публичных десктоп-загрузок.
 *
 * Каждая ссылка на установщик ведёт в ПУБЛИЧНЫЙ репозиторий-загрузок на GitHub
 * (ниже). Приватный репозиторий продукта здесь не упоминается — это
 * единственные URL, которые сайт отдаёт браузеру.
 *
 * Ссылки используют форму `/releases/latest/download/…` намеренно: они всегда
 * указывают на самый свежий релиз, поэтому выпуск новой версии не требует
 * правок кода сайта.
 *
 * Держи это в синхроне с версией из `lend for Friend/lib/downloads.ts`.
 */

/** Публичный репозиторий загрузок. НЕ приватный репозиторий исходников. */
export const DOWNLOADS_REPO = "Aibek-koken/liveassist-downloads-";

/** Версия, опубликованная в репозитории загрузок. */
export const DOWNLOAD_VERSION = "0.1.4";

const REPO_BASE = `https://github.com/${DOWNLOADS_REPO}`;
const LATEST_ASSET_BASE = `${REPO_BASE}/releases/latest/download`;

/** Публичные стабильные имена файлов (без версии — намеренно). */
export const DOWNLOAD_ASSET_FILES = {
  macArm64: "LiveAssist-AI-macOS-arm64.dmg",
  windows: "LiveAssist-AI-Windows-x64-Setup.exe",
  linuxAppImage: "LiveAssist-AI-Linux-x86_64.AppImage",
  linuxDeb: "LiveAssist-AI-Linux-amd64.deb",
  checksums: "SHA256SUMS.txt",
} as const;

function latestAssetUrl(file: string): string {
  return `${LATEST_ASSET_BASE}/${file}`;
}

/** Прямые ссылки на установщики (без авторизации). */
export const DOWNLOAD_URLS = {
  macArm64: latestAssetUrl(DOWNLOAD_ASSET_FILES.macArm64),
  windows: latestAssetUrl(DOWNLOAD_ASSET_FILES.windows),
  linuxAppImage: latestAssetUrl(DOWNLOAD_ASSET_FILES.linuxAppImage),
  linuxDeb: latestAssetUrl(DOWNLOAD_ASSET_FILES.linuxDeb),
  checksums: latestAssetUrl(DOWNLOAD_ASSET_FILES.checksums),
  /** Страница релизов последней сборки на GitHub. */
  releasesLatest: `${REPO_BASE}/releases/latest`,
} as const;

/** Опубликованные SHA-256 (также лежат в SHA256SUMS.txt). Для отображения. */
export const DOWNLOAD_SHA256 = {
  macArm64: "464083666428d8bcab1092e9c30ffbce7469e88cc705a1ee6c7f8ce9287588e6",
  windows: "3bbeb0459801d5fcdf7875902738803e504a3afdf763038cd8f918d0bdb29d06",
  linuxAppImage: "088e73ec27b8045489cd3926847de5bd14a1b48f7a9951e17face8393219e037",
  linuxDeb: "6961aff484647c6c4027358d1178869f3ebc91ce55750e9eac2fcce28e3d99a7",
} as const;

/** ОС, с которой пришёл посетитель — для «рекомендованной» загрузки. */
export type DetectedOs = "mac" | "windows" | "linux" | "unknown";

/**
 * Чистое определение ОС из user-agent (и опционально platform). Мобильные ОС
 * дают `unknown`, потому что мобильной сборки нет. Порядок важен: `darwin`
 * содержит подстроку `win`, поэтому macOS проверяется раньше Windows.
 */
export function detectOs(
  userAgent: string | null | undefined,
  platform?: string | null
): DetectedOs {
  const s = `${userAgent ?? ""} ${platform ?? ""}`.toLowerCase();
  if (!s.trim()) return "unknown";
  if (/android/.test(s)) return "unknown";
  if (/iphone|ipad|ipod|ios/.test(s)) return "unknown";
  if (/macintosh|mac os|macos|darwin|mac/.test(s)) return "mac";
  if (/windows|win32|win64|wow64|windows nt/.test(s)) return "windows";
  if (/linux|x11|ubuntu|fedora|debian|cros/.test(s)) return "linux";
  return "unknown";
}

/** Человекочитаемое название ОС (RU). */
export const OS_NAME: Record<DetectedOs, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  unknown: "вашей системы",
};

export type PlatformKey = "mac" | "windows" | "linux-appimage" | "linux-deb";

export type PlatformDef = {
  key: PlatformKey;
  os: DetectedOs;
  url: string;
  name: string;
  arch: string;
  sha256: string;
};

/** Все платформы, для сетки «Все платформы» на странице /download. */
export const PLATFORMS: PlatformDef[] = [
  {
    key: "mac",
    os: "mac",
    url: DOWNLOAD_URLS.macArm64,
    name: "macOS",
    arch: "Apple Silicon · arm64",
    sha256: DOWNLOAD_SHA256.macArm64,
  },
  {
    key: "windows",
    os: "windows",
    url: DOWNLOAD_URLS.windows,
    name: "Windows",
    arch: "x64 · Windows 10/11",
    sha256: DOWNLOAD_SHA256.windows,
  },
  {
    key: "linux-appimage",
    os: "linux",
    url: DOWNLOAD_URLS.linuxAppImage,
    name: "Linux · AppImage",
    arch: "x86_64 · портативный",
    sha256: DOWNLOAD_SHA256.linuxAppImage,
  },
  {
    key: "linux-deb",
    os: "linux",
    url: DOWNLOAD_URLS.linuxDeb,
    name: "Linux · .deb",
    arch: "amd64 · Debian/Ubuntu",
    sha256: DOWNLOAD_SHA256.linuxDeb,
  },
];

/** Какая платформа рекомендуется под определённую ОС. */
export const RECOMMENDED_KEY: Record<DetectedOs, PlatformKey | null> = {
  mac: "mac",
  windows: "windows",
  linux: "linux-appimage",
  unknown: null,
};

export function recommendedForOs(os: DetectedOs): PlatformDef | null {
  const key = RECOMMENDED_KEY[os];
  return key ? PLATFORMS.find((p) => p.key === key) ?? null : null;
}
