import { Route as rootRoute } from './conf/__root'
import { Route as DashboardRouteImport } from './conf/_dashboard.route'
import { Route as AuthRouteImport } from './conf/_auth.route'
import { Route as IndexRouteImport } from './conf/index.route'
import { Route as DashboardSystemsRouteImport } from './conf/_dashboard/systems.route'
import { Route as DashboardLeaderboardRouteImport } from './conf/_dashboard/leaderboard.route'
import { Route as DashboardAgentsRouteImport } from './conf/_dashboard/agents.route'
import { Route as DashboardauthenticatedRouteImport } from './conf/_dashboard/_authenticated.route'
import { Route as AuthRegisterRouteImport } from './conf/_auth/register.route'
import { Route as AuthLogoutRouteImport } from './conf/_auth/logout.route'
import { Route as AuthLoginRouteImport } from './conf/_auth/login.route'
import { Route as DashboardSystemsIndexRouteImport } from './conf/_dashboard/systems/index.route'
import { Route as DashboardAgentsIndexRouteImport } from './conf/_dashboard/agents/index.route'
import { Route as DashboardAgentsAgentSymbolRouteImport } from './conf/_dashboard/agents/$agentSymbol.route'
import { Route as DashboardauthenticatedSurveysRouteImport } from './conf/_dashboard/_authenticated/surveys.route'
import { Route as DashboardauthenticatedFleetRouteImport } from './conf/_dashboard/_authenticated/fleet.route'
import { Route as DashboardauthenticatedContractsRouteImport } from './conf/_dashboard/_authenticated/contracts.route'
import { Route as DashboardSystemsSystemSymbolIndexRouteImport } from './conf/_dashboard/systems/$systemSymbol/index.route'
import { Route as DashboardauthenticatedFleetIndexRouteImport } from './conf/_dashboard/_authenticated/fleet/index.route'
import { Route as DashboardauthenticatedFleetShipSymbolRouteImport } from './conf/_dashboard/_authenticated/fleet/$shipSymbol.route'
import { Route as DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport } from './conf/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol.route'
import { Route as DashboardauthenticatedFleetShipSymboloverlayRouteImport } from './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay.route'
import { Route as DashboardauthenticatedFleetShipSymboloverlayMarketRouteImport } from './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market.route'

