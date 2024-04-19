import { getStatusQuery } from '@/services/api/spacetraders/status'
import type { StatusResponse } from '@/types/spacetraders'
import { useQuery } from '@tanstack/react-query'

const select = (response: StatusResponse) => ({
  status: response.status === 'SpaceTraders is currently online and available to play',
})

export const useSpaceTradersStatus = (): { status: 'unknown' | 'online' | 'offline'; isChecking: boolean } => {
  const { data, isLoading, isFetching, isSuccess, isError } = useQuery({
    ...getStatusQuery(),
    refetchInterval: 60_000,
    select,
  })

  return {
    status: isLoading
      ? 'unknown'
      : isSuccess && data.status
        ? 'online'
        : (isSuccess && !data.status) || isError
          ? 'offline'
          : 'unknown',
    isChecking: isFetching,
  }
}
