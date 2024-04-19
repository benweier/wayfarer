import type { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import type { WaypointResponse } from '@/types/spacetraders'

export const meta: MetaFunction<{ waypoint: SpaceTradersResponse<WaypointResponse> }> = (t, { waypoint } = {}) => {
  if (!waypoint) return []

  return [{ title: t('waypoint.title', { waypointSymbol: waypoint.data.symbol }) }]
}
