import Link from "next/link";
import { footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[16px] font-extrabold tracking-tight text-ink">
            {footer.brand}
          </p>
          <p className="mt-1 max-w-[42ch] text-[13px] text-ink-soft">
            {footer.tagline}
          </p>
        </div>
        <nav
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-ink-soft"
          aria-label="Правовая информация"
        >
          {footer.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors duration-150 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <span className="mono text-[12.5px] text-ink-soft/80">
            {footer.copyright}
          </span>
        </nav>
      </div>
    </footer>
  );
}
