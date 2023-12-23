import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@/components/button'
import { ShipIcon } from '@/components/icons'
import { ROUTES } from '@/config/routes'
import * as ShipActions from '@/features/ship/actions'
import { ShipDetailFlightMode } from '@/features/ship/detail/ship-detail.flight-mode'
import { type ShipResponse } from '@/types/spacetraders'

export const ShipStatus = ({ ship }: { ship: ShipResponse }) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-row items-end gap-2">
        <div className="flex gap-8">
          <div>
            <div className="text-secondary text-xs uppercase">{t('system.label')}</div>
            <div className="font-semibold">
              <Link className="link" to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}`}>
                {ship.nav.systemSymbol}
              </Link>
            </div>
          </div>
          <div>
            <div className="text-secondary text-xs uppercase">{t('waypoint.label')}</div>
            <div className="flex items-center gap-2">
              <div className="font-semibold">
                <Link
                  className="link"
                  to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}/waypoint/${ship.nav.waypointSymbol}`}
                >
                  {ship.nav.waypointSymbol}
                </Link>
              </div>
              <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                {t(ship.nav.status, { ns: 'spacetraders.nav_status' })}
              </div>
              <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                {t(ship.nav.flightMode, { ns: 'spacetraders.flight_mode' })}
              </div>
            </div>
            <div className="flex gap-2">
              {ship.nav.status === 'DOCKED' ? (
                <ShipActions.Orbit ship={ship}>
                  {(props) => (
                    <Button intent="primary" kind="flat" size="small" {...props}>
                      {t('ship.action.orbit')}
                    </Button>
                  )}
                </ShipActions.Orbit>
              ) : (
                <ShipActions.Dock ship={ship}>
                  {(props) => (
                    <Button intent="primary" kind="flat" size="small" {...props}>
                      {t('ship.action.dock')}
                    </Button>
                  )}
                </ShipActions.Dock>
              )}
              <ShipDetailFlightMode ship={ship} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-0.5">
        <div className="flex flex-col items-end gap-0.5">
          <div className="rounded-sm rounded-l-lg bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-700/25">
            <div className="text-secondary text-right text-xs uppercase">{t('ship.fuel')}</div>
            <div className="flex items-center gap-2">
              <ShipIcon id="fuel" className="size-4 text-teal-500" />
              <div className="text-sm font-semibold">
                {ship.fuel.current} / {ship.fuel.capacity}
              </div>
            </div>
            <div className="h-1 rounded-full bg-teal-900/20 dark:bg-teal-900/40">
              <div
                className="h-1 rounded-full bg-teal-500/80"
                style={{ width: `${(ship.fuel.current / ship.fuel.capacity) * 100}%` }}
              />
            </div>
          </div>
          <ShipActions.Refuel ship={ship} disabled={ship.nav.status !== 'DOCKED'}>
            {(props) => (
              <Button intent="confirm" kind="flat" size="small" {...props}>
                {t('ship.action.refuel')}
              </Button>
            )}
          </ShipActions.Refuel>
        </div>
        <div className="rounded-sm bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-700/25">
          <div className="text-secondary text-right text-xs uppercase">{t('ship.cargo')}</div>
          <div className="flex items-center gap-2">
            <ShipIcon id="cargo" className="size-4 text-fuchsia-500" />
            <div className="text-sm font-semibold">
              {ship.cargo.units} / {ship.cargo.capacity}
            </div>
          </div>
          <div className="h-1 rounded-full bg-fuchsia-900/20 dark:bg-fuchsia-900/40">
            <div
              className="h-1 rounded-full bg-fuchsia-500/80"
              style={{ width: `${(ship.cargo.units / ship.cargo.capacity) * 100}%` }}
            />
          </div>
        </div>
        <div className="rounded-sm rounded-r-lg bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-700/25">
          <div className="text-secondary text-right text-xs uppercase">{t('ship.condition')}</div>
          <div className="flex items-center gap-2">
            <ShipIcon id="condition" className="size-4 text-rose-500" />
            <div className="text-sm font-semibold">{ship.frame.condition}%</div>
          </div>
          <div className="h-1 rounded-full bg-rose-900/20 dark:bg-rose-900/40">
            <div className="h-1 rounded-full bg-rose-500/80" style={{ width: `${ship.frame.condition}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
