import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { ShipTransitJump } from './ship-transit.jump'
import { ShipTransitNavigate } from './ship-transit.navigate'
import { ShipTransitStatus } from './ship-transit.status'
import { ShipTransitWarp } from './ship-transit.warp'
import type { ShipTransitProps } from './ship-transit.types'

export const ShipTransit = ({ nav }: ShipTransitProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col items-start">
        <div className="text-sm text-foreground-secondary uppercase">{t('ship.transit.route')}</div>
        <div className="flex items-center gap-2">
          <div className="font-medium">
            <Link to="/systems/$systemSymbol" params={{ systemSymbol: nav.route.origin.systemSymbol }} className="link">
              {nav.route.origin.systemSymbol}
            </Link>{' '}
            •{' '}
            <Link
              to="/systems/$systemSymbol/waypoint/$waypointSymbol"
              params={{ systemSymbol: nav.route.origin.systemSymbol, waypointSymbol: nav.route.origin.symbol }}
              className="link"
            >
              {nav.route.origin.symbol}
            </Link>
          </div>
          <div className="-space-x-2 flex flex-row flex-nowrap">
            <AppIcon id="chevron:right" className="size-4 text-foreground-tertiary" />
            <AppIcon id="chevron:right" className="size-4 text-foreground-tertiary" />
            <AppIcon id="chevron:right" className="size-4 text-foreground-tertiary" />
          </div>
          <div className="font-medium">
            <Link
              to="/systems/$systemSymbol"
              params={{ systemSymbol: nav.route.destination.systemSymbol }}
              className="link"
            >
              {nav.route.destination.systemSymbol}
            </Link>{' '}
            •{' '}
            <Link
              to="/systems/$systemSymbol/waypoint/$waypointSymbol"
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
        <div className="flex items-center gap-2">
          <ShipTransitNavigate
            trigger={
              <Button intent="warn" kind="outline" size="small">
                {t('ship.action.navigate')}
              </Button>
            }
          />
          <ShipTransitWarp
            trigger={
              <Button intent="warn" kind="outline" size="small">
                {t('ship.action.warp')}
              </Button>
            }
          />
          <ShipTransitJump
            trigger={
              <Button intent="warn" kind="outline" size="small">
                {t('ship.action.jump')}
              </Button>
            }
          />
        </div>
      </div>

      <ShipTransitStatus />
    </div>
  )
}
