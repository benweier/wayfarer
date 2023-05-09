import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getMarket, getShipById } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { isAuthenticated } = getState()
    const { shipID } = params

    if (!shipID) {
      throw new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      throw new Response(STATUS_MESSAGES.UNAUTHORIZED, { status: STATUS_CODES.UNAUTHORIZED })
    }

    try {
      const ship = await client.ensureQueryData({
        queryKey: ['ship', shipID],
        queryFn: ({ signal }) => getShipById({ path: shipID }, { signal }),
      })

      const market = client.ensureQueryData({
        queryKey: ['system', ship.data.nav.systemSymbol, ship.data.nav.waypointSymbol, 'market'],
        queryFn: ({ signal }) =>
          getMarket(
            { path: { system: ship.data.nav.systemSymbol, waypoint: ship.data.nav.waypointSymbol } },
            { signal },
          ),
      })

      return defer({ ship, market })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
