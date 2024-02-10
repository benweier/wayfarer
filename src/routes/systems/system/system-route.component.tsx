import { useSuspenseQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/config/routes'
import { SystemContext } from '@/context/system.context'
import { SystemDetail } from '@/features/system/detail'
import { SystemTabs } from '@/features/system/tabs'
import { getSystemByIdQuery } from '@/services/api/spacetraders'

const api = getRouteApi(ROUTES.SYSTEM)

export const SystemRoute = () => {
  const { t } = useTranslation()
  const { systemSymbol } = api.useParams()
  const system = useSuspenseQuery(getSystemByIdQuery({ systemSymbol }))

  return (
    <div key={systemSymbol} className="space-y-4 p-4">
      <h1 className="text-title">
        {t('system.label')}: <span className="whitespace-nowrap font-normal">{systemSymbol}</span>
      </h1>

      <div>
        <SystemContext.Provider value={system.data.data}>
          <SystemDetail>
            <SystemTabs />
          </SystemDetail>
        </SystemContext.Provider>
      </div>
    </div>
  )
}
