import { createLazyFileRoute } from '@tanstack/react-router'
import { WaypointRoute } from '@/routes/systems/waypoint'

export const Route = createLazyFileRoute('/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol')({
  component: WaypointRoute,
})
