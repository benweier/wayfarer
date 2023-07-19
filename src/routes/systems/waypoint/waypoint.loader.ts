import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getMarket, getWaypointById } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { isAuthenticated } = getState()
    const { systemSymbol, waypointID } = params

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      throw new Response(STATUS_MESSAGES.UNAUTHORIZED, { status: STATUS_CODES.UNAUTHORIZED })
    }

    if (!systemSymbol || !waypointID) {
      redirect(ROUTES.SYSTEMS)
      throw new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    try {
      const waypoint = await client.ensureQueryData({
        queryKey: ['system', systemSymbol, 'waypoint', waypointID],
        queryFn: ({ signal }) => getWaypointById({ path: { systemSymbol, waypointID } }, { signal }),
      })

      const marketEnabled = waypoint.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1

      const market = marketEnabled
        ? await client.ensureQueryData({
            queryKey: ['system', systemSymbol, waypointID, 'market'],
            queryFn: ({ signal }) => getMarket({ path: { systemSymbol, waypointID } }, { signal }),
          })
        : undefined

      return defer({
        waypoint,
        market,
      })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
