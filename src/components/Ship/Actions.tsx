import { autoPlacement, autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Popover, Transition } from '@headlessui/react'
import { MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import {
  ButtonHTMLAttributes,
  FC,
  Fragment,
  PropsWithRef,
  ReactElement,
  cloneElement,
  createElement,
  isValidElement,
} from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '@/components/Modal'
import { QuerySuspenseBoundary } from '@/components/QuerySuspenseBoundary'
import { WAYPOINT_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import {
  createShipDock,
  createShipExtract,
  createShipJettison,
  createShipJump,
  createShipNavigate,
  createShipOrbit,
  createShipRefine,
  createShipRefuel,
  createShipScanWaypoint,
  createShipSurvey,
  createShipWarp,
  getWaypointsList,
} from '@/services/api/spacetraders'
import { SpaceTradersError, SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, isHttpError } from '@/services/http'
import { useAuthStore } from '@/services/store/auth'
import { useShipCooldownStore } from '@/services/store/ship.cooldown'
import { useShipSurveyStore } from '@/services/store/ship.survey'
import {
  CooldownResponse,
  FuelResponse,
  NavigationResponse,
  ShipCargo,
  ShipResponse,
  SurveyResponse,
} from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

export const updateShipNavStatus = produce<SpaceTradersResponse<ShipResponse>, [string]>((draft, state) => {
  draft.data.nav.status = state
})

export const updateShipInFleetNavStatus = produce<SpaceTradersResponse<ShipResponse[]>, [number, string]>(
  (draft, index, state) => {
    draft.data[index].nav.status = state
  },
)

export const updateShipNav = produce<SpaceTradersResponse<ShipResponse>, [NavigationResponse]>((draft, state) => {
  draft.data.nav = state
})

export const updateShipInFleetNav = produce<SpaceTradersResponse<ShipResponse[]>, [number, NavigationResponse]>(
  (draft, index, state) => {
    draft.data[index].nav = state
  },
)

export const updateShipCargo = produce<SpaceTradersResponse<ShipResponse>, [ShipCargo]>((draft, state) => {
  draft.data.cargo = state
})

export const updateShipInFleetCargo = produce<SpaceTradersResponse<ShipResponse[]>, [number, ShipCargo]>(
  (draft, index, state) => {
    draft.data[index].cargo = state
  },
)

export const updateShipFuel = produce<SpaceTradersResponse<ShipResponse>, [FuelResponse]>((draft, state) => {
  draft.data.fuel = state
})

export const updateShipInFleetFuel = produce<SpaceTradersResponse<ShipResponse[]>, [number, FuelResponse]>(
  (draft, index, state) => {
    draft.data[index].fuel = state
  },
)

export const Orbit = ({
  ship,
  trigger = (props) => (
    <button className="btn btn-sm" {...props}>
      Orbit
    </button>
  ),
}: {
  ship: ShipResponse
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'orbit'],
    mutationFn: (shipID: string) => createShipOrbit({ path: shipID }),
    onMutate: (shipID) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'IN_ORBIT'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'IN_ORBIT'))

      return { ship, ships }
    },
    onError: (_err, shipID, ctx) => {
      client.setQueryData(['ships'], ctx?.ships)
      client.setQueryData(['ship', shipID], ctx?.ship)
    },
    onSettled: (_res, _err, shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? ship.nav.status !== 'DOCKED',
        onClick: () => mutate(ship.symbol),
      })
    : createElement(trigger, {
        disabled: ship.nav.status !== 'DOCKED',
        onClick: () => mutate(ship.symbol),
      })
}

export const Dock = ({
  ship,
  trigger = (props) => (
    <button className="btn btn-sm" {...props}>
      Dock
    </button>
  ),
}: {
  ship: ShipResponse
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'dock'],
    mutationFn: (shipID: string) => createShipDock({ path: shipID }),
    onMutate: (shipID) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'DOCKED'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'DOCKED'))

      return { ship, ships }
    },
    onError: (_err, shipID, ctx) => {
      client.setQueryData(['ship', shipID], ctx?.ship)
      client.setQueryData(['ships'], ctx?.ships)
    },
    onSettled: (_res, _err, shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? ship.nav.status !== 'IN_ORBIT',
        onClick: () => mutate(ship.symbol),
      })
    : createElement(trigger, {
        disabled: ship.nav.status !== 'IN_ORBIT',
        onClick: () => mutate(ship.symbol),
      })
}

