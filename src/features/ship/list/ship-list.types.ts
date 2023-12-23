import { type Row } from '@tanstack/react-table'
import { type ShipResponse } from '@/types/spacetraders'

export type ShipListTableSchema = { ship: ShipResponse }

export type ShipListTableProps = {
  data: ShipListTableSchema[]
}

export type ShipRowProps = { row: Row<ShipListTableSchema> }
