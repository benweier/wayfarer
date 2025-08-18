import { queryOptions } from '@tanstack/react-query'
import * as v from 'valibot'
import { authStore } from '@/store/auth'
import { getPageList } from '@/utilities/get-page-list.helper'
import { api } from './api'
import {
  ContractResponseSchema,
  AgentResponseSchema,
  ShipCargoSchema,
  SpaceTradersResponseSchema,
  PaginationMetaSchema,
} from './schema'

export function getContractListQuery() {
  return queryOptions({
    queryKey: [{ scope: 'contracts', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const { isAuthenticated } = authStore.getState()

      if (!isAuthenticated) {
        return { data: [], meta: { page: 0, total: 0, limit: 0 } }
      }

      const initial = await api('my/contracts', {
        params: { page: 1, limit: 20 },
        signal,
        schema: SpaceTradersResponseSchema(v.array(ContractResponseSchema), PaginationMetaSchema),
      })
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          return api('my/contracts', {
            params: { page, limit: 20 },
            signal,
            schema: SpaceTradersResponseSchema(v.array(ContractResponseSchema), PaginationMetaSchema),
          })
        }),
      )
      const data = initial.data.concat(...remaining.map((page) => page.data))
      const meta = { page: 1, total: data.length, limit: data.length }

      return { data, meta }
    },
  })
}

export function getContractByIdQuery(args: { contractId: string }) {
  return queryOptions({
    queryKey: [{ scope: 'contracts', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api(`my/contracts/${args.contractId}`, {
        signal,
        schema: SpaceTradersResponseSchema(ContractResponseSchema),
      })
    },
  })
}

export const createContractAcceptMutation = {
  getMutationKey: (args: { contractId: string }) => [{ scope: 'contracts', entity: 'item', action: 'accept' }, args],
  mutationFn: (args: { contractId: string }) => {
    return api(`my/contracts/${args.contractId}/accept`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          contract: ContractResponseSchema,
        }),
      ),
    })
  },
}

export const createContractDeliverMutation = {
  getMutationKey: (args: { contractId: string; shipSymbol?: string }) => [
    { scope: 'contracts', entity: 'item', action: 'deliver' },
    args,
  ],
  mutationFn: (args: { contractId: string; shipSymbol: string; tradeSymbol: string; units: number }) => {
    return api(`my/contracts/${args.contractId}/deliver`, {
      method: 'POST',
      body: {
        shipSymbol: args.shipSymbol,
        tradeSymbol: args.tradeSymbol,
        units: args.units,
      },
      schema: SpaceTradersResponseSchema(
        v.object({
          contract: ContractResponseSchema,
          cargo: ShipCargoSchema,
        }),
      ),
    })
  },
}

export const createContractFulfillMutation = {
  getMutationKey: (args: { contractId: string }) => [{ scope: 'contracts', entity: 'item', action: 'fulfill' }, args],
  mutationFn: (args: { contractId: string }) => {
    return api(`my/contracts/${args.contractId}/fulfill`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          contract: ContractResponseSchema,
        }),
      ),
    })
  },
}
