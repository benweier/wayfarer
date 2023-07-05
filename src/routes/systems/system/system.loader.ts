import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getSystemById } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { isAuthenticated } = getState()
    const { systemID } = params

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      return new Response(STATUS_MESSAGES.UNAUTHORIZED, { status: STATUS_CODES.UNAUTHORIZED })
    }

    if (!systemID) {
      redirect(ROUTES.SYSTEMS)
      return new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    try {
      const system = await client.ensureQueryData({
        queryKey: ['system', systemID],
        queryFn: ({ signal }) => getSystemById({ path: { systemID } }, { signal }),
      })

      return defer({ system })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
