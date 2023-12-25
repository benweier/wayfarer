import { type AgentResponse } from '@/types/spacetraders'

export type AgentListTableSchema = {
  agent: AgentResponse
}

export type AgentListTableProps = {
  data: AgentListTableSchema[]
}
