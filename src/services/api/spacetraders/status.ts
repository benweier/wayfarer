import { createHeaders } from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'
import type { StatusResponse } from '@/types/spacetraders'
import { queryOptions } from '@tanstack/react-query'

export const getStatusQuery = () =>
  queryOptions({
    queryKey: [{ scope: 'status' }],
    queryFn: async ({ signal }) => {
      const url = new URL(import.meta.env.SPACETRADERS_API_BASE_URL)

      return get<StatusResponse>(url, { signal, headers: createHeaders() })
    },
  })
