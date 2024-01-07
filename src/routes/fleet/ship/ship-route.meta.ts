import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'

export const meta: MetaFunction<{ ship: SpaceTradersResponse<ShipResponse> }> = (t, { ship }) => {
  return [{ title: t('ship.title', { ns: 'meta', shipSymbol: ship.data.symbol }) }]
}