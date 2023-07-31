import { useQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointShipyardQuery } from '@/services/api/spacetraders'
import { WaypointShipyardNotAvailable } from './waypoint-shipyard.not-available'

export const WaypointShipyardList = () => {
  const waypoint = useWaypointResponse()

  const shipyardEnabled = waypoint.traits.findIndex((trait) => trait.symbol === 'SHIPYARD') !== -1

  const shipyardQuery = useQuery({
    queryKey: getWaypointShipyardQuery.getQueryKey({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
    queryFn: getWaypointShipyardQuery.queryFn,
    enabled: shipyardEnabled,
  })

  if (!shipyardEnabled) {
    return (
      <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <WaypointShipyardNotAvailable />
      </div>
    )
  }

  if (!shipyardQuery.isSuccess) return null

  const ships = shipyardQuery.data.data.ships ?? []

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-2">
        {ships.map((ship) => {
          return (
            <div
              key={ship.type}
              className="flex flex-col gap-2 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10"
            >
              <div className="flex items-center justify-between gap-8 lg:justify-start">
                <span className="font-semibold">{ship.name}</span>
                <span>{new Intl.NumberFormat('en-US').format(ship.purchasePrice)}</span>
              </div>
              <div className="text-secondary text-sm">{ship.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
