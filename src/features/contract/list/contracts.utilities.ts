import { type ContractResponse } from '@/types/spacetraders'

type ContractGroups = {
  available: ContractResponse[]
  accepted: ContractResponse[]
  completed: ContractResponse[]
}

export const contractsReducer = (result: ContractGroups, contract: ContractResponse) => {
  if (contract.fulfilled) {
    result.completed.push(contract)

    return result
  }

  if (contract.accepted) {
    result.accepted.push(contract)

    return result
  }

  result.available.push(contract)

  return result
}
