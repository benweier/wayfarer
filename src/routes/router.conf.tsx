import { Router, lazyRouteComponent } from '@tanstack/react-router'
import { client } from '@/services/query-client'
import { authStore } from '@/store/auth'
import { agentRoute } from './agent.route'
import { agentsIndexRoute, agentsRoute } from './agents.routes'
import { authRequiredRoute, authRoute, loginRoute, logoutRoute, registerRoute } from './auth.route'
import { contractsIndexRoute, contractsRoute } from './contracts.route'
import { dashboardRoute } from './dashboard.route'
import { fleetIndexRoute, fleetRoute } from './fleet.route'
import { leaderboardRoute } from './leaderboard.route'
import { notFoundRoute } from './not-found.route'
import { rootIndexRoute, rootRoute } from './root.route'
import { Fallback } from './routes.fallback'
import { shipIndexRoute, shipMarketRoute, shipOverlayRoute, shipRoute } from './ship.route'
import { surveysIndexRoute, surveysRoute } from './surveys.route'
import { systemIndexRoute, systemRoute } from './system.route'
import { systemsIndexRoute, systemsRoute } from './systems.route'
import { waypointIndexRoute, waypointRoute } from './waypoint.route'

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
