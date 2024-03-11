import { createFileRoute, defer, redirect } from '@tanstack/react-router'
import { hasTrait } from '@/features/waypoint/utilities/has-trait.helper'
import { getShipByIdQuery, getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders'

export const Route = createFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market')({
  loader: async ({ context, params }) => {
    const ship = await context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))
    const waypoint = await context.client.ensureQueryData(
      getWaypointByIdQuery({
        systemSymbol: ship.data.nav.systemSymbol,
        waypointSymbol: ship.data.nav.waypointSymbol,
      }),
    )

    if (!hasTrait(waypoint.data.traits, ['MARKETPLACE'])) {
      throw redirect({
        to: '/fleet/$shipSymbol',
        params: { shipSymbol: ship.data.symbol },
      })
    }

    const market = context.client.ensureQueryData(
      getWaypointMarketQuery({
        systemSymbol: ship.data.nav.systemSymbol,
        waypointSymbol: ship.data.nav.waypointSymbol,
      }),
    )

    return {
      ship,
      waypoint,
      market: defer(market),
    }
  },
})
