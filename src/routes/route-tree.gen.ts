import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

import { Route as rootRoute } from './conf/__root'
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
import { Route as DashboardauthenticatedFleetShipSymboloverlayMarketRouteImport } from './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market.route'

const DashboardComponentImport = new FileRoute('/_dashboard').createRoute()
const AuthComponentImport = new FileRoute('/_auth').createRoute()
const IndexComponentImport = new FileRoute('/').createRoute()
const DashboardauthenticatedFleetShipSymboloverlayComponentImport =
  new FileRoute(
    '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay',
  ).createRoute()

const DashboardComponentRoute = DashboardComponentImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./conf/_dashboard.component'),
    'component',
  ),
})

const AuthComponentRoute = AuthComponentImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./conf/_auth.component'),
    'component',
  ),
})

const IndexComponentRoute = IndexComponentImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./conf/index.component'),
    'component',
  ),
})

const DashboardSystemsRouteRoute = DashboardSystemsRouteImport.update({
  path: '/systems',
  getParentRoute: () => DashboardComponentRoute,
} as any)

const DashboardLeaderboardRouteRoute = DashboardLeaderboardRouteImport.update({
  path: '/leaderboard',
  getParentRoute: () => DashboardComponentRoute,
} as any)

const DashboardAgentsRouteRoute = DashboardAgentsRouteImport.update({
  path: '/agents',
  getParentRoute: () => DashboardComponentRoute,
} as any)

const DashboardauthenticatedRouteRoute =
  DashboardauthenticatedRouteImport.update({
    id: '/_authenticated',
    getParentRoute: () => DashboardComponentRoute,
  } as any)

const AuthRegisterRouteRoute = AuthRegisterRouteImport.update({
  path: '/register',
  getParentRoute: () => AuthComponentRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./conf/_auth/register.component'),
    'component',
  ),
})

const AuthLogoutRouteRoute = AuthLogoutRouteImport.update({
  path: '/logout',
  getParentRoute: () => AuthComponentRoute,
} as any)

const AuthLoginRouteRoute = AuthLoginRouteImport.update({
  path: '/login',
  getParentRoute: () => AuthComponentRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./conf/_auth/login.component'),
    'component',
  ),
})

const DashboardSystemsIndexRouteRoute = DashboardSystemsIndexRouteImport.update(
  {
    path: '/',
    getParentRoute: () => DashboardSystemsRouteRoute,
  } as any,
).update({
  component: lazyRouteComponent(
    () => import('./conf/_dashboard/systems/index.component'),
    'component',
  ),
})

const DashboardAgentsIndexRouteRoute = DashboardAgentsIndexRouteImport.update({
  path: '/',
  getParentRoute: () => DashboardAgentsRouteRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./conf/_dashboard/agents/index.component'),
    'component',
  ),
})

const DashboardAgentsAgentSymbolRouteRoute =
  DashboardAgentsAgentSymbolRouteImport.update({
    path: '/$agentSymbol',
    getParentRoute: () => DashboardAgentsRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard/agents/$agentSymbol.component'),
      'component',
    ),
  })

const DashboardauthenticatedSurveysRouteRoute =
  DashboardauthenticatedSurveysRouteImport.update({
    path: '/surveys',
    getParentRoute: () => DashboardauthenticatedRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard/_authenticated/surveys.component'),
      'component',
    ),
  })

const DashboardauthenticatedFleetRouteRoute =
  DashboardauthenticatedFleetRouteImport.update({
    path: '/fleet',
    getParentRoute: () => DashboardauthenticatedRouteRoute,
  } as any)

const DashboardauthenticatedContractsRouteRoute =
  DashboardauthenticatedContractsRouteImport.update({
    path: '/contracts',
    getParentRoute: () => DashboardauthenticatedRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard/_authenticated/contracts.component'),
      'component',
    ),
  })

const DashboardSystemsSystemSymbolIndexRouteRoute =
  DashboardSystemsSystemSymbolIndexRouteImport.update({
    path: '/$systemSymbol/',
    getParentRoute: () => DashboardSystemsRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard/systems/$systemSymbol/index.component'),
      'component',
    ),
  })

