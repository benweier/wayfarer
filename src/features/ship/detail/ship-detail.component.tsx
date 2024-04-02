import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { useShipResponse } from '@/context/ship.context'
import { ShipStatus } from '@/features/ship/status'
import { ShipTransit } from '@/features/ship/transit'
import { ShipDetailRefresh } from './ship-detail-refresh.component'

export const ShipDetail = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="typography-base">
          <span className="font-bold">{t('ship.registration')}:</span> {ship.registration.name} •{' '}
          {ship.registration.role} • {ship.registration.factionSymbol}
        </div>
        <ShipDetailRefresh />
      </div>

      <div>
        <ShipStatus ship={ship} />
      </div>

      <div>
        <ShipTransit nav={ship.nav} />
      </div>
      {children}
    </div>
  )
}
