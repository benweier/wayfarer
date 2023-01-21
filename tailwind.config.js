/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('tailwind-apply')],
}
