import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { agentsRoute } from '@/routes/agents/agents.routes'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'
import { meta } from './agent-route.meta'

export const agentRoute = new Route({
  path: '$agentSymbol',
  getParentRoute: () => agentsRoute,
  parseParams: ({ agentSymbol }) => ({ agentSymbol: agentSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const agent = context.client.ensureQueryData(getAgentBySymbolQuery({ agentSymbol: params.agentSymbol }))

    return {
      agent: await agent,
    }
  },
  component: lazyRouteComponent(() => import('./agent-route.component'), 'AgentRoute'),
})
