/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './conf/__root'
import { Route as DashboardRouteImport } from './conf/_dashboard.route'
import { Route as AuthRouteImport } from './conf/_auth.route'
import { Route as IndexRouteImport } from './conf/index.route'
import { Route as DashboardLeaderboardRouteImport } from './conf/_dashboard/leaderboard.route'
import { Route as DashboardAuthenticatedRouteImport } from './conf/_dashboard/_authenticated.route'
import { Route as AuthRegisterRouteImport } from './conf/_auth/register.route'
import { Route as AuthLogoutRouteImport } from './conf/_auth/logout.route'
import { Route as AuthLoginRouteImport } from './conf/_auth/login.route'
import { Route as DashboardSystemsIndexRouteImport } from './conf/_dashboard/systems/index.route'
import { Route as DashboardAgentsIndexRouteImport } from './conf/_dashboard/agents/index.route'
import { Route as DashboardAgentsAgentSymbolRouteImport } from './conf/_dashboard/agents/$agentSymbol.route'
import { Route as DashboardAuthenticatedSurveysRouteImport } from './conf/_dashboard/_authenticated/surveys.route'
import { Route as DashboardAuthenticatedFleetRouteImport } from './conf/_dashboard/_authenticated/fleet.route'
import { Route as DashboardAuthenticatedContractsRouteImport } from './conf/_dashboard/_authenticated/contracts.route'
import { Route as DashboardSystemsSystemSymbolIndexRouteImport } from './conf/_dashboard/systems/$systemSymbol/index.route'
import { Route as DashboardAuthenticatedFleetIndexRouteImport } from './conf/_dashboard/_authenticated/fleet/index.route'
import { Route as DashboardAuthenticatedFleetShipSymbolRouteImport } from './conf/_dashboard/_authenticated/fleet/$shipSymbol.route'
import { Route as DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport } from './conf/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol.route'
import { Route as DashboardAuthenticatedFleetShipSymbolOverlayRouteImport } from './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay.route'
import { Route as DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteImport } from './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay.market.route'

// Create/Update Routes

const DashboardRouteRoute = DashboardRouteImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./conf/_dashboard.lazy').then((d) => d.Route))

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRouteRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardLeaderboardRouteRoute = DashboardLeaderboardRouteImport.update({
  id: '/leaderboard',
  path: '/leaderboard',
  getParentRoute: () => DashboardRouteRoute,
} as any).lazy(() =>
  import('./conf/_dashboard/leaderboard.lazy').then((d) => d.Route),
)

const DashboardAuthenticatedRouteRoute =
  DashboardAuthenticatedRouteImport.update({
    id: '/_authenticated',
    getParentRoute: () => DashboardRouteRoute,
  } as any)

const AuthRegisterRouteRoute = AuthRegisterRouteImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() => import('./conf/_auth/register.lazy').then((d) => d.Route))

const AuthLogoutRouteRoute = AuthLogoutRouteImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthLoginRouteRoute = AuthLoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() => import('./conf/_auth/login.lazy').then((d) => d.Route))

const DashboardSystemsIndexRouteRoute = DashboardSystemsIndexRouteImport.update(
  {
    id: '/systems/',
    path: '/systems/',
    getParentRoute: () => DashboardRouteRoute,
  } as any,
).lazy(() =>
  import('./conf/_dashboard/systems/index.lazy').then((d) => d.Route),
)

const DashboardAgentsIndexRouteRoute = DashboardAgentsIndexRouteImport.update({
  id: '/agents/',
  path: '/agents/',
  getParentRoute: () => DashboardRouteRoute,
} as any).lazy(() =>
  import('./conf/_dashboard/agents/index.lazy').then((d) => d.Route),
)

const DashboardAgentsAgentSymbolRouteRoute =
  DashboardAgentsAgentSymbolRouteImport.update({
    id: '/agents/$agentSymbol',
    path: '/agents/$agentSymbol',
    getParentRoute: () => DashboardRouteRoute,
  } as any).lazy(() =>
    import('./conf/_dashboard/agents/$agentSymbol.lazy').then((d) => d.Route),
  )

