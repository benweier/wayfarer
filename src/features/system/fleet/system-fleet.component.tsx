import { useSuspenseQuery } from '@tanstack/react-query'
import { useSystemResponse } from '@/context/system.context'
import { ShipItem } from '@/features/ship/item'
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
    return (
      <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <div className="text-secondary text-center text-sm">
          You have no ships in <span className="font-bold">{system.symbol}</span>
        </div>
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