export const Refuel = ({
  ship,
  trigger = (props) => (
    <button className="btn btn-sm" {...props}>
      Refuel
    </button>
  ),
}: {
  ship: ShipResponse
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'refuel'],
    mutationFn: (shipID: string) => createShipRefuel({ path: shipID }),
    onSettled: (response, _err, shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })

      if (response?.data.agent) {
        setAgent(response.data.agent)
      }
    },
  })

  const disabled = isLoading || ship.fuel.current === ship.fuel.capacity

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? disabled,
        onClick: () => mutate(ship.symbol),
      })
    : createElement(trigger, {
        disabled: disabled,
        onClick: () => mutate(ship.symbol),
      })
}

export const Survey = ({
  ship,
  trigger = (props) => (
    <button className="btn btn-sm" {...props}>
      Survey
    </button>
  ),
}: {
  ship: ShipResponse
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const addSurvey = useShipSurveyStore((state) => state.addSurvey)
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'survey'],
    mutationFn: (shipID: string) => createShipSurvey({ path: shipID }),
    onSuccess: (response, shipID) => {
      const [survey] = response.data.surveys
      const cooldown = response.data.cooldown
      if (survey) addSurvey(survey)
      setCooldown(shipID, cooldown)
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? (hasCooldown || isLoading),
        onClick: () => mutate(ship.symbol),
      })
    : createElement(trigger, {
        disabled: hasCooldown || isLoading,
        onClick: () => mutate(ship.symbol),
      })
}

export const Extract = ({
  ship,
  survey,
  trigger = (props) => (
    <button className="btn btn-sm" {...props}>
      Extract
    </button>
  ),
}: {
  ship: ShipResponse
  survey?: SurveyResponse
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const client = useQueryClient()
  const removeSurvey = useShipSurveyStore((state) => state.removeSurvey)
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, survey }: { shipID: string; survey?: SurveyResponse }) =>
      createShipExtract({ path: shipID, payload: { survey } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID, survey }) => {
      if (survey) removeSurvey(survey.signature)
      const cooldown = response.data.cooldown
      setCooldown(shipID, cooldown)

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? (hasCooldown || isLoading),
        onClick: () => mutate({ shipID: ship.symbol, survey }),
      })
    : createElement(trigger, {
        disabled: hasCooldown || isLoading,
        onClick: () => mutate({ shipID: ship.symbol, survey }),
      })
}

export const Refine = ({
  ship,
  produce,
  trigger = (props) => (
    <button className="btn btn-sm" {...props}>
      Refine
    </button>
  ),
}: {
  ship: ShipResponse
  produce: string
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const client = useQueryClient()
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, produce }: { shipID: string; produce: string }) =>
      createShipRefine({ path: shipID, payload: { produce } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const cooldown = response.data.cooldown
      setCooldown(shipID, cooldown)

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? (hasCooldown || isLoading),
        onClick: () => mutate({ shipID: ship.symbol, produce }),
      })
    : createElement(trigger, {
        disabled: hasCooldown || isLoading,
        onClick: () => mutate({ shipID: ship.symbol, produce }),
      })
}

export const Jettison = ({
  ship,
  symbol,
  units,
  trigger = (props) => (
    <button className="btn btn-outline btn-danger btn-sm" {...props}>
      Jettison
    </button>
  ),
}: {
  ship: ShipResponse
  symbol: string
  units: number
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, symbol, units }: { shipID: string; symbol: string; units: number }) =>
      createShipJettison({ path: shipID, payload: { symbol, units } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? isLoading,
        onClick: () => mutate({ shipID: ship.symbol, symbol, units }),
      })
    : createElement(trigger, {
        disabled: isLoading,
        onClick: () => mutate({ shipID: ship.symbol, symbol, units }),
      })
}

export const Warp = ({
  ship,
  waypointID,
  trigger = (props) => (
    <button className="btn btn-sm" {...props}>
      Warp
    </button>
  ),
}: {
  ship: ShipResponse
  waypointID: string
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, waypointID }: { shipID: string; waypointID: string }) =>
      createShipWarp({ path: shipID, payload: { waypointSymbol: waypointID } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNav(ship, response.data.nav))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNav(ships, index, response.data.nav))
      if (ship) client.setQueryData(['ship', shipID], updateShipFuel(ship, response.data.fuel))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetFuel(ships, index, response.data.fuel))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? isLoading,
        onClick: () => mutate({ shipID: ship.symbol, waypointID }),
      })
    : createElement(trigger, {
        disabled: isLoading,
        onClick: () => mutate({ shipID: ship.symbol, waypointID }),
      })
}

