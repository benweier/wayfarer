module.exports = {
  twin: {
    preset: 'styled-components',
    styled: {
      import: 'default',
      from: 'styled-components',
    },
    css: {
      import: 'css',
      from: 'styled-components',
    },
  },
  styledComponents: {
    pure: true,
    ssr: true,
    displayName: process.env.NODE_ENV !== 'production',
    fileName: process.env.NODE_ENV !== 'production',
  },
}
