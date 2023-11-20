import * as Sentry from '@sentry/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { enableMapSet } from 'immer'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom'
import { routes } from '@/routes/routes.conf'
import { Fallback } from '@/routes/routes.fallback'
import { client } from '@/services/query-client'
import '@/services/i18n'
import '@/styles/tailwind.css'

enableMapSet()

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  enabled: import.meta.env.PROD,
  integrations: [
    new Sentry.BrowserProfilingIntegration(),
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  tracesSampleRate: 0.1,
})

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)
const router = sentryCreateBrowserRouter(routes)

export const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} fallbackElement={<Fallback />} future={{ v7_startTransition: true }} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    router.dispose()
  })
}
