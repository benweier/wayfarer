import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getSystemListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'
import { getRequestPagination } from '@/utilities/get-request-pagination.helper'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ request }) => {
    const { isAuthenticated } = getState()
    const url = new URL(request.url)
    const { page, limit } = getRequestPagination(url.searchParams)

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
