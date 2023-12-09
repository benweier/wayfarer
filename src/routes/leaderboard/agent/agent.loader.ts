import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { type AgentResponse } from '@/types/spacetraders'

export const meta: MetaFunction<Partial<{ agent: SpaceTradersResponse<AgentResponse> }>> = (t, { agent }) => {
  if (!agent) {
    return []
  }

  return [{ title: t('agent.title', { ns: 'meta', agentSymbol: agent.data.symbol }) }]
}

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
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
