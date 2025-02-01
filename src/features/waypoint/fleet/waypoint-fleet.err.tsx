import { isHttpErrorResponse } from '@/services/http'
import type { ErrorComponentProps } from '@/components/error-boundary'

export const WaypointFleetError = ({ error }: ErrorComponentProps) => {
  if (!error) return <></>

  if (isHttpErrorResponse(error)) {
    return (
      <div className="rounded border-2 border-transparent px-3 py-9">
        <div className="text-h3 text-center font-bold text-foreground-secondary">{error.statusText}</div>
      </div>
    )
  }

  return <></>
}
