module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('postcss-import'),
    require('tailwind-apply/postcss'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
