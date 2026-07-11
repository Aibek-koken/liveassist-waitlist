import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F4EE",
        milk: "#FBFAF6",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#1A1B17",
          soft: "#6B675E",
        },
        line: "rgba(26,24,20,0.10)",
        lime: {
          DEFAULT: "#C6F24E",
          deep: "#9BD11E",
        },
        success: {
          DEFAULT: "#1F7A46",
          soft: "rgba(31,122,70,0.10)",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "JetBrains Mono",
          "Menlo",
          "monospace",
        ],
      },
      maxWidth: {
        content: "1180px",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        soft: "0 24px 60px -40px rgba(26,24,20,0.28)",
        panel: "0 40px 90px -50px rgba(26,24,20,0.34)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
