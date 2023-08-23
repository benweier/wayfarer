import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipByIdQuery, getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { isAuthenticated } = getState()
    const { shipSymbol } = params

    if (!shipSymbol) {
      throw new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      throw new Response(STATUS_MESSAGES.UNAUTHORIZED, { status: STATUS_CODES.UNAUTHORIZED })
    }

    try {
      const ship = await client.ensureQueryData({
        queryKey: getShipByIdQuery.getQueryKey({ shipSymbol }),
        queryFn: getShipByIdQuery.queryFn,
      })
      const waypoint = await client.ensureQueryData({
        queryKey: getWaypointByIdQuery.getQueryKey({
          systemSymbol: ship.data.nav.systemSymbol,
          waypointSymbol: ship.data.nav.waypointSymbol,
        }),
        queryFn: getWaypointByIdQuery.queryFn,
      })

      if (waypoint.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') === -1) {
        return defer({ ship, waypoint })
      }

      const market = client.ensureQueryData({
        queryKey: getWaypointMarketQuery.getQueryKey({
          systemSymbol: ship.data.nav.systemSymbol,
          waypointSymbol: ship.data.nav.waypointSymbol,
        }),
        queryFn: getWaypointMarketQuery.queryFn,
      })

      return defer({ ship, waypoint, market })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
