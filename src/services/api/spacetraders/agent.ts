import { queryOptions } from '@tanstack/react-query'
import {   api } from './core'
import type {Meta, SpaceTradersResponse} from './core';
import type { AgentResponse } from '@/types/spacetraders'

export const getAgentListQuery = ({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) =>
  queryOptions({
    queryKey: [
      { scope: 'agents', entity: 'list' },
      { page, limit },
    ],
    queryFn: ({ signal }) => {
      return api.get('agents', { page, limit }, { signal }).json<SpaceTradersResponse<AgentResponse[], Meta>>()
    },
  })

export const getAgentBySymbolQuery = (args: { agentSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'agents', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api.get(`agents/${args.agentSymbol}`, undefined, { signal }).json<SpaceTradersResponse<AgentResponse>>()
    },
  })
