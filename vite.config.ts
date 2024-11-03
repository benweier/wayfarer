import path from 'node:path'
import mdx from '@mdx-js/rollup'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import basicSSL from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import compiler from 'babel-plugin-react-compiler'
import { defineConfig } from 'vite'
import dynamic from 'vite-plugin-dynamic-import'
import tsconfigPaths from 'vite-tsconfig-paths'

const isTest = process.env.NODE_ENV === 'test'

export default defineConfig({
  build: {
    sourcemap: true,
    cssCodeSplit: false,
    cssMinify: 'lightningcss',
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[hash:8].js',
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
      '@/test': path.join(__dirname, 'test'),
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [
    basicSSL(),
    tsconfigPaths(),
    dynamic(),
    { enforce: 'pre', ...mdx() },
    tailwindcss(),
    [compiler],
    react(),
    !isTest && TanStackRouterVite(),
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
