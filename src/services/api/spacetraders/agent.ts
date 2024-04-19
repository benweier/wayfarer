import {
  type Meta,
  type SpaceTradersResponse,
  attachQueryParams,
  createHeaders,
} from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'
import type { AgentResponse } from '@/types/spacetraders'
import { queryOptions } from '@tanstack/react-query'

export const getAgentListQuery = ({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) =>
  queryOptions({
    queryKey: [
      { scope: 'agents', entity: 'list' },
      { page, limit },
    ],
    queryFn: async ({ signal }) => {
      const url = new URL('agents', import.meta.env.SPACETRADERS_API_BASE_URL)

      attachQueryParams(url, { page, limit })

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