export const Jump = ({
  ship,
  systemID,
  trigger = (props) => (
    <button className="btn btn-sm" {...props}>
      Jump
    </button>
  ),
}: {
  ship: ShipResponse
  systemID: string
  trigger?:
    | ReactElement<PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>>
    | FC<ButtonHTMLAttributes<HTMLButtonElement>>
}) => {
  const client = useQueryClient()
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, systemID }: { shipID: string; systemID: string }) =>
      createShipJump({ path: shipID, payload: { systemSymbol: systemID } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const cooldown = response.data.cooldown
      setCooldown(shipID, cooldown)

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNav(ship, response.data.nav))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNav(ships, index, response.data.nav))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        disabled: trigger.props.disabled ?? (hasCooldown || isLoading),
        onClick: () => mutate({ shipID: ship.symbol, systemID }),
      })
    : createElement(trigger, {
        disabled: hasCooldown || isLoading,
        onClick: () => mutate({ shipID: ship.symbol, systemID }),
      })
}

export const Navigate = ({ ship }: { ship: ShipResponse }) => {
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
  const { x, y, refs } = useFloating<HTMLButtonElement>({
    strategy: 'absolute',
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
              <Popover.Panel className="relative w-screen max-w-xs overflow-y-auto rounded-xl bg-white bg-opacity-10 p-3 ring ring-black/5 backdrop-blur-md dark:bg-black dark:bg-opacity-10 dark:ring-white/5">
                <QuerySuspenseBoundary
                  fallback={
                    <div className="grid">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="my-4 mx-auto h-3 w-4/5 animate-pulse rounded-full bg-white/5" />
                      ))}
                    </div>
                  }
                >
                  <WaypointNavigation
                    ship={ship}
                    onNavigate={(waypointID) => {
                      mutate({ shipID: ship.symbol, waypointID })
                      close()
                    }}
                  />
                </QuerySuspenseBoundary>
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  )
}

const WaypointNavigation = ({ ship, onNavigate }: { onNavigate: (waypointID: string) => void; ship: ShipResponse }) => {
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
            <div className="text-sm font-semibold">{waypoint.symbol}</div>
            <div className="text-xs font-light">
              {WAYPOINT_TYPE[waypoint.type] ?? waypoint.type} ({waypoint.x}, {waypoint.y})
            </div>
          </div>
          {ship.nav.waypointSymbol !== waypoint.symbol ? (
            <button className="btn btn-confirm btn-outline btn-sm" onClick={() => onNavigate(waypoint.symbol)}>
              <PaperAirplaneIcon className="h-4 w-4" />
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
          )}
        </div>
      ))}
    </div>
  )
}

export const ScanWaypoints = ({ shipID }: { shipID: string }) => {
  const setCooldown = useShipCooldownStore((state) => state.setCooldown)
  const { mutate, isSuccess, data } = useMutation({
    mutationKey: ['ship', shipID, 'scan'],
    mutationFn: (shipID: string) => createShipScanWaypoint({ path: shipID }),
    onSuccess: (response, shipID) => {
      setCooldown(shipID, response.data.cooldown)
    },
    onError: async (err, shipID) => {
      if (!isHttpError(err, STATUS_CODES.CONFLICT)) return

      try {
        const cooldown: SpaceTradersError<{ cooldown: CooldownResponse }> = await err.json()
        if (cooldown.error?.data.cooldown) setCooldown(shipID, cooldown.error.data.cooldown)
      } catch (err) {
        //
      }
    },
  })

  const waypoints = isSuccess ? data?.data.waypoints : []

  return (
    <Modal
      isOpen={isSuccess}
      trigger={
        <button className="btn btn-sm" onClick={() => mutate(shipID)}>
          Scan
        </button>
      }
    >
      <div className="grid gap-4">
        <div className="text-lg font-bold">
          Waypoints <span className="font-light">({waypoints.length})</span>
        </div>

        <div className="grid gap-2">
          {waypoints.map((waypoint) => (
            <div key={waypoint.symbol}>
              <Link to={`${ROUTES.SYSTEMS}/${waypoint.systemSymbol}/waypoint/${waypoint.symbol}`}>
                {waypoint.symbol}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
