import { Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ShipStore } from '@/context/ship.context'
import { ShipDetail } from '@/features/ship/detail'
import { ShipTabs } from '@/features/ship/tabs'
import { shipRoute } from '@/routes/ship.route'

export const ShipRoute = () => {
  const { shipSymbol } = shipRoute.useParams()
  const { t } = useTranslation()

  return (
    <div key={shipSymbol} className="space-y-4 p-4">
      <h1 className="text-title">
        {t('ship.label')}: <span className="font-normal">{shipSymbol}</span>
      </h1>

      <QuerySuspenseBoundary>
        <ShipStore shipSymbol={shipSymbol}>
          <ShipDetail>
            <ShipTabs />
          </ShipDetail>

          <Outlet />
        </ShipStore>
      </QuerySuspenseBoundary>
    </div>
  )
}
