import { type AgentResponse, type ContractResponse, type ShipCargo } from '@/types/spacetraders'
import { type Meta, type SpaceTradersResponse, mutationFnFactory, queryFnFactory } from './core'

export const getContractsList = queryFnFactory<SpaceTradersResponse<ContractResponse[], Meta>>(() => `my/contracts`)

export const getContractById = queryFnFactory<SpaceTradersResponse<ContractResponse>, { contractID: string }>(
  ({ contractID }) => `my/contracts/${contractID}`,
)

export const createContractAccept = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; contract: ContractResponse }>,
  { contractID: string }
>(({ contractID }) => `my/contracts/${contractID}/accept`)

export const createContractDeliver = mutationFnFactory<
  SpaceTradersResponse<{ contract: ContractResponse; cargo: ShipCargo }>,
  { contractID: string },
  { shipSymbol: string; tradeSymbol: string; units: number }
>(({ contractID }) => `my/contracts/${contractID}/deliver`)

export const createContractFulfill = mutationFnFactory<SpaceTradersResponse, { contractID: string }>(
  ({ contractID }) => `my/contracts/${contractID}/fulfill`,
)
