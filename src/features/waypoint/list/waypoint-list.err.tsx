import type { ErrorComponentProps } from '@/components/error-boundary'
import { isHttpErrorResponse } from '@/services/http'

export const WaypointListError = ({ error }: ErrorComponentProps) => {
  if (!error) return <></>

  if (isHttpErrorResponse(error)) {
    return (
      <div className="rounded border-2 border-transparent px-3 py-9">
        <div className="display-md text-center font-bold text-secondary">{error.statusText}</div>
      </div>
    )
  }

  return <></>
}
