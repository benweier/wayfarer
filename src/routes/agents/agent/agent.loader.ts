import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type AgentResponse } from '@/types/spacetraders'

export const meta: MetaFunction<Partial<{ agent: SpaceTradersResponse<AgentResponse> }>> = (t, { agent } = {}) => {
  if (!agent) {
    return []
  }

  return [{ title: t('agent.title', { ns: 'meta', agentSymbol: agent.data.symbol }) }]
}
