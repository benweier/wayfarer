import { Router, lazyRouteComponent } from '@tanstack/react-router'
import { client } from '@/services/query-client'
import { authStore } from '@/store/auth'
import { agentsIndexRoute, agentsRoute } from './agents'
import { agentRoute } from './agents/agent'
import { authRequiredRoute, authRoute, loginRoute, logoutRoute, registerRoute } from './auth'
import { contractsIndexRoute, contractsRoute } from './contracts'
import { dashboardRoute } from './dashboard'
import { fleetIndexRoute, fleetRoute } from './fleet'
import { shipIndexRoute, shipMarketRoute, shipOverlayRoute, shipRoute } from './fleet/ship'
import { leaderboardRoute } from './leaderboard'
import { notFoundRoute } from './not-found.route'
import { rootIndexRoute, rootRoute } from './root.route'
import { Fallback } from './routes.fallback'
import { surveysIndexRoute, surveysRoute } from './surveys'
import { systemsIndexRoute, systemsRoute } from './systems'
import { systemIndexRoute, systemRoute } from './systems/system'
import { waypointIndexRoute, waypointRoute } from './systems/waypoint'

export const router = new Router({
  routeTree: rootRoute.addChildren([
    rootIndexRoute,
    authRoute.addChildren([loginRoute, registerRoute, logoutRoute]),
    dashboardRoute.addChildren([
      authRequiredRoute.addChildren([
        fleetRoute.addChildren([
          fleetIndexRoute,
          shipRoute.addChildren([shipIndexRoute.addChildren([shipOverlayRoute.addChildren([shipMarketRoute])])]),
        ]),
        contractsRoute.addChildren([contractsIndexRoute]),
        surveysRoute.addChildren([surveysIndexRoute]),
      ]),
      systemsRoute.addChildren([
        systemsIndexRoute,
        systemRoute.addChildren([systemIndexRoute, waypointRoute.addChildren([waypointIndexRoute])]),
      ]),
      leaderboardRoute,
      agentsRoute.addChildren([agentsIndexRoute, agentRoute]),
    ]),
  ]),
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
