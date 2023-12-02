import { FloatingPortal } from '@floating-ui/react'
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Menu, Transition } from '@headlessui/react'
import { useIsMutating } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithRef, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { AppIcon } from '@/components/icons'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as ShipActions from '@/features/ship/actions'
import { WaypointNavigation } from '@/features/waypoint/navigation'
import { type ShipResponse } from '@/types/spacetraders'

const MenuActionButton = ({ active, children, ...props }: ComponentPropsWithRef<'button'> & { active: boolean }) => (
  <button className={cx('btn btn-flat w-full text-left', { 'btn-primary': active })} {...props}>
    {children}
  </button>
)

export const ShipControls = ({ ship }: { ship: ShipResponse }) => {
  const { t } = useTranslation()
  const isMutating =
    useIsMutating({ mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }] }) > 0
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
        <Menu.Button
          ref={refs.setReference}
          disabled={ship.nav.status === 'IN_TRANSIT' || isMutating}
          className="btn btn-icon ui-open:bg-black/5 ui-open:dark:bg-blue-500"
        >
          <span className="sr-only">Manage</span>
          <AppIcon id="more:vertical" className="h-5 w-5" aria-hidden="true" />
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
                {ship.nav.status === 'DOCKED' && (
                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <ShipActions.Orbit ship={ship}>
                        {(props) => (
                          <MenuActionButton active={active} {...props}>
                            {t('ship.action.orbit')}
                          </MenuActionButton>
                        )}
                      </ShipActions.Orbit>
                    )}
                  </Menu.Item>
                )}
                {ship.nav.status === 'IN_ORBIT' && (
                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <ShipActions.Dock ship={ship}>
                        {(props) => (
                          <MenuActionButton active={active} {...props}>
                            {t('ship.action.dock')}
                          </MenuActionButton>
                        )}
                      </ShipActions.Dock>
                    )}
                  </Menu.Item>
                )}
                {ship.nav.status === 'IN_ORBIT' && (
                  <Menu.Item as={Fragment}>
                    {({ active }) => (
                      <MenuActionButton
                        active={active}
                        onClick={() => {
                          modal.open()
                        }}
                      >
                        {t('ship.action.navigate')}
                      </MenuActionButton>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </div>
        </FloatingPortal>
      </Menu>
      <Modal ref={ref} size="lg" closeable>
        <div className="space-y-8">
          <h3 className="text-title">
            Navigate Ship: <span className="font-normal">{ship.symbol}</span>
          </h3>
          <QuerySuspenseBoundary
            fallback={
              <div className="grid">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mx-auto my-4 h-3 w-4/5 animate-pulse rounded-full bg-white/5" />
                ))}
              </div>
            }
          >
            <WaypointNavigation ship={ship} />
          </QuerySuspenseBoundary>
        </div>
      </Modal>
    </>
  )
}
