import { createFileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/agents/agent/agent-route.meta'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'

export const Route = createFileRoute('/_dashboard/agents/$agentSymbol')({
  parseParams: ({ agentSymbol }) => ({ agentSymbol: agentSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const agent = context.client.ensureQueryData(getAgentBySymbolQuery({ agentSymbol: params.agentSymbol }))

    return {
      agent: await agent,
    }
  },
})
