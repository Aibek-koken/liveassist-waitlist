"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Notebook } from "lucide-react";
import { how } from "@/lib/content";
import Reveal from "./Reveal";

const CALM = [0.22, 1, 0.36, 1] as const;
const WAVE = [0.35, 0.7, 0.45, 0.9, 0.55, 0.3, 0.8, 0.5, 1, 0.6, 0.4, 0.75];

/** одна маленькая сцена на шаг — ровно один элемент, без лишних деталей */
const stepVisual = [
  <span
    key="wave"
    className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[12px] leading-none text-white/85"
  >
    <span className="mono inline-flex items-center gap-1.5 text-[11px] font-semibold text-lime">
      <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" />
      Звонок идёт
    </span>
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {WAVE.map((h, i) => (
        <span
          key={`b-${i}-${h}`}
          className="how-wave w-[2.5px] rounded-full bg-lime/60"
          style={{ height: `${Math.round(h * 100)}%`, animationDelay: `${(i % 5) * 0.12}s` }}
        />
      ))}
    </span>
  </span>,
  <span
    key="hint"
    className="inline-flex items-center gap-1.5 rounded-full border border-lime-deep/50 bg-lime px-3 py-1.5 text-[12px] font-semibold leading-none text-ink"
  >
    <Check size={12} strokeWidth={3} className="shrink-0" />
    Да, интеграция с amoCRM есть
  </span>,
  <span
    key="crm"
    className="inline-flex items-center gap-2 rounded-[10px] border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[12px] leading-none text-white/85"
  >
    <Notebook size={13} className="shrink-0 text-lime" />
    Заметка · итог звонка
    <span className="mono inline-flex items-center gap-1 text-[11px] font-semibold text-lime">
      <Check size={11} strokeWidth={3} />
      Добавлено
    </span>
  </span>,
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="relative overflow-hidden" style={{ background: "var(--graphite)" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(198,242,78,0.1), transparent 60%)",
        }}
      />

      <div className="shell section-pad relative">
        <Reveal className="text-center">
          <p className="eyebrow mb-5 justify-center" style={{ color: "rgba(255,255,255,0.55)" }}>
            <span className="eyebrow__dot" />
            {how.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.03] tracking-[-0.035em] text-white">
            {how.title[0]}
            <br />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>{how.title[1]}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-[1.55] text-white/60">
            {how.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {how.steps.map((step, i) => (
            <Reveal key={step.n} className="min-w-0" delay={i * 0.07}>
              <motion.div
                className="flex h-full min-w-0 flex-col rounded-[22px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ duration: 0.35, ease: CALM }}
              >
                <span className="mono text-[13px] font-semibold tracking-[0.08em] text-lime">
                  {step.n}
                </span>
                <p className="mt-4 font-display text-[20px] font-bold leading-tight text-white">
                  {step.title}
                </p>
                <p className="mt-2 text-[14px] leading-[1.5] text-white/55">{step.text}</p>
                <div className="mt-auto flex min-h-[44px] items-end pt-6">{stepVisual[i]}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes howWave { 0%,100%{transform:scaleY(0.3)} 50%{transform:scaleY(1)} }
          .how-wave { transform-origin:bottom; animation: howWave 1.05s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce){ .how-wave{ animation:none; transform:scaleY(0.6);} }
        `,
        }}
      />
    </section>
  );
}
