import { useQuery } from '@tanstack/react-query'
import { useSystemContext } from '@/context/system.context'
import { useWaypointContext } from '@/context/waypoint.context'
import { getWaypointJumpGateQuery } from '@/services/api/spacetraders'
import { WaypointJumpGateItem } from './waypoint-jumpgate-item.component'
import { WaypointJumpGateLayout } from './waypoint-jumpgate.layout'

export const WaypointJumpGateList = () => {
  const { systemSymbol } = useSystemContext()
  const { waypointSymbol } = useWaypointContext()

  const { data, isSuccess } = useQuery({
    queryKey: getWaypointJumpGateQuery.getQueryKey({ systemSymbol, waypointSymbol }),
    queryFn: getWaypointJumpGateQuery.queryFn,
  })

  if (!isSuccess) return null

  const jumpgate = data.data

  return (
    <WaypointJumpGateLayout>
      {jumpgate.connectedSystems.map((system) => {
        return <WaypointJumpGateItem key={system.symbol} system={system} />
      })}
    </WaypointJumpGateLayout>
  )
}
