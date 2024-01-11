import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type SystemResponse } from '@/types/spacetraders'

export const meta: MetaFunction<{ system: SpaceTradersResponse<SystemResponse> }> = (t, { system } = {}) => {
  if (!system) return []

  return [{ title: t('system.title', { ns: 'meta', systemSymbol: system.data.symbol }) }]
}
