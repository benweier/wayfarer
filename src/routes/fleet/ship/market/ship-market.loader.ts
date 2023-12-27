import { defer, redirect } from 'react-router-dom'
import { getShipByIdQuery, getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { shipSymbol } = params

    if (!shipSymbol) {
      throw new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    try {
      const ship = await client.ensureQueryData(getShipByIdQuery({ shipSymbol }))
      const waypoint = await client.ensureQueryData(
        getWaypointByIdQuery({
          systemSymbol: ship.data.nav.systemSymbol,
          waypointSymbol: ship.data.nav.waypointSymbol,
        }),
      )

      if (waypoint.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') === -1) {
        return redirect(`/fleet/ship/${shipSymbol}`)
      }

      const market = client.ensureQueryData(
        getWaypointMarketQuery({
          systemSymbol: ship.data.nav.systemSymbol,
          waypointSymbol: ship.data.nav.waypointSymbol,
        }),
      )

      return defer({ ship, waypoint, market })
    } catch (err) {
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
