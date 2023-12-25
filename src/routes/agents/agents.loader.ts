import { defer } from 'react-router-dom'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getRequestPagination } from '@/utilities/get-request-pagination.helper'

export const meta: MetaFunction = (t) => {
  return [{ title: t('agents.title', { ns: 'meta' }) }]
}

export const loader: QueryClientLoaderFn =
  (client) =>
  ({ request }) => {
    const url = new URL(request.url)
    const { page, limit } = getRequestPagination(url.searchParams)

    try {
      const systems = client.ensureQueryData({
        queryKey: getAgentListQuery.getQueryKey({ page, limit }),
        queryFn: getAgentListQuery.queryFn,
      })

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
