import { Outlet, Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth.route'
import { meta } from '@/routes/fleet/fleet-route.meta'
import { getShipListQuery } from '@/services/api/spacetraders'

export const fleetRoute = new Route({
  path: 'fleet',
  getParentRoute: () => authRequiredRoute,
  component: Outlet,
})
export const fleetIndexRoute = new Route({
  path: '/',
  getParentRoute: () => fleetRoute,
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const fleet = context.client.ensureQueryData(getShipListQuery())

    return {
      fleet: defer(fleet),
    }
  },
  component: lazyRouteComponent(() => import('@/routes/fleet'), 'FleetRoute'),
})
