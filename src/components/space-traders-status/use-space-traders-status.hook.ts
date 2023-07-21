import { useQuery } from '@tanstack/react-query'
import { get } from '@/services/fetch'
import { type StatusResponse } from '@/types/spacetraders'

const getSpacetradersStatus = () => {
  const url = new URL(import.meta.env.SPACETRADERS_API_BASE_URL)
  return get<StatusResponse>(url)
}

const select = (response: StatusResponse) => ({
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
