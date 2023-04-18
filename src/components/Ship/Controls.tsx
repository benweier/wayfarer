import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Modal, useModalImperativeHandle } from '@/components/Modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { createShipNavigate } from '@/services/api/spacetraders'
import { ShipResponse } from '@/types/spacetraders'
import * as Actions from './Actions'

export const Controls = ({ ship }: { ship: ShipResponse }) => {
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
            transform:
              typeof x === 'number' && typeof y === 'number'
                ? `translate(${Math.round(x)}px,${Math.round(y)}px)`
                : undefined,
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
                  <Actions.Orbit
                    ship={ship}
                    trigger={
                      <button className="btn btn-adornment w-full">
                        <span>Orbit</span>
                      </button>
                    }
                  />
                </Menu.Item>
              )}
              {ship.nav.status === 'IN_ORBIT' && (
                <Menu.Item as={Fragment}>
                  <Actions.Dock
                    ship={ship}
                    trigger={
                      <button className="btn btn-adornment w-full">
                        <span>Dock</span>
                      </button>
                    }
                  />
                </Menu.Item>
              )}
              {ship.nav.status === 'IN_ORBIT' && (
                <Menu.Item as={Fragment}>
                  <button className="btn btn-adornment w-full" onClick={() => modal.open()}>
                    <span>Navigate</span>
                  </button>
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
      <Modal size="md" ref={ref}>
        <Navigate ship={ship} />
      </Modal>
    </>
  )
}

const Navigate = ({ ship }: { ship: ShipResponse }) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'navigate'],
    mutationFn: ({ shipID, waypointID }: { shipID: string; waypointID: string }) =>
      createShipNavigate({ path: shipID, payload: { waypointSymbol: waypointID } }),
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return (
    <QuerySuspenseBoundary
      fallback={
        <div className="grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="mx-auto my-4 h-3 w-4/5 animate-pulse rounded-full bg-white/5" />
          ))}
        </div>
      }
    >
      <Actions.WaypointNavigation
        ship={ship}
        onNavigate={(waypointID) => {
          mutate({ shipID: ship.symbol, waypointID })
          close()
        }}
      />
    </QuerySuspenseBoundary>
  )
}
