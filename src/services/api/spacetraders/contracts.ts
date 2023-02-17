import { AgentResponse, ContractResponse } from '@/types/spacetraders'
import { mutationFnFactory, queryFnFactory } from './core'

export const getContractsList = queryFnFactory<ContractResponse[]>(() => `/my/contracts`)

export const getContractById = queryFnFactory<ContractResponse, string>((id) => `/my/contracts/${id}`)

export const createContractAccept = mutationFnFactory<{ agent: AgentResponse; contract: ContractResponse }, string>(
  (id) => `/my/contracts/${id}/accept`,
)

export const createContractDeliver = mutationFnFactory<
  unknown,
  string,
  { shipSymbol: string; tradeSymbol: string; units: number }
>((id) => `/my/contracts/${id}/deliver`)

export const createContractFulfill = mutationFnFactory<unknown, string>((id) => `/my/contracts/${id}/fulfill`)
