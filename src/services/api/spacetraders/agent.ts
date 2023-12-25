import { type QueryFunctionContext } from '@tanstack/react-query'
import {
  type Meta,
  type SpaceTradersResponse,
  attachQueryParams,
  createHeaders,
} from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'
import { type AgentResponse } from '@/types/spacetraders'

type AgentQueryKey<T extends keyof typeof AGENT_QUERIES> = ReturnType<(typeof AGENT_QUERIES)[T]>

const AGENT_QUERIES = {
  agentList: (params?: { page?: number; limit?: number }) => [{ scope: 'agents', entity: 'list' }, params] as const,
  agentBySymbol: (args: { agentSymbol: string }) => [{ scope: 'agents', entity: 'item' }, args] as const,
}

export const getAgentListQuery = {
  getQueryKey: AGENT_QUERIES.agentList,
  queryFn: async ({ queryKey: [, params], signal }: QueryFunctionContext<AgentQueryKey<'agentList'>>) => {
    const url = new URL('agents', import.meta.env.SPACETRADERS_API_BASE_URL)

    if (params) attachQueryParams(url, params)

    return get<SpaceTradersResponse<AgentResponse[], Meta>>(url, { signal, headers: createHeaders() })
  },
}

export const getAgentBySymbolQuery = {
  getQueryKey: (args: { agentSymbol: string }) => [{ scope: 'agents', entity: 'item' }, args] as const,
  queryFn: async ({ queryKey: [, args], signal }: QueryFunctionContext<AgentQueryKey<'agentBySymbol'>>) => {
    const url = new URL(`agents/${args.agentSymbol}`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return get<SpaceTradersResponse<AgentResponse>>(url, { signal, headers: createHeaders() })
  },
}
