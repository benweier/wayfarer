import { LeaderboardRoute } from '@/routes/leaderboard/leaderboard-route.component'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/leaderboard')({
  component: LeaderboardRoute,
})
