import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { fleetRoute } from '@/routes/fleet/fleet.route'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { meta } from './ship-route.meta'

export const shipRoute = new Route({
  path: '$shipSymbol',
  getParentRoute: () => fleetRoute,
  parseParams: ({ shipSymbol }) => ({ shipSymbol: shipSymbol.toUpperCase() }),
})
export const shipIndexRoute = new Route({
  path: '/',
  getParentRoute: () => shipRoute,
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const ship = context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))

    return {
      ship: await ship,
    }
  },
  component: lazyRouteComponent(() => import('./ship-route.component'), 'ShipRoute'),
})
