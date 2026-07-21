"use client";

import { useReducedMotion } from "framer-motion";
import { demoSection } from "@/lib/content";
import DownloadButtons from "@/components/DownloadButtons";

export default function Demo() {
  const reduce = useReducedMotion();

  return (
    <section id="demo" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(198,242,78,0.14), transparent 60%), radial-gradient(40% 40% at 8% 90%, rgba(214,160,60,0.07), transparent 70%)",
        }}
      />
      <div className="shell relative section-pad">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow mb-4 justify-center">
            <span className="eyebrow__dot" />
            {demoSection.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(30px,4.4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink">
            {demoSection.title[0]}
            <br />
            <span className="text-ink-soft">{demoSection.title[1]}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-ink-soft">
            {demoSection.subtitle}
          </p>
        </div>

        {/* Полноэкранная демка */}
        <div className="relative mx-auto mt-12 w-full max-w-[1280px]">
          <div className="overflow-hidden rounded-[24px] border border-line bg-graphite shadow-panel">
            <video
              className="block aspect-[16/10] w-full object-cover"
              src="/demo.mp4"
              poster="/demo-poster.jpg"
              autoPlay={!reduce}
              muted
              loop
              playsInline
              controls={!!reduce}
              preload="metadata"
              aria-label={demoSection.videoLabel}
            />
          </div>
        </div>

        {/* Смысл сходится: показали продукт → скачать */}
        <div className="mt-12 flex justify-center">
          <DownloadButtons align="center" anchorId={null} />
        </div>
      </div>
    </section>
  );
}
