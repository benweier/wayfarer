import { useQuery } from '@tanstack/react-query'
import { getJumpGate } from '@/services/api/spacetraders'

export const WaypointJumpGate = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['jump-gate', systemID, waypointID],
    queryFn: ({ signal }) => getJumpGate({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const jumpgate = data.data

  return <></>
}
