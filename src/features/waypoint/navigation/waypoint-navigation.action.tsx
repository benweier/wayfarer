import { Translation, useTranslation } from 'react-i18next'
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
          disabled={getFuelConsumption(distance, ship.nav.flightMode) > ship.fuel.current && ship.fuel.capacity > 0}
          ship={ship}
          waypointSymbol={waypoint.symbol}
        >
          {(props) => (
            <Button intent="confirm" kind="flat" {...props}>
              <ShipIcon id="navigate" className="size-4" aria-hidden />
              <span className="sr-only">
                <Translation>
                  {(t) =>
                    t('waypoint.navigate_ship_to_waypoint', {
                      shipSymbol: ship.symbol,
                      waypointSymbol: waypoint.symbol,
                    })
                  }
                </Translation>
              </span>
            </Button>
          )}
        </ShipActions.Navigate>
      ) : (
        <Button
          disabled
          title={t('waypoint.ship_at_waypoint', {
            shipSymbol: ship.symbol,
            waypointSymbol: waypoint.symbol,
          })}
        >
          <ShipIcon id="pin" className="size-4" aria-hidden />
        </Button>
      )}
    </>
  )
}
