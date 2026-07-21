import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LiveAssist AI — AI-ассистент для отделов продаж",
  description:
    "LiveAssist сохраняет важные детали разговора, помогает менеджеру во время звонка, а после — готовит действия для CRM. Ранний доступ для небольших отделов продаж.",
  metadataBase: new URL("https://liveassist.tech"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "LiveAssist AI — AI-ассистент для отделов продаж",
    description:
      "Меньше рутины вокруг звонка. Больше внимания клиенту. LiveAssist превращает детали разговора в готовые действия для amoCRM.",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F6F4EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#waitlist"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Перейти к форме раннего доступа
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
