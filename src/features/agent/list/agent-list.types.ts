import { type AgentResponse } from '@/types/spacetraders'

export type AgentListProps = {
  page?: number
  limit?: number
  setPage: (page: number) => void
}

export type AgentListTableSchema = {
  agent: AgentResponse
}

export type AgentListTableProps = {
  data: AgentListTableSchema[]
}
