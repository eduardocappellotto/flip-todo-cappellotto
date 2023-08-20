/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-flip': '#53b8f4',
        'secondary-flip': '#97ff00'
      }
    },
  },
  plugins: [],
}

