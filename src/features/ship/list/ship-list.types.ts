import type { ShipResponse } from '@/types/spacetraders'
import type { Row } from '@tanstack/react-table'

export type ShipListTableSchema = { ship: ShipResponse }

export type ShipListTableProps = {
  data: ShipListTableSchema[]
}

export type ShipRowProps = { row: Row<ShipListTableSchema> }
