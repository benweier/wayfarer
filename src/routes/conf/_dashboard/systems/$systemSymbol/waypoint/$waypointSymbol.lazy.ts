import { WaypointRoute } from '@/routes/systems/waypoint'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol')({
  component: WaypointRoute,
})
