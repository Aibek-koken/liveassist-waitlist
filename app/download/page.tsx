import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadSection from "@/components/DownloadSection";

export const metadata: Metadata = {
  title: "Скачать LiveAssist AI — macOS, Windows и Linux",
  description:
    "Скачайте десктоп-приложение LiveAssist AI для macOS (Apple Silicon), Windows (x64) и Linux (AppImage или .deb). Бесплатно попробовать.",
  alternates: { canonical: "https://liveassist.tech/download" },
  openGraph: {
    title: "Скачать LiveAssist AI",
    description: "Десктоп-приложение LiveAssist AI для macOS, Windows и Linux.",
    url: "https://liveassist.tech/download",
    type: "website",
  },
};

export default function DownloadPage() {
  return (
    <>
      <Header />
      <DownloadSection />
      <Footer />
    </>
  );
}
