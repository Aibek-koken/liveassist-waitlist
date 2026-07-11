import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — LiveAssist AI",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} />
            На главную
          </Link>
          <span className="font-display text-[16px] font-extrabold text-ink">
            LiveAssist<span className="text-lime-deep">.</span>
          </span>
        </div>
      </header>

      <main className="shell max-w-[760px] py-16 sm:py-24">
        <p className="mono mb-4 text-[12px] uppercase tracking-wider text-ink-soft">
          Обновлено: июль 2026
        </p>
        <h1 className="font-display text-[clamp(30px,5vw,46px)] font-bold tracking-[-0.03em] text-ink">
          Политика конфиденциальности
        </h1>
        <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft">
          Это ранняя версия продукта. Ниже — коротко и честно о том, какие данные
          мы собираем через форму раннего доступа и как их используем.
        </p>

        <div className="mt-10 space-y-8">
          <Section title="Какие данные мы собираем">
            Только то, что вы указываете в форме раннего доступа: имя, рабочий
            email, компанию, используемую CRM и то, что отнимает больше всего
            времени. Мы не собираем содержимое ваших разговоров, звонков или
            данных CRM через этот сайт.
          </Section>
          <Section title="Зачем мы их используем">
            Чтобы связаться с вами по поводу пилота LiveAssist и понять, какие
            функции важны небольшим отделам продаж. Мы не рассылаем массовые
            письма и не передаём ваши контакты третьим сторонам для рекламы.
          </Section>
          <Section title="Где хранятся данные">
            Заявки хранятся в базе данных Supabase, доступ к которой есть только у
            нашей команды через защищённый серверный ключ. Форма не сохраняет
            заявки в браузере и не использует рекламные трекеры.
          </Section>
          <Section title="Ваши права">
            Вы можете попросить нас показать, изменить или удалить ваши данные —
            напишите на{" "}
            <a
              href="mailto:hello@liveassist.ai"
              className="font-medium text-ink underline decoration-lime-deep underline-offset-2"
            >
              hello@liveassist.ai
            </a>
            , и мы всё сделаем.
          </Section>
          <Section title="Изменения">
            Продукт развивается, и эта политика может обновляться. Актуальная
            версия всегда находится на этой странице.
          </Section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-[20px] font-bold text-ink">{title}</h2>
      <p className="mt-2.5 text-[15.5px] leading-[1.7] text-ink-soft">{children}</p>
    </section>
  );
}
