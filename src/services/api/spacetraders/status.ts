import { queryOptions } from '@tanstack/react-query'
import { api } from '@/services/api/spacetraders/core'
import type { StatusResponse } from '@/types/spacetraders'

export const getStatusQuery = () =>
  queryOptions({
    queryKey: [{ scope: 'status' }],
    queryFn: ({ signal }) => {
      return api.get('', undefined, { signal }).json<StatusResponse>()
    },
  })
