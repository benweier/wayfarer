import { useIsMutating } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import * as Dropdown from '@/components/dropdown'
import { AppIcon } from '@/components/icons'
import { ShipFlightMode, ShipNavStatus } from '@/config/spacetraders'
import * as ShipActions from '@/features/ship/actions'
import type { ShipResponse } from '@/types/spacetraders'

export const ShipDetailFlightMode = ({ ship }: { ship: ShipResponse }) => {
  const { t } = useTranslation()
  const isMutating =
    useIsMutating({ mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }] }) > 0

  return (
    <Dropdown.Field
      trigger={
        <Button
          intent="success"
          kind="outline"
          size="small"
          adornment={{ end: <AppIcon id="chevron:down" className="size-4" /> }}
          disabled={isMutating || ship.fuel.capacity === 0 || ship.nav.status === ShipNavStatus.InTransit}
        >
          {t('ship.action.flight_mode')}
        </Button>
      }
    >
      <Dropdown.RadioGroup value={ship.nav.flightMode}>
        <ShipActions.FlightMode ship={ship} flightMode={ShipFlightMode.Cruise}>
          {({ execute, disabled }) => (
            <Dropdown.RadioItem onSelect={() => execute()} disabled={disabled} value={ShipFlightMode.Cruise}>
              {t(ShipFlightMode.Cruise, { ns: 'spacetraders.flight_mode' })}
            </Dropdown.RadioItem>
          )}
        </ShipActions.FlightMode>

        <ShipActions.FlightMode ship={ship} flightMode={ShipFlightMode.Burn}>
          {({ execute, disabled }) => (
            <Dropdown.RadioItem onSelect={() => execute()} disabled={disabled} value={ShipFlightMode.Burn}>
              {t(ShipFlightMode.Burn, { ns: 'spacetraders.flight_mode' })}
            </Dropdown.RadioItem>
          )}
        </ShipActions.FlightMode>

        <ShipActions.FlightMode ship={ship} flightMode={ShipFlightMode.Drift}>
          {({ execute, disabled }) => (
            <Dropdown.RadioItem onSelect={() => execute()} disabled={disabled} value={ShipFlightMode.Drift}>
              {t(ShipFlightMode.Drift, { ns: 'spacetraders.flight_mode' })}
            </Dropdown.RadioItem>
          )}
        </ShipActions.FlightMode>

        <ShipActions.FlightMode ship={ship} flightMode={ShipFlightMode.Stealth}>
          {({ execute, disabled }) => (
            <Dropdown.RadioItem onSelect={() => execute()} disabled={disabled} value={ShipFlightMode.Stealth}>
              {t(ShipFlightMode.Stealth, { ns: 'spacetraders.flight_mode' })}
            </Dropdown.RadioItem>
          )}
        </ShipActions.FlightMode>
      </Dropdown.RadioGroup>
    </Dropdown.Field>
  )
}
