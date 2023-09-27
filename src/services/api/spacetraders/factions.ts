import { type QueryFunctionContext } from '@tanstack/react-query'
import { type Meta, type SpaceTradersResponse, createHeaders } from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'
import { type FactionResponse } from '@/types/spacetraders'

export const getFactionListQuery = {
  getQueryKey: () => [{ scope: 'factions', entity: 'list' }] as const,
  queryFn: async ({ signal }: QueryFunctionContext) => {
    const url = new URL('factions', import.meta.env.SPACETRADERS_API_BASE_URL)

    url.searchParams.set('limit', '20')

    return get<SpaceTradersResponse<FactionResponse[], Meta>>(url, { signal, headers: createHeaders() })
  },
}

export const getFactionByIdQuery = {
  getQueryKey: (args: { factionSymbol: string }) => [{ scope: 'factions', entity: 'item' }, args] as const,
  queryFn: async ({
    queryKey: [, args],
    signal,
  }: QueryFunctionContext<[{ scope: 'factions' }, { factionSymbol: string }]>) => {
    const url = new URL(`factions/${args.factionSymbol}`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return get<SpaceTradersResponse<FactionResponse>>(url, { signal, headers: createHeaders() })
  },
}
