import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { ShipItem } from '@/features/ship/item'
import { WaypointFleetEmpty } from '@/features/waypoint/fleet/waypoint-fleet.empty'
import { getShipListQuery } from '@/services/api/spacetraders'
import { type WaypointFleetListProps } from './waypoint-fleet-list.types'

export const WaypointFleetList = ({ Item = ShipItem }: WaypointFleetListProps) => {
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
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

  return (
    <div className="grid grid-cols-1 gap-2">
      {ships.map((ship) => (
        <Item key={ship.symbol} ship={ship} />
      ))}
    </div>
  )
}
