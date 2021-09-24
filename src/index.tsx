import { StrictMode } from 'react'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { render } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { App } from './components/App'
import { AppStyles } from './components/AppStyles'
import { queryClient } from './utilities/query-client'

Sentry.init({
  dsn: 'https://628afa9a45cd4952adf380cb9224ce2f@o121131.ingest.sentry.io/5977586',
  integrations: [new Integrations.BrowserTracing()],
  enabled: process.env.NODE_ENV !== 'production',
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.2,
})

render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppStyles />
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root'),
)
