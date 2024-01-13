import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/systems/waypoint/waypoint-route.meta'
import { getWaypointByIdQuery } from '@/services/api/spacetraders'

export const Route = new FileRoute('/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol').createRoute({
  parseParams: ({ systemSymbol, waypointSymbol }) => ({
    systemSymbol: systemSymbol.toUpperCase(),
    waypointSymbol: waypointSymbol.toUpperCase(),
  }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const waypoint = context.client.ensureQueryData(
      getWaypointByIdQuery({ systemSymbol: params.systemSymbol, waypointSymbol: params.waypointSymbol }),
    )

    return {
      waypoint: await waypoint,
    }
  },
})
