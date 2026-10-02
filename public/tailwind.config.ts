import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090c",
        foreground: "#f3f4f6",
        primary: {
          cyan: "#00f2fe",
          amber: "#ff7b00",
        },
        surface: {
          DEFAULT: "#0f121a",
          secondary: "#151924",
          elevated: "#1b2130",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(0, 242, 254, 0.25)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "San Francisco", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SF Mono", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 35px -5px rgba(0, 242, 254, 0.25)",
        "glow-amber": "0 0 35px -5px rgba(255, 123, 0, 0.25)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
