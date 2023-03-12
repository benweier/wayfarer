import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense, useEffect } from 'react'
import {
  ActionFunction,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  matchRoutes,
  useNavigationType,
} from 'react-router-dom'
import { NotFound } from '@/components/NotFound'
import { RouteErrorElement } from '@/components/RouteErrorElement'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { useThemeManager } from '@/hooks/useThemeManager'
import * as Auth from '@/routes/Auth'
import * as Dashboard from '@/routes/Dashboard'
import { client } from '@/services/query-client'
import { getState } from '@/services/store/auth'
import { lazy } from '@/utilities/lazy'

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  enabled: import.meta.env.PROD,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  tracesSampleRate: 1,
})

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)

const Loading = () => (
  <div className="flex h-screen w-screen animate-pulse items-center justify-center text-5xl font-black text-zinc-900/5 dark:text-zinc-500/10">
    <div>Wayfarer</div>
  </div>
)

const { Home } = lazy(() => import('@/routes/Home'), ['Home'])

const Core = () => {
  const { reset } = useQueryErrorResetBoundary()

  useThemeManager()

  return (
    <Sentry.ErrorBoundary
      onReset={reset}
      fallback={({ resetError, error }) => (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center gap-4 p-3">
            <div className="font-mono text-xl font-bold tracking-tighter text-rose-500">{error.message}</div>
            <button className="btn btn-primary w-full max-w-xs" onClick={() => resetError()}>
              Try again
            </button>
          </div>
        </div>
      )}
    >
      <Suspense fallback={<Loading />}>
        <div className="flex min-h-screen flex-col">
          <Outlet />
        </div>
      </Suspense>
    </Sentry.ErrorBoundary>
  )
}

const logout: ActionFunction = () => {
  const { signout } = getState()

  signout()

  return null
}

const router = sentryCreateBrowserRouter(
  createRoutesFromElements(
    <Route element={<Core />}>
      <Route index element={<Home />} />

      <Route element={<Auth.Layout />}>
        <Route path={ROUTES.LOGIN} element={<Auth.Login />} />
        <Route path={ROUTES.REGISTER} element={<Auth.Register />} />
        <Route path={ROUTES.LOGOUT} element={<Navigate to={ROUTES.LOGIN} replace />} action={logout} />
      </Route>

      <Route element={<Auth.Required />}>
        <Route
          element={<Dashboard.Layout />}
          errorElement={<RouteErrorElement />}
          loader={Dashboard.root.loader(client)}
        >
          <Route path={ROUTES.OVERVIEW} element={<Dashboard.Overview />} />

          <Route path={ROUTES.MARKET}>
            <Route index element={<Dashboard.Market />} />

            <Route
              path=":systemID/:waypointID"
              element={<Dashboard.Market />}
              errorElement={<RouteErrorElement />}
              loader={Dashboard.market.loader(client)}
            />
          </Route>

          <Route path={ROUTES.CONTRACTS}>
            <Route
              index
              element={<Dashboard.Contracts.List />}
              errorElement={<RouteErrorElement />}
              loader={Dashboard.contracts.list(client)}
            />
          </Route>

          <Route path={ROUTES.SYSTEMS}>
            <Route
              index
              element={<Dashboard.Systems.List />}
              errorElement={<RouteErrorElement />}
              loader={Dashboard.systems.list(client)}
            />
            <Route path=":systemID">
              <Route
                index
                element={<Dashboard.Systems.View />}
                errorElement={<RouteErrorElement />}
                loader={Dashboard.systems.view(client)}
              />
              <Route
                path="waypoint/:waypointID"
                element={<Dashboard.Systems.Waypoint />}
                errorElement={<RouteErrorElement />}
                loader={Dashboard.systems.waypoint(client)}
              />
            </Route>
          </Route>

          <Route path={ROUTES.FLEET}>
            <Route
              index
              element={<Dashboard.Fleet.List />}
              errorElement={<RouteErrorElement />}
              loader={Dashboard.fleet.loader(client)}
            />
            <Route
              path="ship/:shipID"
              element={<Dashboard.Fleet.Ship />}
              errorElement={<RouteErrorElement />}
              loader={Dashboard.ship.loader(client)}
            />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} fallbackElement={<Loading />} />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  )
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}
