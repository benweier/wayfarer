import { Navigate, type RouteObject } from 'react-router-dom'
import { NotFound } from '@/components/not-found'
import { RouteError } from '@/components/route-error'
import { client } from '@/services/query-client'
import { getState } from '@/store/auth'
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

              return { element: <mod.Login /> }
            },
          },
          {
            path: '/register',
            errorElement: <RouteError />,
            async lazy() {
              const mod = await import('@/features/auth')

              return { element: <mod.Register /> }
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
        loader: auth.loader,
        children: [
          {
            async lazy() {
              const mod = await import('@/routes/dashboard')

              return {
                element: <mod.Layout />,
                loader: mod.loader(client),
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
                    loader: mod.loader(client),
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
                        loader: mod.loader(client),
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
                        loader: mod.loader(client),
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
                        loader: mod.loader(client),
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
                                loader: mod.loader(client),
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
                                loader: mod.loader(client),
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
                        loader: mod.loader(client),
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
                            loader: mod.loader(client),
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
                            loader: mod.loader(client),
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
