import { useQuery } from '@tanstack/react-query'
import { get } from '@/services/fetch'

type SpaceTradersStatusResponse = {
  status: string
  version: string
  resetDate: string
  description: string
  stats: { agents: number; ships: number; systems: number; waypoints: number }
  leaderboards: {
    mostCredits: Array<{ agentSymbol: string; credits: number }>
    mostSubmittedCharts: Array<{ agentSymbol: string; chartCount: number }>
  }
  serverResets: { next: string; frequency: 'weekly' }
  announcements: Array<{
    title: string
    body: string
  }>
  links: Array<{ name: string; url: string }>
}

const getSpacetradersStatus = () => {
  const url = new URL(import.meta.env.SPACETRADERS_API_BASE_URL)
  return get<SpaceTradersStatusResponse>(url)
}

const select = (response: SpaceTradersStatusResponse) => ({
  status: response.status === 'SpaceTraders is currently online and available to play',
})

export const useSpaceTradersStatus = (): { status: 'UNKNOWN' | 'ONLINE' | 'OFFLINE'; isChecking: boolean } => {
  const { data, isLoading, isFetching, isSuccess, isError } = useQuery({
    queryKey: ['status'],
    queryFn: getSpacetradersStatus,
    refetchInterval: 60_000,
    staleTime: 60_000,
    select,
  })

  return {
    status: isLoading
      ? 'UNKNOWN'
      : isSuccess && data.status
      ? 'ONLINE'
      : (isSuccess && !data.status) || isError
      ? 'OFFLINE'
      : 'UNKNOWN',
    isChecking: isFetching,
  }
}
