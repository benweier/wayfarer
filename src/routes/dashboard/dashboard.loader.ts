import { defer, json } from 'react-router-dom'
import { getShipListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn = (client) => () => {
  const { isAuthenticated } = getState()

  try {
    if (!isAuthenticated) {
      return json({ ships: [] })
    }

    const ships = client.ensureQueryData({
      queryKey: getShipListQuery.getQueryKey(),
      queryFn: getShipListQuery.queryFn,
      staleTime: Infinity,
      gcTime: Infinity,
    })

    return defer({ ships })
  } catch (err) {
    if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
      throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