const DashboardRouteRoute = DashboardRouteImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRouteRoute = IndexRouteImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardSystemsRouteRoute = DashboardSystemsRouteImport.update({
  path: '/systems',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardLeaderboardRouteRoute = DashboardLeaderboardRouteImport.update({
  path: '/leaderboard',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardAgentsRouteRoute = DashboardAgentsRouteImport.update({
  path: '/agents',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardauthenticatedRouteRoute =
  DashboardauthenticatedRouteImport.update({
    id: '/_authenticated',
    getParentRoute: () => DashboardRouteRoute,
  } as any)

const AuthRegisterRouteRoute = AuthRegisterRouteImport.update({
  path: '/register',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthLogoutRouteRoute = AuthLogoutRouteImport.update({
  path: '/logout',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthLoginRouteRoute = AuthLoginRouteImport.update({
  path: '/login',
  getParentRoute: () => AuthRouteRoute,
} as any)

const DashboardSystemsIndexRouteRoute = DashboardSystemsIndexRouteImport.update(
  {
    path: '/',
    getParentRoute: () => DashboardSystemsRouteRoute,
  } as any,
)

const DashboardAgentsIndexRouteRoute = DashboardAgentsIndexRouteImport.update({
  path: '/',
  getParentRoute: () => DashboardAgentsRouteRoute,
} as any)

const DashboardAgentsAgentSymbolRouteRoute =
  DashboardAgentsAgentSymbolRouteImport.update({
    path: '/$agentSymbol',
    getParentRoute: () => DashboardAgentsRouteRoute,
  } as any)

const DashboardauthenticatedSurveysRouteRoute =
  DashboardauthenticatedSurveysRouteImport.update({
    path: '/surveys',
    getParentRoute: () => DashboardauthenticatedRouteRoute,
  } as any)

const DashboardauthenticatedFleetRouteRoute =
  DashboardauthenticatedFleetRouteImport.update({
    path: '/fleet',
    getParentRoute: () => DashboardauthenticatedRouteRoute,
  } as any)

const DashboardauthenticatedContractsRouteRoute =
  DashboardauthenticatedContractsRouteImport.update({
    path: '/contracts',
    getParentRoute: () => DashboardauthenticatedRouteRoute,
  } as any)

const DashboardSystemsSystemSymbolIndexRouteRoute =
  DashboardSystemsSystemSymbolIndexRouteImport.update({
    path: '/$systemSymbol/',
    getParentRoute: () => DashboardSystemsRouteRoute,
  } as any)

const DashboardauthenticatedFleetIndexRouteRoute =
  DashboardauthenticatedFleetIndexRouteImport.update({
    path: '/',
    getParentRoute: () => DashboardauthenticatedFleetRouteRoute,
  } as any)

const DashboardauthenticatedFleetShipSymbolRouteRoute =
  DashboardauthenticatedFleetShipSymbolRouteImport.update({
    path: '/$shipSymbol',
    getParentRoute: () => DashboardauthenticatedFleetRouteRoute,
  } as any)

const DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute =
  DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport.update({
    path: '/$systemSymbol/waypoint/$waypointSymbol',
    getParentRoute: () => DashboardSystemsRouteRoute,
  } as any)

const DashboardauthenticatedFleetShipSymboloverlayRouteRoute =
  DashboardauthenticatedFleetShipSymboloverlayRouteImport.update({
    id: '/_overlay',
    getParentRoute: () => DashboardauthenticatedFleetShipSymbolRouteRoute,
  } as any)

const DashboardauthenticatedFleetShipSymboloverlayMarketRouteRoute =
  DashboardauthenticatedFleetShipSymboloverlayMarketRouteImport.update({
    path: '/market',
    getParentRoute: () =>
      DashboardauthenticatedFleetShipSymboloverlayRouteRoute,
  } as any)
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      preLoaderRoute: typeof AuthLoginRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/logout': {
      preLoaderRoute: typeof AuthLogoutRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/register': {
      preLoaderRoute: typeof AuthRegisterRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_dashboard/_authenticated': {
      preLoaderRoute: typeof DashboardauthenticatedRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/agents': {
      preLoaderRoute: typeof DashboardAgentsRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/leaderboard': {
      preLoaderRoute: typeof DashboardLeaderboardRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/systems': {
      preLoaderRoute: typeof DashboardSystemsRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/_authenticated/contracts': {
      preLoaderRoute: typeof DashboardauthenticatedContractsRouteImport
      parentRoute: typeof DashboardauthenticatedRouteImport
    }
    '/_dashboard/_authenticated/fleet': {
      preLoaderRoute: typeof DashboardauthenticatedFleetRouteImport
      parentRoute: typeof DashboardauthenticatedRouteImport
    }
    '/_dashboard/_authenticated/surveys': {
      preLoaderRoute: typeof DashboardauthenticatedSurveysRouteImport
      parentRoute: typeof DashboardauthenticatedRouteImport
    }
    '/_dashboard/agents/$agentSymbol': {
      preLoaderRoute: typeof DashboardAgentsAgentSymbolRouteImport
      parentRoute: typeof DashboardAgentsRouteImport
    }
    '/_dashboard/agents/': {
      preLoaderRoute: typeof DashboardAgentsIndexRouteImport
      parentRoute: typeof DashboardAgentsRouteImport
    }
    '/_dashboard/systems/': {
      preLoaderRoute: typeof DashboardSystemsIndexRouteImport
      parentRoute: typeof DashboardSystemsRouteImport
    }
    '/_dashboard/_authenticated/fleet/$shipSymbol': {
      preLoaderRoute: typeof DashboardauthenticatedFleetShipSymbolRouteImport
      parentRoute: typeof DashboardauthenticatedFleetRouteImport
    }
    '/_dashboard/_authenticated/fleet/': {
      preLoaderRoute: typeof DashboardauthenticatedFleetIndexRouteImport
      parentRoute: typeof DashboardauthenticatedFleetRouteImport
    }
    '/_dashboard/systems/$systemSymbol/': {
      preLoaderRoute: typeof DashboardSystemsSystemSymbolIndexRouteImport
      parentRoute: typeof DashboardSystemsRouteImport
    }
    '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay': {
      preLoaderRoute: typeof DashboardauthenticatedFleetShipSymboloverlayRouteImport
      parentRoute: typeof DashboardauthenticatedFleetShipSymbolRouteImport
    }
    '/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol': {
      preLoaderRoute: typeof DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport
      parentRoute: typeof DashboardSystemsRouteImport
    }
    '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market': {
      preLoaderRoute: typeof DashboardauthenticatedFleetShipSymboloverlayMarketRouteImport
      parentRoute: typeof DashboardauthenticatedFleetShipSymboloverlayRouteImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRouteRoute,
  AuthRouteRoute.addChildren([
    AuthLoginRouteRoute,
    AuthLogoutRouteRoute,
    AuthRegisterRouteRoute,
  ]),
  DashboardRouteRoute.addChildren([
    DashboardauthenticatedRouteRoute.addChildren([
      DashboardauthenticatedContractsRouteRoute,
      DashboardauthenticatedFleetRouteRoute.addChildren([
        DashboardauthenticatedFleetShipSymbolRouteRoute.addChildren([
          DashboardauthenticatedFleetShipSymboloverlayRouteRoute.addChildren([
            DashboardauthenticatedFleetShipSymboloverlayMarketRouteRoute,
          ]),
        ]),
        DashboardauthenticatedFleetIndexRouteRoute,
      ]),
      DashboardauthenticatedSurveysRouteRoute,
    ]),
    DashboardAgentsRouteRoute.addChildren([
      DashboardAgentsAgentSymbolRouteRoute,
      DashboardAgentsIndexRouteRoute,
    ]),
    DashboardLeaderboardRouteRoute,
    DashboardSystemsRouteRoute.addChildren([
      DashboardSystemsIndexRouteRoute,
      DashboardSystemsSystemSymbolIndexRouteRoute,
      DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute,
    ]),
  ]),
])
