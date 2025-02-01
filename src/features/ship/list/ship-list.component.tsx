import { useSuspenseQuery } from '@tanstack/react-query'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import { ShipListRefresh } from './ship-list-refresh.component'
import { ShipListTable } from './ship-list.table'

export const ShipList = () => {
  const { data } = useSuspenseQuery(getShipListQuery())
  const ships = data.data

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <ShipListRefresh />
      </div>

      <ShipListTable data={ships.map((ship) => ({ ship }))} />
    </div>
  )
}
