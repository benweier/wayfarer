import { useSuspenseQuery } from '@tanstack/react-query'
import { ShipItem } from '@/features/ship/item'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import { cx } from '@/utilities/cx'

export const Fleet = () => {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
  })
  const ships = data.data

  return (
    <div className={cx('grid gap-1', { 'opacity-30': isFetching })}>
      <div
        className={cx('absolute inset-0 backdrop-blur-xs transition-opacity duration-100 ease-in-out', {
          'pointer-events-none opacity-0': !isFetching,
          'pointer-events-auto opacity-100': isFetching,
        })}
      />
      {ships.map((ship) => (
        <ShipItem key={ship.symbol} ship={ship} />
      ))}
    </div>
  )
}
