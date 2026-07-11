"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  StickyNote,
  ListChecks,
  CalendarClock,
  MessageSquareWarning,
} from "lucide-react";
import { demo } from "@/lib/content";
import Reveal from "./Reveal";

const CALM = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 780;

type Phase = "review" | "applying" | "done";
type RowStatus = "pending" | "writing" | "applied" | "skipped";

const actionIcons: Record<string, typeof StickyNote> = {
  note: StickyNote,
  task: ListChecks,
  call: CalendarClock,
  obj: MessageSquareWarning,
};

// что появляется в колонке amoCRM для каждого действия
const crmResult: Record<string, string> = {
  note: "Заметка · итог звонка",
  task: "Задача · предложение (пт)",
  call: "Задача · звонок (вт)",
  obj: "Возражение · уже есть",
};

function rowStatus(phase: Phase, applied: number, i: number, dup: boolean): RowStatus {
  if (phase === "review") return "pending";
  if (phase === "done") return dup ? "skipped" : "applied";
  if (i < applied) return dup ? "skipped" : "applied";
  if (i === applied) return "writing";
  return "pending";
}

const factById = (id: string) => demo.facts.find((f) => f.id === id);

export default function CrmSuggestedActionsDemo() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("review");
  const [applied, setApplied] = useState(0);
  const timers = useRef<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoStarted = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const run = useCallback(() => {
    if (phase === "applying") return;
    clearTimers();
    setPhase("applying");
    setApplied(0);
    const total = demo.actions.length;
    for (let i = 1; i <= total; i += 1) {
      timers.current.push(window.setTimeout(() => setApplied(i), i * STEP_MS));
    }
    timers.current.push(window.setTimeout(() => setPhase("done"), total * STEP_MS + 260));
  }, [phase, clearTimers]);

  const replay = useCallback(() => {
    clearTimers();
    setApplied(0);
    setPhase("review");
  }, [clearTimers]);

  useEffect(() => {
    if (reduce) {
      setPhase("done");
      setApplied(demo.actions.length);
    }
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !autoStarted.current) {
          autoStarted.current = true;
          timers.current.push(window.setTimeout(run, 1100));
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, run]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* subtle blurred CRM grid behind the mockup */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.5]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,24,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,20,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(70% 60% at 50% 45%, black, transparent 80%)",
          }}
        />
      </div>

      <div className="shell section-pad relative">
        <Reveal className="text-center">
          <p className="eyebrow mb-5 justify-center">
            <span className="eyebrow__dot" />
            {demo.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink">
            {demo.title[0]}
            <br />
            <span className="text-ink-soft">{demo.title[1]}</span>
          </h2>
          <p className="mono mt-4 text-[13px] uppercase tracking-[0.14em] text-ink-soft">
            {demo.microline}
          </p>
        </Reveal>

        {/* single large mockup */}
        <Reveal delay={0.05}>
          <div
            ref={containerRef}
            className="mx-auto mt-12 w-full max-w-[1040px] rounded-[26px] border border-line bg-surface/80 p-2.5 shadow-panel backdrop-blur-sm"
          >
            <div className="rounded-[20px] border border-line bg-milk/50 p-4 sm:p-5">
              {/* column headers (desktop) */}
              <div className="mb-2 hidden grid-cols-[1fr_1.2fr_1fr] gap-3 px-1 md:grid">
                <ColHead>{demo.factsLabel}</ColHead>
                <ColHead center>{demo.actionsLabel}</ColHead>
                <ColHead right>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-ink text-[7px] font-bold text-paper">
                      a
                    </span>
                    {demo.crmLabel}
                  </span>
                </ColHead>
              </div>

              {/* pipeline rows */}
              <div className="space-y-2">
                {demo.actions.map((a, i) => {
                  const status = rowStatus(phase, applied, i, a.duplicate);
                  const fact = factById(a.from);
                  return (
                    <PipelineRow
                      key={a.id}
                      action={a}
                      factText={fact?.text ?? ""}
                      status={status}
                      reduce={!!reduce}
                    />
                  );
                })}
              </div>

              {/* action bar with inline trust line */}
              <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                {phase !== "done" ? (
                  <button
                    type="button"
                    onClick={run}
                    disabled={phase === "applying"}
                    className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {phase === "applying" ? (
                      <>
                        <span
                          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
                          aria-hidden="true"
                        />
                        {demo.confirmingLabel}
                      </>
                    ) : (
                      demo.confirmCta
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3.5 py-2 text-[13.5px] font-semibold text-success">
                      <Check size={15} strokeWidth={2.6} />
                      {demo.doneBanner}
                    </span>
                    <button
                      type="button"
                      onClick={replay}
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
                    >
                      <RotateCcw size={14} />
                      {demo.replayCta}
                    </button>
                  </div>
                )}
                <p className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-soft">
                  <ShieldCheck size={14} className="shrink-0" />
                  {demo.trustInline}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ColHead({
  children,
  center,
  right,
}: {
  children: React.ReactNode;
  center?: boolean;
  right?: boolean;
}) {
  return (
    <p
      className={`mono text-[10.5px] uppercase tracking-wider text-ink-soft ${
        center ? "text-center" : right ? "text-right" : ""
      }`}
    >
      {children}
    </p>
  );
}

function PipelineRow({
  action,
  factText,
  status,
  reduce,
}: {
  action: (typeof demo.actions)[number];
  factText: string;
  status: RowStatus;
  reduce: boolean;
}) {
  const Icon = actionIcons[action.id] ?? StickyNote;
  const isApplied = status === "applied";
  const isSkipped = status === "skipped";
  const isWriting = status === "writing";
  const active = isWriting || isApplied || isSkipped;

  const rowBg = isWriting
    ? "rgba(198,242,78,0.12)"
    : isApplied
      ? "rgba(31,122,70,0.06)"
      : "transparent";

  const accent = isApplied ? "var(--success)" : isWriting ? "var(--lime-deep)" : "var(--ink-soft)";

  return (
    <div
      className="grid grid-cols-1 items-stretch gap-2 rounded-[14px] p-1.5 transition-colors duration-500 ease-calm md:grid-cols-[1fr_1.2fr_1fr] md:items-center md:gap-3"
      style={{ background: rowBg }}
    >
      {/* fact (source) */}
      <div className="flex items-center gap-2 rounded-[11px] border border-line bg-surface px-3 py-2.5">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500"
          style={{ background: active ? accent : "var(--ink-soft)" }}
        />
        <span className="min-w-0 text-[13px] leading-snug text-ink">
          <span className="mono mr-1.5 text-[10px] uppercase tracking-wide text-ink-soft md:hidden">
            из звонка
          </span>
          {factText}
        </span>
      </div>

      {/* action + status */}
      <div
        className="flex items-center justify-between gap-2 rounded-[11px] border px-3 py-2.5 transition-colors duration-500"
        style={{
          borderColor: isWriting
            ? "var(--lime-deep)"
            : isApplied
              ? "rgba(31,122,70,0.3)"
              : "var(--line)",
          background: isWriting ? "rgba(198,242,78,0.14)" : "var(--surface)",
        }}
      >
        <span className="flex min-w-0 items-center gap-2">
          <ChevronRight size={13} className="hidden shrink-0 text-ink-soft md:block" />
          <Icon size={15} className="shrink-0" style={{ color: accent }} />
          <span className="truncate text-[13px] font-semibold text-ink">{action.type}</span>
        </span>
        <StatusTag status={status} label={action.applied} reduce={reduce} />
      </div>

      {/* amoCRM result */}
      <div
        className="flex items-center gap-2 rounded-[11px] border px-3 py-2.5 transition-colors duration-500 md:justify-end"
        style={{
          borderColor: isApplied ? "rgba(31,122,70,0.3)" : "var(--line)",
          background: isApplied ? "rgba(31,122,70,0.07)" : isSkipped ? "rgba(26,24,20,0.03)" : "var(--surface)",
        }}
      >
        <ChevronRight size={13} className="hidden shrink-0 text-ink-soft md:block" />
        <span className="mono mr-auto text-[10px] uppercase tracking-wide text-ink-soft md:hidden">
          amoCRM
        </span>
        <span
          className="truncate text-[12px] transition-colors duration-500"
          style={{ color: isApplied ? "var(--success)" : "var(--ink-soft)" }}
        >
          {crmResult[action.id]}
        </span>
        {isApplied && <Check size={13} strokeWidth={2.6} className="shrink-0 text-success" />}
      </div>
    </div>
  );
}

function StatusTag({
  status,
  label,
  reduce,
}: {
  status: RowStatus;
  label: string;
  reduce: boolean;
}) {
  if (status === "applied") {
    return (
      <span className="mono shrink-0 text-[11px] font-semibold text-success">✓ {label}</span>
    );
  }
  if (status === "skipped") {
    return (
      <span className="mono shrink-0 text-[11px] font-medium text-ink-soft">⤼ {label}</span>
    );
  }
  if (status === "writing") {
    return (
      <span className="mono inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-ink-soft">
        <span className={`h-1.5 w-1.5 rounded-full bg-lime-deep ${reduce ? "" : "animate-pulse-dot"}`} />
        …
      </span>
    );
  }
  return <span className="mono shrink-0 text-[11px] font-medium text-ink-soft">на проверке</span>;
}
