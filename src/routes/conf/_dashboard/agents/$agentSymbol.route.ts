import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/agents/agent/agent-route.meta'

export const Route = new FileRoute('/_dashboard/agents/$agentSymbol').createRoute({
  parseParams: ({ agentSymbol }) => ({ agentSymbol: agentSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
})
