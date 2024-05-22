import type { AgentResponse, RegisterAgentResponse } from '@/types/spacetraders'
import { type SpaceTradersResponse, api } from './core'

export const getAgentMutation = {
  getMutationKey: () => [{ scope: 'agent' }] as const,
  mutationFn: ({ token }: { token: string }) => {
    return api
      .get('my/agent', undefined, {
        headers: [['Authorization', `Bearer ${token}`]],
      })
      .json<SpaceTradersResponse<AgentResponse>>()
  },
}

export const createAgentMutation = {
  getMutationKey: () => [{ scope: 'register' }] as const,
  mutationFn: (payload: { symbol: string; faction: string; email?: string }) => {
    return api.post('register', payload).json<SpaceTradersResponse<RegisterAgentResponse>>()
  },
}
