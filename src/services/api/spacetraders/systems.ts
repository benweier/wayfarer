import { queryOptions } from '@tanstack/react-query'
import * as v from 'valibot'
import { api } from './api'
import { SystemResponseSchema, SpaceTradersResponseSchema, PaginationMetaSchema } from './schema'

export function getSystemListQuery({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) {
  return queryOptions({
    queryKey: [
      { scope: 'systems', entity: 'list' },
      { page, limit },
    ],
    queryFn: ({ signal }) => {
      return api('systems', {
        params: { page, limit },
        signal,
        schema: SpaceTradersResponseSchema(v.array(SystemResponseSchema), PaginationMetaSchema),
      })
    },
  })
}

export function getSystemByIdQuery(args: { systemSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'systems', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api(`systems/${args.systemSymbol.toUpperCase()}`, {
        signal,
        schema: SpaceTradersResponseSchema(SystemResponseSchema),
      })
    },
  })
}
