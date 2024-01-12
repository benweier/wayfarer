import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { meta } from '@/routes/fleet/ship/ship-route.meta'
import { getShipByIdQuery } from '@/services/api/spacetraders'

export const Route = new FileRoute('/_dashboard/_authenticated/fleet/$shipSymbol').createRoute({
  parseParams: ({ shipSymbol }) => ({ shipSymbol: shipSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const ship = context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))

    return {
      ship: await ship,
    }
  },
  component: lazyRouteComponent(() => import('@/routes/fleet/ship'), 'ShipRoute'),
})
