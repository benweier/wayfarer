import { Link } from '@tanstack/react-router'
import { use } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon, ShipIcon } from '@/components/icons'
import { ShipNavStatus, WaypointTraits } from '@/config/spacetraders'
import { WaypointContext } from '@/context/waypoint.context'
import * as ShipActions from '@/features/ship/actions'
import { ShipDetailFlightMode } from '@/features/ship/detail/ship-detail.flight-mode'
import { WaypointTag } from '@/features/waypoint/tag'
import { hasTrait } from '@/features/waypoint/utilities/has-trait.helper'
import type { ShipResponse } from '@/types/spacetraders'

export const ShipStatus = ({ ship }: { ship: ShipResponse }) => {
  const { t } = useTranslation()
  const waypoint = use(WaypointContext)

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-row items-end gap-2">
        <div className="flex gap-8">
          <div>
            <div className="text-sm text-foreground-secondary uppercase">{t('system.label')}</div>
            <Link to="/systems/$systemSymbol" params={{ systemSymbol: ship.nav.systemSymbol }} className="link">
              {ship.nav.systemSymbol}
            </Link>
          </div>
          <div>
            <div className="text-sm text-foreground-secondary uppercase">{t('waypoint.label')}</div>
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
            <div className="text-sm text-foreground-secondary uppercase">{t('ship.status')}</div>
            <div className="flex h-6 items-center gap-1">
              <Badge>{t(ship.nav.status, { ns: 'spacetraders.nav_status' })}</Badge>
              <Badge>{t(ship.nav.flightMode, { ns: 'spacetraders.flight_mode' })}</Badge>
            </div>
            <div className="flex gap-2">
              {ship.nav.status === ShipNavStatus.Docked ? (
                <ShipActions.Orbit ship={ship}>
                  {({ disabled, execute }) => (
                    <Button intent="info" kind="outline" size="small" disabled={disabled} onClick={() => execute()}>
                      {t('ship.action.orbit')}
                    </Button>
                  )}
                </ShipActions.Orbit>
              ) : (
                <ShipActions.Dock ship={ship}>
                  {({ disabled, execute }) => (
                    <Button intent="info" kind="outline" size="small" disabled={disabled} onClick={() => execute()}>
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
          <div className="min-w-28 rounded-sm rounded-l-lg bg-background-secondary px-3 py-2">
            <div className="text-sm text-right text-foreground-secondary uppercase">{t('ship.fuel')}</div>
            <div className="flex items-center justify-end gap-2">
              <ShipIcon id="fuel" className="size-4 text-foreground-fuel" />
              <div className="text-sm font-semibold">
                {ship.fuel.capacity === 0 ? (
                  <AppIcon id="infinity" className="size-5" aria-label="Infinite" />
                ) : (
                  `${ship.fuel.current} / ${ship.fuel.capacity}`
                )}
              </div>
            </div>
            <div className="h-1 rounded-full bg-background-fuel/30">
              <div
                className="h-1 rounded-full bg-foreground-fuel"
                style={{ width: `${(ship.fuel.current / ship.fuel.capacity) * 100}%` }}
              />
            </div>
          </div>
          <WaypointContext.Consumer>
            {(ctx) => (
              <ShipActions.Refuel
                ship={ship}
                disabled={
                  ship.nav.status !== ShipNavStatus.Docked || !hasTrait(ctx?.traits, [WaypointTraits.Marketplace])
                }
              >
                {({ disabled, execute }) => (
                  <Button intent="info" kind="outline" size="small" disabled={disabled} onClick={() => execute()}>
                    {t('ship.action.refuel')}
                  </Button>
                )}
              </ShipActions.Refuel>
            )}
          </WaypointContext.Consumer>
        </div>
        <div className="min-w-24 rounded-sm bg-background-secondary px-3 py-2">
          <div className="text-sm text-right text-foreground-secondary uppercase">{t('ship.cargo')}</div>
          <div className="flex items-center justify-end gap-2">
            <ShipIcon id="cargo" className="size-4 text-foreground-cargo" />
            <div className="text-sm font-semibold">
              {ship.cargo.units} / {ship.cargo.capacity}
            </div>
          </div>
          <div className="h-1 rounded-full bg-background-cargo/30">
            <div
              className="h-1 rounded-full bg-foreground-cargo"
              style={{ width: `${(ship.cargo.units / ship.cargo.capacity) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <div className="w-full min-w-28 rounded-sm rounded-r-lg bg-background-secondary px-3 py-2">
            <div className="text-sm text-right text-foreground-secondary uppercase">{t('ship.condition')}</div>
            <div className="flex items-center justify-end gap-2">
              <ShipIcon id="condition" className="size-4 text-foreground-condition" />
              <div className="text-sm font-semibold">
                {ship.frame.condition} / {ship.engine.condition} / {ship.reactor.condition}
              </div>
            </div>
            <div className="h-1 rounded-full bg-background-condition/30">
              <div
                className="h-1 rounded-full bg-foreground-condition"
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
                disabled={ship.nav.status !== ShipNavStatus.Docked || !hasTrait(ctx?.traits, [WaypointTraits.Shipyard])}
              >
                {({ disabled, execute }) => (
                  <Button intent="success" kind="outline" size="small" disabled={disabled} onClick={() => execute()}>
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
