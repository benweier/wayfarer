import { Router, lazyRouteComponent } from '@tanstack/react-router'
import { client } from '@/services/query-client'
import { authStore } from '@/store/auth'
import { agentsIndexRoute, agentsRoute } from './agents'
import { agentRoute } from './agents/agent'
import { authRequiredRoute, authRoute, loginRoute, logoutRoute, registerRoute } from './auth'
import { contractsIndexRoute, contractsRoute } from './contracts'
import { contractRoute } from './contracts/contract'
import { dashboardRoute } from './dashboard'
import { fleetIndexRoute, fleetRoute } from './fleet'
import { shipIndexRoute, shipRoute } from './fleet/ship'
import { shipMarketRoute, shipOverlayRoute } from './fleet/ship/market'
import { leaderboardRoute } from './leaderboard'
import { notFoundRoute } from './not-found.route'
import { homeRoute, rootRoute } from './root.route'
import { Fallback } from './router.fallback'
import { surveysRoute } from './surveys'
import { systemsIndexRoute, systemsRoute } from './systems'
import { systemIndexRoute, systemRoute } from './systems/system'
import { waypointIndexRoute, waypointRoute } from './systems/waypoint'

const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute.addChildren([loginRoute, registerRoute, logoutRoute]),
  dashboardRoute.addChildren([
    authRequiredRoute.addChildren([
      fleetRoute.addChildren([
        fleetIndexRoute,
        shipRoute.addChildren([shipIndexRoute, shipOverlayRoute.addChildren([shipMarketRoute])]),
      ]),
      contractsRoute.addChildren([contractsIndexRoute, contractRoute]),
      surveysRoute,
    ]),
    systemsRoute.addChildren([
      systemsIndexRoute,
      systemRoute.addChildren([systemIndexRoute, waypointRoute.addChildren([waypointIndexRoute])]),
    ]),
    leaderboardRoute,
    agentsRoute.addChildren([agentsIndexRoute, agentRoute]),
  ]),
])

export const router = new Router({
  routeTree,
  context: {
    client,
    auth: authStore,
  },
  defaultErrorComponent: lazyRouteComponent(() => import('@/components/route-error'), 'RouteError'),
  defaultPendingComponent: Fallback,
  defaultPendingMinMs: 300,
  defaultPendingMs: 800,
  defaultPreloadStaleTime: 0,
  notFoundRoute,
})

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}
