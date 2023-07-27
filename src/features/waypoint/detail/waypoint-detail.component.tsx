import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { SystemContext } from '@/context/system.context'
import { WaypointContext } from '@/context/waypoint.context'
import { getWaypointByIdQuery } from '@/services/api/spacetraders'
import { type WaypointDetailProps } from './waypoint-detail.types'

export const WaypointDetail = ({ systemSymbol, waypointSymbol, children }: WithChildren<WaypointDetailProps>) => {
  const { data, isSuccess } = useQuery({
    queryKey: getWaypointByIdQuery.getQueryKey({ systemSymbol, waypointSymbol }),
    queryFn: getWaypointByIdQuery.queryFn,
  })

  if (!isSuccess) return null

  const waypoint = data.data

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2">
          <WaypointTag type={waypoint.type}>{WAYPOINT_TYPE.get(waypoint.type) ?? waypoint.type}</WaypointTag>
          <div className="text-sm font-light">
            ({waypoint.x}, {waypoint.y})
          </div>
          <div className="whitespace-nowrap">
            System:{' '}
            <Link className="link" to={`/systems/${systemSymbol}`}>
              {systemSymbol}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {waypoint.traits.map((trait) => (
            <Badge key={trait.symbol}>{trait.name}</Badge>
          ))}
        </div>
      </div>

      {children && (
        <SystemContext.Provider value={{ systemSymbol: waypoint.systemSymbol }}>
          <WaypointContext.Provider value={{ waypointSymbol: waypoint.symbol }}>{children}</WaypointContext.Provider>
        </SystemContext.Provider>
      )}
    </div>
  )
}
