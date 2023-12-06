import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { Card } from '@/components/card'
import { ShipIcon } from '@/components/icons'
import { WaypointTag } from '@/components/waypoint/tag'
import { ROUTES } from '@/config/routes'
import { type WaypointItemProps } from './waypoint-item.types'

export const WaypointItem = ({ systemSymbol, waypoint, hasShipPresence }: WaypointItemProps) => {
  const { t } = useTranslation()
  const traits = waypoint.traits?.filter((trait) => {
    return trait.symbol === 'MARKETPLACE' || trait.symbol === 'SHIPYARD'
  })

  return (
    <Card className="@container/waypoint-item">
      <div className="h-full space-y-1">
        <div className="flex items-center justify-between gap-2">
          <Link className="link text-lg" to={`${ROUTES.SYSTEMS}/${systemSymbol}/waypoint/${waypoint.symbol}`}>
            {waypoint.symbol}
          </Link>
          {hasShipPresence && (
            <span title="You have a ship at this waypoint">
              <ShipIcon id="anchor" className="h-4 w-4" />
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-1">
          <WaypointTag type={waypoint.type}>{t(waypoint.type, { ns: 'spacetraders.waypoint_type' })}</WaypointTag>
          <div className="text-secondary text-sm font-light">
            ({waypoint.x}, {waypoint.y})
          </div>
        </div>
        {traits !== undefined && (
          <div className="flex flex-wrap gap-1">
            {traits.map((trait) => (
              <Badge key={trait.symbol}>{trait.name}</Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
