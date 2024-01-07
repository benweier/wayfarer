import { type ErrorComponentProps } from '@/components/error-boundary'
import { isHttpErrorResponse } from '@/services/http'

export const WaypointFleetError = ({ error }: ErrorComponentProps) => {
  if (!error) return <></>

  if (isHttpErrorResponse(error)) {
    return (
      <div className="rounded border-2 border-transparent px-3 py-9">
        <div className="text-secondary text-center text-xl font-bold">{error.statusText}</div>
      </div>
    )
  }

  return <></>
}
