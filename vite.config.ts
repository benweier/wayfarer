import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import baseSSL from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { warmup } from 'vite-plugin-warmup'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const plugins = []

  if (mode === 'development') {
    plugins.push(baseSSL())
    plugins.push(warmup({ clientFiles: ['./index.html'] }))
  }

  plugins.push(tsconfigPaths())
  plugins.push(vanillaExtractPlugin())
  plugins.push(react())

  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            core: ['react', 'react-dom', 'react-router', 'react-router-dom', '@tanstack/react-query'],
          },
        },
      },
    },
    server: {
      port: 8080,
      https: true,
      open: true,
    },
    envPrefix: ['SENTRY_', 'SPACETRADERS_'],
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './test/vitest.setup.ts',
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