const DashboardauthenticatedFleetIndexRouteRoute =
  DashboardauthenticatedFleetIndexRouteImport.update({
    path: '/',
    getParentRoute: () => DashboardauthenticatedFleetRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard/_authenticated/fleet/index.component'),
      'component',
    ),
  })

const DashboardauthenticatedFleetShipSymbolRouteRoute =
  DashboardauthenticatedFleetShipSymbolRouteImport.update({
    path: '/$shipSymbol',
    getParentRoute: () => DashboardauthenticatedFleetRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () =>
        import('./conf/_dashboard/_authenticated/fleet/$shipSymbol.component'),
      'component',
    ),
  })

const DashboardauthenticatedFleetShipSymboloverlayComponentRoute =
  DashboardauthenticatedFleetShipSymboloverlayComponentImport.update({
    id: '/_overlay',
    getParentRoute: () => DashboardauthenticatedFleetShipSymbolRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () =>
        import(
          './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay.component'
        ),
      'component',
    ),
  })

const DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute =
  DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport.update({
    path: '/$systemSymbol/waypoint/$waypointSymbol',
    getParentRoute: () => DashboardSystemsRouteRoute,
  } as any).update({
    component: lazyRouteComponent(
      () =>
        import(
          './conf/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol.component'
        ),
      'component',
    ),
  })

const DashboardauthenticatedFleetShipSymboloverlayMarketRouteRoute =
  DashboardauthenticatedFleetShipSymboloverlayMarketRouteImport.update({
    path: '/market',
    getParentRoute: () =>
      DashboardauthenticatedFleetShipSymboloverlayComponentRoute,
  } as any).update({
    component: lazyRouteComponent(
      () =>
        import(
          './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market.component'
        ),
      'component',
    ),
  })
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexComponentImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthComponentImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      preLoaderRoute: typeof DashboardComponentImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      preLoaderRoute: typeof AuthLoginRouteImport
      parentRoute: typeof AuthComponentImport
    }
    '/_auth/logout': {
      preLoaderRoute: typeof AuthLogoutRouteImport
      parentRoute: typeof AuthComponentImport
    }
    '/_auth/register': {
      preLoaderRoute: typeof AuthRegisterRouteImport
      parentRoute: typeof AuthComponentImport
    }
    '/_dashboard/_authenticated': {
      preLoaderRoute: typeof DashboardauthenticatedRouteImport
      parentRoute: typeof DashboardComponentImport
    }
    '/_dashboard/agents': {
      preLoaderRoute: typeof DashboardAgentsRouteImport
      parentRoute: typeof DashboardComponentImport
    }
    '/_dashboard/leaderboard': {
      preLoaderRoute: typeof DashboardLeaderboardRouteImport
      parentRoute: typeof DashboardComponentImport
    }
    '/_dashboard/systems': {
      preLoaderRoute: typeof DashboardSystemsRouteImport
      parentRoute: typeof DashboardComponentImport
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
    '/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol': {
      preLoaderRoute: typeof DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport
      parentRoute: typeof DashboardSystemsRouteImport
    }
    '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay': {
      preLoaderRoute: typeof DashboardauthenticatedFleetShipSymboloverlayComponentImport
      parentRoute: typeof DashboardauthenticatedFleetShipSymbolRouteImport
    }
    '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market': {
      preLoaderRoute: typeof DashboardauthenticatedFleetShipSymboloverlayMarketRouteImport
      parentRoute: typeof DashboardauthenticatedFleetShipSymboloverlayComponentImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexComponentRoute,
  AuthComponentRoute.addChildren([
    AuthLoginRouteRoute,
    AuthLogoutRouteRoute,
    AuthRegisterRouteRoute,
  ]),
  DashboardComponentRoute.addChildren([
    DashboardauthenticatedRouteRoute.addChildren([
      DashboardauthenticatedContractsRouteRoute,
      DashboardauthenticatedFleetRouteRoute.addChildren([
        DashboardauthenticatedFleetShipSymbolRouteRoute.addChildren([
          DashboardauthenticatedFleetShipSymboloverlayComponentRoute.addChildren(
            [DashboardauthenticatedFleetShipSymboloverlayMarketRouteRoute],
          ),
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
