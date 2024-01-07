import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ContractResponse } from '@/types/spacetraders'

export const meta: MetaFunction<{ contract: SpaceTradersResponse<ContractResponse> }> = (t, { contract }) => {
  return [{ title: t('contract.title', { ns: 'meta', contractId: contract.data.id }) }]
}
