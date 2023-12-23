import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { SystemList, SystemListFallback } from '@/features/system/list'

const SystemListComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('systems.label')}</h1>

      <QuerySuspenseBoundary fallback={<SystemListFallback />}>
        <SystemList />
      </QuerySuspenseBoundary>
    </div>
  )
}

export const Route = withQSB()(SystemListComponent)
