import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ShipList, ShipListFallback } from '@/features/ship/list'

export const FleetRouteComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('fleet.label')}</h1>

      <QuerySuspenseBoundary fallback={<ShipListFallback />}>
        <ShipList />
      </QuerySuspenseBoundary>
    </div>
  )
}

export const Route = withQSB()(FleetRouteComponent)
