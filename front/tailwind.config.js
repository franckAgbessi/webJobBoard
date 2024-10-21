/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'green-light': '#e5fff5',
        'green-dark': '#4cd681',
        'grey': '#f2f4f5',
        'black-2': '#858585',
        'black-hover': 'rgba(0,0,0,0.30)',
        'black-hover2': 'rgba(0,0,0,0.08)',
        'black-black': '#20262e',
        'border-black': 'rgba(32,38,46,0.3)',
        'red-el': 'rgb(208,96,96)',
      },
      boxShadow: {
        'shad': '4px 4px 0 0 #000',
      },
      screens: {
        'tablet': '640px',

        'laptop': '1024px',

        'desktop': '1280px',
      },
    },
  },
  plugins: [],
}