import { useIsMutating } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Card } from '@/components/card'
import { ShipIcon } from '@/components/icons'
import { ROUTES } from '@/config/routes'
import { useShipTransit } from '@/features/ship/transit'
import { type ShipResponse } from '@/types/spacetraders'
import { ShipControls } from './ship-item.controls'
import { type ShipItemProps } from './ship-item.types'

const TransitStatusPreview = ({ ship }: { ship: ShipResponse }) => {
  const transit = useShipTransit(ship)

  if (ship.nav.status !== 'IN_TRANSIT') return null

  return (
    <div className="h-0.5 grow rounded-full bg-zinc-200 dark:bg-zinc-600">
      <div className="h-full rounded-full bg-green-500" style={{ width: `${transit.progress}%` }} />
    </div>
  )
}

export const ShipItem = ({ ship }: ShipItemProps) => {
  const { t } = useTranslation()
  const isMutating =
    useIsMutating({ mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }] }) > 0

  return (
    <Card
      className={cx('@container/ship-item', {
        'pointer-events-none opacity-30': isMutating,
      })}
    >
      <div className="flex flex-row flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <div className="flex w-full flex-1 flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2 @md/ship-item:max-w-[700px]">
          <div className="[width:180px]">
            <Link to={`/fleet/ship/${ship.symbol}`} className="link text-xl font-bold">
              {ship.symbol}
            </Link>
          </div>
          <div className="relative flex w-[400px] flex-row flex-wrap items-end gap-x-2 gap-y-1">
            <div className="flex gap-8">
              <div>
                <div className="text-secondary text-xs font-medium uppercase">{t('system.label')}</div>
                <div className="text-sm font-semibold">
                  <Link className="link" to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}`}>
                    {ship.nav.systemSymbol}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-secondary text-xs font-medium uppercase">{t('waypoint.label')}</div>
                <div className="text-sm font-semibold">
                  <Link
                    className="link"
                    to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}/waypoint/${ship.nav.waypointSymbol}`}
                  >
                    {ship.nav.waypointSymbol}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex gap-x-1">
              <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                {t(ship.nav.status, { ns: 'spacetraders.nav_status' })}
              </div>
              <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                {t(ship.nav.flightMode, { ns: 'spacetraders.flight_mode' })}
              </div>
              <div className="absolute inset-x-0 -bottom-1">
                <TransitStatusPreview ship={ship} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-6 @4xl/ship-item:w-[400px] @4xl/ship-item:justify-end">
          <div className="flex justify-end gap-4 @md/ship-item:gap-6">
            <div className="flex items-center gap-1">
              <ShipIcon id="fuel" className="h-4 w-4 text-teal-500" />
              <div className="text-xs @lg/ship-item:text-sm">
                {ship.fuel.current} / {ship.fuel.capacity}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShipIcon id="cargo" className="h-4 w-4 text-fuchsia-500" />
              <div className="text-xs @lg/ship-item:text-sm">
                {ship.cargo.units} / {ship.cargo.capacity}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShipIcon id="crew" className="h-4 w-4 text-amber-500" />
              <div className="text-xs @lg/ship-item:text-sm">
                {ship.crew.current} / {ship.crew.capacity}
              </div>
            </div>
          </div>
          <ShipControls ship={ship} />
        </div>
      </div>
    </Card>
  )
}
