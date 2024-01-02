import { defer } from 'react-router-dom'
import { getSystemListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getRequestPagination } from '@/utilities/get-request-pagination.helper'

export const meta: MetaFunction<Partial<{ page: number }>> = (t, { page } = {}) => {
  if (page === undefined) return []

  return [{ title: t('systems.title', { ns: 'meta', page }) }]
}

export const loader: QueryClientLoaderFn =
  (client) =>
  ({ request }) => {
    const url = new URL(request.url)
    const { page, limit } = getRequestPagination(url.searchParams)

    try {
      const systems = client.ensureQueryData(getSystemListQuery({ page, limit }))

      return defer({
        page,
        systems,
      })
    } catch (err) {
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
