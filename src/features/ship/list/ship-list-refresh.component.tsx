import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { startTransition, useEffect, useState } from 'react'
import { Button } from '@/components/button'
import { getShipListQuery } from '@/services/api/spacetraders'
import { relativeTime } from '@/utilities/date'

export const ShipListRefresh = () => {
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const client = useQueryClient()
  const isFetching = useIsFetching({ queryKey: getShipListQuery.getQueryKey() }) > 0
  const state = client.getQueryState(getShipListQuery.getQueryKey())

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
      <div className="text-secondary text-right text-xs">
        {isFetching ? '...' : `Last updated ${relativeTime(new Date(state.dataUpdatedAt))}`}
      </div>
      <Button
        intent="warn"
        kind="outline"
        size="small"
        disabled={isFetching}
        onClick={() => {
          void client.invalidateQueries({ queryKey: getShipListQuery.getQueryKey() })
        }}
      >
        Refresh
      </Button>
    </div>
  )
}
