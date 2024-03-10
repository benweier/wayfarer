import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type AgentResponse } from '@/types/spacetraders'

export const meta: MetaFunction<{ agent: SpaceTradersResponse<AgentResponse> }> = (t, { agent } = {}) => {
  if (!agent) return []

  return [{ title: t('agent.title', { agentSymbol: agent.data.symbol }) }]
}
