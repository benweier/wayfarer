import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn = (client) => () => {
  const { isAuthenticated } = getState()

  if (!isAuthenticated) {
    return redirect(ROUTES.LOGIN)
  }

  try {
    const ships = client.ensureQueryData({
      queryKey: getShipListQuery.getQueryKey(),
      queryFn: getShipListQuery.queryFn,
    })

    return defer({ ships })
  } catch (err) {
    if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
      throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
