const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "var(--gray1)",
        fg: "var(--gray12)",
        "fg-muted": "var(--gray11)",
        selection: "var(--grayA4)",
        border: "var(--gray6)",
        gray1: "var(--gray1)",
        gray2: "var(--gray2)",
        gray3: "var(--gray3)",
        gray4: "var(--gray4)",
        gray5: "var(--gray5)",
        gray6: "var(--gray6)",
        gray7: "var(--gray7)",
        gray8: "var(--gray8)",
        gray9: "var(--gray9)",
        gray10: "var(--gray10)",
        gray11: "var(--gray11)",
        gray12: "var(--gray12)",
      },
    },
  },
  plugins: [],
};
