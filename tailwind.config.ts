// tailwind.config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Tailwind CSS v4 config.
//
// v4 BREAKING CHANGES vs v3:
//   • No `content` array needed — v4 scans automatically via Vite plugin
//   • No `theme.extend` object — extend via @theme in CSS instead
//   • `plugins` array still works but most v3 plugins need updating
//   • darkMode: 'class' → still supported
//
// If you are on v3, this file still works — the `theme.extend` block is
// backwards-compatible. Just add `content: ['./index.html','./src/**/*.{ts,tsx}']`
// back at the top level.
// ─────────────────────────────────────────────────────────────────────────────

import type { Config } from "tailwindcss";

const config: Config = {
  // v3 only — v4 scans via Vite plugin automatically:
  // content: ['./index.html', './src/**/*.{ts,tsx}'],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A86B",
          hover: "#009260",
          active: "#007A50",
          light: "#F0FAF5",
          lighter: "#EBF7F2",
        },
        brand: {
          green: "#00A86B",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        sidebar: "2px 0 8px 0 rgba(0,0,0,0.06)",
      },
    },
  },

  // Prevent Tailwind from purging AntD classes used at runtime

  plugins: [],
};

export default config;
