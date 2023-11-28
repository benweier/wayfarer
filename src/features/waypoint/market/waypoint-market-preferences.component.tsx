import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { startTransition, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointMarketQuery } from '@/services/api/spacetraders'

const WaypointMarketRefresh = () => {
  const { t } = useTranslation()
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const client = useQueryClient()
  const waypoint = useWaypointResponse()
  const isFetching =
    useIsFetching({
      queryKey: getWaypointMarketQuery.getQueryKey({
        systemSymbol: waypoint.systemSymbol,
        waypointSymbol: waypoint.symbol,
      }),
    }) > 0
  const state = client.getQueryState(
    getWaypointMarketQuery.getQueryKey({ systemSymbol: waypoint.systemSymbol, waypointSymbol: waypoint.symbol }),
  )

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
        {isFetching ? '...' : t('general.last_updated.relative', { value: state.dataUpdatedAt })}
      </div>
      <Button
        intent="warn"
        kind="outline"
        size="small"
        disabled={isFetching}
        onClick={() =>
          client.invalidateQueries({
            queryKey: getWaypointMarketQuery.getQueryKey({
              systemSymbol: waypoint.systemSymbol,
              waypointSymbol: waypoint.symbol,
            }),
          })
        }
      >
        {t('general.refresh')}
      </Button>
    </div>
  )
}

export const WaypointMarketPreferences = () => {
  return (
    <div className="flex justify-end">
      <WaypointMarketRefresh />
    </div>
  )
}
