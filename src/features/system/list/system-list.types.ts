import { type SystemsResponse } from '@/types/spacetraders'

export type SystemListTableSchema = {
  system: SystemsResponse
  presence: number
}

export type SystemListTableProps = {
  data: SystemListTableSchema[]
}
