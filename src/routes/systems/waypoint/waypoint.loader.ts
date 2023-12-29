import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { type WaypointResponse } from '@/types/spacetraders'

export const meta: MetaFunction<{ waypoint: SpaceTradersResponse<WaypointResponse> }> = (t, { waypoint } = {}) => {
  if (!waypoint) {
    return []
  }

  return [{ title: t('waypoint.title', { ns: 'meta', waypointSymbol: waypoint.data.symbol }) }]
}

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { systemSymbol, waypointSymbol } = params

    if (!systemSymbol || !waypointSymbol) {
      redirect(ROUTES.SYSTEMS)
      throw new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    try {
      const waypoint = await client.ensureQueryData(
        getWaypointByIdQuery({
          systemSymbol: systemSymbol.toUpperCase(),
          waypointSymbol: waypointSymbol.toUpperCase(),
        }),
      )
      const marketEnabled = waypoint.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1
      const market = marketEnabled
        ? client.ensureQueryData(
            getWaypointMarketQuery({
              systemSymbol: waypoint.data.systemSymbol,
              waypointSymbol: waypoint.data.symbol,
            }),
          )
        : undefined

      return defer({
        waypoint,
        market,
      })
    } catch (err) {
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
