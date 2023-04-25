import { useQuery } from '@tanstack/react-query'
import { Ship } from '@/components/ship'
import { getShipsList } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse, SystemsResponse } from '@/types/spacetraders'

export const SystemFleet = ({ system }: { system: SystemsResponse }) => {
  const { isSuccess, data } = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
    select: (response): SpaceTradersResponse<ShipResponse[]> => ({
      data: response.data.filter((ship) => ship.nav.systemSymbol === system.symbol),
      meta: response.meta,
    }),
  })

  if (!isSuccess) return null

  const ships = data.data

  return (
    <>
      {ships.length === 0 && (
        <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
          <div className="text-secondary text-center text-sm">
            You have no ships in <span className="font-bold">{system.symbol}</span>
          </div>
        </div>
      )}
      {ships.map((ship) => (
        <Ship key={ship.symbol} ship={ship} />
      ))}
    </>
  )
}
