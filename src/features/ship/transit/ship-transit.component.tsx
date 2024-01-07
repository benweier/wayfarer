import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { systemRoute } from '@/routes/system.route'
import { waypointRoute } from '@/routes/waypoint.route'
import { ShipTransitJump } from './ship-transit.jump'
import { ShipTransitNavigate } from './ship-transit.navigate'
import { ShipTransitStatus } from './ship-transit.status'
import { type ShipTransitProps } from './ship-transit.types'
import { ShipTransitWarp } from './ship-transit.warp'

export const ShipTransit = ({ nav }: ShipTransitProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col items-start">
        <div className="text-secondary text-xs uppercase">{t('ship.transit.route')}</div>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">
            <Link to={systemRoute.to} params={{ systemSymbol: nav.route.origin.systemSymbol }} className="link">
              {nav.route.origin.systemSymbol}
            </Link>{' '}
            •{' '}
            <Link
              to={waypointRoute.to}
              params={{ systemSymbol: nav.route.origin.systemSymbol, waypointSymbol: nav.route.origin.symbol }}
              className="link"
            >
              {nav.route.origin.symbol}
            </Link>
          </div>
          <div className="flex flex-row flex-nowrap -space-x-2">
            <AppIcon id="chevron:right" className="text-secondary size-4" />
            <AppIcon id="chevron:right" className="text-secondary size-4" />
            <AppIcon id="chevron:right" className="text-secondary size-4" />
          </div>
          <div className="text-sm font-medium">
            <Link to={systemRoute.to} params={{ systemSymbol: nav.route.destination.systemSymbol }} className="link">
              {nav.route.destination.systemSymbol}
            </Link>{' '}
            •{' '}
            <Link
              to={waypointRoute.to}
              params={{
                systemSymbol: nav.route.destination.systemSymbol,
                waypointSymbol: nav.route.destination.symbol,
              }}
              className="link"
            >
              {nav.route.destination.symbol}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ShipTransitNavigate
            trigger={(props) => (
              <Button intent="warn" kind="flat" size="small" disabled={nav.status !== 'IN_ORBIT'} {...props}>
                {t('ship.action.navigate')}
              </Button>
            )}
          />
          <ShipTransitWarp
            trigger={(props) => (
              <Button intent="warn" kind="flat" size="small" disabled={nav.status !== 'IN_ORBIT'} {...props}>
                {t('ship.action.warp')}
              </Button>
            )}
          />
          <ShipTransitJump
            trigger={(props) => (
              <Button intent="warn" kind="flat" size="small" disabled={nav.status !== 'IN_ORBIT'} {...props}>
                {t('ship.action.jump')}
              </Button>
            )}
          />
        </div>
      </div>

      <ShipTransitStatus />
    </div>
  )
}
