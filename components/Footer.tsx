import Link from "next/link";
import { footer } from "@/lib/content";

const linkClass =
  "inline-flex min-h-10 items-center rounded-sm transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="shell py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-[16px] font-extrabold tracking-tight text-ink">
              {footer.brand}
            </p>
            <p className="mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-ink-soft">
              {footer.tagline}
            </p>

            <p className="mono mt-6 text-[12px] uppercase tracking-[0.14em] text-ink-soft">
              {footer.socialLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-ink-soft">
              {footer.socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mono text-[12px] uppercase tracking-[0.14em] text-ink-soft">
              {footer.contactLabel}
            </p>
            <ul className="mt-2 text-[13.5px] text-ink-soft">
              {footer.contacts.map((contact) => (
                <li key={contact.href}>
                  <a href={contact.href} className={linkClass}>
                    {contact.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono text-[12px] uppercase tracking-[0.14em] text-ink-soft">
              {footer.legalLabel}
            </p>
            <nav
              className="mt-2 flex flex-col items-start text-[13.5px] text-ink-soft"
              aria-label={footer.legalLabel}
            >
              {footer.links.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-[12.5px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span className="mono">
            {footer.copyright}
          </span>
          <span>{footer.builtBy}</span>
        </div>
      </div>
    </footer>
  );
}
