import { Button } from '@/components/button'
import { useShipResponse } from '@/context/ship.context'
import { getShipByIdQuery, getWaypointByIdQuery } from '@/services/api/spacetraders'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { startTransition, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ShipDetailRefresh = () => {
  const { t } = useTranslation()
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const client = useQueryClient()
  const ship = useShipResponse()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const isFetching = useIsFetching({ queryKey: shipByIdQueryKey }) > 0
  const state = client.getQueryState(shipByIdQueryKey)

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
