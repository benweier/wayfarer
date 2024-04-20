import { Button } from '@/components/button'
import type { ErrorComponentProps } from '@/components/error-boundary'
import { StatusCode, isHttpErrorResponse } from '@/services/http'
import { useContext } from 'react'
import { ErrorBoundaryContext } from 'react-error-boundary'

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
  const ctx = useContext(ErrorBoundaryContext)

  if (!ctx?.error) return <></>

  return (
    <div className="py-9 px-3">
      <div className="text-foreground-secondary typography-lg text-center font-bold">
        <Message error={ctx.error} onReset={ctx.resetErrorBoundary} />
      </div>
    </div>
  )
}
