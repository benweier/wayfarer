import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipListQuery, getSystemByIdQuery, getWaypointListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'
import { type SystemResponse } from '@/types/spacetraders'

export const meta: MetaFunction<Partial<{ system: SpaceTradersResponse<SystemResponse> }>> = (t, { system } = {}) => {
  if (!system) {
    return []
  }

  return [{ title: t('system.title', { ns: 'meta', systemSymbol: system.data.symbol }) }]
}

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { isAuthenticated } = getState()
    const { systemSymbol } = params

    if (!systemSymbol) {
      return redirect(ROUTES.SYSTEMS)
    }

    try {
      const system = await client.ensureQueryData(getSystemByIdQuery({ systemSymbol: systemSymbol }))
      const waypoints = client.ensureQueryData(getWaypointListQuery({ systemSymbol: system.data.symbol }))

      if (!isAuthenticated) {
        return defer({
          system,
          waypoints,
          ships: [],
        })
      }

      const ships = client.ensureQueryData(getShipListQuery())

      return defer({
        system,
        waypoints,
        ships,
      })
    } catch (err) {
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
