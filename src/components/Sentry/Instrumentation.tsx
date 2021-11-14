import { FC, useEffect } from 'react'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import useRoutingInstrumentation from 'react-router-v6-instrumentation'

export const SentryInstrumentation: FC = ({ children }) => {
  const routingInstrumentation = useRoutingInstrumentation()

  useEffect(() => {
    Sentry.init({
      dsn: 'https://628afa9a45cd4952adf380cb9224ce2f@o121131.ingest.sentry.io/5977586',
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation,
        }),
      ],
      enabled: process.env.NODE_ENV === 'production',
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.2,
    })
  }, [routingInstrumentation])

  return <>{children}</>
}
