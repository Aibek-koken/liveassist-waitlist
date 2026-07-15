"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { header } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ease-calm ${
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="inline-flex items-center gap-2 font-display text-[18px] font-extrabold tracking-tight text-ink"
        >
          <Image
            src="/icons/icon-512x512.png"
            width={32}
            height={32}
            sizes="32px"
            alt=""
            priority
            className="h-8 w-8 shrink-0"
          />
          <span>
            {header.brand}
            <span className="text-lime-deep">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 sm:flex" aria-label="Основная навигация">
          {header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#waitlist" className="btn-primary !min-h-[42px] !px-5 !text-[14px]">
          {header.cta}
        </a>
      </div>
    </header>
  );
}
