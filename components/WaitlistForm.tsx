"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Check,
  MousePointer2,
  MessageCircle,
} from "lucide-react";
import { waitlist } from "@/lib/content";
import { INTEREST_EVENT } from "@/lib/interest";
import teamImg from "@/public/team-sales.jpg";

type Status = "idle" | "submitting" | "success" | "error";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [pain, setPain] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // «Хочу это первым» в секциях «Скоро» → сразу отмечает вариант здесь,
  // чтобы интерес к фиче ушёл в базу вместе с email.
  useEffect(() => {
    const onInterest = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (waitlist.pain.options.some((o) => o.value === value)) {
        setPain(value);
        window.setTimeout(
          () => document.getElementById("wl-email")?.focus({ preventScroll: true }),
          700,
        );
      }
    };
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setEmailError(waitlist.errors.email);
      document.getElementById("wl-email")?.focus();
      return;
    }
    setEmailError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          biggestPain: pain || undefined,
          source: "waitlist_site",
          locale: "ru",
        }),
      });
      if (res.status === 409) {
        setStatus("success");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.errors?.email) setEmailError(data.errors.email as string);
        setStatus("error");
        setFormError(waitlist.errors.generic);
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setFormError(waitlist.errors.generic);
    }
  };

  return (
    <section id="waitlist" className="relative isolate overflow-hidden">
      {/* full-width emotional photo background */}
      <Image
        src={teamImg}
        alt=""
        aria-hidden="true"
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "50% 40%" }}
      />
      {/* warm dark scrim for readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,10,0.78) 0%, rgba(20,16,10,0.6) 45%, rgba(20,16,10,0.82) 100%), radial-gradient(60% 50% at 80% 10%, rgba(198,242,78,0.14), transparent 60%)",
        }}
      />

      <div className="shell section-pad relative">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="eyebrow mb-5 justify-center" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="eyebrow__dot" />
            {waitlist.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(30px,4.4vw,54px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
            {waitlist.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[clamp(16px,1.4vw,19px)] text-white/75">
            {waitlist.subtitle}
          </p>
        </div>

        {status === "success" ? (
          <SuccessCard />
        ) : (
          <div className="mx-auto mt-9 max-w-[560px]">
            {/* email-only form */}
            <form onSubmit={submit} noValidate>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="min-w-0 flex-1">
                  <label htmlFor="wl-email" className="sr-only">
                    {waitlist.emailLabel}
                  </label>
                  <input
                    id="wl-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={waitlist.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "wl-email-err" : undefined}
                    className={`h-[54px] w-full rounded-full border bg-white px-5 text-[16px] text-ink placeholder:text-ink-soft/70 focus:outline-none ${
                      emailError ? "border-red-400" : "border-transparent focus:border-lime-deep"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary h-[54px] shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <span
                        className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
                        aria-hidden="true"
                      />
                      {waitlist.submitting}
                    </>
                  ) : (
                    <>
                      {waitlist.cta}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              {emailError && (
                <p
                  id="wl-email-err"
                  className="mt-2 flex items-center gap-1.5 pl-1 text-[13px] text-red-200"
                >
                  <AlertCircle size={14} className="shrink-0" />
                  {emailError}
                </p>
              )}
              {formError && (
                <div
                  role="alert"
                  className="mt-2 flex items-center justify-between gap-2 rounded-full bg-red-500/15 px-4 py-2 text-[13px] text-red-100"
                >
                  <span className="flex items-center gap-1.5">
                    <AlertCircle size={14} className="shrink-0" />
                    {formError}
                  </span>
                  <button
                    type="submit"
                    className="shrink-0 font-semibold text-white underline underline-offset-2"
                  >
                    {waitlist.errors.retry}
                  </button>
                </div>
              )}
              <p className="mono mt-3 text-center text-[12px] text-white/55">
                {waitlist.disclaimer}
              </p>
            </form>

            {/* optional, prominent pain selection */}
            <PainPicker value={pain} onChange={setPain} />
          </div>
        )}
      </div>
    </section>
  );
}

function SuccessCard() {
  return (
    <div
      role="status"
      className="mx-auto mt-9 flex max-w-[460px] flex-col items-center gap-4 rounded-[24px] border border-white/15 bg-white/95 p-8 text-center shadow-panel backdrop-blur"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success text-white">
        <CheckCircle2 size={26} />
      </span>
      <div>
        <h3 className="font-display text-[24px] font-bold text-ink">{waitlist.success.title}</h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">{waitlist.success.body}</p>
      </div>
    </div>
  );
}

function PainPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-10">
      <div className="mb-4 text-center">
        <h3 className="font-display text-[19px] font-bold text-white">{waitlist.pain.title}</h3>
        <p className="mt-1 text-[13.5px] text-white/60">{waitlist.pain.hint}</p>
      </div>
      <div
        role="radiogroup"
        aria-label={waitlist.pain.title}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {waitlist.pain.options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(selected ? "" : opt.value)}
              data-selected={selected}
              className="tile"
            >
              <div className="flex items-start justify-between gap-3">
                <TileScene kind={opt.scene} selected={selected} />
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    selected ? "border-lime-deep bg-lime" : "border-ink/25"
                  }`}
                >
                  {selected && <Check size={12} strokeWidth={3} className="text-ink" />}
                </span>
              </div>
              <div>
                <p className="text-[14px] font-semibold leading-snug text-ink">{opt.label}</p>
                {selected && (
                  <p className="mono mt-1.5 flex items-center gap-1 text-[11px] font-medium text-success">
                    <Check size={11} strokeWidth={3} />
                    {waitlist.pain.confirm}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* compact, static-by-default mini scenes; react to selection (no infinite motion) */
function TileScene({ kind, selected }: { kind: string; selected: boolean }) {
  const on = selected;
  if (kind === "tabs") {
    return (
      <div className="relative h-11 w-16" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute top-0 h-3 rounded-[4px] border transition-all duration-200"
            style={{
              left: i * 10,
              width: 34,
              top: i * 5,
              borderColor: on && i === 1 ? "var(--lime-deep)" : "var(--line)",
              background: on && i === 1 ? "rgba(198,242,78,0.35)" : "var(--milk)",
            }}
          />
        ))}
        <MousePointer2
          size={14}
          className="absolute transition-all duration-300"
          style={{ left: on ? 30 : 6, top: on ? 20 : 26, color: "var(--ink)" }}
        />
      </div>
    );
  }
  if (kind === "crm") {
    return (
      <div className="flex h-11 w-16 flex-col justify-center gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="flex h-2.5 items-center rounded-[3px] transition-colors duration-300"
            style={{
              width: 44 - i * 8,
              background: on ? "rgba(31,122,70,0.18)" : "var(--milk)",
              border: `1px solid ${on ? "rgba(31,122,70,0.4)" : "var(--line)"}`,
            }}
          >
            {on && <Check size={8} strokeWidth={4} className="ml-auto mr-0.5 text-success" />}
          </span>
        ))}
      </div>
    );
  }
  if (kind === "whatsapp") {
    return (
      <div className="flex h-11 w-16 flex-col justify-center gap-1" aria-hidden="true">
        <span className="w-9 rounded-2xl rounded-tl-sm border border-line bg-milk px-1.5 py-1">
          <MessageCircle size={9} className="text-ink-soft" />
        </span>
        <span
          className="ml-auto w-10 rounded-2xl rounded-tr-sm px-1.5 py-1 transition-all duration-300"
          style={{
            background: on ? "var(--whatsapp)" : "var(--milk)",
            border: on ? "none" : "1px solid var(--line)",
            opacity: on ? 1 : 0.5,
          }}
        >
          {on && <Check size={9} strokeWidth={4} className="text-white" />}
        </span>
      </div>
    );
  }
  // scripts
  return (
    <div className="flex h-11 w-16 flex-col justify-center gap-1.5" aria-hidden="true">
      <span
        className="h-2.5 w-11 rounded-[3px] bg-milk transition-all duration-300"
        style={{
          border: "1px solid var(--line)",
          opacity: on ? 0.4 : 1,
          textDecoration: "line-through",
        }}
      />
      <span
        className="h-2.5 rounded-[3px] transition-all duration-300"
        style={{
          width: on ? 56 : 40,
          background: on ? "rgba(198,242,78,0.4)" : "var(--milk)",
          border: `1px solid ${on ? "var(--lime-deep)" : "var(--line)"}`,
        }}
      />
    </div>
  );
}
