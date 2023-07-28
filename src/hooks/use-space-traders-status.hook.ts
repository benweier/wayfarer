import { useQuery } from '@tanstack/react-query'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { type StatusResponse } from '@/types/spacetraders'

const select = (response: StatusResponse) => ({
  status: response.status === 'SpaceTraders is currently online and available to play',
})

export const useSpaceTradersStatus = (): { status: 'UNKNOWN' | 'ONLINE' | 'OFFLINE'; isChecking: boolean } => {
  const { data, isLoading, isFetching, isSuccess, isError } = useQuery({
    queryKey: getStatusQuery.getQueryKey(),
    queryFn: getStatusQuery.queryFn,
    refetchInterval: 60_000,
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
