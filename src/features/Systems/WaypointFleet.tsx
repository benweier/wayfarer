import { useQuery } from '@tanstack/react-query'
import { getShipsList } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'

export const WaypointFleet = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { isSuccess, data } = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
    select: (response): SpaceTradersResponse<ShipResponse[]> => ({
      data: response.data.filter(
        (ship) => ship.nav.systemSymbol === systemID && ship.nav.waypointSymbol === waypointID,
      ),
      meta: response.meta,
    }),
  })

  if (!isSuccess) return null

  const ships = data.data

  return (
    <div className="grid gap-8">
      <div>
        <div className="text-headline">Ships at {waypointID}</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ships.map((ship) => {
            return <div key={ship.symbol}>{ship.registration.name}</div>
          })}
        </div>
      </div>
    </div>
  )
}
