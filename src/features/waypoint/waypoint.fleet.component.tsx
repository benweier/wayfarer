import { useQuery } from '@tanstack/react-query'
import { Ship } from '@/components/ship'
import { useSystemWaypointContext } from '@/context/system-waypoint.context'
import { getShipsList } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'

export const WaypointFleet = () => {
  const { systemID, waypointID } = useSystemWaypointContext()
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
    <div className="grid grid-cols-1 gap-2">
      {ships.length === 0 && (
        <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
          <div className="text-secondary text-center text-sm">
            You have no ships at <span className="font-bold">{waypointID}</span>
          </div>
        </div>
      )}
      {ships.map((ship) => {
        return <Ship key={ship.symbol} ship={ship} />
      })}
    </div>
  )
}
