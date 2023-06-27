import { useQuery } from '@tanstack/react-query'
import { get } from '@/services/fetch'
import { StatusResponse } from '@/types/spacetraders'

const url = new URL(import.meta.env.SPACETRADERS_API_BASE_URL)

export const LeaderboardList = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ['status'],
    queryFn: ({ signal }) => get<StatusResponse>(url, { signal }),
  })

  if (!isSuccess) return null

  const leaderboard = data.leaderboards

  return (
    <>
      <pre>{JSON.stringify(leaderboard.mostCredits, null, 2)}</pre>
      <pre>{JSON.stringify(leaderboard.mostSubmittedCharts, null, 2)}</pre>
    </>
  )
}
