"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Notebook, ListChecks, Check, ArrowRight, UserRound } from "lucide-react";
import { flow } from "@/lib/content";
import Reveal from "./Reveal";

const CALM = [0.22, 1, 0.36, 1] as const;

/** запускает короткую пошаговую последовательность один раз, когда сцена в вид */
function useSequence(active: boolean, count: number, ms = 900) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) {
      setStep(count);
      return;
    }
    if (!active) return;
    let i = 0;
    setStep(0);
    const id = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= count) window.clearInterval(id);
    }, ms);
    return () => window.clearInterval(id);
  }, [active, reduce, count, ms]);
  return step;
}

function StatusTag({ kind, label }: { kind: "available" | "future"; label: string }) {
  const available = kind === "available";
  // сцены — светлые карточки, поэтому используем светлые варианты пилюль
  return (
    <span className={`status-pill ${available ? "status-pill--available" : "status-pill--future"}`}>
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: available ? "var(--success)" : "var(--ink-soft)" }}
      />
      {label}
    </span>
  );
}

function SceneHeader({ title, status }: { title: string; status: (typeof flow.directions)[number] }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <p className="font-display text-[15px] font-bold text-ink">{title}</p>
      <StatusTag kind={status.statusKind} label={status.status} />
    </div>
  );
}

/* ── CRM — крупнейшая сцена ─────────────────────────────── */
function CrmRow({
  icon: Icon,
  text,
  visible,
  done,
  reduce,
}: {
  icon: typeof ListChecks;
  text: string;
  visible: boolean;
  done: boolean;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="flex items-center justify-between gap-2 rounded-[11px] border p-2.5 transition-colors duration-500"
      style={{
        borderColor: done ? "rgba(31,122,70,0.3)" : "var(--line)",
        background: done ? "rgba(31,122,70,0.07)" : "var(--surface)",
      }}
      animate={reduce ? { opacity: 1, y: 0 } : { opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.5, ease: CALM }}
    >
      <span className="flex min-w-0 items-center gap-2 text-[12.5px] font-medium text-ink">
        <Icon size={14} className="shrink-0 text-lime-deep" />
        <span className="truncate">{text}</span>
      </span>
      <motion.span
        className="mono inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-success"
        animate={reduce ? { opacity: 1 } : { opacity: done ? 1 : 0 }}
        transition={{ duration: 0.4, ease: CALM }}
      >
        <Check size={12} strokeWidth={3} />
        Добавлено
      </motion.span>
    </motion.div>
  );
}

