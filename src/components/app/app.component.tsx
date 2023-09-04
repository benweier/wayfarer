import * as Sentry from '@sentry/react'
import { QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense, useEffect } from 'react'
import {
  type ActionFunction,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  matchRoutes,
  useNavigation,
  useNavigationType,
} from 'react-router-dom'
import { NotFound } from '@/components/not-found'
import { RouteError } from '@/components/route-error'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/use-location.hook'
import { useThemeManager } from '@/hooks/use-theme-manager.hook'
import * as Auth from '@/routes/auth'
import * as Home from '@/routes/home'
import { client } from '@/services/query-client'
import { getState } from '@/store/auth'

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
const Loading = () => (
  <div className="flex h-screen w-screen animate-pulse items-center justify-center text-5xl font-black text-zinc-900/20 dark:text-zinc-500/40">
    <div>Wayfarer</div>
  </div>
)
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
            <button
              className="btn btn-primary w-full max-w-xs"
              onClick={() => {
                resetError()
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )}
    >
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen">
          <NavigationLoader />
          <Outlet />
        </div>
      </Suspense>
    </Sentry.ErrorBoundary>
  )
}
const logout: ActionFunction = () => {
  const { actions } = getState()

  actions.signout()

  return null
}
const NavigationLoader = () => {
  const navigation = useNavigation()

  return navigation.state !== 'idle' ? <span className="loader" /> : <></>
}
const router = sentryCreateBrowserRouter(
  createRoutesFromElements(
    <Route Component={Core}>
      <Route index Component={Home.Route} />

      <Route
        path={ROUTES.LEADERBOARD}
        lazy={async () => {
          const leaderboard = await import('@/routes/leaderboard')

          return {
            element: <leaderboard.Layout />,
          }
        }}
        ErrorBoundary={RouteError}
      >
        <Route
          index
          lazy={async () => {
            const leaderboard = await import('@/routes/leaderboard')

            return {
              element: <leaderboard.Route />,
              loader: leaderboard.loader(client),
            }
          }}
          ErrorBoundary={RouteError}
        />
        <Route
          path="agent/:agentSymbol"
          lazy={async () => {
            const agent = await import('@/routes/leaderboard/agent')

            return {
              element: <agent.Route />,
              loader: agent.loader(client),
            }
          }}
          ErrorBoundary={RouteError}
        />
      </Route>

      <Route ErrorBoundary={RouteError} Component={Auth.Route}>
        <Route
          path={ROUTES.LOGIN}
          lazy={async () => {
            const auth = await import('@/features/auth')

            return { element: <auth.Login /> }
          }}
          ErrorBoundary={RouteError}
        />
        <Route
          path={ROUTES.REGISTER}
          lazy={async () => {
            const auth = await import('@/features/auth')

            return { element: <auth.Register /> }
          }}
          ErrorBoundary={RouteError}
        />
        <Route path={ROUTES.LOGOUT} element={<Navigate to={ROUTES.LOGIN} replace />} action={logout} />
      </Route>

      <Route Component={Auth.Required}>
        <Route
          lazy={async () => {
            const dashboard = await import('@/routes/dashboard')

            return {
              element: <dashboard.Layout />,
              loader: dashboard.loader(client),
            }
          }}
          ErrorBoundary={RouteError}
        >
          <Route path={ROUTES.OVERVIEW} element={<Navigate to={ROUTES.FLEET} replace />} />

          <Route path={ROUTES.CONTRACTS}>
            <Route
              index
              lazy={async () => {
                const contracts = await import('@/routes/contracts')

                return {
                  element: <contracts.Route />,
                  loader: contracts.loader(client),
                }
              }}
              ErrorBoundary={RouteError}
            />
            <Route
              path=":contractID"
              lazy={async () => {
                const contract = await import('@/routes/contracts/contract')

                return {
                  element: <contract.Route />,
                  loader: contract.loader(client),
                }
              }}
              ErrorBoundary={RouteError}
            />
          </Route>

          <Route path={ROUTES.SYSTEMS}>
            <Route
              index
              lazy={async () => {
                const systems = await import('@/routes/systems')

                return {
                  element: <systems.Route />,
                  loader: systems.loader(client),
                }
              }}
              ErrorBoundary={RouteError}
            />
            <Route path=":systemSymbol">
              <Route
                index
                lazy={async () => {
                  const system = await import('@/routes/systems/system')

                  return {
                    element: <system.Route />,
                    loader: system.loader(client),
                  }
                }}
                ErrorBoundary={RouteError}
              />
              <Route
                path="waypoint/:waypointSymbol"
                lazy={async () => {
                  const waypoint = await import('@/routes/systems/waypoint')

                  return {
                    element: <waypoint.Route />,
                    loader: waypoint.loader(client),
                  }
                }}
                ErrorBoundary={RouteError}
              />
            </Route>
          </Route>

          <Route path={ROUTES.FLEET}>
            <Route
              index
              lazy={async () => {
                const fleet = await import('@/routes/fleet')

                return {
                  element: <fleet.Route />,
                  loader: fleet.loader(client),
                }
              }}
              ErrorBoundary={RouteError}
            />
            <Route
              path="ship/:shipSymbol"
              lazy={async () => {
                const ship = await import('@/routes/fleet/ship')

                return {
                  element: <ship.Route />,
                  loader: ship.loader(client),
                }
              }}
              ErrorBoundary={RouteError}
            >
              <Route
                lazy={async () => {
                  const overlay = await import('@/routes/fleet/ship/overlay')

                  return {
                    element: <overlay.Route isOpen size="lg" closeable disableExternalClose />,
                  }
                }}
              >
                <Route
                  path="market"
                  lazy={async () => {
                    const market = await import('@/routes/fleet/ship/market')

                    return {
                      element: <market.Route />,
                      loader: market.loader(client),
                    }
                  }}
                  ErrorBoundary={RouteError}
                />
              </Route>
              <Route
                lazy={async () => {
                  const overlay = await import('@/routes/fleet/ship/overlay')

                  return {
                    element: <overlay.Route isOpen size="full" closeable disableExternalClose />,
                  }
                }}
              >
                <Route
                  path="loadout"
                  lazy={async () => {
                    const loadout = await import('@/routes/fleet/ship/loadout')

                    return {
                      element: <loadout.Route />,
                      loader: loadout.loader(client),
                    }
                  }}
                  ErrorBoundary={RouteError}
                />
              </Route>
            </Route>
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
