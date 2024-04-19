import { AgentRoute } from '@/routes/agents/agent'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/agents/$agentSymbol')({
  component: AgentRoute,
})
