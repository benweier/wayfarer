import { createLazyFileRoute } from '@tanstack/react-router'
import { LeaderboardRoute } from '@/routes/leaderboard/leaderboard-route.component'

export const Route = createLazyFileRoute('/_dashboard/leaderboard')({
  component: LeaderboardRoute,
})
