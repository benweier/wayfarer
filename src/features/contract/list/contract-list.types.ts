import type { ContractResponse } from '@/types/spacetraders'
import type { ColumnDef } from '@tanstack/react-table'

export type ContractListTableSchema = {
  contract: ContractResponse
}

export type ContractListTableProps = {
  data: ContractListTableSchema[]
  columns: Array<ColumnDef<ContractListTableSchema, any>>
}
