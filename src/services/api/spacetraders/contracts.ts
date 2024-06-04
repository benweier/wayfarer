import { authStore } from '@/store/auth'
import type { AgentResponse, ContractResponse, ShipCargo } from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'
import { queryOptions } from '@tanstack/react-query'
import { type Meta, type SpaceTradersResponse, api } from './core'

export const getContractListQuery = () =>
  queryOptions({
    queryKey: [{ scope: 'contracts', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const { isAuthenticated } = authStore.getState()

      if (!isAuthenticated) {
        return { data: [], meta: { page: 0, total: 0, limit: 0 } }
      }

      const path = 'my/contracts'

      const initial = await api
        .get(path, { page: 1, limit: 20 }, { signal })
        .json<SpaceTradersResponse<ContractResponse[], Meta>>()
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          return api.get(path, { page, limit: 20 }, { signal }).json<SpaceTradersResponse<ContractResponse[], Meta>>()
        }),
      )
      const data = initial.data.concat(...remaining.map((page) => page.data))
      const meta = { page: 1, total: data.length, limit: data.length }

      return { data, meta }
    },
  })

export const getContractByIdQuery = (args: { contractId: string }) =>
  queryOptions({
    queryKey: [{ scope: 'contracts', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api
        .get(`my/contracts/${args.contractId}`, undefined, { signal })
        .json<SpaceTradersResponse<ContractResponse>>()
    },
  })

export const createContractAcceptMutation = {
  getMutationKey: (args: { contractId: string }) => [{ scope: 'contracts', entity: 'item', action: 'accept' }, args],
  mutationFn: (args: { contractId: string }) => {
    return api
      .post(`my/contracts/${args.contractId}/accept`)
      .json<SpaceTradersResponse<{ agent: AgentResponse; contract: ContractResponse }>>()
  },
}

export const createContractDeliverMutation = {
  getMutationKey: (args: { contractId: string; shipSymbol?: string }) => [
    { scope: 'contracts', entity: 'item', action: 'deliver' },
    args,
  ],
  mutationFn: (args: { contractId: string; shipSymbol: string; tradeSymbol: string; units: number }) => {
    return api
      .post(`my/contracts/${args.contractId}/deliver`, {
        shipSymbol: args.shipSymbol,
        tradeSymbol: args.tradeSymbol,
        units: args.units,
      })
      .json<SpaceTradersResponse<{ contract: ContractResponse; cargo: ShipCargo }>>()
  },
}

export const createContractFulfillMutation = {
  getMutationKey: (args: { contractId: string }) => [{ scope: 'contracts', entity: 'item', action: 'fulfill' }, args],
  mutationFn: (args: { contractId: string }) => {
    return api
      .post(`my/contracts/${args.contractId}/fulfill`)
      .json<SpaceTradersResponse<{ agent: AgentResponse; contract: ContractResponse }>>()
  },
}
