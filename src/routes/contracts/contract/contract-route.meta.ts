import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ContractResponse } from '@/types/spacetraders'

export const meta: MetaFunction<Partial<{ contract: SpaceTradersResponse<ContractResponse> }>> = (t, data) => {
  if (!data.contract) {
    return []
  }

  return [{ title: t('contract.title', { ns: 'meta', contractId: data.contract.data.id }) }]
}
