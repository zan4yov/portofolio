import type { Config } from "tailwindcss"

/**
 * Every colour resolves to an HSL triplet declared in src/index.css, so the
 * same class works in both themes and alpha can be composed (`bg-primary/10`).
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", xl: "3rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        hairline: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--hairline-strong))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          raised: "hsl(var(--surface-raised))",
          sunk: "hsl(var(--surface-sunk))",
        },
        ink: {
          DEFAULT: "hsl(var(--foreground))",
          dim: "hsl(var(--ink-dim))",
          faint: "hsl(var(--ink-faint))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        /* Fluid display sizes; the scale steps by ~1.25 at each breakpoint. */
        display: ["clamp(2.75rem, 7vw, 5.25rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        title: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        heading: ["clamp(1.375rem, 2.2vw, 1.875rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        subheading: ["1.0625rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        lead: ["1.0625rem", { lineHeight: "1.65" }],
        meta: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
      },
      maxWidth: { measure: "62ch" },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        /* The hero's single orchestrated entrance. */
        "stratum-in": {
          from: { opacity: "0", transform: "translate3d(0, 14px, 0)" },
          to: { opacity: "1", transform: "none" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "stratum-in": "stratum-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-soft": "pulse-soft 2.6s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
