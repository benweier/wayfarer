import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { type WaypointResponse } from '@/types/spacetraders'

export const meta = ({ waypoint }: Partial<{ waypoint: SpaceTradersResponse<WaypointResponse> }>) => {
  return <>{waypoint && <title>{`Waypoint: ${waypoint.data.symbol}`}</title>}</>
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
      const waypoint = await client.ensureQueryData({
        queryKey: getWaypointByIdQuery.getQueryKey({ systemSymbol, waypointSymbol }),
        queryFn: getWaypointByIdQuery.queryFn,
      })
      const marketEnabled = waypoint.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1
      const market = marketEnabled
        ? await client.ensureQueryData({
            queryKey: getWaypointMarketQuery.getQueryKey({ systemSymbol, waypointSymbol }),
            queryFn: getWaypointMarketQuery.queryFn,
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
