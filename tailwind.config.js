/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        'background-card': 'rgb(var(--background-card) / <alpha-value>)',
        'background-mode': 'rgb(var(--background-dark-mode) / <alpha-value>)',
        'gradient-from': 'rgb(var(--gradient-from) / <alpha-value>)',
        'gradient-to': 'rgb(var(--gradient-to) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
