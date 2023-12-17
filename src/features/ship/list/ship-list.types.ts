import { type ShipResponse } from '@/types/spacetraders'

export type ShipListTableSchema = { ship: ShipResponse }

export type ShipListTableProps = {
  data: ShipListTableSchema[]
}
