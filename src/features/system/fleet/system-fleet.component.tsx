import { useQuery } from '@tanstack/react-query'
import { useSystemContext } from '@/context/system.context'
import { ShipItem } from '@/features/ship/item'
import { getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'

export const SystemFleet = () => {
  const { systemSymbol } = useSystemContext()
  const { isSuccess, data } = useQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
    select: (response): SpaceTradersResponse<ShipResponse[]> => ({
      data: response.data.filter((ship) => ship.nav.systemSymbol === systemSymbol),
      meta: response.meta,
    }),
  })

  if (!isSuccess) return null

  const ships = data.data

  if (ships.length === 0) {
    return (
      <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <div className="text-secondary text-center text-sm">
          You have no ships in <span className="font-bold">{systemSymbol}</span>
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
