import { defer, json } from 'react-router-dom'
import { getShipListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getAuthState } from '@/store/auth'

export const loader: QueryClientLoaderFn = (client) => () => {
  const { isAuthenticated } = getAuthState()

  try {
    if (!isAuthenticated) {
      return json({ ships: [] })
    }

    const ships = client.ensureQueryData(getShipListQuery())

    return defer({ ships })
  } catch (err) {
    if (isHttpError(err)) {
      throw new Response(err.statusText, { status: err.status })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
