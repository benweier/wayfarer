import { useQuery } from '@tanstack/react-query'
import { ErrorComponentProps } from '@/components/ErrorBoundary'
import { getShipyard } from '@/services/api/spacetraders'
import { isHttpError } from '@/services/http'

export const WaypointShipyard = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['shipyard', systemID, waypointID],
    queryFn: ({ signal }) => getShipyard({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const ships = data.data.ships ?? []

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-2">
        {ships.map((ship) => {
          return (
            <div
              key={ship.type}
              className="flex flex-col gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10"
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

export const ShipyardError = ({ error }: ErrorComponentProps) => {
  if (!error) return <></>

  if (isHttpError(error)) {
    return (
      <div className="rounded border-2 border-transparent px-3 py-9">
        <div className="text-secondary text-center text-xl font-bold">{error.statusText}</div>
      </div>
    )
  }

  return <></>
}
