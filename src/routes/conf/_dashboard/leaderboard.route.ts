import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/leaderboard/leaderboard-route.meta'

export const Route = new FileRoute('/_dashboard/leaderboard').createRoute({
  beforeLoad: () => ({ meta }),
})
