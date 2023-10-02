import * as Sentry from '@sentry/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { enableMapSet } from 'immer'
import { useEffect } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useNavigationType,
} from 'react-router-dom'
import { useLocation } from '@/hooks/use-location.hook'
import { routes } from '@/routes/routes.conf'
import { Loading } from '@/routes/routes.fallback'
import { client } from '@/services/query-client'

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
    <QueryClientProvider client={client}>
      <RouterProvider router={router} fallbackElement={<Loading />} future={{ v7_startTransition: true }} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    router.dispose()
  })
}
