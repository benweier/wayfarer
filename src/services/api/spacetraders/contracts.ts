import { type QueryFunctionContext } from '@tanstack/react-query'
import { get, post } from '@/services/fetch'
import { type AgentResponse, type ContractResponse, type ShipCargo } from '@/types/spacetraders'
import { type Meta, type SpaceTradersResponse, createHeaders } from './core'

type MaybeMutationKey<T = never> = [] | [Partial<T>]

const CONTRACT_QUERIES = {
  contractList: (params?: { page?: number; limit?: number }) =>
    [{ scope: 'contracts', entity: 'list' }, params] as const,
  contractById: ({ contractId }: { contractId: string }) =>
    [{ scope: 'contracts', entity: 'item' }, { contractId }] as const,
}

type ContractQueryKey<T extends keyof typeof CONTRACT_QUERIES> = ReturnType<(typeof CONTRACT_QUERIES)[T]>

export const getContractListQuery = {
  getQueryKey: CONTRACT_QUERIES.contractList,
  queryFn: async ({ signal }: QueryFunctionContext<ContractQueryKey<'contractList'>>) => {
    const url = new URL(`my/contracts`, import.meta.env.SPACETRADERS_API_BASE_URL)
    return get<SpaceTradersResponse<ContractResponse[], Meta>>(url, { signal, headers: createHeaders() })
  },
}

export const getContractByIdQuery = {
  getQueryKey: CONTRACT_QUERIES.contractById,
  queryFn: async ({ queryKey: [, args], signal }: QueryFunctionContext<ContractQueryKey<'contractById'>>) => {
    const url = new URL(`my/contracts/${args.contractId}`, import.meta.env.SPACETRADERS_API_BASE_URL)
    return get<SpaceTradersResponse<ContractResponse>>(url, { signal, headers: createHeaders() })
  },
}

export const createContractAcceptMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ contractId: string }>) =>
    [{ scope: 'contracts', entity: 'item', action: 'accept' }, ...args] as const,
  mutationFn: async (args: { contractId: string }) => {
    const url = new URL(`my/contracts/${args.contractId}/accept`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; contract: ContractResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createContractDeliverMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ contractId: string }>) =>
    [{ scope: 'contracts', entity: 'item', action: 'deliver' }, ...args] as const,
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
  getMutationKey: (...args: MaybeMutationKey<{ contractId: string }>) =>
    [{ scope: 'contracts', entity: 'item', action: 'fulfill' }, ...args] as const,
  mutationFn: async (args: { contractId: string }) => {
    const url = new URL(`my/contracts/${args.contractId}/fulfill`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; contract: ContractResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}
