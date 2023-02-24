import { useQuery } from '@tanstack/react-query'
import { getMarket } from '@/services/api/spacetraders'

export const WaypointMarket = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['market', systemID, waypointID],
    queryFn: ({ signal }) => getMarket({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const market = data.data

  return <></>
}
