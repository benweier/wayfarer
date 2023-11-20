import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { type AgentResponse } from '@/types/spacetraders'

export const meta = ({ agent }: Partial<{ agent: SpaceTradersResponse<AgentResponse> }>) => {
  return <>{agent && <title>{`Agent: ${agent.data.symbol}`}</title>}</>
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
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
