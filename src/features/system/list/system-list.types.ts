import { type SystemResponse } from '@/types/spacetraders'

export type SystemListTableSchema = {
  system: SystemResponse
  presence: number
}

export type SystemListTableProps = {
  data: SystemListTableSchema[]
}
