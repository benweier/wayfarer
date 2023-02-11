/// <reference types="vite" />
const baseSSL = require('@vitejs/plugin-basic-ssl')
const react = require('@vitejs/plugin-react-swc')
const { defineConfig } = require('vite')
const tsconfigPaths = require('vite-tsconfig-paths')

module.exports = defineConfig(({ mode }) => {
  const plugins = []

  if (mode === 'development') {
    plugins.push(baseSSL())
  }

  plugins.push(tsconfigPaths.default())
  plugins.push(react())

  return {
    optimizeDeps: {
      disabled: false,
    },
    server: {
      port: 8080,
      https: true,
      open: true,
    },
    envPrefix: ['SENTRY_', 'SPACETRADERS_'],
    test: {
      globals: true,
      environment: 'jsdom',
      clearMocks: true,
      css: true,
    },
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
    },
    plugins,
  }
})
