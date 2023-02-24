import { useQuery } from '@tanstack/react-query'
import { getShipyard } from '@/services/api/spacetraders'

export const WaypointShipyard = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['shipyard', systemID, waypointID],
    queryFn: ({ signal }) => getShipyard({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const shipyard = data.data

  return <></>
}
