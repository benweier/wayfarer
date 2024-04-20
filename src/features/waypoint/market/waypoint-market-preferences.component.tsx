import { Button } from '@/components/button'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointMarketQuery } from '@/services/api/spacetraders/waypoints'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { startTransition, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const WaypointMarketRefresh = () => {
  const { t } = useTranslation()
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const client = useQueryClient()
  const waypoint = useWaypointResponse()
  const waypointMarketQueryKey = getWaypointMarketQuery({
    systemSymbol: waypoint.systemSymbol,
    waypointSymbol: waypoint.symbol,
  }).queryKey
  const isFetching = useIsFetching({ queryKey: waypointMarketQueryKey }) > 0
  const state = client.getQueryState(waypointMarketQueryKey)

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

  return (
    <div className="flex items-center gap-2">
      <div className="text-foregrouns-secondary typography-xs text-right">
        {isFetching || !state ? '...' : t('general.last_updated.relative', { value: state.dataUpdatedAt })}
      </div>
      <Button
        intent="warn"
        kind="outline"
        size="small"
        disabled={isFetching}
        onClick={() => {
          void client.invalidateQueries({ queryKey: waypointMarketQueryKey })
        }}
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
