import { useSuspenseQuery } from '@tanstack/react-query'
import { useDesktopMediaQuery } from '@/components/responsive'
import { ShipItem } from '@/features/ship/item'
import { getShipListQuery } from '@/services/api/spacetraders'
import { ShipListRefresh } from './ship-list-refresh.component'
import { ShipListTable } from './ship-list.table'

export const ShipList = () => {
  const isDesktop = useDesktopMediaQuery()
  const { data } = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const ships = data.data

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <ShipListRefresh />
      </div>

      {isDesktop ? (
        <ShipListTable data={ships.map((ship) => ({ ship }))} />
      ) : (
        ships.map((ship) => <ShipItem ship={ship} key={ship.symbol} />)
      )}
    </div>
  )
}
