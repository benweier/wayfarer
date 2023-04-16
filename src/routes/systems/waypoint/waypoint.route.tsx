import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ViewWaypoint } from '@/features/waypoint'

export const WaypointRouteComponent = () => {
  const { systemID, waypointID } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">
        Waypoint: <span className="font-normal">{waypointID}</span>
      </h1>
      <div className="grid gap-8">
        <QuerySuspenseBoundary>
          {systemID && waypointID && <ViewWaypoint systemID={systemID} waypointID={waypointID} />}
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Route = withQSB()(WaypointRouteComponent)
