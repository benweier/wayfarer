import { Link } from 'react-router-dom'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { WaypointItemProps } from './waypoint-item.types'

export const WaypointItem = ({ systemSymbol, waypoint }: WaypointItemProps) => {
  return (
    <div className="flex flex-col justify-between gap-1 rounded bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25">
      <div>
        <Link className="link text-lg" to={`${ROUTES.SYSTEMS}/${systemSymbol}/waypoint/${waypoint.symbol}`}>
          {waypoint.symbol}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-1">
        <WaypointTag type={waypoint.type}>{WAYPOINT_TYPE.get(waypoint.type)}</WaypointTag>
        <div className="text-sm font-light">
          ({waypoint.x}, {waypoint.y})
        </div>
      </div>
    </div>
  )
}
