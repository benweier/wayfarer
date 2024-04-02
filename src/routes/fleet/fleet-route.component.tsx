import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ShipList, ShipListFallback } from '@/features/ship/list'

export const FleetRoute = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="display-md font-bold">{t('fleet.label')}</h1>

      <div>
        <QuerySuspenseBoundary fallback={<ShipListFallback />}>
          <ShipList />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}
