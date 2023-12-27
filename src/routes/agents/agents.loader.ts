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
      const agents = client.ensureQueryData(getAgentListQuery({ page, limit }))

      return defer({
        page,
        agents,
      })
    } catch (err) {
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
