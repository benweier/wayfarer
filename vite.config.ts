import { sentryVitePlugin } from '@sentry/vite-plugin'
import basicSSL from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
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
          core: ['react-router-dom', '@tanstack/react-query', '@sentry/react'],
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
  plugins: [
    basicSSL(),
    tsconfigPaths(),
    react(),
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
