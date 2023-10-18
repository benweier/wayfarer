import { FloatingPortal } from '@floating-ui/react'
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Menu, Transition } from '@headlessui/react'
import { useIsMutating, useSuspenseQuery } from '@tanstack/react-query'
import { type ComponentPropsWithRef, Fragment } from 'react'
import { Badge } from '@/components/badge'
import { AppIcon, ShipIcon } from '@/components/icons'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import * as ShipActions from '@/features/ship/actions'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

const MenuActionButton = ({ active, children, ...props }: ComponentPropsWithRef<'button'> & { active: boolean }) => (
  <button className={cx('btn btn-flat w-full text-left', { 'btn-primary': active })} {...props}>
    {children}
  </button>
)

export const ShipControls = ({ ship }: { ship: ShipResponse }) => {
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
                            Orbit
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
                            Dock
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
                        Navigate
                      </MenuActionButton>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </div>
        </FloatingPortal>
      </Menu>
      <Modal size="md" ref={ref} closeable>
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
            <Navigate ship={ship} />
          </QuerySuspenseBoundary>
        </div>
      </Modal>
    </>
  )
}

const Navigate = ({ ship }: { ship: ShipResponse }) => {
  const { data } = useSuspenseQuery({
    queryKey: getWaypointListQuery.getQueryKey({ systemSymbol: ship.nav.systemSymbol }),
    queryFn: getWaypointListQuery.queryFn,
  })
  const waypoints = data.data

  return (
    <div className="space-y-4">
      {waypoints.map((waypoint) => (
        <div key={waypoint.symbol} className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="font-semibold">{waypoint.symbol}</div>
            <div className="flex flex-row gap-2">
              <WaypointTag type={waypoint.type}>{WAYPOINT_TYPE.get(waypoint.type)}</WaypointTag>
              <div className="text-secondary text-xs">
                ({waypoint.x}, {waypoint.y})
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {waypoint.traits.map((trait) => (
                <Badge key={trait.symbol}>{trait.name}</Badge>
              ))}
            </div>
          </div>
          <ShipActions.Navigate ship={ship} waypointSymbol={waypoint.symbol}>
            {ship.nav.waypointSymbol !== waypoint.symbol
              ? (props) => (
                  <button className="btn btn-icon btn-outline btn-confirm" {...props}>
                    <ShipIcon id="navigate" className="h-4 w-4" aria-hidden />
                    <span className="sr-only">
                      Navigate ship {ship.symbol} to waypoint {waypoint.symbol}
                    </span>
                  </button>
                )
              : () => (
                  <div className="btn btn-disabled btn-icon">
                    <ShipIcon id="pin" className="h-4 w-4" aria-hidden />
                    <span className="sr-only">
                      Ship {ship.symbol} is already at waypoint {waypoint.symbol}
                    </span>
                  </div>
                )}
          </ShipActions.Navigate>
        </div>
      ))}
    </div>
  )
}
