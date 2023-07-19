import { useQuery } from '@tanstack/react-query'
import { useSystemContext } from '@/context/system.context'
import { useWaypointContext } from '@/context/waypoint.context'
import { getJumpGate } from '@/services/api/spacetraders'
import { WaypointJumpGateItem } from './waypoint-jumpgate-item.component'
import { WaypointJumpGateLayout } from './waypoint-jumpgate.layout'

export const WaypointJumpGateList = () => {
  const { systemSymbol } = useSystemContext()
  const { waypointID } = useWaypointContext()

  const { data, isSuccess } = useQuery({
    queryKey: ['jump-gate', systemSymbol, waypointID],
    queryFn: ({ signal }) => getJumpGate({ path: { systemSymbol, waypointID } }, { signal }),
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
