import { Button } from '@/components/button'
import * as Dropdown from '@/components/dropdown'
import { AppIcon } from '@/components/icons'
import { ShipNavStatus } from '@/config/spacetraders'
import * as ShipActions from '@/features/ship/actions'
import type { ShipResponse } from '@/types/spacetraders'
import { useIsMutating } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

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
        <ShipActions.FlightMode ship={ship} flightMode="CRUISE">
          {({ execute, disabled }) => (
            <Dropdown.RadioItem onSelect={() => execute()} disabled={disabled} value="CRUISE">
              {t('ship.flight_mode.cruise')}
            </Dropdown.RadioItem>
          )}
        </ShipActions.FlightMode>

        <ShipActions.FlightMode ship={ship} flightMode="BURN">
          {({ execute, disabled }) => (
            <Dropdown.RadioItem onSelect={() => execute()} disabled={disabled} value="BURN">
              {t('ship.flight_mode.burn')}
            </Dropdown.RadioItem>
          )}
        </ShipActions.FlightMode>

        <ShipActions.FlightMode ship={ship} flightMode="DRIFT">
          {({ execute, disabled }) => (
            <Dropdown.RadioItem onSelect={() => execute()} disabled={disabled} value="DRIFT">
              {t('ship.flight_mode.drift')}
            </Dropdown.RadioItem>
          )}
        </ShipActions.FlightMode>

        <ShipActions.FlightMode ship={ship} flightMode="STEALTH">
          {({ execute, disabled }) => (
            <Dropdown.RadioItem onSelect={() => execute()} disabled={disabled} value="STEALTH">
              {t('ship.flight_mode.stealth')}
            </Dropdown.RadioItem>
          )}
        </ShipActions.FlightMode>
      </Dropdown.RadioGroup>
    </Dropdown.Field>
  )
}
