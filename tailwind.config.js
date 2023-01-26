/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        indefinite: 'indefinite 2s linear infinite',
      },
      keyframes: {
        indefinite: {
          '0%': { left: 0, transform: 'translateX(-100%)' },
          '100%': { left: '100%', transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('tailwind-apply')],
}
