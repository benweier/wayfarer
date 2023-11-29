import { useTranslation } from 'react-i18next'
import { withQSB } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'

const ShipLoadoutRouteComponent = () => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-title">
          {t('ship.loadout.label')}: <span className="font-normal">{ship.symbol}</span>
        </h1>
      </div>
      <div className="grid gap-12"></div>
    </div>
  )
}

export const Route = withQSB()(ShipLoadoutRouteComponent)
