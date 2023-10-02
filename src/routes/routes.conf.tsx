import { Navigate, type RouteObject } from 'react-router-dom'
import { NotFound } from '@/components/not-found'
import { RouteError } from '@/components/route-error'
import { client } from '@/services/query-client'
import { getState } from '@/store/auth'
import * as Auth from './auth'
import { Core } from './core.route'
import * as Home from './home'

export const routes: RouteObject[] = [
  {
    element: <Core />,
    children: [
      {
        index: true,
        element: <Home.Route />,
      },

      {
        path: '/leaderboard',
        errorElement: <RouteError />,
        async lazy() {
          const leaderboard = await import('@/routes/leaderboard')

          return {
            element: <leaderboard.Layout />,
          }
        },
        children: [
          {
            index: true,
            errorElement: <RouteError />,
            async lazy() {
              const leaderboard = await import('@/routes/leaderboard')

              return {
                element: <leaderboard.Route />,
                loader: leaderboard.loader(client),
              }
            },
          },
          {
            path: 'agent/:agentSymbol',
            errorElement: <RouteError />,
            async lazy() {
              const agent = await import('@/routes/leaderboard/agent')

              return {
                element: <agent.Route />,
                loader: agent.loader(client),
              }
            },
          },
        ],
      },

      {
        element: <Auth.Route />,
        errorElement: <RouteError />,
        children: [
          {
            path: '/login',
            errorElement: <RouteError />,
            async lazy() {
              const auth = await import('@/features/auth')

              return { element: <auth.Login /> }
            },
          },
          {
            path: '/register',
            errorElement: <RouteError />,
            async lazy() {
              const auth = await import('@/features/auth')

              return { element: <auth.Register /> }
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
        element: <Auth.Required />,
        children: [
          {
            async lazy() {
              const dashboard = await import('@/routes/dashboard')

              return {
                element: <dashboard.Layout />,
                loader: dashboard.loader(client),
              }
            },
            children: [
              {
                path: '/overview',
                element: <Navigate to="/fleet" replace />,
              },

              {
                path: '/contracts',
                errorElement: <RouteError />,
                async lazy() {
                  const contracts = await import('@/routes/contracts')

                  return {
                    element: <contracts.Route />,
                    loader: contracts.loader(client),
                  }
                },
                children: [
                  {
                    path: ':contractId',
                    errorElement: <RouteError />,
                    async lazy() {
                      const contract = await import('@/routes/contracts/contract')

                      return {
                        element: <contract.Route />,
                        loader: contract.loader(client),
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
                      const fleet = await import('@/routes/fleet')

                      return {
                        element: <fleet.Route />,
                        loader: fleet.loader(client),
                      }
                    },
                  },

                  {
                    path: 'ship/:shipSymbol',
                    errorElement: <RouteError />,
                    async lazy() {
                      const ship = await import('@/routes/fleet/ship')

                      return {
                        element: <ship.Route />,
                        loader: ship.loader(client),
                      }
                    },
                    children: [
                      // MARKET OVERLAY
                      {
                        async lazy() {
                          const overlay = await import('@/routes/fleet/ship/overlay')

                          return {
                            element: <overlay.Route isOpen size="lg" closeable disableExternalClose />,
                          }
                        },
                        children: [
                          {
                            path: 'market',
                            errorElement: <RouteError />,
                            async lazy() {
                              const market = await import('@/routes/fleet/ship/market')

                              return {
                                element: <market.Route />,
                                loader: market.loader(client),
                              }
                            },
                          },
                        ],
                      },

                      // LOADOUT OVERLAY
                      {
                        async lazy() {
                          const overlay = await import('@/routes/fleet/ship/overlay')

                          return {
                            element: <overlay.Route isOpen size="full" closeable disableExternalClose />,
                          }
                        },
                        children: [
                          {
                            path: 'loadout',
                            errorElement: <RouteError />,
                            async lazy() {
                              const loadout = await import('@/routes/fleet/ship/loadout')

                              return {
                                element: <loadout.Route />,
                                loader: loadout.loader(client),
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
                      const systems = await import('@/routes/systems')

                      return {
                        element: <systems.Route />,
                        loader: systems.loader(client),
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
                          const system = await import('@/routes/systems/system')

                          return {
                            element: <system.Route />,
                            loader: system.loader(client),
                          }
                        },
                      },

                      {
                        path: 'waypoint/:waypointSymbol',
                        errorElement: <RouteError />,
                        async lazy() {
                          const waypoint = await import('@/routes/systems/waypoint')

                          return {
                            element: <waypoint.Route />,
                            loader: waypoint.loader(client),
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
