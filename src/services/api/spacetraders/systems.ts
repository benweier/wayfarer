import type { SystemResponse } from '@/types/spacetraders'
import { queryOptions } from '@tanstack/react-query'
import { type Meta, type SpaceTradersResponse, api } from './core'

export const getSystemListQuery = ({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) =>
  queryOptions({
    queryKey: [
      { scope: 'systems', entity: 'list' },
      { page, limit },
    ],
    queryFn: ({ signal }) => {
      return api.get('systems', { page, limit }, { signal }).json<SpaceTradersResponse<SystemResponse[], Meta>>()
    },
  })

export const getSystemByIdQuery = (args: { systemSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'systems', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api
        .get(`systems/${args.systemSymbol.toUpperCase()}`, undefined, { signal })
        .json<SpaceTradersResponse<SystemResponse>>()
    },
  })
