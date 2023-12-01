import { useSuspenseQuery } from '@tanstack/react-query'
import { ShipListTable } from '@/features/ship/list/ship-list.table'
import { getShipListQuery } from '@/services/api/spacetraders'
import { ShipListRefresh } from './ship-list-refresh.component'

export const ShipList = () => {
  const { data } = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const ships = data.data

  if (ships.length === 0) {
    return (
      <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <div className="text-secondary text-center text-sm">You have don&apos;t own any ships!</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <ShipListRefresh />
      </div>

      <ShipListTable data={ships.map((ship) => ({ ship }))} />
    </div>
  )
}
