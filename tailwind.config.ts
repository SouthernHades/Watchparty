import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Extend with custom colors if needed
      },
      animation: {
        // Add custom animations
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
};

export default config;
