import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { WAYPOINT_TYPE } from '@/config/constants'
import { getWaypointById } from '@/services/api/spacetraders'

export const ViewWaypoint = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['waypoint', systemID, waypointID],
    queryFn: ({ signal }) => getWaypointById({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const waypoint = data.data

  return (
    <div key={waypoint.symbol} className="grid gap-8">
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="text-xl font-semibold">{WAYPOINT_TYPE[waypoint.type] ?? waypoint.type}</div>
        <div className="font-light">
          ({waypoint.x}, {waypoint.y})
        </div>
        <div>
          System:{' '}
          <Link className="link" to={`/systems/${systemID}`}>
            {systemID}
          </Link>
        </div>
      </div>
    </div>
  )
}
