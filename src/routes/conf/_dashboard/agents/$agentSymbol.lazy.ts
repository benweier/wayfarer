import { createLazyFileRoute } from '@tanstack/react-router'
import { AgentRoute } from '@/routes/agents/agent'

export const Route = createLazyFileRoute('/_dashboard/agents/$agentSymbol')({
  component: AgentRoute,
})
