import { useTranslation } from 'react-i18next'
import { ShipIcon } from '@/components/icons'
import { useShipResponse } from '@/context/ship.context'
import { formatDateTime } from '@/utilities/date'
import { useShipTransit } from './use-ship-transit.hook'

export const ShipTransitStatus = () => {
  const { t } = useTranslation()
  const ship = useShipResponse()
  const transit = useShipTransit(ship)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-start">
          <div className="text-secondary text-xs uppercase">{t('ship.transit.departed')}</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{formatDateTime(transit.departed)}</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-secondary text-xs uppercase">
            {transit.status === 'complete' ? t('ship.transit.arriving') : t('ship.transit.arrived')}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{formatDateTime(transit.arrival)}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="h-1 grow rounded-full bg-zinc-200 dark:bg-zinc-600">
          <div className="h-full rounded-full bg-green-500" style={{ width: `${transit.progress}%` }} />
        </div>
        <div className="text-secondary flex w-12 justify-end text-right text-sm">
          {transit.status === 'complete' ? (
            <ShipIcon id="pin" className="size-5 text-green-500" />
          ) : (
            `${transit.remainingSeconds} s`
          )}
        </div>
      </div>
    </div>
  )
}
