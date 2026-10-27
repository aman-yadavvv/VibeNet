import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0A0F",
        surface: "#111118",
        "surface-2": "#18181F",
        "surface-3": "#1F1F29",
        border: "rgba(255,255,255,0.08)",
        text: { primary: "#F5F5FA", secondary: "#A1A1AA", muted: "#6B6B78" },
        violet: { DEFAULT: "#A855F7", glow: "#C084FC" },
        pink: { DEFAULT: "#F472B6" },
        coral: { DEFAULT: "#FB7185" },
        mint: { DEFAULT: "#5EEAD4" },
        lime: { DEFAULT: "#BEF264" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #A855F7 0%, #F472B6 50%, #FB7185 100%)",
        "gradient-secondary": "linear-gradient(135deg, #5EEAD4 0%, #A855F7 100%)",
        "gradient-warm": "linear-gradient(135deg, #FB7185 0%, #BEF264 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(168, 85, 247, 0.35)",
        "glow-pink": "0 0 40px rgba(244, 114, 182, 0.3)",
        "glow-mint": "0 0 30px rgba(94, 234, 212, 0.25)",
        card: "0 8px 32px rgba(0, 0, 0, 0.35)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;