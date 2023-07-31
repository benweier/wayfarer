import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { startTransition, useEffect, useState } from 'react'
import { useShipResponse } from '@/context/ship.context'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { relativeTime } from '@/utilities/date'

export const ShipDetailRefresh = () => {
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const client = useQueryClient()
  const ship = useShipResponse()
  const isFetching = useIsFetching({ queryKey: getShipByIdQuery.getQueryKey({ shipSymbol: ship.symbol }) }) > 0
  const state = client.getQueryState(getShipByIdQuery.getQueryKey({ shipSymbol: ship.symbol }))

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => {
        forceUpdate(Date.now())
      })
    }, 10_000)

    return () => {
      clearTimeout(timeout)
    }
  }, [lastUpdate, state?.dataUpdatedAt])

  if (!state?.dataUpdatedAt) return null

  return (
    <div className="flex items-center gap-2">
      <div className="text-secondary text-right text-sm">
        {isFetching ? '...' : `Last fetched ${relativeTime(new Date(state.dataUpdatedAt))}`}
      </div>
      <button
        className="btn btn-outline btn-warn btn-sm"
        disabled={isFetching}
        onClick={() =>
          client.invalidateQueries({ queryKey: getShipByIdQuery.getQueryKey({ shipSymbol: ship.symbol }) })
        }
      >
        Refresh
      </button>
    </div>
  )
}
