import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'

export const WaypointViewRoute = () => {
  const { systemID, waypointID } = useParams()

  return (
    <div>
      <h1 className="text-title p-4">
        Waypoint: <span className="font-normal">{waypointID}</span>
      </h1>
      <div className="grid gap-12 py-6 px-4">
        <QuerySuspenseBoundary>
          <>
            {systemID} {waypointID}
          </>
          {/*{systemID && waypointID && <ViewWaypoint systemID={systemID} waypointID={waypointID} />}*/}
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Waypoint = withQSB()(WaypointViewRoute)
