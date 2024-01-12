import { FileRoute, defer, lazyRouteComponent } from '@tanstack/react-router'
import { meta } from '@/routes/fleet/fleet-route.meta'
import { getShipListQuery } from '@/services/api/spacetraders'

export const Route = new FileRoute('/_dashboard/_authenticated/fleet/').createRoute({
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const ships = context.client.ensureQueryData(getShipListQuery())

    return {
      ships: defer(ships),
    }
  },
  component: lazyRouteComponent(() => import('@/routes/fleet'), 'FleetRoute'),
  staleTime: Infinity,
  gcTime: Infinity,
})
