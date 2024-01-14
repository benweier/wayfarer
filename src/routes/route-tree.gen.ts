import { FileRoute, lazyFn, lazyRouteComponent } from '@tanstack/react-router'

import { Route as rootRoute } from './conf/__root'
import { Route as DashboardRouteImport } from './conf/_dashboard.route'
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

const AuthComponentImport = new FileRoute('/_auth').createRoute()
const IndexComponentImport = new FileRoute('/').createRoute()
const DashboardauthenticatedFleetShipSymboloverlayMarketComponentImport =
  new FileRoute(
    '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market',
  ).createRoute()

const AuthComponentRoute = AuthComponentImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./conf/_auth.component'),
    'component',
  ),
})

const DashboardRouteRoute = DashboardRouteImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any)
  .updateLoader({
    loader: lazyFn(() => import('./conf/_dashboard.loader'), 'loader'),
  })
  .update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard.component'),
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
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardLeaderboardRouteRoute = DashboardLeaderboardRouteImport.update({
  path: '/leaderboard',
  getParentRoute: () => DashboardRouteRoute,
} as any)
  .updateLoader({
    loader: lazyFn(
      () => import('./conf/_dashboard/leaderboard.loader'),
      'loader',
    ),
  })
  .update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard/leaderboard.component'),
      'component',
    ),
  })

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
)
  .updateLoader({
    loader: lazyFn(
      () => import('./conf/_dashboard/systems/index.loader'),
      'loader',
    ),
  })
  .update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard/systems/index.component'),
      'component',
    ),
  })

const DashboardAgentsIndexRouteRoute = DashboardAgentsIndexRouteImport.update({
  path: '/',
  getParentRoute: () => DashboardAgentsRouteRoute,
} as any)
  .updateLoader({
    loader: lazyFn(
      () => import('./conf/_dashboard/agents/index.loader'),
      'loader',
    ),
  })
  .update({
    component: lazyRouteComponent(
      () => import('./conf/_dashboard/agents/index.component'),
      'component',
    ),
  })

const DashboardAgentsAgentSymbolRouteRoute =
  DashboardAgentsAgentSymbolRouteImport.update({
    path: '/$agentSymbol',
    getParentRoute: () => DashboardAgentsRouteRoute,
  } as any)
    .updateLoader({
      loader: lazyFn(
        () => import('./conf/_dashboard/agents/$agentSymbol.loader'),
        'loader',
      ),
    })
    .update({
      component: lazyRouteComponent(
        () => import('./conf/_dashboard/agents/$agentSymbol.component'),
        'component',
      ),
    })

const DashboardauthenticatedSurveysRouteRoute =
  DashboardauthenticatedSurveysRouteImport.update({
    path: '/surveys',
    getParentRoute: () => DashboardauthenticatedRouteRoute,
  } as any)
    .updateLoader({
      loader: lazyFn(
        () => import('./conf/_dashboard/_authenticated/surveys.loader'),
        'loader',
      ),
    })
    .update({
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
  } as any)
    .updateLoader({
      loader: lazyFn(
        () => import('./conf/_dashboard/_authenticated/contracts.loader'),
        'loader',
      ),
    })
    .update({
      component: lazyRouteComponent(
        () => import('./conf/_dashboard/_authenticated/contracts.component'),
        'component',
      ),
    })

const DashboardSystemsSystemSymbolIndexRouteRoute =
  DashboardSystemsSystemSymbolIndexRouteImport.update({
    path: '/$systemSymbol/',
    getParentRoute: () => DashboardSystemsRouteRoute,
  } as any)
    .updateLoader({
      loader: lazyFn(
        () => import('./conf/_dashboard/systems/$systemSymbol/index.loader'),
        'loader',
      ),
    })
    .update({
      component: lazyRouteComponent(
        () => import('./conf/_dashboard/systems/$systemSymbol/index.component'),
        'component',
      ),
    })

const DashboardauthenticatedFleetIndexRouteRoute =
  DashboardauthenticatedFleetIndexRouteImport.update({
    path: '/',
    getParentRoute: () => DashboardauthenticatedFleetRouteRoute,
  } as any)
    .updateLoader({
      loader: lazyFn(
        () => import('./conf/_dashboard/_authenticated/fleet/index.loader'),
        'loader',
      ),
    })
    .update({
      component: lazyRouteComponent(
        () => import('./conf/_dashboard/_authenticated/fleet/index.component'),
        'component',
      ),
    })

const DashboardauthenticatedFleetShipSymbolRouteRoute =
  DashboardauthenticatedFleetShipSymbolRouteImport.update({
    path: '/$shipSymbol',
    getParentRoute: () => DashboardauthenticatedFleetRouteRoute,
  } as any)
    .updateLoader({
      loader: lazyFn(
        () =>
          import('./conf/_dashboard/_authenticated/fleet/$shipSymbol.loader'),
        'loader',
      ),
    })
    .update({
      component: lazyRouteComponent(
        () =>
          import(
            './conf/_dashboard/_authenticated/fleet/$shipSymbol.component'
          ),
        'component',
      ),
    })

const DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute =
  DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport.update({
    path: '/$systemSymbol/waypoint/$waypointSymbol',
    getParentRoute: () => DashboardSystemsRouteRoute,
  } as any)
    .updateLoader({
      loader: lazyFn(
        () =>
          import(
            './conf/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol.loader'
          ),
        'loader',
      ),
    })
    .update({
      component: lazyRouteComponent(
        () =>
          import(
            './conf/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol.component'
          ),
        'component',
      ),
    })

const DashboardauthenticatedFleetShipSymboloverlayRouteRoute =
  DashboardauthenticatedFleetShipSymboloverlayRouteImport.update({
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

const DashboardauthenticatedFleetShipSymboloverlayMarketComponentRoute =
  DashboardauthenticatedFleetShipSymboloverlayMarketComponentImport.update({
    path: '/market',
    getParentRoute: () =>
      DashboardauthenticatedFleetShipSymboloverlayRouteRoute,
  } as any)
    .updateLoader({
      loader: lazyFn(
        () =>
          import(
            './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market.loader'
          ),
        'loader',
      ),
    })
    .update({
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
    '/_dashboard': {
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthComponentImport
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
      preLoaderRoute: typeof DashboardauthenticatedFleetShipSymboloverlayMarketComponentImport
      parentRoute: typeof DashboardauthenticatedFleetShipSymboloverlayRouteImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexComponentRoute,
  DashboardRouteRoute.addChildren([
    DashboardauthenticatedRouteRoute.addChildren([
      DashboardauthenticatedContractsRouteRoute,
      DashboardauthenticatedFleetRouteRoute.addChildren([
        DashboardauthenticatedFleetShipSymbolRouteRoute.addChildren([
          DashboardauthenticatedFleetShipSymboloverlayRouteRoute.addChildren([
            DashboardauthenticatedFleetShipSymboloverlayMarketComponentRoute,
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
  AuthComponentRoute.addChildren([
    AuthLoginRouteRoute,
    AuthLogoutRouteRoute,
    AuthRegisterRouteRoute,
  ]),
])
