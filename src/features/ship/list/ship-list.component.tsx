import { useQuery } from '@tanstack/react-query'
import { getShipListQuery } from '@/services/api/spacetraders'
import { ShipItem } from '../item'

export const ShipList = () => {
  const { isSuccess, data } = useQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
  })

  if (!isSuccess) return null

  const ships = data.data

  if (ships.length === 0) {
    return (
      <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <div className="text-secondary text-center text-sm">You have don&apos;t own any ships!</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {ships.map((ship) => (
        <ShipItem key={ship.symbol} ship={ship} />
      ))}
    </div>
  )
}
