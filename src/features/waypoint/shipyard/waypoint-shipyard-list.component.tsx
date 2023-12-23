import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointShipyardQuery } from '@/services/api/spacetraders'
import { WaypointShipyardTable } from './waypoint-shipyard.table'

export const WaypointShipyardList = () => {
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery({
    queryKey: getWaypointShipyardQuery.getQueryKey({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
    queryFn: getWaypointShipyardQuery.queryFn,
  })
  const ships = data.data.ships ?? []

  return <WaypointShipyardTable data={ships} />
}
