import { type ErrorComponentProps } from '@/components/error-boundary'
import { isHttpErrorResponse } from '@/services/http'

export const WaypointShipyardError = ({ error }: ErrorComponentProps) => {
  if (!error) return <></>

  if (isHttpErrorResponse(error)) {
    return (
      <div className="rounded border-2 border-transparent py-9 px-3">
        <div className="text-secondary text-center text-xl font-bold">{error.message}</div>
      </div>
    )
  }

  return <></>
}
