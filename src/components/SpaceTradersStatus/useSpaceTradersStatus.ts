import { useStatusQuery } from '@/services/spacetraders/core'

export const useSpaceTradersStatus = (): { status: 'UNKNOWN' | 'ONLINE' | 'OFFLINE'; isChecking: boolean } => {
  const { data, isLoading, isFetching, isError } = useStatusQuery(undefined, {
    pollingInterval: 60000,
  })

  return {
    status: isLoading
      ? 'UNKNOWN'
      : !isLoading && data?.status
      ? 'ONLINE'
      : (!isLoading && !data?.status) || isError
      ? 'OFFLINE'
      : 'UNKNOWN',
    isChecking: isLoading || isFetching,
  }
}
