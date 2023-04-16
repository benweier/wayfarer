import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipsList } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/services/store/auth'

export const loader: QueryClientLoaderFn = (client) => async () => {
  const { isAuthenticated } = getState()

  if (!isAuthenticated) {
    redirect(ROUTES.LOGIN)
    throw new Response(STATUS_MESSAGES.UNAUTHORIZED, { status: STATUS_CODES.UNAUTHORIZED })
  }

  try {
    const ships = await client.ensureQueryData({
      queryKey: ['ships'],
      queryFn: ({ signal }) => getShipsList(undefined, { signal }),
    })

    return defer({ ships })
  } catch (err) {
    if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
      throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}