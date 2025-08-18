import * as v from 'valibot'
import {
  FactionResponseSchema,
  PaginationMetaSchema,
  SpaceTradersResponseSchema,
} from '@/services/api/spacetraders/schema'
import { queryOptions } from '@tanstack/react-query'
import { getPageList } from '@/utilities/get-page-list.helper'
import { api } from './api'

export function getFactionListQuery() {
  return queryOptions({
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    queryKey: [{ scope: 'factions', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const initial = await api('factions', {
        params: { page: 1, limit: 20 },
        signal,
        schema: SpaceTradersResponseSchema(v.array(FactionResponseSchema), PaginationMetaSchema),
      })
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          return api('factions', {
            params: { page, limit: 20 },
            signal,
            schema: SpaceTradersResponseSchema(v.array(FactionResponseSchema), PaginationMetaSchema),
          })
        }),
      )
      const data = initial.data.concat(...remaining.map((page) => page.data))
      const meta = { page: 1, total: data.length, limit: data.length }

      return { data, meta }
    },
  })
}

export function getFactionByIdQuery(args: { factionSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'factions', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api(`factions/${args.factionSymbol.toUpperCase()}`, {
        signal,
        schema: SpaceTradersResponseSchema(FactionResponseSchema),
      })
    },
  })
}
