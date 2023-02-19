import { AgentResponse, ContractResponse } from '@/types/spacetraders'
import { Meta, SpaceTradersResponse, mutationFnFactory, queryFnFactory } from './core'

export const getContractsList = queryFnFactory<SpaceTradersResponse<ContractResponse[], Meta>>(() => `/my/contracts`)

export const getContractById = queryFnFactory<SpaceTradersResponse<ContractResponse>, string>(
  (id) => `/my/contracts/${id}`,
)

export const createContractAccept = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; contract: ContractResponse }>,
  string
>((id) => `/my/contracts/${id}/accept`)

export const createContractDeliver = mutationFnFactory<
  SpaceTradersResponse<unknown>,
  string,
  { shipSymbol: string; tradeSymbol: string; units: number }
>((id) => `/my/contracts/${id}/deliver`)

export const createContractFulfill = mutationFnFactory<SpaceTradersResponse<unknown>, string>(
  (id) => `/my/contracts/${id}/fulfill`,
)
