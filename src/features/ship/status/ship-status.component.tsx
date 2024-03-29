import { Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon, ShipIcon } from '@/components/icons'
import { WaypointTag } from '@/components/waypoint/tag'
import { WaypointContext } from '@/context/waypoint.context'
import * as ShipActions from '@/features/ship/actions'
import { ShipDetailFlightMode } from '@/features/ship/detail/ship-detail.flight-mode'
import { hasTrait } from '@/features/waypoint/utilities/has-trait.helper'
import { type ShipResponse } from '@/types/spacetraders'

export const ShipStatus = ({ ship }: { ship: ShipResponse }) => {
  const { t } = useTranslation()
  const waypoint = useContext(WaypointContext)

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-row items-end gap-2">
        <div className="flex gap-8">
          <div>
            <div className="text-secondary text-xs uppercase">{t('system.label')}</div>
            <Link to="/systems/$systemSymbol" params={{ systemSymbol: ship.nav.systemSymbol }} className="link">
              {ship.nav.systemSymbol}
            </Link>
          </div>
          <div>
            <div className="text-secondary text-xs uppercase">{t('waypoint.label')}</div>
            <div className="flex flex-col items-start">
              <Link
                to="/systems/$systemSymbol/waypoint/$waypointSymbol"
                params={{ systemSymbol: ship.nav.systemSymbol, waypointSymbol: ship.nav.waypointSymbol }}
                className="link"
              >
                {ship.nav.waypointSymbol}
              </Link>

              {waypoint && (
                <div>
                  <WaypointTag type={waypoint.type}>
                    {t(waypoint.type, { ns: 'spacetraders.waypoint_type' })}
                  </WaypointTag>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="text-secondary text-xs uppercase">{t('ship.status')}</div>
            <div className="flex h-6 items-center gap-1">
              <Badge>{t(ship.nav.status, { ns: 'spacetraders.nav_status' })}</Badge>
              <Badge>{t(ship.nav.flightMode, { ns: 'spacetraders.flight_mode' })}</Badge>
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
          <div className="min-w-24 rounded-sm rounded-l-lg bg-zinc-100 py-2 px-3 dark:border-zinc-700 dark:bg-zinc-700/25">
            <div className="text-secondary text-right text-xs uppercase">{t('ship.fuel')}</div>
            <div className="flex items-center justify-end gap-2">
              <ShipIcon id="fuel" className="size-4 text-teal-500" />
              <div className="text-sm font-semibold">
                {ship.fuel.capacity === 0 ? (
                  <AppIcon id="infinity" className="size-5" aria-label="Infinite" />
                ) : (
                  `${ship.fuel.current} / ${ship.fuel.capacity}`
                )}
              </div>
            </div>
            <div className="h-1 rounded-full bg-teal-900/20 dark:bg-teal-900/40">
              <div
                className="h-1 rounded-full bg-teal-500/80"
                style={{ width: `${(ship.fuel.current / ship.fuel.capacity) * 100}%` }}
              />
            </div>
          </div>
          <WaypointContext.Consumer>
            {(ctx) => (
              <ShipActions.Refuel
                ship={ship}
                disabled={ship.nav.status !== 'DOCKED' || !hasTrait(ctx?.traits, ['MARKETPLACE'])}
              >
                {(props) => (
                  <Button intent="confirm" kind="flat" size="small" {...props}>
                    {t('ship.action.refuel')}
                  </Button>
                )}
              </ShipActions.Refuel>
            )}
          </WaypointContext.Consumer>
        </div>
        <div className="min-w-24 rounded-sm bg-zinc-100 py-2 px-3 dark:border-zinc-700 dark:bg-zinc-700/25">
          <div className="text-secondary text-right text-xs uppercase">{t('ship.cargo')}</div>
          <div className="flex items-center justify-end gap-2">
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
        <div className="flex flex-col items-end gap-0.5">
          <div className="w-full min-w-24 rounded-sm rounded-r-lg bg-zinc-100 py-2 px-3 dark:border-zinc-700 dark:bg-zinc-700/25">
            <div className="text-secondary text-right text-xs uppercase">{t('ship.condition')}</div>
            <div className="flex items-center justify-end gap-2">
              <ShipIcon id="condition" className="size-4 text-rose-500" />
              <div className="text-sm font-semibold">
                {ship.frame.condition} / {ship.engine.condition} / {ship.reactor.condition}
              </div>
            </div>
            <div className="h-1 rounded-full bg-rose-900/20 dark:bg-rose-900/40">
              <div
                className="h-1 rounded-full bg-rose-500/80"
                style={{
                  width: `${((ship.frame.condition + ship.engine.condition + ship.reactor.condition) / 3) * 100}%`,
                }}
              />
            </div>
          </div>
          <WaypointContext.Consumer>
            {(ctx) => (
              <ShipActions.Repair
                ship={ship}
                disabled={ship.nav.status !== 'DOCKED' || !hasTrait(ctx?.traits, ['SHIPYARD'])}
              >
                {(props) => (
                  <Button intent="confirm" kind="flat" size="small" {...props}>
                    {t('ship.action.repair')}
                  </Button>
                )}
              </ShipActions.Repair>
            )}
          </WaypointContext.Consumer>
        </div>
      </div>
    </div>
  )
}
