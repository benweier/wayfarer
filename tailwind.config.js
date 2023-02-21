/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        indefinite: 'indefinite 1.5s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        indefinite: {
          '0%': { left: 0, transform: 'translateX(-100%)' },
          '100%': { left: '100%', transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwind-apply'),
  ],
}
