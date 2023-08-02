import { type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { SystemContext } from '@/context/system.context'
import { WaypointContext, useWaypointResponse } from '@/context/waypoint.context'

export const WaypointDetail = ({ children }: PropsWithChildren) => {
  const waypoint = useWaypointResponse()

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
            <Link className="link" to={`/systems/${waypoint.systemSymbol}`}>
              {waypoint.systemSymbol}
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
