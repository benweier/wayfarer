import { sentryVitePlugin } from '@sentry/vite-plugin'
import basicSSL from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { type PluginOption, defineConfig } from 'vite'
import { warmup } from 'vite-plugin-warmup'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = []

  if (mode === 'development') {
    plugins.push(basicSSL())
    plugins.push(warmup({ clientFiles: ['./index.html'] }))
  }

  plugins.push(tsconfigPaths())
  plugins.push(react())

  if (mode === 'production') {
    plugins.push(
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG_NAME,
        project: process.env.SENTRY_PROJECT_NAME,
      }),
    )
  }

  return {
    build: {
      sourcemap: true,
      cssMinify: 'lightningcss',
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            core: ['react-router-dom', '@tanstack/react-query', '@sentry/react'],
          },
        },
      },
    },
    server: {
      port: 8080,
      https: true,
    },
    envPrefix: ['SENTRY_', 'SPACETRADERS_', 'REACT_'],
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
