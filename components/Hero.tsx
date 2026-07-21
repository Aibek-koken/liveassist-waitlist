"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";
import { hero } from "@/lib/content";
import DownloadButtons from "@/components/DownloadButtons";
import heroImg from "@/public/hero-manager.jpg";

const CALM = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 1900;
const STEPS = 5; // 0 live · 1 question · 2 answer · 3 итог · 4 crm action

const WAVE = [0.4, 0.7, 0.5, 0.9, 0.6, 0.35, 0.8, 0.55, 1, 0.5, 0.7, 0.45, 0.85, 0.6, 0.3, 0.75];

function useStep() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? STEPS - 1 : 0);
  useEffect(() => {
    if (reduce) {
      setStep(STEPS - 1);
      return;
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);
  return step;
}

export default function Hero() {
  const step = useStep();
  const reduce = useReducedMotion();
  const show = (from: number) => (reduce ? true : step >= from);
  const fade = (visible: boolean, y = 10) =>
    reduce ? { opacity: 1, y: 0 } : { opacity: visible ? 1 : 0, y: visible ? 0 : y };

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 78% 0%, rgba(198,242,78,0.16), transparent 60%), radial-gradient(45% 40% at 4% 20%, rgba(214,160,60,0.08), transparent 70%)",
        }}
      />
      <div className="shell relative grid items-center gap-10 pb-14 pt-12 sm:pt-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:pb-24 lg:pt-20">
        {/* left — copy (short) */}
        <div className="relative z-10 min-w-0">
          <p className="eyebrow mb-5">
            <span className="eyebrow__dot" />
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(38px,5.4vw,68px)] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink">
            {hero.title[0]}
            <br />
            <span className="text-ink-soft">{hero.title[1]}</span>
          </h1>
          <p className="mt-5 max-w-[42ch] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-ink-soft">
            {hero.subtitle}
          </p>
          {/* download-first CTA (id="download" — сюда ведут /account и /signup) */}
          <div className="mt-8">
            <DownloadButtons />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
            <a
              href="#how"
              className="inline-flex items-center gap-1.5 font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {hero.secondaryCta}
              <ArrowUpRight size={15} />
            </a>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-1.5 font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {hero.primaryCta}
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* right — photograph with floating LiveAssist overlays */}
        <div className="relative min-w-0">
          <div className="photo-warm relative aspect-[4/3] w-full overflow-hidden rounded-[26px] border border-line shadow-panel sm:aspect-[16/10]">
            <Image
              src={heroImg}
              alt="Менеджер в наушниках разговаривает с клиентом и делает заметки"
              placeholder="blur"
              priority
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover"
              style={{ objectPosition: "60% 30%" }}
            />

            {/* live pill + waveform — top left */}
            <motion.div
              className="glass absolute left-3 top-3 flex items-center gap-2.5 rounded-full px-3 py-2 sm:left-4 sm:top-4"
              animate={fade(show(0), 6)}
              transition={{ duration: 0.5, ease: CALM }}
            >
              <span className="eyebrow !text-[10px] !text-ink">
                <span className="eyebrow__dot animate-pulse-dot" />
                {hero.scene.live}
              </span>
              <span className="flex h-4 items-center gap-[2px]" aria-hidden="true">
                {WAVE.map((h, i) => (
                  <span
                    key={`w-${i}-${h}`}
                    className="hero-wave w-[2px] rounded-full bg-ink/45"
                    style={{ height: `${Math.round(h * 100)}%`, animationDelay: `${(i % 6) * 0.1}s` }}
                  />
                ))}
              </span>
            </motion.div>

            {/* conversation bubbles — mid left */}
            <div className="absolute left-3 top-[30%] flex w-[min(72%,320px)] flex-col gap-2 sm:left-4">
              <motion.div
                className="glass w-fit max-w-full rounded-2xl rounded-tl-md px-3.5 py-2"
                animate={fade(show(1), 10)}
                transition={{ duration: 0.5, ease: CALM }}
              >
                <p className="text-[12.5px] font-medium leading-snug text-ink">
                  {hero.scene.clientLine}
                </p>
              </motion.div>
              <motion.div
                className="w-fit max-w-full self-start rounded-2xl rounded-tl-md border border-lime-deep/50 bg-lime px-3.5 py-2 shadow-soft"
                animate={fade(show(2), 10)}
                transition={{ duration: 0.5, ease: CALM }}
              >
                <p className="flex items-start gap-1.5 text-[12.5px] font-semibold leading-snug text-ink">
                  <Check size={13} strokeWidth={3} className="mt-[1px] shrink-0" />
                  {hero.scene.assistLine}
                </p>
              </motion.div>
            </div>

            {/* Итог разговора → CRM action — bottom */}
            <motion.div
              className="glass absolute inset-x-3 bottom-3 rounded-2xl p-3 sm:inset-x-4 sm:bottom-4"
              animate={fade(show(3), 12)}
              transition={{ duration: 0.55, ease: CALM }}
            >
              <p className="mono mb-1.5 text-[10.5px] uppercase tracking-wider text-ink-soft">
                {hero.scene.factLabel}
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" />
                  {hero.scene.factItem}
                </p>
                <ArrowRight size={15} className="hidden shrink-0 text-ink-soft sm:block" />
                <motion.span
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success/30 bg-success-soft px-2.5 py-1 text-[11.5px] font-semibold text-success"
                  animate={reduce ? { opacity: 1 } : { opacity: show(4) ? 1 : 0.25 }}
                  transition={{ duration: 0.45, ease: CALM }}
                >
                  <Check size={12} strokeWidth={3} />
                  {hero.scene.crmAction}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes heroWave { 0%,100%{transform:scaleY(0.35)} 50%{transform:scaleY(1)} }
          .hero-wave { transform-origin:center; animation: heroWave 1.05s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce){ .hero-wave{ animation:none; transform:scaleY(0.6);} }
        `,
        }}
      />
    </section>
  );
}
