import { type QueryFunctionContext } from '@tanstack/react-query'
import { createHeaders } from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'
import { type StatusResponse } from '@/types/spacetraders'

export const getStatusQuery = {
  getQueryKey: () => [{ scope: 'status' }] as const,
  queryFn: async ({ signal }: QueryFunctionContext) => {
    const url = new URL(import.meta.env.SPACETRADERS_API_BASE_URL)
    return get<StatusResponse>(url, { signal, headers: createHeaders() })
  },
}
