"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, UserRound, Zap } from "lucide-react";
import { agent } from "@/lib/content";
import { requestInterest } from "@/lib/interest";
import Reveal from "./Reveal";

const CALM = [0.22, 1, 0.36, 1] as const;
const STEPS = 6; // 0 вопрос · 1 печатает · 2 ответ · 3 второй вопрос · 4 передача · 5 crm

export default function WhatsappAgent() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(STEPS);
      return;
    }
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= STEPS) window.clearInterval(id);
    }, 900);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const show = (from: number) => reduce || step >= from;
  const fade = (visible: boolean, y = 8) =>
    reduce ? { opacity: 1, y: 0 } : { opacity: visible ? 1 : 0, y: visible ? 0 : y };

  return (
    <section id="agent" className="relative overflow-hidden border-b border-line bg-milk">
      <div className="shell section-pad relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* левая колонка — смысл */}
        <Reveal className="relative z-10 min-w-0">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--whatsapp)" }} />
            {agent.eyebrow}
            <span className="mono ml-1 rounded-full bg-ink/[0.06] px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-ink-soft">
              {agent.badge}
            </span>
          </span>

          <h2 className="font-display text-[clamp(28px,3.1vw,44px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">
            {agent.title[0]}
            <br />
            <span className="text-ink-soft">{agent.title[1]}</span>
          </h2>

          <p className="mt-5 max-w-[44ch] text-[clamp(16px,1.3vw,18px)] leading-[1.55] text-ink-soft">
            {agent.subtitle}
          </p>

          <ul className="mt-7 space-y-3">
            {agent.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink">
                <span
                  className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(37,211,102,0.14)" }}
                >
                  <Check size={11} strokeWidth={3} style={{ color: "var(--whatsapp)" }} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <button type="button" onClick={() => requestInterest("whatsapp")} className="btn-primary">
              {agent.cta}
              <ArrowRight size={16} />
            </button>
            <p className="mono mt-3 text-[12px] text-ink-soft">{agent.ctaHint}</p>
          </div>
        </Reveal>

        {/* правая колонка — тёмная панель с диалогом */}
        <Reveal delay={0.06} className="min-w-0">
          <div
            ref={ref}
            className="relative min-w-0 rounded-[28px] border border-white/[0.08] p-5 shadow-panel sm:p-7"
            style={{ background: "var(--graphite)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[28px]"
              style={{
                background:
                  "radial-gradient(60% 40% at 70% 0%, rgba(37,211,102,0.12), transparent 65%)",
              }}
            />

            <p className="mono relative mb-5 text-center text-[11px] tracking-wide text-white/40">
              {agent.panelTop}
            </p>

            {/* окно чата */}
            <div className="relative rounded-[20px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--whatsapp)" }}
                >
                  <Zap size={14} strokeWidth={2.6} />
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-[13px] font-semibold text-white">
                    {agent.chat.contact}
                  </p>
                  <p className="mono flex items-center gap-1.5 text-[10.5px] text-white/45">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${reduce ? "" : "animate-pulse-dot"}`}
                      style={{ background: "var(--whatsapp)" }}
                    />
                    {agent.chat.presence}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {/* клиент */}
                <motion.p
                  className="w-fit max-w-[85%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.07] px-3.5 py-2 text-[13px] leading-snug text-white/85"
                  animate={fade(show(1))}
                  transition={{ duration: 0.45, ease: CALM }}
                >
                  {agent.chat.clientFirst}
                </motion.p>

                {/* агент печатает → отвечает */}
                {!show(3) ? (
                  <motion.span
                    className="ml-auto flex w-fit items-center gap-1 rounded-2xl rounded-tr-md px-3.5 py-2.5"
                    style={{ background: "var(--whatsapp)" }}
                    animate={fade(show(2))}
                    transition={{ duration: 0.35, ease: CALM }}
                    aria-hidden="true"
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full bg-white/90 ${reduce ? "" : "animate-pulse-dot"}`}
                        style={{ animationDelay: `${i * 0.18}s` }}
                      />
                    ))}
                  </motion.span>
                ) : (
                  <motion.div
                    className="ml-auto w-fit max-w-[88%]"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: CALM }}
                  >
                    <p
                      className="rounded-2xl rounded-tr-md px-3.5 py-2 text-[13px] font-medium leading-snug text-white"
                      style={{ background: "var(--whatsapp)" }}
                    >
                      {agent.chat.agentReply}
                    </p>
                    <p className="mono mt-1 text-right text-[10.5px] text-white/40">
                      {agent.chat.replySpeed}
                    </p>
                  </motion.div>
                )}

                {/* второй, сложный вопрос */}
                <motion.p
                  className="w-fit max-w-[85%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.07] px-3.5 py-2 text-[13px] leading-snug text-white/85"
                  animate={fade(show(4))}
                  transition={{ duration: 0.45, ease: CALM }}
                >
                  {agent.chat.clientSecond}
                </motion.p>

                {/* передача человеку */}
                <motion.div
                  className="flex items-center gap-2.5 rounded-[13px] border border-lime-deep/40 bg-lime/10 px-3 py-2.5"
                  animate={fade(show(5))}
                  transition={{ duration: 0.45, ease: CALM }}
                >
                  <UserRound size={15} className="shrink-0 text-lime" />
                  <span className="min-w-0 leading-tight">
                    <span className="mono block text-[11.5px] font-semibold text-lime">
                      {agent.chat.handoff}
                    </span>
                    <span className="block text-[12px] text-white/60">{agent.chat.handoffWhy}</span>
                  </span>
                </motion.div>
              </div>
            </div>

            {/* итог в CRM */}
            <motion.div
              className="relative mt-4 flex items-center justify-center"
              animate={fade(show(6))}
              transition={{ duration: 0.45, ease: CALM }}
            >
              <span className="mono inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-2 text-[11.5px] font-semibold text-white/75">
                <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-white text-[7px] font-bold text-ink">
                  a
                </span>
                {agent.chat.crm}
                <Check size={12} strokeWidth={3} className="text-lime" />
              </span>
            </motion.div>

            <p className="mono relative mt-5 text-center text-[11px] tracking-wide text-white/40">
              {agent.panelBottom}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
