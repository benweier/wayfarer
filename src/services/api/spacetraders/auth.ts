import { mutationOptions } from '@tanstack/react-query'
import { api } from './api'
import { AgentResponseSchema, RegisterAgentResponseSchema, SpaceTradersResponseSchema } from './schema'

export function getMyAgentMutation() {
  return mutationOptions({
    mutationKey: [{ scope: 'agent' }] as const,
    mutationFn: ({ token }: { token: string }) => {
      return api('my/agent', {
        headers: [['Authorization', `Bearer ${token}`]],
        schema: SpaceTradersResponseSchema(AgentResponseSchema),
      })
    },
  })
}

export function createMyAgentMutation() {
  return mutationOptions({
    mutationKey: [{ scope: 'register' }] as const,
    mutationFn: (payload: { symbol: string; faction: string }) => {
      return api('register', {
        method: 'POST',
        body: payload,
        schema: SpaceTradersResponseSchema(RegisterAgentResponseSchema),
      })
    },
  })
}
