import { type SystemWaypoint, type WaypointChart, type WaypointTrait } from '@/types/spacetraders'

export type WaypointItemProps = {
  systemSymbol: string
  waypoint: SystemWaypoint & { traits?: WaypointTrait[]; chart?: WaypointChart }
  hasShipPresence?: boolean
}
