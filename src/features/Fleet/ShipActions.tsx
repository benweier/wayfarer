import { autoPlacement, autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Popover, Transition } from '@headlessui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Fragment } from 'react'
import { WAYPOINT_TYPE } from '@/config/constants'
import { createShipDock, createShipNavigate, createShipOrbit, getWaypointsList } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

const updateShipNavStatus = produce<SpaceTradersResponse<ShipResponse>, [string]>((draft, state) => {
  draft.data.nav.status = state
})

const updateShipInFleetNavStatus = produce<SpaceTradersResponse<ShipResponse[]>, [number, string]>(
  (draft, index, state) => {
    draft.data[index].nav.status = state
  },
)

export const Orbit = ({ shipID }: { shipID: string }) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', shipID, 'orbit'],
    mutationFn: (shipID: string) => createShipOrbit({ path: shipID }),
    onMutate: (shipID) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((s) => s.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'IN_ORBIT'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'IN_ORBIT'))

      return { ship, ships }
    },
    onError: (_err, shipID, context) => {
      client.setQueryData(['ships'], context?.ships)
      client.setQueryData(['ship', shipID], context?.ship)
    },
    onSettled: (shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return (
    <button className="btn btn-sm" onClick={() => mutate(shipID)}>
      Orbit
    </button>
  )
}

export const Dock = ({ shipID }: { shipID: string }) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', shipID, 'dock'],
    mutationFn: (shipID: string) => createShipDock({ path: shipID }),
    onMutate: (shipID) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((s) => s.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'DOCKED'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'DOCKED'))

      return { ship, ships }
    },
    onError: (_err, shipID, context) => {
      client.setQueryData(['ship', shipID], context?.ship)
      client.setQueryData(['ships'], context?.ships)
    },
    onSettled: (shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return (
    <button className="btn btn-sm" onClick={() => mutate(shipID)}>
      Dock
    </button>
  )
}

export const Navigate = ({ shipID, systemID }: { shipID: string; systemID: string }) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', shipID, 'navigate'],
    mutationFn: ({ shipID, waypointID }: { shipID: string; waypointID: string }) =>
      createShipNavigate({ path: shipID, payload: { waypointSymbol: waypointID } }),
    onSettled: (shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })
  const { x, y, refs } = useFloating<HTMLButtonElement>({
    strategy: 'fixed',
    placement: 'bottom',
    middleware: [offset(12), autoPlacement({ allowedPlacements: ['top', 'bottom'] }), shift({ padding: 16 })],
    whileElementsMounted: (reference, floating, update) => {
      return autoUpdate(reference, floating, update, {
        animationFrame: true,
      })
    },
  })

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button ref={refs.setReference} className="btn btn-sm">
            Navigate
          </Popover.Button>
          <div
            ref={refs.setFloating}
            className={cx('absolute top-0', {
              'pointer-events-none': !open,
            })}
            style={{
              transform:
                typeof x === 'number' && typeof y === 'number'
                  ? `translate(${Math.round(x)}px,${Math.round(y)}px)`
                  : undefined,
            }}
          >
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-4"
            >
              <Popover.Panel className="relative w-screen max-w-xs overflow-y-auto rounded-xl bg-white bg-opacity-10 p-2 ring ring-black/5 backdrop-blur-md dark:bg-black dark:bg-opacity-10 dark:ring-white/5">
                <WaypointNavigation
                  systemID={systemID}
                  onClick={(waypointID) => {
                    mutate({ shipID, waypointID })
                    close()
                  }}
                />
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  )
}

const WaypointNavigation = ({ systemID, onClick }: { systemID: string; onClick: (waypointID: string) => void }) => {
  const { isSuccess, data } = useQuery({
    queryKey: ['system', systemID, 'waypoints'],
    queryFn: () => {
      return getWaypointsList({ path: systemID })
    },
  })

  if (!isSuccess) return null

  const waypoints = data.data

  return (
    <div className="grid gap-2">
      {waypoints.map((waypoint) => (
        <div key={waypoint.symbol}>
          <button className="btn btn-sm flex w-full flex-col gap-1" onClick={() => onClick(waypoint.symbol)}>
            <span>{waypoint.symbol}</span>
            <span className="font-light">
              {WAYPOINT_TYPE[waypoint.type] ?? waypoint.type} ({waypoint.x}, {waypoint.y})
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}
