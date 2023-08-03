import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointShipyardQuery } from '@/services/api/spacetraders'
import { WaypointShipyardItem } from './waypoint-shipyard-item.component'
import { type WaypointShipyardListProps } from './waypoint-shipyard.types'

export const WaypointShipyardList = ({ ShipyardItem = WaypointShipyardItem }: WaypointShipyardListProps) => {
  const waypoint = useWaypointResponse()

  const { data } = useSuspenseQuery({
    queryKey: getWaypointShipyardQuery.getQueryKey({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
    queryFn: getWaypointShipyardQuery.queryFn,
  })

  const ships = data.data.ships ?? []

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-2">
        {ships.map((ship) => (
          <ShipyardItem key={ship.type} ship={ship} />
        ))}
      </div>
    </div>
  )
}
