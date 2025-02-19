import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ShipList, ShipListFallback } from '@/features/ship/list'
import { useFleetCommands } from './use-fleet-commands.hook'

export const FleetRoute = () => {
  const { t } = useTranslation()

  useFleetCommands()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-h3 font-bold">{t('fleet.label')}</h1>

      <div>
        <QuerySuspenseBoundary fallback={<ShipListFallback />}>
          <ShipList />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}
