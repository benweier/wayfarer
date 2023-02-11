import { AgentResponse, ContractResponse } from '@/types/spacetraders'
import * as st from './core'

export const getContractsList = () => st.get<ContractResponse[]>(`/my/contracts`)

export const getContractById = (id: string) => st.get<ContractResponse>(`/my/contracts/${id}`)

export const createContractAccept = (id: string) =>
  st.post<{ agent: AgentResponse; contract: ContractResponse }>(`/my/contracts/${id}/accept`)

export const createContractDeliver = (
  id: string,
  payload: { shipSymbol: string; tradeSymbol: string; units: number },
) => st.post(`/my/contracts/${id}/deliver`, payload)

export const createContractFulfill = (id: string) => st.post(`/my/contracts/${id}/fulfill`, undefined)
