import { Button } from '@/components/button'
import { useWaypointResponse } from '@/context/waypoint.context'
import { useUpdateInterval } from '@/hooks/use-update-interval.hook'
import { getWaypointMarketQuery } from '@/services/api/spacetraders/waypoints'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const WaypointMarketRefresh = () => {
  const { t } = useTranslation()
  const client = useQueryClient()
  const waypoint = useWaypointResponse()
  const waypointMarketQueryKey = getWaypointMarketQuery({
    systemSymbol: waypoint.systemSymbol,
    waypointSymbol: waypoint.symbol,
  }).queryKey
  const isFetching = useIsFetching({ queryKey: waypointMarketQueryKey }) > 0
  const state = client.getQueryState(waypointMarketQueryKey)

  useUpdateInterval(() => {
    return state?.dataUpdatedAt !== undefined
  }, 10_000)

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
