import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { agentSymbol } = params

    if (!agentSymbol) {
      redirect(ROUTES.LEADERBOARD)
      throw new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    try {
      const agent = await client.ensureQueryData({
        queryKey: getAgentBySymbolQuery.getQueryKey({ agentSymbol: agentSymbol.toUpperCase() }),
        queryFn: getAgentBySymbolQuery.queryFn,
      })

      return defer({ agent })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
