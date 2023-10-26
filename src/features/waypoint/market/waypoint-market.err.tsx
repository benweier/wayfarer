import { useContext } from 'react'
import { ErrorBoundaryContext } from 'react-error-boundary'
import { Button } from '@/components/button'
import { type ErrorComponentProps } from '@/components/error-boundary'
import { STATUS_CODES, isHttpError } from '@/services/http'

const Message = ({ error, onReset }: ErrorComponentProps) => {
  if (isHttpError(error, STATUS_CODES.NOT_FOUND)) {
    return <>Market is not available for this waypoint</>
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>An error occurred while displaying this market</div>
      {onReset !== undefined && (
        <Button
          intent="primary"
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
    <div className="px-3 py-9">
      <div className="text-secondary text-center text-lg">
        <Message error={ctx.error} onReset={ctx.resetErrorBoundary} />
      </div>
    </div>
  )
}
