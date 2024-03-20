import * as sentry from '@sentry/react'

sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  enabled: import.meta.env.PROD,
  integrations: [sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1,
})

export { sentry }
