/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-inter)'],
      },
      colors: {
        fox: '#dd8342', 
        foxdark: '#b36734',
        foxbg: '#fff2d8',
        foxdarkbg: '#e6d6b3',
      },
    },
  },
  plugins: [],
};
