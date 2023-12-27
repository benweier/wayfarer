import { queryOptions } from '@tanstack/react-query'
import {
  type Meta,
  type SpaceTradersResponse,
  attachQueryParams,
  createHeaders,
} from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'
import { type AgentResponse } from '@/types/spacetraders'

export const getAgentListQuery = (params: { page?: number; limit?: number } = {}) =>
  queryOptions({
    queryKey: [{ scope: 'agents', entity: 'list' }, params],
    queryFn: async ({ signal }) => {
      const url = new URL('agents', import.meta.env.SPACETRADERS_API_BASE_URL)

      attachQueryParams(url, params)

      return get<SpaceTradersResponse<AgentResponse[], Meta>>(url, { signal, headers: createHeaders() })
    },
  })

export const getAgentBySymbolQuery = (args: { agentSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'agents', entity: 'item' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(`agents/${args.agentSymbol}`, import.meta.env.SPACETRADERS_API_BASE_URL)

      return get<SpaceTradersResponse<AgentResponse>>(url, { signal, headers: createHeaders() })
    },
  })
