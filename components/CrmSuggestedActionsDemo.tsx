"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  StickyNote,
  ListChecks,
  CalendarClock,
  MessageSquareWarning,
} from "lucide-react";
import { demo } from "@/lib/content";
import Reveal from "./Reveal";

const STEP_MS = 780;

type Phase = "review" | "applying" | "done";
type RowStatus = "pending" | "writing" | "applied" | "skipped";

const rowIcons: Record<string, typeof StickyNote> = {
  note: StickyNote,
  task: ListChecks,
  call: CalendarClock,
  obj: MessageSquareWarning,
};

function rowStatus(phase: Phase, applied: number, i: number, dup: boolean): RowStatus {
  if (phase === "review") return "pending";
  if (phase === "done") return dup ? "skipped" : "applied";
  if (i < applied) return dup ? "skipped" : "applied";
  if (i === applied) return "writing";
  return "pending";
}

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
    const total = demo.rows.length;
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
      setApplied(demo.rows.length);
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
        </Reveal>

        <Reveal delay={0.05}>
          <div
            ref={containerRef}
            className="mx-auto mt-12 w-full max-w-[920px] rounded-[26px] border border-line bg-surface/80 p-2.5 shadow-panel backdrop-blur-sm"
          >
            <div className="rounded-[20px] border border-line bg-milk/50 p-4 sm:p-6">
              {/* карточка сделки — чтобы было видно, куда именно пишем */}
              <div className="flex items-center gap-2.5 border-b border-line pb-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-ink text-[9px] font-bold text-paper">
                  amo
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{demo.lead}</p>
                  <p className="mono text-[11px] text-ink-soft">{demo.leadStage}</p>
                </div>
              </div>

              {/* заголовки колонок — на мобильном схлопываются в одну строку */}
              <p className="mono mt-5 mb-3 flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-ink-soft md:hidden">
                {demo.fromLabel}
                <ArrowRight size={11} className="shrink-0" />
                {demo.crmLabel}
              </p>
              <div className="mt-5 mb-2.5 hidden grid-cols-[1fr_auto_1fr] items-center gap-4 px-1 md:grid">
                <p className="mono text-[10.5px] uppercase tracking-wider text-ink-soft">
                  {demo.fromLabel}
                </p>
                <span className="w-4" />
                <p className="mono text-[10.5px] uppercase tracking-wider text-ink-soft">
                  {demo.crmLabel}
                </p>
              </div>

              <div className="space-y-5 md:space-y-2.5">
                {demo.rows.map((row, i) => (
                  <PipelineRow
                    key={row.id}
                    row={row}
                    status={rowStatus(phase, applied, i, row.duplicate)}
                    reduce={!!reduce}
                  />
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
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

function PipelineRow({
  row,
  status,
  reduce,
}: {
  row: (typeof demo.rows)[number];
  status: RowStatus;
  reduce: boolean;
}) {
  const Icon = rowIcons[row.id] ?? StickyNote;
  const isApplied = status === "applied";
  const isSkipped = status === "skipped";
  const isWriting = status === "writing";

  return (
    <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-[1fr_auto_1fr] md:gap-4">
      {/* что услышал ассистент */}
      <div className="flex items-center gap-2.5 rounded-[12px] border border-line bg-surface px-3.5 py-3">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500"
          style={{ background: isWriting ? "var(--lime-deep)" : "var(--ink-soft)" }}
        />
        <span className="min-w-0 text-[13.5px] leading-snug text-ink">{row.fact}</span>
      </div>

      {/* стрелка причина → следствие */}
      <span
        aria-hidden="true"
        className="flex justify-center transition-colors duration-500"
        style={{ color: isApplied ? "var(--success)" : isWriting ? "var(--lime-deep)" : "var(--ink-soft)" }}
      >
        <ArrowRight size={16} className="rotate-90 opacity-50 md:rotate-0 md:opacity-100" />
      </span>

      {/* что уйдёт в amoCRM */}
      <div
        className="flex items-center justify-between gap-2 rounded-[12px] border px-3.5 py-3 transition-colors duration-500"
        style={{
          borderColor: isWriting
            ? "var(--lime-deep)"
            : isApplied
              ? "rgba(31,122,70,0.3)"
              : "var(--line)",
          background: isWriting
            ? "rgba(198,242,78,0.14)"
            : isApplied
              ? "rgba(31,122,70,0.07)"
              : isSkipped
                ? "rgba(26,24,20,0.03)"
                : "var(--surface)",
        }}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Icon
            size={15}
            className="shrink-0 transition-colors duration-500"
            style={{ color: isApplied ? "var(--success)" : isWriting ? "var(--lime-deep)" : "var(--ink-soft)" }}
          />
          <span className="min-w-0 text-[13.5px] font-medium leading-snug text-ink">{row.crm}</span>
        </span>
        <StatusTag status={status} label={row.applied} reduce={reduce} />
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
      <span className="mono inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-success">
        <Check size={12} strokeWidth={3} />
        {label}
      </span>
    );
  }
  if (status === "skipped") {
    return <span className="mono shrink-0 text-[11px] font-medium text-ink-soft">⤼ {label}</span>;
  }
  if (status === "writing") {
    return (
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep ${reduce ? "" : "animate-pulse-dot"}`}
        aria-hidden="true"
      />
    );
  }
  return null;
}
