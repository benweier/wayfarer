import { Button } from '@/components/button'
import { useShipResponse } from '@/context/ship.context'
import { useUpdateInterval } from '@/hooks/use-update-interval.hook'
import { getShipByIdQuery } from '@/services/api/spacetraders/fleet'
import { getWaypointByIdQuery } from '@/services/api/spacetraders/waypoints'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export const ShipDetailRefresh = () => {
  const { t } = useTranslation()
  const client = useQueryClient()
  const ship = useShipResponse()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const isFetching = useIsFetching({ queryKey: shipByIdQueryKey }) > 0
  const state = client.getQueryState(shipByIdQueryKey)

  useUpdateInterval(() => {
    return state?.dataUpdatedAt !== undefined
  }, 10_000)

  return (
    <div className="flex items-center gap-2">
      <div className="text-foreground-secondary typography-xs text-right">
        {isFetching || !state ? '...' : t('general.last_updated.relative', { value: state.dataUpdatedAt })}
      </div>
      <Button
        intent="warn"
        kind="outline"
        size="small"
        disabled={isFetching}
        onClick={() => {
          void client.invalidateQueries({ queryKey: shipByIdQueryKey })
          void client.invalidateQueries({
            queryKey: getWaypointByIdQuery({
              systemSymbol: ship.nav.systemSymbol,
              waypointSymbol: ship.nav.waypointSymbol,
            }).queryKey,
          })
        }}
      >
        {t('general.refresh')}
      </Button>
    </div>
  )
}
