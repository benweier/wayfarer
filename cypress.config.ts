import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:8080',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
})
