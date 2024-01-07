import { type SystemResponse } from '@/types/spacetraders'

export type SystemListProps = {
  page?: number
  limit?: number
  setPage: (page: number) => void
}

export type SystemListTableSchema = {
  system: SystemResponse
  presence: number
}

export type SystemListTableProps = {
  data: SystemListTableSchema[]
}
