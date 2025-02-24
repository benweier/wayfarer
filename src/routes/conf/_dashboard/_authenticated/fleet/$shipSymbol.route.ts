import { i18n } from '@/services/i18n'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { getShipByIdQuery } from '@/services/api/spacetraders/fleet'
import { getWaypointByIdQuery } from '@/services/api/spacetraders/waypoints'

export const Route = createFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol')({
  params: {
    parse({ shipSymbol }) {
      return { shipSymbol: shipSymbol.toUpperCase() }
    },
    stringify({ shipSymbol }) {
      return { shipSymbol: shipSymbol.toUpperCase() }
    },
  },
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
  head: (ctx) => {
    return {
      meta: [
        {
          title: i18n.t('title_template', {
            title: 'ship.title',
            shipSymbol: ctx.loaderData.ship.data.symbol,
            ns: 'meta',
          }),
        },
      ],
    }
  },
  notFoundComponent: NotFound,
})
