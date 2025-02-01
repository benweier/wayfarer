import { createFileRoute, notFound } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { meta } from '@/routes/agents/agent/agent-route.meta'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'

export const Route = createFileRoute('/_dashboard/agents/$agentSymbol')({
  params: {
    parse({ agentSymbol }) {
      return { agentSymbol: agentSymbol.toUpperCase() }
    },
    stringify({ agentSymbol }) {
      return { agentSymbol: agentSymbol.toUpperCase() }
    },
  },
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    try {
      const agent = context.client.ensureQueryData(getAgentBySymbolQuery({ agentSymbol: params.agentSymbol }))

      return {
        agent: await agent,
      }
    } catch (_err) {
      throw notFound()
    }
  },
  notFoundComponent: NotFound,
})
