import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointJumpGateQuery } from '@/services/api/spacetraders'
import { WaypointJumpGateItem } from './waypoint-jumpgate-item.component'
import { WaypointJumpGateLayout } from './waypoint-jumpgate.layout'

export const WaypointJumpGateList = () => {
  const waypoint = useWaypointResponse()

  const { data } = useSuspenseQuery({
    queryKey: getWaypointJumpGateQuery.getQueryKey({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
    queryFn: getWaypointJumpGateQuery.queryFn,
  })

  const jumpgate = data.data

  return (
    <WaypointJumpGateLayout>
      {jumpgate.connectedSystems.map((system) => {
        return <WaypointJumpGateItem key={system.symbol} system={system} />
      })}
    </WaypointJumpGateLayout>
  )
}
