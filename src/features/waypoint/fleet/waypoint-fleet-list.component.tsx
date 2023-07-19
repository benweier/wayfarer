import { useQuery } from '@tanstack/react-query'
import { useSystemContext } from '@/context/system.context'
import { useWaypointContext } from '@/context/waypoint.context'
import { ShipItem } from '@/features/ship/item'
import { getShipsList } from '@/services/api/spacetraders'

export const WaypointFleetList = () => {
  const { systemSymbol } = useSystemContext()
  const { waypointSymbol } = useWaypointContext()
  const { isSuccess, data } = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
    select: (response) => ({
      data: response.data.filter(
        (ship) => ship.nav.systemSymbol === systemSymbol && ship.nav.waypointSymbol === waypointSymbol,
      ),
      meta: response.meta,
    }),
  })

  if (!isSuccess) return null

  const ships = data.data

  if (ships.length === 0) {
    return (
      <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <div className="text-secondary text-center text-sm">
          You have no ships at <span className="font-bold">{waypointSymbol}</span>
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
