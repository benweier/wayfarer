import { useSuspenseQuery } from '@tanstack/react-query'
import { useDesktopContainerQuery } from '@/components/responsive/use-responsive.hook'
import { ShipItem } from '@/features/ship/item'
import { getShipListQuery } from '@/services/api/spacetraders'
import { ShipListRefresh } from './ship-list-refresh.component'
import { ShipListTable } from './ship-list.table'

export const ShipList = () => {
  const container = useDesktopContainerQuery()
  const { data } = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const ships = data.data

  return (
    <div ref={container.ref} className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <ShipListRefresh />
      </div>

      {container.match !== undefined && (
        <>
          {container.match ? (
            <ShipListTable data={ships.map((ship) => ({ ship }))} />
          ) : (
            ships.map((ship) => <ShipItem key={ship.symbol} ship={ship} />)
          )}
        </>
      )}
    </div>
  )
}
