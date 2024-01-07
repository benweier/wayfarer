import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'

export const meta: MetaFunction<Partial<{ ship: SpaceTradersResponse<ShipResponse> }>> = (t, { ship } = {}) => {
  if (!ship) {
    return []
  }

  return [{ title: t('ship.title', { ns: 'meta', shipSymbol: ship.data.symbol }) }]
}
