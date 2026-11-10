import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
        warn: token("warn"),
        danger: token("danger"),
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        body: ['"Atkinson Hyperlegible"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: { prose: "68ch" },
    },
  },
  plugins: [],
};

export default config;
