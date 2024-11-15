/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--text-yellow) / <alpha-value>)',
        secondary: 'rgb(var(--text-white) / <alpha-value>)',
        black: 'rgb(var(--background-black) / <alpha-value>)',
        grey: 'rgb(var(--background-grey) / <alpha-value>)',
        transitionStart: 'rgb(var(--image-transition-start) / <alpha-value>)',
        transitionEnd: 'rgb(var(--image-transition-end) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
