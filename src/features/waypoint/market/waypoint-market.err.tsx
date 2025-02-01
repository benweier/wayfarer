import { use } from 'react'
import { ErrorBoundaryContext } from 'react-error-boundary'
import { Button } from '@/components/button'
import { StatusCode, isHttpErrorResponse } from '@/services/http'
import type { ErrorComponentProps } from '@/components/error-boundary'

const Message = ({ error, onReset }: ErrorComponentProps) => {
  if (isHttpErrorResponse(error, StatusCode.NotFound)) {
    return <>Market is not available for this waypoint</>
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>An error occurred while displaying this market</div>
      {onReset !== undefined && (
        <Button
          intent="info"
          onClick={() => {
            onReset()
          }}
        >
          Try again
        </Button>
      )}
    </div>
  )
}

export const WaypointMarketError = () => {
  const ctx = use(ErrorBoundaryContext)

  if (!ctx?.error) return <></>

  return (
    <div className="px-3 py-9">
      <div className="text-lg text-center font-bold text-foreground-secondary">
        <Message error={ctx.error} onReset={ctx.resetErrorBoundary} />
      </div>
    </div>
  )
}
