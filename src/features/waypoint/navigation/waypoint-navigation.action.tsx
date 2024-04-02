import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { ShipIcon } from '@/components/icons'
import * as ShipActions from '@/features/ship/actions'
import { getFuelConsumption } from '@/utilities/get-fuel-consumption.helper'
import { type WaypointNavigationActionProps } from './waypoint-navigation.types'

export const WaypointNavigationAction = ({ ship, waypoint, distance }: WaypointNavigationActionProps) => {
  const { t } = useTranslation()

  return (
    <>
      {ship.nav.waypointSymbol !== waypoint.symbol ? (
        <ShipActions.Navigate
          disabled={ship.fuel.capacity > 0 && getFuelConsumption(distance, ship.nav.flightMode) > ship.fuel.current}
          ship={ship}
          waypointSymbol={waypoint.symbol}
        >
          {(props) => (
            <Button intent="success" kind="outline" icon {...props}>
              <ShipIcon id="navigate" className="size-4" aria-hidden />
              <span className="sr-only">
                {t('waypoint.navigate_ship_to_waypoint', {
                  shipSymbol: ship.symbol,
                  waypointSymbol: waypoint.symbol,
                })}
              </span>
            </Button>
          )}
        </ShipActions.Navigate>
      ) : (
        <Button disabled icon>
          <ShipIcon id="pin" className="size-4" aria-hidden />
          <span className="sr-only">
            {t('waypoint.ship_at_waypoint', {
              shipSymbol: ship.symbol,
              waypointSymbol: waypoint.symbol,
            })}
          </span>
        </Button>
      )}
    </>
  )
}
