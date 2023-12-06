import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@/components/button'
import { ROUTES } from '@/config/routes'
import { useShipResponse } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { ShipDetailFlightMode } from '@/features/ship/detail/ship-detail.flight-mode'
import { ShipStatus } from '@/features/ship/status'
import { ShipTransit } from '@/features/ship/transit'
import { ShipDetailRefresh } from './ship-detail-refresh.component'

export const ShipDetail = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="headline">
          <span className="font-bold">{t('ship.registration')}:</span> {ship.registration.name} •{' '}
          {ship.registration.role} • {ship.registration.factionSymbol}
        </div>
        <ShipDetailRefresh />
      </div>

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

        <ShipStatus ship={ship} />
      </div>

      <ShipTransit nav={ship.nav} />

      {children}
    </div>
  )
}
