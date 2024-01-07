import * as sentry from '@sentry/react'

sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  enabled: import.meta.env.PROD,
  integrations: [new sentry.BrowserProfilingIntegration(), new sentry.BrowserTracing()],
  tracesSampleRate: 0.1,
})

export { sentry }
