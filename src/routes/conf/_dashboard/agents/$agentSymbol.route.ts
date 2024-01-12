import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { meta } from '@/routes/agents/agent/agent-route.meta'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'

export const Route = new FileRoute('/_dashboard/agents/$agentSymbol').createRoute({
  parseParams: ({ agentSymbol }) => ({ agentSymbol: agentSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const agent = context.client.ensureQueryData(getAgentBySymbolQuery({ agentSymbol: params.agentSymbol }))

    return {
      agent: await agent,
    }
  },
  component: lazyRouteComponent(() => import('@/routes/agents/agent'), 'AgentRoute'),
})
