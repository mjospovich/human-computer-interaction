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
        'md-grid': '600px',
        'lg-grid': '900px',
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out'
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
    },
  },
  plugins: [],
};

export default config;