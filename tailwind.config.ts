import type { Config } from "tailwindcss";

export default {
  content: ["./dist/index.html", "./src/**/*.{css,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "default",
      "light",
      "dark",
      "retro",
      "cyberpunk",
      "valentine",
      "aqua",
      "cupcake",
      "dracula",
      "nord",
    ],
  },
} satisfies Config;
