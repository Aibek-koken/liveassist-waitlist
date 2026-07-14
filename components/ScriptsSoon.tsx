"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { scripts } from "@/lib/content";
import { requestInterest } from "@/lib/interest";
import Reveal from "./Reveal";

const CALM = [0.22, 1, 0.36, 1] as const;

export default function ScriptsSoon() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const on = reduce || inView;

  return (
    <section id="scripts" className="relative overflow-hidden" style={{ background: "var(--graphite)" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(45% 45% at 20% 0%, rgba(198,242,78,0.09), transparent 65%)",
        }}
      />

      <div className="shell section-pad relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="min-w-0">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[12px] font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            {scripts.eyebrow}
            <span className="mono ml-1 rounded-full bg-white/[0.08] px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-white/55">
              {scripts.badge}
            </span>
          </span>

          <h2 className="font-display text-[clamp(28px,3.2vw,44px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
            {scripts.title[0]}
            <br />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>{scripts.title[1]}</span>
          </h2>

          <p className="mt-5 max-w-[44ch] text-[15.5px] leading-[1.55] text-white/60">
            {scripts.subtitle}
          </p>

          <button
            type="button"
            onClick={() => requestInterest("scripts")}
            className="btn-primary mt-8"
          >
            {scripts.cta}
            <ArrowRight size={16} />
          </button>
        </Reveal>

        {/* сцена: слабая реплика → формулировка, которая закрывает сделки */}
        <Reveal delay={0.06} className="min-w-0">
          <div
            ref={ref}
            className="min-w-0 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
          >
            <p className="mono mb-2 text-[10.5px] uppercase tracking-wider text-white/40">
              {scripts.weakLabel}
            </p>
            <motion.p
              className="rounded-[13px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white/45 line-through"
              animate={{ opacity: on ? 0.6 : 0 }}
              transition={{ duration: 0.45, ease: CALM }}
            >
              {scripts.weak}
            </motion.p>

            <motion.span
              className="my-3 flex justify-center text-lime"
              aria-hidden="true"
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.35, ease: CALM }}
            >
              <ArrowDown size={16} />
            </motion.span>

            <p className="mono mb-2 text-[10.5px] uppercase tracking-wider text-lime">
              {scripts.strongLabel}
            </p>
            <motion.p
              className="rounded-[13px] border border-lime-deep/50 bg-lime/15 px-4 py-3 text-[15px] font-semibold leading-snug text-white"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={on ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55, ease: CALM }}
            >
              {scripts.strong}
            </motion.p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
