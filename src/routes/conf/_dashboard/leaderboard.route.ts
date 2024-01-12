import { FileRoute, defer, lazyRouteComponent } from '@tanstack/react-router'
import { meta } from '@/routes/leaderboard/leaderboard-route.meta'
import { getStatusQuery } from '@/services/api/spacetraders/status'

export const Route = new FileRoute('/_dashboard/leaderboard').createRoute({
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const status = context.client.ensureQueryData(getStatusQuery())

    return {
      status: defer(status),
    }
  },
  component: lazyRouteComponent(() => import('@/routes/leaderboard'), 'LeaderboardRoute'),
})
