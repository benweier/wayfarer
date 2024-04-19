import { Button } from '@/components/button'
import { getShipListQuery } from '@/services/api/spacetraders'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { startTransition, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ShipListRefresh = () => {
  const { t } = useTranslation()
  const [lastUpdate, forceUpdate] = useState(() => Date.now())
  const client = useQueryClient()
  const shipListQueryKey = getShipListQuery().queryKey
  const isFetching = useIsFetching({ queryKey: shipListQueryKey }) > 0
  const state = client.getQueryState(shipListQueryKey)

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
          void client.invalidateQueries({ queryKey: shipListQueryKey })
        }}
      >
        {t('general.refresh')}
      </Button>
    </div>
  )
}
