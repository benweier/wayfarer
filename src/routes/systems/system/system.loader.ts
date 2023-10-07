import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipListQuery, getSystemByIdQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { isAuthenticated } = getState()
    const { systemSymbol } = params

    if (!isAuthenticated) {
      return redirect(ROUTES.LOGIN)
    }

    if (!systemSymbol) {
      redirect(ROUTES.SYSTEMS)

      return new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    try {
      const system = client.ensureQueryData({
        queryKey: getSystemByIdQuery.getQueryKey({ systemSymbol }),
        queryFn: getSystemByIdQuery.queryFn,
      })
      const ships = client.ensureQueryData({
        queryKey: getShipListQuery.getQueryKey(),
        queryFn: getShipListQuery.queryFn,
        staleTime: Infinity,
        gcTime: Infinity,
      })

      return defer({
        system: await system,
        ships,
      })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
