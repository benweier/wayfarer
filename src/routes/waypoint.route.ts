import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { systemRoute } from '@/routes/system.route'
import { meta } from '@/routes/systems/waypoint/waypoint-route.meta'
import { getWaypointByIdQuery } from '@/services/api/spacetraders'

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
  component: lazyRouteComponent(() => import('@/routes/systems/waypoint'), 'WaypointRoute'),
})
