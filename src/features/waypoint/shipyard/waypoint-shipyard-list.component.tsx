import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointShipyardQuery } from '@/services/api/spacetraders/waypoints'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { WaypointShipyardTable } from './waypoint-shipyard.table'

export const WaypointShipyardList = () => {
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery(
    getWaypointShipyardQuery({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
  )
  const types = data.data.shipTypes ?? []
  const ships = reduceArrayToMap(data.data.ships, 'type')

  return <WaypointShipyardTable data={types.map(({ type }) => ({ type, ship: ships.get(type) }))} />
}
