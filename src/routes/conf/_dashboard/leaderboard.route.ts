import { createFileRoute, defer } from '@tanstack/react-router'
import { meta } from '@/routes/leaderboard/leaderboard-route.meta'
import { getStatusQuery } from '@/services/api/spacetraders/status'

export const Route = createFileRoute('/_dashboard/leaderboard')({
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const status = context.client.ensureQueryData(getStatusQuery())

    return {
      status: defer(status),
    }
  },
})
