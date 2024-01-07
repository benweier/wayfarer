import { Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { meta } from '@/routes/leaderboard'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { dashboardRoute } from './dashboard.route'

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
  component: lazyRouteComponent(() => import('@/routes/leaderboard'), 'LeaderboardRoute'),
})
