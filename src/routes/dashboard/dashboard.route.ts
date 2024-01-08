import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root.route'
import { getShipListQuery } from '@/services/api/spacetraders'

export const dashboardRoute = new Route({
  id: 'dashboard',
  getParentRoute: () => rootRoute,
  loader: ({ context }) => {
    context.client.ensureQueryData(getShipListQuery())
  },
  component: lazyRouteComponent(() => import('./dashboard-layout.component'), 'Layout'),
})
