import { Link } from '@tanstack/react-router'
import { Card } from '@/components/card'
import { type WaypointJumpGateItemProps } from './waypoint-jumpgate.types'

export const WaypointJumpGateItem = ({ system }: WaypointJumpGateItemProps) => {
  return (
    <Card className="@container/jumpgate-item">
      <div>
        <Link
          key={system.symbol}
          to="/systems/$systemSymbol"
          params={{ systemSymbol: system.symbol }}
          className="link font-semibold"
        >
          {system.symbol}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="text-foreground-secondary typography-sm">Distance: {system.distance}</div>
        <div className="text-foreground-secondary typography-sm">
          ({system.x}, {system.y})
        </div>
      </div>
    </Card>
  )
}
