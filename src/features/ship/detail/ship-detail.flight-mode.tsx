import { FloatingPortal } from '@floating-ui/react'
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Menu, Transition } from '@headlessui/react'
import { useIsMutating } from '@tanstack/react-query'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import * as ShipActions from '@/features/ship/actions'
import { type ShipResponse } from '@/types/spacetraders'

export const ShipDetailFlightMode = ({ ship }: { ship: ShipResponse }) => {
  const { t } = useTranslation()
  const isMutating =
    useIsMutating({ mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }] }) > 0
  const { x, y, refs } = useFloating<HTMLButtonElement>({
    strategy: 'absolute',
    placement: 'bottom',
    middleware: [offset(8), shift({ padding: 4 })],
    whileElementsMounted: (reference, floating, update) => {
      return autoUpdate(reference, floating, update, {
        animationFrame: true,
      })
    },
  })

  return (
    <>
      <Menu>
        <Menu.Button as={Fragment}>
          <Button
            ref={refs.setReference}
            intent="confirm"
            kind="flat"
            size="small"
            disabled={isMutating || ship.fuel.capacity === 0 || ship.nav.status === 'IN_TRANSIT'}
          >
            {t('ship.action.flight_mode')}
          </Button>
        </Menu.Button>

        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className="absolute left-0 top-0 z-10 w-max"
            style={{
              transform: `translate(${Math.round(x)}px,${Math.round(y)}px)`,
            }}
          >
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="flex w-36 origin-top-right flex-col gap-1 overflow-y-auto rounded-md bg-zinc-100/75 p-1 ring ring-black/5 backdrop-blur-lg dark:bg-zinc-900/75 dark:ring-white/5">
                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <ShipActions.FlightMode ship={ship} flightMode="CRUISE">
                      {(props) => (
                        <Button
                          intent={active ? 'dim' : undefined}
                          kind="flat"
                          size="small"
                          className="text-left"
                          {...props}
                        >
                          {t('ship.flight_mode.cruise')}
                        </Button>
                      )}
                    </ShipActions.FlightMode>
                  )}
                </Menu.Item>
                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <ShipActions.FlightMode ship={ship} flightMode="BURN">
                      {(props) => (
                        <Button
                          intent={active ? 'dim' : undefined}
                          kind="flat"
                          size="small"
                          className="text-left"
                          {...props}
                        >
                          {t('ship.flight_mode.burn')}
                        </Button>
                      )}
                    </ShipActions.FlightMode>
                  )}
                </Menu.Item>
                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <ShipActions.FlightMode ship={ship} flightMode="DRIFT">
                      {(props) => (
                        <Button
                          intent={active ? 'dim' : undefined}
                          kind="flat"
                          size="small"
                          className="text-left"
                          {...props}
                        >
                          {t('ship.flight_mode.drift')}
                        </Button>
                      )}
                    </ShipActions.FlightMode>
                  )}
                </Menu.Item>
                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <ShipActions.FlightMode ship={ship} flightMode="STEALTH">
                      {(props) => (
                        <Button
                          intent={active ? 'dim' : undefined}
                          kind="flat"
                          size="small"
                          className="text-left"
                          {...props}
                        >
                          {t('ship.flight_mode.stealth')}
                        </Button>
                      )}
                    </ShipActions.FlightMode>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </div>
        </FloatingPortal>
      </Menu>
    </>
  )
}
