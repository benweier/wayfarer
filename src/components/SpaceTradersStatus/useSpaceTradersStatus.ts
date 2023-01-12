import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { get } from '@/services/fetch'
import { HttpResponse } from '@/services/http'

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
      select: useCallback(
        (response: HttpResponse<{ status: string }>) => ({
          status: response.data?.status === 'spacetraders is currently online and available to play',
        }),
        [],
      ),
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
