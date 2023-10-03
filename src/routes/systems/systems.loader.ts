import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getSystemListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

const getPageNumber = (page: string | null) => {
  const pageNumber = parseInt(page ?? '1')

  return Number.isNaN(pageNumber) ? 1 : Math.max(1, pageNumber)
}

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ request }) => {
    const { isAuthenticated } = getState()
    const url = new URL(request.url)
    const page = getPageNumber(url.searchParams.get('page'))
    const limit = 20

    if (!isAuthenticated) {
      return redirect(ROUTES.LOGIN)
    }

    try {
      const systems = client.ensureQueryData({
        queryKey: getSystemListQuery.getQueryKey({ page, limit }),
        queryFn: getSystemListQuery.queryFn,
      })

      return defer({
        systems: await systems,
      })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
