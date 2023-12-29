import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { SystemStore } from '@/context/system.context'
import { SystemDetail } from '@/features/system/detail'
import { SystemTabs } from '@/features/system/tabs'

export const SystemViewComponent = () => {
  const { t } = useTranslation()
  const { systemSymbol } = useParams()

  return (
    <div key={systemSymbol} className="space-y-4 p-4">
      <h1 className="text-title">
        {t('system.label')}: <span className="whitespace-nowrap font-normal">{systemSymbol?.toUpperCase()}</span>
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

export const Route = withQSB()(SystemViewComponent)
