import { useWaypointResponse } from '@/context/waypoint.context'
import { ShipListTable } from '@/features/ship/list/ship-list.table'
import { WaypointFleetEmpty } from '@/features/waypoint/fleet/waypoint-fleet.empty'
import { getShipListQuery } from '@/services/api/spacetraders'
import { useSuspenseQuery } from '@tanstack/react-query'

export const WaypointFleetList = () => {
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery({
    ...getShipListQuery(),
    select: (response) => ({
      data: response.data.filter(
        (ship) => ship.nav.systemSymbol === waypoint.systemSymbol && ship.nav.waypointSymbol === waypoint.symbol,
      ),
      meta: response.meta,
    }),
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const ships = data.data

  if (ships.length === 0) {
    return <WaypointFleetEmpty waypoint={waypoint} />
  }

  return <ShipListTable data={ships.map((ship) => ({ ship }))} />
}
