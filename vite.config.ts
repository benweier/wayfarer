import path from 'node:path'
import mdx from '@mdx-js/rollup'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import basicSSL from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
// eslint-disable-next-line node/no-missing-import
import { vite as million } from 'million/compiler'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import dynamic from 'vite-plugin-dynamic-import'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    sourcemap: true,
    cssMinify: 'lightningcss',
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          core: ['@tanstack/react-router', '@tanstack/react-query', '@sentry/react'],
        },
      },
    },
  },
  server: {
    port: 8080,
    open: true,
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
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [
    checker({
      typescript: true,
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
      terminal: false,
      enableBuild: false,
    }),
    basicSSL(),
    tsconfigPaths(),
    dynamic(),
    { enforce: 'pre', ...mdx() },
    million({ auto: true }),
    react(),
    TanStackRouterVite(),
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORG_NAME,
      project: process.env.SENTRY_PROJECT_NAME,
      silent: true,
    }),
    // VitePWA({
    //   registerType: 'prompt',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    //   manifest: {
    //     name: 'Wayfarer',
    //     short_name: 'Wayfarer',
    //     description: 'A SpaceTraders API interface',
    //     theme_color: '#18181b',
    //     icons: [
    //       {
    //         src: 'android-chrome-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'android-chrome-256x256.png',
    //         sizes: '256x256',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    // }),
  ],
})
