import { i18n } from '@/services/i18n'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
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
  head: (ctx) => {
    return {
      meta: [
        {
          title: i18n.t('title_template', {
            title: 'waypoint.title',
            waypointSymbol: ctx.loaderData.waypoint.data.symbol,
            ns: 'meta',
          }),
        },
      ],
    }
  },
  notFoundComponent: NotFound,
})
