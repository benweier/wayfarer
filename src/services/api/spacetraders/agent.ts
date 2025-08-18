import {
  AgentResponseSchema,
  SpaceTradersResponseSchema,
  PaginationMetaSchema,
} from '@/services/api/spacetraders/schema'
import { queryOptions } from '@tanstack/react-query'
import { api } from './api'
import * as v from 'valibot'

export function getAgentListQuery({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) {
  return queryOptions({
    queryKey: [
      { scope: 'agents', entity: 'list' },
      { page, limit },
    ],
    queryFn: ({ signal }) => {
      return api('agents', {
        params: { page, limit },
        signal,
        schema: SpaceTradersResponseSchema(v.array(AgentResponseSchema), PaginationMetaSchema),
      })
    },
  })
}

export function getAgentBySymbolQuery(args: { agentSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'agents', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api(`agents/${args.agentSymbol.toUpperCase()}`, {
        signal,
        schema: SpaceTradersResponseSchema(AgentResponseSchema),
      })
    },
  })
}
