import { useSuspenseQuery } from '@tanstack/react-query'
import { Pagination, usePagination } from '@/components/pagination'
import { getShipListQuery } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'
import { ShipItem } from '../item'
import { ShipListRefresh } from './ship-list-refresh.component'

export const ShipList = () => {
  const { page, limit, setPage } = usePagination()
  const { data, isFetching } = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey({ page, limit }),
    queryFn: getShipListQuery.queryFn,
  })
  const ships = data.data
  const meta = data.meta
  const results = {
    from: page * limit + 1 - limit,
    to: page * limit - limit + ships.length,
  }

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

      <div className={cx('grid grid-cols-1 gap-2', { 'pointer-events-none opacity-50': isFetching })}>
        {ships.map((ship) => (
          <ShipItem key={ship.symbol} ship={ship} />
        ))}
      </div>

      <div className="row grid items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          {isFetching ? (
            <div>...</div>
          ) : (
            <>
              <div>
                {results.from} - {results.to}
              </div>
              <div className="text-secondary">of</div>
              <div>{meta.total}</div>
            </>
          )}
        </div>
        <Pagination current={meta.page} total={Math.ceil(meta.total / limit)} length={5} onChange={setPage} />
      </div>
    </div>
  )
}
