import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        bright: "#f2eded"
      },
    },
    fontFamily: {
      'serif': ['Times New Roman', 'Times', 'ui-serif', 'Georgia', 'Cambria', 'serif']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
