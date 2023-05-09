import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getSystemsList } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ request }) => {
    const { isAuthenticated } = getState()
    const url = new URL(request.url)
    const page = url.searchParams.get('page') ?? '1'
    const limit = 10

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      throw new Response(STATUS_MESSAGES.UNAUTHORIZED, { status: STATUS_CODES.UNAUTHORIZED })
    }

    try {
      const systems = await client.ensureQueryData({
        queryKey: ['systems', page, limit],
        queryFn: ({ signal }) => getSystemsList({ params: { page, limit } }, { signal }),
      })

      return defer({ systems })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
