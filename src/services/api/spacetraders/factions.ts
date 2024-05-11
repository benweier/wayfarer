import { type Meta, type SpaceTradersResponse, createHeaders } from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'
import type { FactionResponse } from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'
import { queryOptions } from '@tanstack/react-query'

export const getFactionListQuery = () =>
  queryOptions({
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    queryKey: [{ scope: 'factions', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const url = new URL('factions', import.meta.env.SPACETRADERS_API_BASE_URL)

      url.searchParams.set('page', '1')
      url.searchParams.set('limit', '20')

      const initial = await get<SpaceTradersResponse<FactionResponse[], Meta>>(url, {
        signal,
        headers: createHeaders(),
      })
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          url.searchParams.set('page', String(page))

          return get<SpaceTradersResponse<FactionResponse[], Meta>>(url, { signal, headers: createHeaders() })
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
      const url = new URL(`factions/${args.factionSymbol}`, import.meta.env.SPACETRADERS_API_BASE_URL)

      return get<SpaceTradersResponse<FactionResponse>>(url, { signal, headers: createHeaders() })
    },
  })
