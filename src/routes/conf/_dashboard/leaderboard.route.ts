import { meta } from '@/routes/leaderboard/leaderboard-route.meta'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { createFileRoute, defer } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/leaderboard')({
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const status = context.client.ensureQueryData(getStatusQuery())

    return {
      status: defer(status),
    }
  },
})
