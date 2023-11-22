import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipListQuery, getSystemByIdQuery, getWaypointListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { type SystemsResponse } from '@/types/spacetraders'

export const meta = ({ system }: Partial<{ system: SpaceTradersResponse<SystemsResponse> }>) => {
  if (!system) {
    return []
  }

  return [{ title: `System: ${system.data.symbol}` }]
}

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { systemSymbol } = params

    if (!systemSymbol) {
      redirect(ROUTES.SYSTEMS)

      return new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    try {
      const system = client.ensureQueryData({
        queryKey: getSystemByIdQuery.getQueryKey({ systemSymbol }),
        queryFn: getSystemByIdQuery.queryFn,
      })
      const waypoints = client.ensureQueryData({
        queryKey: getWaypointListQuery.getQueryKey({ systemSymbol }),
        queryFn: getWaypointListQuery.queryFn,
      })
      const ships = client.ensureQueryData({
        queryKey: getShipListQuery.getQueryKey(),
        queryFn: getShipListQuery.queryFn,
        staleTime: Infinity,
        gcTime: Infinity,
      })

      return defer({
        system: await system,
        waypoints: await waypoints,
        ships,
      })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
