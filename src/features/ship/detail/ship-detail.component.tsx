import { useTranslation } from 'react-i18next'
import { useShipResponse } from '@/context/ship.context'
import { ShipStatus } from '@/features/ship/status'
import { ShipTransit } from '@/features/ship/transit'
import { ShipDetailRefresh } from './ship-detail-refresh.component'
import type { PropsWithChildren } from 'react'

export const ShipDetail = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div className="text-base">
          <span className="font-bold">{t('ship.registration')}:</span> {ship.registration.name} •{' '}
          {ship.registration.role} • {ship.registration.factionSymbol}
        </div>
        <ShipDetailRefresh />
      </div>

      <ShipStatus ship={ship} />

      <ShipTransit nav={ship.nav} />

      {children}
    </div>
  )
}
