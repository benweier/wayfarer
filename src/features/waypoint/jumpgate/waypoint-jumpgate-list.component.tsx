import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointJumpGateQuery } from '@/services/api/spacetraders/waypoints'
import { WaypointJumpGateItem } from './waypoint-jumpgate-item.component'
import { WaypointJumpGateLayout } from './waypoint-jumpgate.layout'

export const WaypointJumpGateList = () => {
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery(
    getWaypointJumpGateQuery({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
  )
  const jumpgate = data.data

  return (
    <WaypointJumpGateLayout>
      {jumpgate.connectedSystems.map((system) => {
        return <WaypointJumpGateItem key={system.symbol} system={system} />
      })}
    </WaypointJumpGateLayout>
  )
}
