import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Условия использования — LiveAssist AI",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
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
          Условия использования
        </h1>
        <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft">
          LiveAssist AI находится в стадии раннего доступа. Эта страница описывает
          условия участия в пилоте на понятном языке.
        </p>

        <div className="mt-10 space-y-8">
          <Section title="Ранний доступ">
            Заявка в список раннего доступа не гарантирует немедленного
            подключения. Мы приглашаем участников небольшими группами и свяжемся с
            вами, когда подойдёт ваша очередь.
          </Section>
          <Section title="Стадия продукта">
            Часть функций уже работает, часть отмечена как «в разработке» и
            появится позже. Мы не обещаем функции, которых пока нет, и честно
            маркируем то, что ещё предстоит выпустить.
          </Section>
          <Section title="Ответственность">
            LiveAssist помогает менеджеру, но не заменяет его. Итоговые решения и
            действия в CRM остаются за человеком: продукт предлагает действия, а
            подтверждает их менеджер.
          </Section>
          <Section title="Обратная связь">
            Участвуя в пилоте, вы помогаете нам делать продукт лучше. Мы можем
            учитывать вашу обратную связь при развитии LiveAssist, не раскрывая
            вашу личность без согласия.
          </Section>
          <Section title="Связь с нами">
            Вопросы по условиям —{" "}
            <a
              href="mailto:hello@liveassist.ai"
              className="font-medium text-ink underline decoration-lime-deep underline-offset-2"
            >
              hello@liveassist.ai
            </a>
            .
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
