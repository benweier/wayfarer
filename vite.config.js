/// <reference types="vite" />
// const eslint = require('vite-plugin-eslint')
const baseSSL = require('@vitejs/plugin-basic-ssl')
const react = require('@vitejs/plugin-react-swc')
const { defineConfig } = require('vite')
const tsconfigPaths = require('vite-tsconfig-paths')

module.exports = defineConfig(() => {
  return {
    optimizeDeps: {
      disabled: false,
    },
    server: {
      port: 8080,
      https: true,
      open: true,
    },
    envPrefix: ['SPACETRADERS_'],
    test: {
      globals: true,
      environment: 'jsdom',
      clearMocks: true,
      css: true,
    },
    plugins: [baseSSL.default(), tsconfigPaths.default(), react()],
  }
})
