import { type QueryFunctionContext } from '@tanstack/react-query'
import { type SpaceTradersResponse, createHeaders } from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'

const AGENT_QUERIES = {
  agentBySymbol: (args: { agentSymbol: string }) => [{ scope: 'agents', entity: 'item' }, args] as const,
}

export const getAgentBySymbolQuery = {
  getQueryKey: (args: { agentSymbol: string }) => [{ scope: 'agents', entity: 'item' }, args] as const,
  queryFn: async ({
    queryKey: [, args],
    signal,
  }: QueryFunctionContext<ReturnType<(typeof AGENT_QUERIES)['agentBySymbol']>>) => {
    const url = new URL(`agents/${args.agentSymbol}`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return get<
      SpaceTradersResponse<{
        symbol: string
        headquarters: string
        credits: number
        startingFaction: string
        shipCount: number
      }>
    >(url, { signal, headers: createHeaders() })
  },
}
