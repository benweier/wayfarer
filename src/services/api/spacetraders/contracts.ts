import { AgentResponse, ContractResponse } from '@/types/spacetraders'
import * as st from './core'

export const myContractsQuery = () => st.get<ContractResponse[]>(`/my/contracts`)

export const getContractByIdQuery = (id: string) => st.get<ContractResponse>(`/my/contracts/${id}`)

export const acceptContractByIDMutation = (id: string) =>
  st.post<{ agent: AgentResponse; contract: ContractResponse }>(`/my/contracts/${id}/accept`)

export const deliverContractByIDMutation = (
  id: string,
  payload: { shipSymbol: string; tradeSymbol: string; units: number },
) => st.post(`/my/contracts/${id}/deliver`, payload)

export const fulfillContractByIDMutation = (id: string) => st.post(`/my/contracts/${id}/fulfill`, undefined)
