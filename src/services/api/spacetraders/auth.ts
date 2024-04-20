import { type SpaceTradersResponse, createHeaders } from '@/services/api/spacetraders/core'
import { get, post } from '@/services/fetch'
import type { AgentResponse, RegisterAgentResponse } from '@/types/spacetraders'

export const getAgentMutation = {
  getMutationKey: () => [{ scope: 'agent' }] as const,
  mutationFn: ({ token }: { token: string }) => {
    const url = new URL('my/agent', import.meta.env.SPACETRADERS_API_BASE_URL)

    return get<SpaceTradersResponse<AgentResponse>>(url, {
      headers: createHeaders([['Authorization', `Bearer ${token}`]]),
    })
  },
}

export const createAgentMutation = {
  getMutationKey: () => [{ scope: 'register' }] as const,
  mutationFn: (payload: { symbol: string; faction: string; email?: string }) => {
    const url = new URL('register', import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<RegisterAgentResponse>>(url, payload, { headers: createHeaders() })
  },
}
