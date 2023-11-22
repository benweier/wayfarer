import { defer } from 'react-router-dom'
import { getSystemListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getRequestPagination } from '@/utilities/get-request-pagination.helper'

export const meta: MetaFunction = (t) => {
  return [{ title: t('systems.title', { ns: 'meta' }) }]
}

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ request }) => {
    const url = new URL(request.url)
    const { page, limit } = getRequestPagination(url.searchParams)

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
