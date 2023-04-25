import { useQuery } from '@tanstack/react-query'
import { Ship } from '@/components/ship'
import { getShipsList } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'

export const Fleet = () => {
  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
  })

  if (!isSuccess) return null

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
        <Ship key={ship.symbol} ship={ship} />
      ))}
    </div>
  )
}
