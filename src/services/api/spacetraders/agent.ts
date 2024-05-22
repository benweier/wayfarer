import type { AgentResponse } from '@/types/spacetraders'
import { queryOptions } from '@tanstack/react-query'
import { type Meta, type SpaceTradersResponse, api } from './core'

export const getAgentListQuery = ({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) =>
  queryOptions({
    queryKey: [
      { scope: 'agents', entity: 'list' },
      { page, limit },
    ],
    queryFn: ({ signal }) => {
      return api.get('agents', { signal }).json<SpaceTradersResponse<AgentResponse[], Meta>>()
    },
  })

export const getAgentBySymbolQuery = (args: { agentSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'agents', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api.get(`agents/${args.agentSymbol}`, { signal }).json<SpaceTradersResponse<AgentResponse>>()
    },
  })