const DashboardAuthenticatedSurveysRouteRoute =
  DashboardAuthenticatedSurveysRouteImport.update({
    id: '/surveys',
    path: '/surveys',
    getParentRoute: () => DashboardAuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./conf/_dashboard/_authenticated/surveys.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardAuthenticatedFleetRouteRoute =
  DashboardAuthenticatedFleetRouteImport.update({
    id: '/fleet',
    path: '/fleet',
    getParentRoute: () => DashboardAuthenticatedRouteRoute,
  } as any)

const DashboardAuthenticatedContractsRouteRoute =
  DashboardAuthenticatedContractsRouteImport.update({
    id: '/contracts',
    path: '/contracts',
    getParentRoute: () => DashboardAuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./conf/_dashboard/_authenticated/contracts.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardSystemsSystemSymbolIndexRouteRoute =
  DashboardSystemsSystemSymbolIndexRouteImport.update({
    id: '/systems/$systemSymbol/',
    path: '/systems/$systemSymbol/',
    getParentRoute: () => DashboardRouteRoute,
  } as any).lazy(() =>
    import('./conf/_dashboard/systems/$systemSymbol/index.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardAuthenticatedFleetIndexRouteRoute =
  DashboardAuthenticatedFleetIndexRouteImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => DashboardAuthenticatedFleetRouteRoute,
  } as any).lazy(() =>
    import('./conf/_dashboard/_authenticated/fleet/index.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardAuthenticatedFleetShipSymbolRouteRoute =
  DashboardAuthenticatedFleetShipSymbolRouteImport.update({
    id: '/$shipSymbol',
    path: '/$shipSymbol',
    getParentRoute: () => DashboardAuthenticatedFleetRouteRoute,
  } as any).lazy(() =>
    import('./conf/_dashboard/_authenticated/fleet/$shipSymbol.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute =
  DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport.update({
    id: '/systems/$systemSymbol/waypoint/$waypointSymbol',
    path: '/systems/$systemSymbol/waypoint/$waypointSymbol',
    getParentRoute: () => DashboardRouteRoute,
  } as any).lazy(() =>
    import(
      './conf/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol.lazy'
    ).then((d) => d.Route),
  )

const DashboardAuthenticatedFleetShipSymbolOverlayRouteRoute =
  DashboardAuthenticatedFleetShipSymbolOverlayRouteImport.update({
    id: '/_overlay',
    getParentRoute: () => DashboardAuthenticatedFleetShipSymbolRouteRoute,
  } as any).lazy(() =>
    import(
      './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay.lazy'
    ).then((d) => d.Route),
  )

const DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteRoute =
  DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteImport.update({
    id: '/market',
    path: '/market',
    getParentRoute: () =>
      DashboardAuthenticatedFleetShipSymbolOverlayRouteRoute,
  } as any).lazy(() =>
    import(
      './conf/_dashboard/_authenticated/fleet/$shipSymbol/_overlay.market.lazy'
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      id: '/_dashboard'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/logout': {
      id: '/_auth/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof AuthLogoutRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_dashboard/_authenticated': {
      id: '/_dashboard/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DashboardAuthenticatedRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/leaderboard': {
      id: '/_dashboard/leaderboard'
      path: '/leaderboard'
      fullPath: '/leaderboard'
      preLoaderRoute: typeof DashboardLeaderboardRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/_authenticated/contracts': {
      id: '/_dashboard/_authenticated/contracts'
      path: '/contracts'
      fullPath: '/contracts'
      preLoaderRoute: typeof DashboardAuthenticatedContractsRouteImport
      parentRoute: typeof DashboardAuthenticatedRouteImport
    }
    '/_dashboard/_authenticated/fleet': {
      id: '/_dashboard/_authenticated/fleet'
      path: '/fleet'
      fullPath: '/fleet'
      preLoaderRoute: typeof DashboardAuthenticatedFleetRouteImport
      parentRoute: typeof DashboardAuthenticatedRouteImport
    }
    '/_dashboard/_authenticated/surveys': {
      id: '/_dashboard/_authenticated/surveys'
      path: '/surveys'
      fullPath: '/surveys'
      preLoaderRoute: typeof DashboardAuthenticatedSurveysRouteImport
      parentRoute: typeof DashboardAuthenticatedRouteImport
    }
    '/_dashboard/agents/$agentSymbol': {
      id: '/_dashboard/agents/$agentSymbol'
      path: '/agents/$agentSymbol'
      fullPath: '/agents/$agentSymbol'
      preLoaderRoute: typeof DashboardAgentsAgentSymbolRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/agents/': {
      id: '/_dashboard/agents/'
      path: '/agents'
      fullPath: '/agents'
      preLoaderRoute: typeof DashboardAgentsIndexRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/systems/': {
      id: '/_dashboard/systems/'
      path: '/systems'
      fullPath: '/systems'
      preLoaderRoute: typeof DashboardSystemsIndexRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/_authenticated/fleet/$shipSymbol': {
      id: '/_dashboard/_authenticated/fleet/$shipSymbol'
      path: '/$shipSymbol'
      fullPath: '/fleet/$shipSymbol'
      preLoaderRoute: typeof DashboardAuthenticatedFleetShipSymbolRouteImport
      parentRoute: typeof DashboardAuthenticatedFleetRouteImport
    }
    '/_dashboard/_authenticated/fleet/': {
      id: '/_dashboard/_authenticated/fleet/'
      path: '/'
      fullPath: '/fleet/'
      preLoaderRoute: typeof DashboardAuthenticatedFleetIndexRouteImport
      parentRoute: typeof DashboardAuthenticatedFleetRouteImport
    }
    '/_dashboard/systems/$systemSymbol/': {
      id: '/_dashboard/systems/$systemSymbol/'
      path: '/systems/$systemSymbol'
      fullPath: '/systems/$systemSymbol'
      preLoaderRoute: typeof DashboardSystemsSystemSymbolIndexRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay': {
      id: '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay'
      path: ''
      fullPath: '/fleet/$shipSymbol'
      preLoaderRoute: typeof DashboardAuthenticatedFleetShipSymbolOverlayRouteImport
      parentRoute: typeof DashboardAuthenticatedFleetShipSymbolRouteImport
    }
    '/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol': {
      id: '/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol'
      path: '/systems/$systemSymbol/waypoint/$waypointSymbol'
      fullPath: '/systems/$systemSymbol/waypoint/$waypointSymbol'
      preLoaderRoute: typeof DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteImport
      parentRoute: typeof DashboardRouteImport
    }
    '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market': {
      id: '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market'
      path: '/market'
      fullPath: '/fleet/$shipSymbol/market'
      preLoaderRoute: typeof DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteImport
      parentRoute: typeof DashboardAuthenticatedFleetShipSymbolOverlayRouteImport
    }
  }
}

// Create and export the route tree

interface AuthRouteRouteChildren {
  AuthLoginRouteRoute: typeof AuthLoginRouteRoute
  AuthLogoutRouteRoute: typeof AuthLogoutRouteRoute
  AuthRegisterRouteRoute: typeof AuthRegisterRouteRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthLoginRouteRoute: AuthLoginRouteRoute,
  AuthLogoutRouteRoute: AuthLogoutRouteRoute,
  AuthRegisterRouteRoute: AuthRegisterRouteRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

interface DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteChildren {
  DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteRoute: typeof DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteRoute
}

const DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteChildren: DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteChildren =
  {
    DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteRoute:
      DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteRoute,
  }

const DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteWithChildren =
  DashboardAuthenticatedFleetShipSymbolOverlayRouteRoute._addFileChildren(
    DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteChildren,
  )

interface DashboardAuthenticatedFleetShipSymbolRouteRouteChildren {
  DashboardAuthenticatedFleetShipSymbolOverlayRouteRoute: typeof DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteWithChildren
}

const DashboardAuthenticatedFleetShipSymbolRouteRouteChildren: DashboardAuthenticatedFleetShipSymbolRouteRouteChildren =
  {
    DashboardAuthenticatedFleetShipSymbolOverlayRouteRoute:
      DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteWithChildren,
  }

const DashboardAuthenticatedFleetShipSymbolRouteRouteWithChildren =
  DashboardAuthenticatedFleetShipSymbolRouteRoute._addFileChildren(
    DashboardAuthenticatedFleetShipSymbolRouteRouteChildren,
  )

interface DashboardAuthenticatedFleetRouteRouteChildren {
  DashboardAuthenticatedFleetShipSymbolRouteRoute: typeof DashboardAuthenticatedFleetShipSymbolRouteRouteWithChildren
  DashboardAuthenticatedFleetIndexRouteRoute: typeof DashboardAuthenticatedFleetIndexRouteRoute
}

const DashboardAuthenticatedFleetRouteRouteChildren: DashboardAuthenticatedFleetRouteRouteChildren =
  {
    DashboardAuthenticatedFleetShipSymbolRouteRoute:
      DashboardAuthenticatedFleetShipSymbolRouteRouteWithChildren,
    DashboardAuthenticatedFleetIndexRouteRoute:
      DashboardAuthenticatedFleetIndexRouteRoute,
  }

const DashboardAuthenticatedFleetRouteRouteWithChildren =
  DashboardAuthenticatedFleetRouteRoute._addFileChildren(
    DashboardAuthenticatedFleetRouteRouteChildren,
  )

interface DashboardAuthenticatedRouteRouteChildren {
  DashboardAuthenticatedContractsRouteRoute: typeof DashboardAuthenticatedContractsRouteRoute
  DashboardAuthenticatedFleetRouteRoute: typeof DashboardAuthenticatedFleetRouteRouteWithChildren
  DashboardAuthenticatedSurveysRouteRoute: typeof DashboardAuthenticatedSurveysRouteRoute
}

const DashboardAuthenticatedRouteRouteChildren: DashboardAuthenticatedRouteRouteChildren =
  {
    DashboardAuthenticatedContractsRouteRoute:
      DashboardAuthenticatedContractsRouteRoute,
    DashboardAuthenticatedFleetRouteRoute:
      DashboardAuthenticatedFleetRouteRouteWithChildren,
    DashboardAuthenticatedSurveysRouteRoute:
      DashboardAuthenticatedSurveysRouteRoute,
  }

const DashboardAuthenticatedRouteRouteWithChildren =
  DashboardAuthenticatedRouteRoute._addFileChildren(
    DashboardAuthenticatedRouteRouteChildren,
  )

interface DashboardRouteRouteChildren {
  DashboardAuthenticatedRouteRoute: typeof DashboardAuthenticatedRouteRouteWithChildren
  DashboardLeaderboardRouteRoute: typeof DashboardLeaderboardRouteRoute
  DashboardAgentsAgentSymbolRouteRoute: typeof DashboardAgentsAgentSymbolRouteRoute
  DashboardAgentsIndexRouteRoute: typeof DashboardAgentsIndexRouteRoute
  DashboardSystemsIndexRouteRoute: typeof DashboardSystemsIndexRouteRoute
  DashboardSystemsSystemSymbolIndexRouteRoute: typeof DashboardSystemsSystemSymbolIndexRouteRoute
  DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute: typeof DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute
}

const DashboardRouteRouteChildren: DashboardRouteRouteChildren = {
  DashboardAuthenticatedRouteRoute:
    DashboardAuthenticatedRouteRouteWithChildren,
  DashboardLeaderboardRouteRoute: DashboardLeaderboardRouteRoute,
  DashboardAgentsAgentSymbolRouteRoute: DashboardAgentsAgentSymbolRouteRoute,
  DashboardAgentsIndexRouteRoute: DashboardAgentsIndexRouteRoute,
  DashboardSystemsIndexRouteRoute: DashboardSystemsIndexRouteRoute,
  DashboardSystemsSystemSymbolIndexRouteRoute:
    DashboardSystemsSystemSymbolIndexRouteRoute,
  DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute:
    DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute,
}

const DashboardRouteRouteWithChildren = DashboardRouteRoute._addFileChildren(
  DashboardRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRouteRoute
  '': typeof DashboardAuthenticatedRouteRouteWithChildren
  '/login': typeof AuthLoginRouteRoute
  '/logout': typeof AuthLogoutRouteRoute
  '/register': typeof AuthRegisterRouteRoute
  '/leaderboard': typeof DashboardLeaderboardRouteRoute
  '/contracts': typeof DashboardAuthenticatedContractsRouteRoute
  '/fleet': typeof DashboardAuthenticatedFleetRouteRouteWithChildren
  '/surveys': typeof DashboardAuthenticatedSurveysRouteRoute
  '/agents/$agentSymbol': typeof DashboardAgentsAgentSymbolRouteRoute
  '/agents': typeof DashboardAgentsIndexRouteRoute
  '/systems': typeof DashboardSystemsIndexRouteRoute
  '/fleet/$shipSymbol': typeof DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteWithChildren
  '/fleet/': typeof DashboardAuthenticatedFleetIndexRouteRoute
  '/systems/$systemSymbol': typeof DashboardSystemsSystemSymbolIndexRouteRoute
  '/systems/$systemSymbol/waypoint/$waypointSymbol': typeof DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute
  '/fleet/$shipSymbol/market': typeof DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRouteRoute
  '': typeof DashboardAuthenticatedRouteRouteWithChildren
  '/login': typeof AuthLoginRouteRoute
  '/logout': typeof AuthLogoutRouteRoute
  '/register': typeof AuthRegisterRouteRoute
  '/leaderboard': typeof DashboardLeaderboardRouteRoute
  '/contracts': typeof DashboardAuthenticatedContractsRouteRoute
  '/surveys': typeof DashboardAuthenticatedSurveysRouteRoute
  '/agents/$agentSymbol': typeof DashboardAgentsAgentSymbolRouteRoute
  '/agents': typeof DashboardAgentsIndexRouteRoute
  '/systems': typeof DashboardSystemsIndexRouteRoute
  '/fleet/$shipSymbol': typeof DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteWithChildren
  '/fleet': typeof DashboardAuthenticatedFleetIndexRouteRoute
  '/systems/$systemSymbol': typeof DashboardSystemsSystemSymbolIndexRouteRoute
  '/systems/$systemSymbol/waypoint/$waypointSymbol': typeof DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute
  '/fleet/$shipSymbol/market': typeof DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRouteRoute
  '/_auth': typeof AuthRouteRouteWithChildren
  '/_dashboard': typeof DashboardRouteRouteWithChildren
  '/_auth/login': typeof AuthLoginRouteRoute
  '/_auth/logout': typeof AuthLogoutRouteRoute
  '/_auth/register': typeof AuthRegisterRouteRoute
  '/_dashboard/_authenticated': typeof DashboardAuthenticatedRouteRouteWithChildren
  '/_dashboard/leaderboard': typeof DashboardLeaderboardRouteRoute
  '/_dashboard/_authenticated/contracts': typeof DashboardAuthenticatedContractsRouteRoute
  '/_dashboard/_authenticated/fleet': typeof DashboardAuthenticatedFleetRouteRouteWithChildren
  '/_dashboard/_authenticated/surveys': typeof DashboardAuthenticatedSurveysRouteRoute
  '/_dashboard/agents/$agentSymbol': typeof DashboardAgentsAgentSymbolRouteRoute
  '/_dashboard/agents/': typeof DashboardAgentsIndexRouteRoute
  '/_dashboard/systems/': typeof DashboardSystemsIndexRouteRoute
  '/_dashboard/_authenticated/fleet/$shipSymbol': typeof DashboardAuthenticatedFleetShipSymbolRouteRouteWithChildren
  '/_dashboard/_authenticated/fleet/': typeof DashboardAuthenticatedFleetIndexRouteRoute
  '/_dashboard/systems/$systemSymbol/': typeof DashboardSystemsSystemSymbolIndexRouteRoute
  '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay': typeof DashboardAuthenticatedFleetShipSymbolOverlayRouteRouteWithChildren
  '/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol': typeof DashboardSystemsSystemSymbolWaypointWaypointSymbolRouteRoute
  '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market': typeof DashboardAuthenticatedFleetShipSymbolOverlayMarketRouteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/register'
    | '/leaderboard'
    | '/contracts'
    | '/fleet'
    | '/surveys'
    | '/agents/$agentSymbol'
    | '/agents'
    | '/systems'
    | '/fleet/$shipSymbol'
    | '/fleet/'
    | '/systems/$systemSymbol'
    | '/systems/$systemSymbol/waypoint/$waypointSymbol'
    | '/fleet/$shipSymbol/market'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/register'
    | '/leaderboard'
    | '/contracts'
    | '/surveys'
    | '/agents/$agentSymbol'
    | '/agents'
    | '/systems'
    | '/fleet/$shipSymbol'
    | '/fleet'
    | '/systems/$systemSymbol'
    | '/systems/$systemSymbol/waypoint/$waypointSymbol'
    | '/fleet/$shipSymbol/market'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_dashboard'
    | '/_auth/login'
    | '/_auth/logout'
    | '/_auth/register'
    | '/_dashboard/_authenticated'
    | '/_dashboard/leaderboard'
    | '/_dashboard/_authenticated/contracts'
    | '/_dashboard/_authenticated/fleet'
    | '/_dashboard/_authenticated/surveys'
    | '/_dashboard/agents/$agentSymbol'
    | '/_dashboard/agents/'
    | '/_dashboard/systems/'
    | '/_dashboard/_authenticated/fleet/$shipSymbol'
    | '/_dashboard/_authenticated/fleet/'
    | '/_dashboard/systems/$systemSymbol/'
    | '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay'
    | '/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol'
    | '/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRouteRoute: typeof IndexRouteRoute
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  DashboardRouteRoute: typeof DashboardRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRouteRoute: IndexRouteRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  DashboardRouteRoute: DashboardRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.ts",
      "children": [
        "/",
        "/_auth",
        "/_dashboard"
      ]
    },
    "/": {
      "filePath": "index.route.ts"
    },
    "/_auth": {
      "filePath": "_auth.route.ts",
      "children": [
        "/_auth/login",
        "/_auth/logout",
        "/_auth/register"
      ]
    },
    "/_dashboard": {
      "filePath": "_dashboard.route.ts",
      "children": [
        "/_dashboard/_authenticated",
        "/_dashboard/leaderboard",
        "/_dashboard/agents/$agentSymbol",
        "/_dashboard/agents/",
        "/_dashboard/systems/",
        "/_dashboard/systems/$systemSymbol/",
        "/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol"
      ]
    },
    "/_auth/login": {
      "filePath": "_auth/login.route.ts",
      "parent": "/_auth"
    },
    "/_auth/logout": {
      "filePath": "_auth/logout.route.tsx",
      "parent": "/_auth"
    },
    "/_auth/register": {
      "filePath": "_auth/register.route.ts",
      "parent": "/_auth"
    },
    "/_dashboard/_authenticated": {
      "filePath": "_dashboard/_authenticated.route.ts",
      "parent": "/_dashboard",
      "children": [
        "/_dashboard/_authenticated/contracts",
        "/_dashboard/_authenticated/fleet",
        "/_dashboard/_authenticated/surveys"
      ]
    },
    "/_dashboard/leaderboard": {
      "filePath": "_dashboard/leaderboard.route.ts",
      "parent": "/_dashboard"
    },
    "/_dashboard/_authenticated/contracts": {
      "filePath": "_dashboard/_authenticated/contracts.route.ts",
      "parent": "/_dashboard/_authenticated"
    },
    "/_dashboard/_authenticated/fleet": {
      "filePath": "_dashboard/_authenticated/fleet.route.ts",
      "parent": "/_dashboard/_authenticated",
      "children": [
        "/_dashboard/_authenticated/fleet/$shipSymbol",
        "/_dashboard/_authenticated/fleet/"
      ]
    },
    "/_dashboard/_authenticated/surveys": {
      "filePath": "_dashboard/_authenticated/surveys.route.ts",
      "parent": "/_dashboard/_authenticated"
    },
    "/_dashboard/agents/$agentSymbol": {
      "filePath": "_dashboard/agents/$agentSymbol.route.ts",
      "parent": "/_dashboard"
    },
    "/_dashboard/agents/": {
      "filePath": "_dashboard/agents/index.route.ts",
      "parent": "/_dashboard"
    },
    "/_dashboard/systems/": {
      "filePath": "_dashboard/systems/index.route.ts",
      "parent": "/_dashboard"
    },
    "/_dashboard/_authenticated/fleet/$shipSymbol": {
      "filePath": "_dashboard/_authenticated/fleet/$shipSymbol.route.ts",
      "parent": "/_dashboard/_authenticated/fleet",
      "children": [
        "/_dashboard/_authenticated/fleet/$shipSymbol/_overlay"
      ]
    },
    "/_dashboard/_authenticated/fleet/": {
      "filePath": "_dashboard/_authenticated/fleet/index.route.ts",
      "parent": "/_dashboard/_authenticated/fleet"
    },
    "/_dashboard/systems/$systemSymbol/": {
      "filePath": "_dashboard/systems/$systemSymbol/index.route.ts",
      "parent": "/_dashboard"
    },
    "/_dashboard/_authenticated/fleet/$shipSymbol/_overlay": {
      "filePath": "_dashboard/_authenticated/fleet/$shipSymbol/_overlay.route.ts",
      "parent": "/_dashboard/_authenticated/fleet/$shipSymbol",
      "children": [
        "/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market"
      ]
    },
    "/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol": {
      "filePath": "_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol.route.ts",
      "parent": "/_dashboard"
    },
    "/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market": {
      "filePath": "_dashboard/_authenticated/fleet/$shipSymbol/_overlay.market.route.ts",
      "parent": "/_dashboard/_authenticated/fleet/$shipSymbol/_overlay"
    }
  }
}
ROUTE_MANIFEST_END */
