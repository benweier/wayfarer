import * as Sentry from '@sentry/react'
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
import { NotFound } from '@/components/not-found'
import { RouteError } from '@/components/route-error'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/use-location.hook'
import { useThemeManager } from '@/hooks/use-theme-manager.hook'
import * as Auth from '@/routes/Auth'
import * as Dashboard from '@/routes/Dashboard'
import { client } from '@/services/query-client'
import { getState } from '@/services/store/auth'
import { lazy } from '@/utilities/lazy'

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  enabled: import.meta.env.PROD,
  integrations: [
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
  tracesSampleRate: 1,
})

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)

const Loading = () => (
  <div className="flex h-screen w-screen animate-pulse items-center justify-center text-5xl font-black text-zinc-900/20 dark:text-zinc-500/40">
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
    <Route Component={Core}>
      <Route index Component={Home} />

      <Route ErrorBoundary={RouteError} Component={Auth.Route}>
        <Route
          path={ROUTES.LOGIN}
          lazy={async () => {
            const { Login } = await import('@/features/auth')

            return { Component: Login }
          }}
        />
        <Route
          path={ROUTES.REGISTER}
          lazy={async () => {
            const { Register } = await import('@/features/auth')

            return { Component: Register }
          }}
        />
        <Route path={ROUTES.LOGOUT} element={<Navigate to={ROUTES.LOGIN} replace />} action={logout} />
      </Route>

      <Route Component={Auth.Required}>
        <Route Component={Dashboard.Layout} ErrorBoundary={RouteError} loader={Dashboard.root.loader(client)}>
          <Route path={ROUTES.OVERVIEW} Component={Dashboard.Overview} />

          <Route path={ROUTES.MARKET}>
            <Route index Component={Dashboard.Market} />

            <Route
              path=":systemID/:waypointID"
              Component={Dashboard.Market}
              ErrorBoundary={RouteError}
              loader={Dashboard.market.loader(client)}
            />
          </Route>

          <Route path={ROUTES.CONTRACTS}>
            <Route
              index
              Component={Dashboard.Contracts.List}
              ErrorBoundary={RouteError}
              loader={Dashboard.contracts.list(client)}
            />
          </Route>

          <Route path={ROUTES.SYSTEMS}>
            <Route
              index
              Component={Dashboard.Systems.List}
              ErrorBoundary={RouteError}
              loader={Dashboard.systems.list(client)}
            />
            <Route path=":systemID">
              <Route
                index
                Component={Dashboard.Systems.View}
                ErrorBoundary={RouteError}
                loader={Dashboard.systems.view(client)}
              />
              <Route
                path="waypoint/:waypointID"
                Component={Dashboard.Systems.Waypoint}
                ErrorBoundary={RouteError}
                loader={Dashboard.systems.waypoint(client)}
              />
            </Route>
          </Route>

          <Route path={ROUTES.FLEET}>
            <Route
              index
              Component={Dashboard.Fleet.List}
              ErrorBoundary={RouteError}
              loader={Dashboard.fleet.loader(client)}
            />
            <Route
              path="ship/:shipID"
              Component={Dashboard.Fleet.Ship}
              ErrorBoundary={RouteError}
              loader={Dashboard.ship.loader(client)}
            />
          </Route>
        </Route>
      </Route>

      <Route path="*" Component={NotFound} />
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
