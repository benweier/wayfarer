import { cx } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'
import { ShipIcon } from '@/components/icons'
import { useShipResponse } from '@/context/ship.context'
import { formatDateTime } from '@/utilities/date.helper'
import { useShipTransit } from './use-ship-transit.hook'

export const ShipTransitStatus = () => {
  const { t } = useTranslation()
  const ship = useShipResponse()
  const transit = useShipTransit(ship)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-start">
          <div className="text-foreground-tertiary typography-xs uppercase">{t('ship.transit.departed')}</div>
          <div className="flex items-center gap-2">
            <div className="typography-sm font-medium">{formatDateTime(transit.departed)}</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-foreground-tertiary typography-xs uppercase">
            {transit.status === 'complete' ? t('ship.transit.arrived') : t('ship.transit.arriving')}
          </div>
          <div className="flex items-center gap-2">
            <div className="typography-sm font-medium">{formatDateTime(transit.arrival)}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div
          className={cx('bg-background-tertiary h-1.5 grow rounded-full', {
            'opacity-65': transit.status === 'complete',
          })}
        >
          <div
            className={cx('bg-background-success-primary h-full rounded-full', {
              'animate-pulse': transit.status !== 'complete',
            })}
            style={{ width: `${transit.progress}%` }}
          />
        </div>
        <div className="text-foreground-secondary typography-sm flex w-12 justify-end text-right">
          {transit.status === 'complete' ? (
            <ShipIcon id="pin" className="text-foreground-success-secondary size-5" />
          ) : (
            `${transit.remainingSeconds} s`
          )}
        </div>
      </div>
    </div>
  )
}
