import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import baseSSL from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const plugins = []

  if (mode === 'development') {
    plugins.push(baseSSL())
  }

  plugins.push(tsconfigPaths())
  plugins.push(vanillaExtractPlugin())
  plugins.push(react())

  return {
    server: {
      port: 8080,
      https: true,
      open: true,
    },
    envPrefix: ['SENTRY_', 'SPACETRADERS_'],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/vitest.setup.ts',
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
