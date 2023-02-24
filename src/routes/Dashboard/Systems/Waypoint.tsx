import { Link, useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'

export const WaypointViewRoute = () => {
  const { systemID, waypointID } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">
        Waypoint: <span className="font-normal">{waypointID}</span>
      </h1>
      <div className="grid gap-8">
        {systemID && (
          <div>
            System:{' '}
            <Link className="link" to={`/systems/${systemID}`}>
              {systemID}
            </Link>
          </div>
        )}
        <QuerySuspenseBoundary>
          {/*{systemID && waypointID && <ViewWaypoint systemID={systemID} waypointID={waypointID} />}*/}
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const Waypoint = withQSB()(WaypointViewRoute)
