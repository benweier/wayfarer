import { useSuspenseQuery } from '@tanstack/react-query'
import { getShipListQuery } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'
import { ShipItem } from '../item'
import { ShipListRefresh } from './ship-list-refresh.component'

export const ShipList = () => {
  const { data, isFetching } = useSuspenseQuery({
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

      <div className={cx('grid gap-2', { 'pointer-events-none opacity-50': isFetching })}>
        {ships.map((ship) => (
          <ShipItem key={ship.symbol} ship={ship} />
        ))}
      </div>
    </div>
  )
}
