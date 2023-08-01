import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { WaypointStore } from '@/context/waypoint.context'
import { WaypointDetail } from '@/features/waypoint/detail'
import { WaypointTabs } from '@/features/waypoint/tabs'

export const WaypointRouteComponent = () => {
  const { systemSymbol, waypointSymbol } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">
        Waypoint: <span className="whitespace-nowrap font-normal">{waypointSymbol}</span>
      </h1>

      {systemSymbol && waypointSymbol && (
        <QuerySuspenseBoundary>
          <WaypointStore systemSymbol={systemSymbol} waypointSymbol={waypointSymbol}>
            <WaypointDetail>
              <WaypointTabs />
            </WaypointDetail>
          </WaypointStore>
        </QuerySuspenseBoundary>
      )}
    </div>
  )
}

export const Route = withQSB()(WaypointRouteComponent)
