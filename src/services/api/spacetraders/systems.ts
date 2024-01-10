import { queryOptions } from '@tanstack/react-query'
import { get } from '@/services/fetch'
import { type SystemResponse } from '@/types/spacetraders'
import { type Meta, type SpaceTradersResponse, attachQueryParams, createHeaders } from './core'

export const getSystemListQuery = ({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) =>
  queryOptions({
    queryKey: [
      { scope: 'systems', entity: 'list' },
      { page, limit },
    ],
    queryFn: async ({ signal }) => {
      const url = new URL(`systems`, import.meta.env.SPACETRADERS_API_BASE_URL)

      attachQueryParams(url, { page, limit })

      return get<SpaceTradersResponse<SystemResponse[], Meta>>(url, { signal, headers: createHeaders() })
    },
  })

export const getSystemByIdQuery = (args: { systemSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'systems', entity: 'item' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(`systems/${args.systemSymbol.toUpperCase()}`, import.meta.env.SPACETRADERS_API_BASE_URL)

      return get<SpaceTradersResponse<SystemResponse>>(url, { signal, headers: createHeaders() })
    },
  })
