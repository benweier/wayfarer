import { get, post } from '@/services/fetch'
import { authStore } from '@/store/auth'
import type { AgentResponse, ContractResponse, ShipCargo } from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'
import { queryOptions } from '@tanstack/react-query'
import { type Meta, type SpaceTradersResponse, createHeaders } from './core'

export const getContractListQuery = () =>
  queryOptions({
    queryKey: [{ scope: 'contracts', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const { isAuthenticated } = authStore.getState()

      if (!isAuthenticated) {
        return { data: [], meta: { page: 0, total: 0, limit: 0 } }
      }

      const url = new URL('my/contracts', import.meta.env.SPACETRADERS_API_BASE_URL)

      url.searchParams.set('page', '1')
      url.searchParams.set('limit', '20')

      const initial = await get<SpaceTradersResponse<ContractResponse[], Meta>>(url, {
        signal,
        headers: createHeaders(),
      })
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          url.searchParams.set('page', String(page))

          return get<SpaceTradersResponse<ContractResponse[], Meta>>(url, { signal, headers: createHeaders() })
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
    queryFn: async ({ signal }) => {
      const url = new URL(`my/contracts/${args.contractId}`, import.meta.env.SPACETRADERS_API_BASE_URL)

      return get<SpaceTradersResponse<ContractResponse>>(url, { signal, headers: createHeaders() })
    },
  })

export const createContractAcceptMutation = {
  getMutationKey: (args: { contractId: string }) => [{ scope: 'contracts', entity: 'item', action: 'accept' }, args],
  mutationFn: async (args: { contractId: string }) => {
    const url = new URL(`my/contracts/${args.contractId}/accept`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; contract: ContractResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createContractDeliverMutation = {
  getMutationKey: (args: { contractId: string; shipSymbol?: string }) => [
    { scope: 'contracts', entity: 'item', action: 'deliver' },
    args,
  ],
  mutationFn: async (args: { contractId: string; shipSymbol: string; tradeSymbol: string; units: number }) => {
    const url = new URL(`my/contracts/${args.contractId}/deliver`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<
      SpaceTradersResponse<{ contract: ContractResponse; cargo: ShipCargo }>,
      { shipSymbol: string; tradeSymbol: string; units: number }
    >(
      url,
      {
        shipSymbol: args.shipSymbol,
        tradeSymbol: args.tradeSymbol,
        units: args.units,
      },
      {
        headers: createHeaders(),
      },
    )
  },
}

export const createContractFulfillMutation = {
  getMutationKey: (args: { contractId: string }) => [{ scope: 'contracts', entity: 'item', action: 'fulfill' }, args],
  mutationFn: async (args: { contractId: string }) => {
    const url = new URL(`my/contracts/${args.contractId}/fulfill`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; contract: ContractResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}
