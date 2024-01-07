import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { fleetRoute } from '@/routes/fleet.route'
import { getShipByIdQuery } from '@/services/api/spacetraders'

export const shipRoute = new Route({
  path: '$shipSymbol',
  getParentRoute: () => fleetRoute,
  parseParams: ({ shipSymbol }) => ({ shipSymbol: shipSymbol.toUpperCase() }),
})
export const shipIndexRoute = new Route({
  path: '/',
  getParentRoute: () => shipRoute,
  loader: async ({ context, params }) => {
    const ship = context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))

    return {
      ship: await ship,
    }
  },
  component: lazyRouteComponent(() => import('@/routes/fleet/ship'), 'ShipRoute'),
})
