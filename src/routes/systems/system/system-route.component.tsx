import { RouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ROUTES } from '@/config/routes'
import { SystemStore } from '@/context/system.context'
import { SystemDetail } from '@/features/system/detail'
import { SystemTabs } from '@/features/system/tabs'

const systemRoute = new RouteApi({ id: ROUTES.SYSTEM })

export const SystemRoute = () => {
  const { systemSymbol } = systemRoute.useParams()
  const { t } = useTranslation()

  return (
    <div key={systemSymbol} className="space-y-4 p-4">
      <h1 className="text-title">
        {t('system.label')}: <span className="whitespace-nowrap font-normal">{systemSymbol}</span>
      </h1>

      {systemSymbol && (
        <QuerySuspenseBoundary>
          <SystemStore systemSymbol={systemSymbol}>
            <SystemDetail>
              <SystemTabs />
            </SystemDetail>
          </SystemStore>
        </QuerySuspenseBoundary>
      )}
    </div>
  )
}
