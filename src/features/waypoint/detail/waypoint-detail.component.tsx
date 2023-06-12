import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { SystemContext } from '@/context/system.context'
import { WaypointContext } from '@/context/waypoint.context'
import { getWaypointById } from '@/services/api/spacetraders'
import { WaypointDetailProps } from './waypoint-detail.types'

export const WaypointDetail = ({ systemID, waypointID, children }: WithChildren<WaypointDetailProps>) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['system', systemID, 'waypoint', waypointID],
    queryFn: ({ signal }) => getWaypointById({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const waypoint = data.data

  return (
    <div key={waypoint.symbol} className="grid gap-4">
      <div>
        <div className="flex flex-row items-center justify-start gap-4">
          <WaypointTag type={waypoint.type}>{WAYPOINT_TYPE.get(waypoint.type) ?? waypoint.type}</WaypointTag>
          <div className="text-sm font-light">
            ({waypoint.x}, {waypoint.y})
          </div>
          <div>
            System:{' '}
            <Link className="link" to={`/systems/${systemID}`}>
              {systemID}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-baseline gap-1">
          {waypoint.traits.map((trait) => (
            <Badge key={trait.symbol}>{trait.name}</Badge>
          ))}
        </div>
      </div>

      {children && (
        <SystemContext.Provider value={{ systemID: waypoint.systemSymbol }}>
          <WaypointContext.Provider value={{ waypointID: waypoint.symbol }}>{children}</WaypointContext.Provider>
        </SystemContext.Provider>
      )}
    </div>
  )
}
