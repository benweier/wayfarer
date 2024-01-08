import { Outlet, Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth/auth.route'
import { getShipListQuery } from '@/services/api/spacetraders'
import { meta } from './fleet-route.meta'

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
    const ships = context.client.ensureQueryData(getShipListQuery())

    return {
      ships: defer(ships),
    }
  },
  component: lazyRouteComponent(() => import('./fleet-route.component'), 'FleetRoute'),
})
