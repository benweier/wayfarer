import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root.route'

export const dashboardRoute = new Route({
  id: 'dashboard',
  getParentRoute: () => rootRoute,
  component: lazyRouteComponent(() => import('@/routes/dashboard'), 'Layout'),
})
