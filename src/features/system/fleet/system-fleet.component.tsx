import { useSuspenseQuery } from '@tanstack/react-query'
import { useSystemResponse } from '@/context/system.context'
import { ShipItem } from '@/features/ship/item'
import { SystemFleetEmpty } from '@/features/system/fleet/system-fleet.empty'
import { getShipListQuery } from '@/services/api/spacetraders'
import { type Meta, type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'

export const SystemFleet = () => {
  const system = useSystemResponse()
  const { data } = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (response): SpaceTradersResponse<ShipResponse[], Meta> => ({
      data: response.data.filter((ship) => ship.nav.systemSymbol === system.symbol),
      meta: response.meta,
    }),
  })
  const ships = data.data

  if (ships.length === 0) {
    return <SystemFleetEmpty system={system} />
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {ships.map((ship) => (
        <ShipItem key={ship.symbol} ship={ship} />
      ))}
    </div>
  )
}
