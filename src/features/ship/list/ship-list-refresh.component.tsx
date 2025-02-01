import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { useUpdateInterval } from '@/hooks/use-update-interval.hook'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'

export const ShipListRefresh = () => {
  const { t } = useTranslation()
  const client = useQueryClient()
  const shipListQueryKey = getShipListQuery().queryKey
  const isFetching = useIsFetching({ queryKey: shipListQueryKey }) > 0
  const state = client.getQueryState(shipListQueryKey)

  useUpdateInterval(() => {
    return state?.dataUpdatedAt !== undefined
  }, 10_000)

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs text-right text-foreground-secondary">
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
