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

  const shipyard = data.data

  return <></>
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
