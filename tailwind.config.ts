import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:                "#07060b",
        surface:           "#0d0a16",
        card:              "#12101c",
        "card-hover":      "#1c1730",
        border:            "rgba(200, 255, 46, 0.08)",
        "border-hover":    "rgba(200, 255, 46, 0.15)",
        accent:            "#c8ff2e",
        "accent-2":        "#2ec8ff",
        "accent-3":        "#ff2ec8",
        "accent-glow":     "rgba(200, 255, 46, 0.10)",
        "text-1":          "#f0eef5",
        "text-2":          "#9490a8",
        "text-3":          "#4a4568",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "sans-serif"],
        body:    ["var(--font-ibm-plex)", "system-ui", "sans-serif"],
        mono:    ["var(--font-ibm-plex-mono)", "monospace"],
      },
      maxWidth: {
        content: "1300px",
      },
      boxShadow: {
        card:         "0 2px 10px rgba(200, 255, 46, 0.03), 0 1px 4px rgba(7, 6, 11, 0.45)",
        "card-hover": "0 12px 44px rgba(200, 255, 46, 0.07), 0 4px 14px rgba(7, 6, 11, 0.55)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s var(--ease-out-expo) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
