import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ShipStore } from '@/context/ship.context'
import { ShipDetail } from '@/features/ship/detail'
import { ShipTabs } from '@/features/ship/tabs'

const ShipRouteComponent = () => {
  const { t } = useTranslation()
  const { shipSymbol } = useParams()

  if (!shipSymbol) return null

  return (
    <div key={shipSymbol} className="space-y-4 p-4">
      <h1 className="text-title">
        {t('ship.label')}: <span className="font-normal">{shipSymbol.toUpperCase()}</span>
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

export const Route = withQSB()(ShipRouteComponent)
