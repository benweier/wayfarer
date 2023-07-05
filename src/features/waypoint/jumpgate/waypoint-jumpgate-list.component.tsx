import { useQuery } from '@tanstack/react-query'
import { useSystemContext } from '@/context/system.context'
import { useWaypointContext } from '@/context/waypoint.context'
import { getJumpGate } from '@/services/api/spacetraders'
import { WaypointJumpGateItem } from './waypoint-jumpgate-item.component'
import { WaypointJumpGateLayout } from './waypoint-jumpgate.layout'

export const WaypointJumpGateList = () => {
  const { systemID } = useSystemContext()
  const { waypointID } = useWaypointContext()

  const { data, isSuccess } = useQuery({
    queryKey: ['jump-gate', systemID, waypointID],
    queryFn: ({ signal }) => getJumpGate({ path: { systemID, waypointID } }, { signal }),
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
