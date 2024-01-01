import { type ColumnDef } from '@tanstack/react-table'
import { type ContractResponse } from '@/types/spacetraders'

export type ContractListTableSchema = {
  contract: ContractResponse
}

export type ContractListTableProps = {
  data: ContractListTableSchema[]
  columns: Array<ColumnDef<ContractListTableSchema, any>>
}
