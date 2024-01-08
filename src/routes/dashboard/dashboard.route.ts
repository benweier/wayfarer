import { Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root.route'
import { getShipListQuery } from '@/services/api/spacetraders'

export const dashboardRoute = new Route({
  id: 'dashboard',
  getParentRoute: () => rootRoute,
  loader: ({ context }) => {
    const ships = context.client.ensureQueryData(getShipListQuery())

    return {
      ships: defer(ships),
    }
  },
  component: lazyRouteComponent(() => import('./dashboard-layout.component'), 'Layout'),
})