function CrmScene({ dir }: { dir: (typeof flow.directions)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const step = useSequence(inView, 3, 750);

  return (
    <div ref={ref} className="flex h-full flex-col rounded-[22px] border border-line bg-surface p-5">
      <SceneHeader title={dir.title} status={dir} />
      <p className="text-[13.5px] text-ink-soft">{dir.caption}</p>

      {/* deal card — centered, fills the tall column */}
      <div className="mt-4 flex flex-1 items-center">
        <div className="w-full rounded-[16px] border border-line bg-milk/60 p-3.5">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-ink text-[9px] font-bold text-paper">
              amo
            </span>
            <div className="leading-tight">
              <p className="text-[12.5px] font-semibold text-ink">{"Acme Corp · Иван П."}</p>
              <p className="mono text-[10.5px] text-ink-soft">Переговоры</p>
            </div>
          </div>
          <div className="space-y-2">
            <CrmRow
              icon={Notebook}
              text="Заметка · итог звонка"
              visible={step >= 1}
              done={step >= 2}
              reduce={!!reduce}
            />
            <CrmRow
              icon={ListChecks}
              text="Отправить предложение · до пятницы"
              visible={step >= 2}
              done={step >= 3}
              reduce={!!reduce}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Скрипты — меньше ───────────────────────────────────── */
function ScriptsScene({ dir }: { dir: (typeof flow.directions)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const step = useSequence(inView, 3, 750);

  return (
    <div ref={ref} className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-4">
      <SceneHeader title={dir.title} status={dir} />
      <p className="text-[13px] text-ink-soft">{dir.caption}</p>
      <div className="mt-3.5 flex flex-1 flex-col justify-center gap-2">
        {/* weak line dims */}
        <motion.p
          className="rounded-[11px] border border-line bg-milk/50 px-3 py-2 text-[12.5px] text-ink-soft line-through"
          animate={reduce ? { opacity: 0.5 } : { opacity: step >= 1 ? 0.5 : 0 }}
          transition={{ duration: 0.4, ease: CALM }}
        >
          {flow.scripts.weak}
        </motion.p>
        {/* strong line highlighted */}
        <motion.div
          className="flex items-center justify-between gap-2 rounded-[11px] border border-lime-deep/50 bg-lime/15 px-3 py-2"
          animate={reduce ? { opacity: 1, y: 0 } : { opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 8 }}
          transition={{ duration: 0.5, ease: CALM }}
        >
          <p className="text-[12.5px] font-semibold text-ink">{flow.scripts.strong}</p>
        </motion.div>
        <motion.p
          className="mono flex items-center gap-1.5 text-[11px] text-ink-soft"
          animate={reduce ? { opacity: 1 } : { opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4, ease: CALM }}
        >
          <ArrowRight size={12} className="text-lime-deep" />
          {flow.scripts.into}
        </motion.p>
      </div>
    </div>
  );
}

/* ── WhatsApp — меньше ──────────────────────────────────── */
function WhatsappScene({ dir }: { dir: (typeof flow.directions)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const step = useSequence(inView, 3, 800);

  return (
    <div ref={ref} className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-4">
      <SceneHeader title={dir.title} status={dir} />
      <p className="text-[13px] text-ink-soft">{dir.caption}</p>
      <div className="mt-3.5 flex flex-1 flex-col justify-center gap-2">
        <motion.p
          className="w-fit max-w-[85%] rounded-2xl rounded-tl-md border border-line bg-milk/60 px-3 py-1.5 text-[12px] text-ink"
          animate={reduce ? { opacity: 1 } : { opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4, ease: CALM }}
        >
          {flow.whatsapp.clientMsg}
        </motion.p>
        <motion.p
          className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-md px-3 py-1.5 text-[12px] font-medium text-white"
          style={{ background: "var(--whatsapp)" }}
          animate={reduce ? { opacity: 1, y: 0 } : { opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 6 }}
          transition={{ duration: 0.45, ease: CALM }}
        >
          {flow.whatsapp.agentMsg}
        </motion.p>
        {/* handoff to human */}
        <motion.div
          className="flex items-center gap-2 rounded-[11px] border border-line bg-milk/50 px-3 py-2"
          animate={reduce ? { opacity: 1, y: 0 } : { opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 6 }}
          transition={{ duration: 0.45, ease: CALM }}
        >
          <UserRound size={14} className="shrink-0 text-ink" />
          <span className="min-w-0">
            <span className="mono block text-[11px] font-semibold text-ink">{flow.whatsapp.handoff}</span>
            <span className="block truncate text-[11.5px] text-ink-soft">{flow.whatsapp.handoffMsg}</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function SessionNoteFlow() {
  const reduce = useReducedMotion();
  const [crm, scripts, whatsapp] = flow.directions;

  return (
    <section id="how" className="relative overflow-hidden" style={{ background: "var(--graphite)" }}>
      {/* ambient warmth on the dark stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(198,242,78,0.1), transparent 60%), radial-gradient(40% 40% at 85% 90%, rgba(37,211,102,0.06), transparent 70%)",
        }}
      />
      <div className="shell section-pad relative">
        <Reveal className="text-center">
          <p className="eyebrow mb-5 justify-center" style={{ color: "rgba(255,255,255,0.55)" }}>
            <span className="eyebrow__dot" />
            {flow.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.03] tracking-[-0.035em] text-white">
            {flow.title[0]}
            <br />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>{flow.title[1]}</span>
          </h2>
        </Reveal>

        {/* central Итог разговора card */}
        <Reveal className="mx-auto mt-12 max-w-[460px]">
          <div className="lime-glow relative rounded-[22px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-lime text-ink">
                <Notebook size={19} />
              </span>
              <p className="font-display text-[16px] font-bold text-white">{flow.coreLabel}</p>
            </div>
            <ul className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
              {flow.coreItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-white/80">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* connector with a travelling light dot */}
        <div aria-hidden="true" className="relative mx-auto my-1 h-12 w-px">
          <span className="absolute inset-0 bg-white/12" />
          {!reduce && (
            <motion.span
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-lime"
              style={{ boxShadow: "0 0 10px rgba(198,242,78,0.9)" }}
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: 44, opacity: [0, 1, 1, 0] }}
              viewport={{ once: false }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
            />
          )}
        </div>

        {/* mini-scenes — CRM largest */}
        <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr] lg:gap-5">
          <Reveal>
            <CrmScene dir={crm} />
          </Reveal>
          <div className="grid gap-4">
            <Reveal delay={0.06}>
              <ScriptsScene dir={scripts} />
            </Reveal>
            <Reveal delay={0.12}>
              <WhatsappScene dir={whatsapp} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
