import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/systems/waypoint/waypoint-route.meta'

export const Route = new FileRoute('/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol').createRoute({
  parseParams: ({ systemSymbol, waypointSymbol }) => ({
    systemSymbol: systemSymbol.toUpperCase(),
    waypointSymbol: waypointSymbol.toUpperCase(),
  }),
  beforeLoad: () => ({ meta }),
})
