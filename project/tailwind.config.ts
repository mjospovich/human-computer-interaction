import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: "var(--brand)",
        'brand-light': "var(--brand-light)",
        'main-text-black': "var(--main-text-black)",
        'secondary-text-black': "var(--secondary-text-black)",
        'discreet-text-black': "var(--discreet-text-black)",
        'container-white': "var(--container-white)",
      },
      fontSize: {
        xs: '0.65rem',
      },
      screens: {
        'sm-grid': '444px',
        'md-grid': '778px',
        'lg-grid': '1106px',
      },
    },
  },
  plugins: [],
};

export default config;