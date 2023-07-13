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
    queryFn: ({ signal }) => getWaypointById({ path: { systemID, waypointID } }, { signal }),
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
            <Link className="link" to={`/systems/${systemID}`}>
              {systemID}
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
        <SystemContext.Provider value={{ systemID: waypoint.systemSymbol }}>
          <WaypointContext.Provider value={{ waypointID: waypoint.symbol }}>{children}</WaypointContext.Provider>
        </SystemContext.Provider>
      )}
    </div>
  )
}
