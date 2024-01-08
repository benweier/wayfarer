import { Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { dashboardRoute } from '@/routes/dashboard/dashboard.route'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { meta } from './leaderboard-route.meta'

export const leaderboardRoute = new Route({
  path: 'leaderboard',
  getParentRoute: () => dashboardRoute,
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const status = context.client.ensureQueryData(getStatusQuery())

    return {
      status: defer(status),
    }
  },
  component: lazyRouteComponent(() => import('./leaderboard-route.component'), 'LeaderboardRoute'),
})
