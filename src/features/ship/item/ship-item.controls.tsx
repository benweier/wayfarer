import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Modal, useModalImperativeHandle } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import * as ShipActions from '@/features/ship/actions'
import { getWaypointsList } from '@/services/api/spacetraders'
import { ShipResponse } from '@/types/spacetraders'

export const ShipControls = ({ ship }: { ship: ShipResponse }) => {
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
      <Menu as="div" className="relative">
        <Menu.Button ref={refs.setReference} className="btn btn-icon ui-open:bg-black/5 ui-open:dark:bg-white/5">
          <span className="sr-only">Manage</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>

        <div
          ref={refs.setFloating}
          className="absolute left-0 top-0 w-max"
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
            <Menu.Items className="relative flex w-52 origin-top-right flex-col gap-1 overflow-y-auto rounded-md bg-zinc-100/75 p-1 ring ring-black/5 backdrop-blur-lg dark:bg-zinc-900/75 dark:ring-white/5">
              {ship.nav.status === 'DOCKED' && (
                <Menu.Item as={Fragment}>
                  <ShipActions.Orbit ship={ship} trigger={<button className="btn w-full text-left">Orbit</button>} />
                </Menu.Item>
              )}
              {ship.nav.status === 'IN_ORBIT' && (
                <Menu.Item as={Fragment}>
                  <ShipActions.Dock ship={ship} trigger={<button className="btn w-full text-left">Dock</button>} />
                </Menu.Item>
              )}
              {ship.nav.status === 'IN_ORBIT' && (
                <Menu.Item as={Fragment}>
                  <button className="btn w-full text-left" onClick={() => modal.open()}>
                    Navigate
                  </button>
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
      <Modal size="md" ref={ref}>
        <div className="grid gap-8">
          <h3 className="text-title">
            Navigate Ship: <span className="font-normal">{ship.symbol}</span>{' '}
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
  const { isSuccess, data } = useQuery({
    queryKey: ['system', ship.nav.systemSymbol, 'waypoints'],
    queryFn: () => {
      return getWaypointsList({ path: ship.nav.systemSymbol })
    },
  })

  if (!isSuccess) return null

  const waypoints = data.data

  return (
    <div className="grid gap-3">
      {waypoints.map((waypoint) => (
        <div key={waypoint.symbol} className="flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold">{waypoint.symbol}</div>
            <div className="flex flex-row gap-2">
              <WaypointTag type={waypoint.type}>{WAYPOINT_TYPE.get(waypoint.type) ?? waypoint.type}</WaypointTag>
              <div className="text-xs font-light">
                ({waypoint.x}, {waypoint.y})
              </div>
            </div>
          </div>
          <ShipActions.Navigate
            ship={ship}
            waypointID={waypoint.symbol}
            trigger={
              ship.nav.waypointSymbol !== waypoint.symbol ? (
                <button className="btn btn-confirm btn-outline btn-sm">
                  <PaperAirplaneIcon className="h-5 w-5" />
                  <span className="sr-only">
                    Navigate ship {ship.symbol} to waypoint {waypoint.symbol}
                  </span>
                </button>
              ) : (
                <button disabled className="btn btn-sm">
                  <MapPinIcon className="h-5 w-5" />
                  <span className="sr-only">
                    Ship {ship.symbol} is already at waypoint {waypoint.symbol}
                  </span>
                </button>
              )
            }
          />
        </div>
      ))}
    </div>
  )
}
