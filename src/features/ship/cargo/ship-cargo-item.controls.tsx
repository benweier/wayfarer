import { FloatingPortal } from '@floating-ui/react'
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { Modal, useModalActions, useModalImperativeHandle } from '@/components/modal'
import { useShipResponse } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { type CargoInventory } from '@/types/spacetraders'

const CancelModal = () => {
  const { t } = useTranslation()
  const { closeModal } = useModalActions()

  return (
    <Button
      onClick={() => {
        closeModal()
      }}
    >
      {t('general.cancel')}
    </Button>
  )
}

export const ShipCargoItemControls = ({ item }: { item: CargoInventory }) => {
  const { t } = useTranslation()
  const ship = useShipResponse()
  const { ref, modal } = useModalImperativeHandle()
  const { x, y, refs } = useFloating<HTMLButtonElement>({
    strategy: 'absolute',
    placement: 'bottom-end',
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
        <Menu.Button ref={refs.setReference} className="btn btn-icon ui-open:bg-black/5 ui-open:dark:bg-blue-500">
          <span className="sr-only">Manage</span>
          <AppIcon id="more:vertical" className="size-4" aria-hidden="true" />
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
              <Menu.Items className="flex w-52 origin-top-right flex-col gap-1 overflow-y-auto rounded-md bg-zinc-100/75 p-1 ring ring-black/5 backdrop-blur-lg dark:bg-zinc-900/75 dark:ring-white/5">
                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <Button
                      intent={active ? 'dim' : undefined}
                      kind="flat"
                      size="small"
                      className="w-full text-left"
                      onClick={() => {
                        modal.open()
                      }}
                    >
                      {t('ship.action.jettison')}
                    </Button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </div>
        </FloatingPortal>
      </Menu>
      <Modal ref={ref} size="sm" closeable>
        <div className="grid gap-8">
          <h3 className="text-title">{t('general.are_you_sure')}</h3>
          <div>
            {t('ship.action.confirm_jettison', {
              itemSymbol: item.symbol,
              units: item.units,
              context: 'text',
            })}
          </div>
          <div className="flex gap-2">
            <ShipActions.Jettison
              ship={ship}
              symbol={item.symbol}
              units={item.units}
              onDone={() => {
                modal.close()
              }}
            >
              {(props) => (
                <Button intent="danger" adornment={{ start: <AppIcon id="trash" className="size-5" /> }} {...props}>
                  {t('ship.action.confirm_jettison', { context: 'action' })}
                </Button>
              )}
            </ShipActions.Jettison>
            <CancelModal />
          </div>
        </div>
      </Modal>
    </>
  )
}
