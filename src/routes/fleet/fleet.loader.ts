import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
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
      const ships = client.ensureQueryData({
        queryKey: getShipListQuery.getQueryKey({ page, limit }),
        queryFn: getShipListQuery.queryFn,
      })

      return defer({
        ships: await ships,
      })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
