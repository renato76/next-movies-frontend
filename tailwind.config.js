/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'Quicksand': ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}