import { NotFound } from '@/components/not-found'
import { meta } from '@/routes/fleet/ship/ship-route.meta'
import { getShipByIdQuery } from '@/services/api/spacetraders/fleet'
import { getWaypointByIdQuery } from '@/services/api/spacetraders/waypoints'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol')({
  params: {
    parse({ shipSymbol }) {
      return { shipSymbol: shipSymbol.toUpperCase() }
    },
    stringify({ shipSymbol }) {
      return { shipSymbol: shipSymbol.toUpperCase() }
    },
  },
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    try {
      const ship = await context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))
      const waypoint = await context.client.ensureQueryData(
        getWaypointByIdQuery({
          systemSymbol: ship.data.nav.systemSymbol,
          waypointSymbol: ship.data.nav.waypointSymbol,
        }),
      )

      return {
        ship,
        waypoint,
      }
    } catch (_err) {
      throw notFound()
    }
  },
  notFoundComponent: NotFound,
})
