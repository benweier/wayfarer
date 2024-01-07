import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type WaypointResponse } from '@/types/spacetraders'

export const meta: MetaFunction<Partial<{ waypoint: SpaceTradersResponse<WaypointResponse> }>> = (
  t,
  { waypoint } = {},
) => {
  if (!waypoint) {
    return []
  }

  return [{ title: t('waypoint.title', { ns: 'meta', waypointSymbol: waypoint.data.symbol }) }]
}
