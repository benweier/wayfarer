import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { meta } from '@/routes/systems/waypoint/waypoint-route.meta'
import { getWaypointByIdQuery } from '@/services/api/spacetraders/waypoints'

export const Route = createFileRoute('/_dashboard/systems/$systemSymbol/waypoint/$waypointSymbol')({
  params: {
    parse({ systemSymbol, waypointSymbol }) {
      return {
        systemSymbol: systemSymbol.toUpperCase(),
        waypointSymbol: waypointSymbol.toUpperCase(),
      }
    },
    stringify({ systemSymbol, waypointSymbol }) {
      return {
        systemSymbol: systemSymbol.toUpperCase(),
        waypointSymbol: waypointSymbol.toUpperCase(),
      }
    },
  },
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    try {
      const waypoint = context.client.ensureQueryData(
        getWaypointByIdQuery({ systemSymbol: params.systemSymbol, waypointSymbol: params.waypointSymbol }),
      )

      return {
        waypoint: await waypoint,
      }
    } catch (_err) {
      throw notFound()
    }
  },
  notFoundComponent: NotFound,
})
