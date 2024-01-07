import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { agentsRoute } from '@/routes/agents.routes'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'

export const agentRoute = new Route({
  path: '$agentSymbol',
  getParentRoute: () => agentsRoute,
  parseParams: ({ agentSymbol }) => ({ agentSymbol: agentSymbol.toUpperCase() }),
  loader: async ({ context, params }) => {
    const agent = context.client.ensureQueryData(getAgentBySymbolQuery({ agentSymbol: params.agentSymbol }))

    return {
      agent: await agent,
    }
  },
  component: lazyRouteComponent(() => import('@/routes/agents/agent'), 'AgentRoute'),
})
