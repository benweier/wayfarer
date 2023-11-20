import { Navigate, type RouteObject } from 'react-router-dom'
import { NotFound } from '@/components/not-found'
import { RouteError } from '@/components/route-error'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { client } from '@/services/query-client'
import { getState } from '@/store/auth'
import {
  type AgentResponse,
  type ShipResponse,
  type SystemsResponse,
  type WaypointResponse,
} from '@/types/spacetraders'
import { withAuth } from '@/utilities/with-auth.loader'
import * as auth from './auth'
import { Core } from './core.route'
import * as home from './home'

export const routes: RouteObject[] = [
  {
    element: <Core />,
    children: [
      {
        index: true,
        element: <home.Route />,
      },

      {
        path: '/leaderboard',
        errorElement: <RouteError />,
        async lazy() {
          const mod = await import('@/routes/leaderboard')

          return {
            element: <mod.Layout />,
          }
        },
        children: [
          {
            index: true,
            errorElement: <RouteError />,
            async lazy() {
              const mod = await import('@/routes/leaderboard')

              return {
                element: <mod.Route />,
                loader: mod.loader(client),
                handle: {
                  meta: () => (
                    <>
                      <title>Leaderboard</title>
                    </>
                  ),
                },
              }
            },
          },
          {
            path: 'agent/:agentSymbol',
            errorElement: <RouteError />,
            async lazy() {
              const mod = await import('@/routes/leaderboard/agent')

              return {
                element: <mod.Route />,
                loader: mod.loader(client),
                handle: {
                  meta: ({ agent }: Partial<{ agent: SpaceTradersResponse<AgentResponse> }>) => (
                    <>{agent && <title>{`Agent: ${agent.data.symbol}`}</title>}</>
                  ),
                },
              }
            },
          },
        ],
      },

      {
        element: <auth.Route />,
        errorElement: <RouteError />,
        children: [
          {
            path: '/login',
            errorElement: <RouteError />,
            async lazy() {
              const mod = await import('@/features/auth')

              return {
                element: <mod.Login />,
                handle: {
                  meta: () => (
                    <>
                      <title>Log in</title>
                    </>
                  ),
                },
              }
            },
          },
          {
            path: '/register',
            errorElement: <RouteError />,
            async lazy() {
              const mod = await import('@/features/auth')

              return {
                element: <mod.Register />,
                handle: {
                  meta: () => (
                    <>
                      <title>Register</title>
                    </>
                  ),
                },
              }
            },
          },
          {
            path: '/logout',
            element: <Navigate to="/login" replace />,
            action() {
              const { actions } = getState()

              actions.signout()

              return null
            },
          },
        ],
      },

      {
        element: <auth.Required />,
        loader: withAuth(() => null),
        children: [
          {
            async lazy() {
              const mod = await import('@/routes/dashboard')

              return {
                element: <mod.Layout />,
                loader: withAuth(mod.loader(client)),
              }
            },
            children: [
              {
                path: '/overview',
                errorElement: <RouteError />,
                element: <Navigate to="/fleet" replace />,
              },

              {
                path: '/contracts',
                errorElement: <RouteError />,
                async lazy() {
                  const mod = await import('@/routes/contracts')

                  return {
                    element: <mod.Route />,
                    loader: withAuth(mod.loader(client)),
                  }
                },
                children: [
                  {
                    path: ':contractId',
                    errorElement: <RouteError />,
                    async lazy() {
                      const mod = await import('@/routes/contracts/contract')

                      return {
                        element: <mod.Route />,
                        loader: withAuth(mod.loader(client)),
                      }
                    },
                  },
                ],
              },

              {
                path: '/fleet',
                children: [
                  {
                    index: true,
                    errorElement: <RouteError />,
                    async lazy() {
                      const mod = await import('@/routes/fleet')

                      return {
                        element: <mod.Route />,
                        loader: withAuth(mod.loader(client)),
                        handle: {
                          meta: () => (
                            <>
                              <title>Fleet</title>
                            </>
                          ),
                        },
                      }
                    },
                  },

                  {
                    path: 'ship/:shipSymbol',
                    errorElement: <RouteError />,
                    async lazy() {
                      const mod = await import('@/routes/fleet/ship')

                      return {
                        element: <mod.Route />,
                        loader: withAuth(mod.loader(client)),
                        handle: {
                          meta: ({ ship }: Partial<{ ship: SpaceTradersResponse<ShipResponse> }>) => (
                            <>{ship && <title>{`Ship: ${ship.data.symbol}`}</title>}</>
                          ),
                        },
                      }
                    },

                    children: [
                      // MARKET OVERLAY
                      {
                        async lazy() {
                          const mod = await import('@/routes/fleet/ship/overlay')

                          return {
                            element: <mod.Route isOpen size="lg" closeable disableExternalClose />,
                          }
                        },
                        children: [
                          {
                            path: 'market',
                            errorElement: <RouteError />,
                            async lazy() {
                              const mod = await import('@/routes/fleet/ship/market')

                              return {
                                element: <mod.Route />,
                                loader: withAuth(mod.loader(client)),
                              }
                            },
                          },
                        ],
                      },

                      // LOADOUT OVERLAY
                      {
                        async lazy() {
                          const mod = await import('@/routes/fleet/ship/overlay')

                          return {
                            element: <mod.Route isOpen size="full" closeable disableExternalClose />,
                          }
                        },
                        children: [
                          {
                            path: 'loadout',
                            errorElement: <RouteError />,
                            async lazy() {
                              const mod = await import('@/routes/fleet/ship/loadout')

                              return {
                                element: <mod.Route />,
                                loader: withAuth(mod.loader(client)),
                              }
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              {
                path: '/systems',
                children: [
                  {
                    index: true,
                    errorElement: <RouteError />,
                    async lazy() {
                      const mod = await import('@/routes/systems')

                      return {
                        element: <mod.Route />,
                        loader: withAuth(mod.loader(client)),
                        handle: {
                          meta: () => (
                            <>
                              <title>Systems</title>
                            </>
                          ),
                        },
                      }
                    },
                  },

                  {
                    path: ':systemSymbol',
                    children: [
                      {
                        index: true,
                        errorElement: <RouteError />,
                        async lazy() {
                          const mod = await import('@/routes/systems/system')

                          return {
                            element: <mod.Route />,
                            loader: withAuth(mod.loader(client)),
                            handle: {
                              meta: ({ system }: Partial<{ system: SpaceTradersResponse<SystemsResponse> }>) => (
                                <>{system && <title>{`System: ${system.data.symbol}`}</title>}</>
                              ),
                            },
                          }
                        },
                      },

                      {
                        path: 'waypoint/:waypointSymbol',
                        errorElement: <RouteError />,
                        async lazy() {
                          const mod = await import('@/routes/systems/waypoint')

                          return {
                            element: <mod.Route />,
                            loader: withAuth(mod.loader(client)),
                            handle: {
                              meta: ({ waypoint }: Partial<{ waypoint: SpaceTradersResponse<WaypointResponse> }>) => (
                                <>{waypoint && <title>{`Waypoint: ${waypoint.data.symbol}`}</title>}</>
                              ),
                            },
                          }
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]
