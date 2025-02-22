/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}/'],
  theme: {
    extend: {
      colors: {
        'timer-work': '#1a365d',
        'timer-break': '#2f855a',
      },
    },
  },
  plugins: [],
};
