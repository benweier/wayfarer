import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { systemRoute } from '@/routes/systems/system/system.route'
import { getWaypointByIdQuery } from '@/services/api/spacetraders'
import { meta } from './waypoint-route.meta'

export const waypointRoute = new Route({
  path: 'waypoint/$waypointSymbol',
  parseParams: ({ waypointSymbol }) => ({ waypointSymbol: waypointSymbol.toUpperCase() }),
  getParentRoute: () => systemRoute,
})
export const waypointIndexRoute = new Route({
  path: '/',
  getParentRoute: () => waypointRoute,
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const waypoint = context.client.ensureQueryData(
      getWaypointByIdQuery({ systemSymbol: params.systemSymbol, waypointSymbol: params.waypointSymbol }),
    )

    return {
      waypoint: await waypoint,
    }
  },
  component: lazyRouteComponent(() => import('./waypoint-route.component'), 'WaypointRoute'),
})
