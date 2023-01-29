import { useQuery } from '@tanstack/react-query'
import { get } from '@/services/fetch'

const select = (response: { status: string }) => ({
  status: response.status === 'spacetraders is currently online and available to play',
})

export const useSpaceTradersStatus = (): { status: 'UNKNOWN' | 'ONLINE' | 'OFFLINE'; isChecking: boolean } => {
  const { data, isLoading, isFetching, isSuccess, isError } = useQuery(
    ['status'],
    () => {
      const url = new URL('/game/status', 'https://api.spacetraders.io')
      return get<{ status: string }>(url)
    },
    {
      refetchInterval: 60_000,
      staleTime: 60_000,
      select,
    },
  )

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
