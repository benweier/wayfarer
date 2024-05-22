import type { FactionResponse } from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'
import { queryOptions } from '@tanstack/react-query'
import { type Meta, type SpaceTradersResponse, api } from './core'

export const getFactionListQuery = () =>
  queryOptions({
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    queryKey: [{ scope: 'factions', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const initial = await api
        .get('factions', { page: 1, limit: 20 }, { signal })
        .json<SpaceTradersResponse<FactionResponse[], Meta>>()
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          return api
            .get('factions', { page, limit: 20 }, { signal })
            .json<SpaceTradersResponse<FactionResponse[], Meta>>()
        }),
      )
      const data = initial.data.concat(...remaining.map((page) => page.data))
      const meta = { page: 1, total: data.length, limit: data.length }

      return { data, meta }
    },
  })

export const getFactionByIdQuery = (args: { factionSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'factions', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api.get(`factions/${args.factionSymbol}`, { signal }).json<SpaceTradersResponse<FactionResponse>>()
    },
  })
