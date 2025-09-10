import { isResponseErrorStatus } from '@/services/http'
import type { ErrorComponentProps } from '@/components/error-boundary'

export const WaypointJumpGateError = ({ error }: ErrorComponentProps) => {
  if (!error) return <></>

  if (isResponseErrorStatus(error)) {
    return (
      <div className="rounded border-2 border-transparent px-3 py-9">
        <div className="text-h3 text-foreground-secondary text-center font-bold">{error.message}</div>
      </div>
    )
  }

  return <></>
}
