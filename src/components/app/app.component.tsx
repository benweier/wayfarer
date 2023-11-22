import * as Sentry from '@sentry/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { enableMapSet } from 'immer'
import { Suspense, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
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
import { i18n } from '@/services/i18n'
import { client } from '@/services/query-client'
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
    <Suspense fallback={<></>}>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <QueryClientProvider client={client}>
            <RouterProvider router={router} fallbackElement={<Fallback />} future={{ v7_startTransition: true }} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </HelmetProvider>
      </I18nextProvider>
    </Suspense>
  )
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    router.dispose()
  })
}
