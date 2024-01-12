import * as Tooltip from '@radix-ui/react-tooltip'
import { createColumnHelper } from '@tanstack/react-table'
import { type PropsWithChildren } from 'react'
import { Translation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon, ShipIcon } from '@/components/icons'
import { ShipyardPurchaseShip } from '@/components/shipyard/purchase-ship'
import { Sort } from '@/components/table'
import { useWaypointResponse } from '@/context/waypoint.context'
import { type ShipyardShip } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number.helper'
import { type WaypointShipyardTableSchema } from './waypoint-shipyard.types'

const BuyShip = ({ ship }: PropsWithChildren<{ ship?: ShipyardShip }>) => {
  const waypoint = useWaypointResponse()

  if (!ship) return

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="text-right text-sm">{formatNumber(ship.purchasePrice)}</div>
      <div>
        <ShipyardPurchaseShip ship={ship} waypointSymbol={waypoint.symbol}>
          {(props) => (
            <Button intent="danger" kind="outline" size="small" {...props}>
              Buy
            </Button>
          )}
        </ShipyardPurchaseShip>
      </div>
    </div>
  )
}
const columnHelper = createColumnHelper<WaypointShipyardTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.type, {
    id: 'type',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.ship_type')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const value = getValue()

      return (
        <div className="h-full space-y-2">
          <Translation>{(t) => <div>{t(value, { ns: 'spacetraders.ship_type' })}</div>}</Translation>
          {row.original.ship && (
            <div className="text-secondary whitespace-break-spaces text-sm">{row.original.ship.description}</div>
          )}
        </div>
      )
    },
    sortingFn: 'alphanumeric',
    enableSorting: true,
    enableHiding: false,
    minSize: 35,
    maxSize: 35,
  }),
  columnHelper.accessor((row) => row.ship?.frame, {
    id: 'frame',
    header: () => <Translation>{(t) => <div className="text-right">{t('general.header.frame')}</div>}</Translation>,
    cell: ({ getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return (
        <div className="h-full space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="text-center text-sm">{value.name}</div>

            <Tooltip.Provider delayDuration={100}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button>
                    <AppIcon id="help" className="text-secondary size-5" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="w-64 rounded-md bg-zinc-200 px-4 py-2 text-xs text-zinc-800"
                    sideOffset={5}
                  >
                    {value.description}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className="rounded-md bg-zinc-500 bg-opacity-5 p-2 dark:bg-opacity-10">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="text-secondary size-4" />
                <div className="text-sm">{value.requirements.power}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="fuel" className="text-secondary size-4" />
                <div className="text-sm">{value.fuelCapacity}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="modules" className="text-secondary size-4" />
                <div className="text-sm">{value.moduleSlots}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="mounts" className="text-secondary size-4" />
                <div className="text-sm">{value.mountingPoints}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.ship?.engine, {
    id: 'engine',
    header: () => <Translation>{(t) => <div className="text-right">{t('general.header.engine')}</div>}</Translation>,
    cell: ({ getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return (
        <div className="h-full space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="text-center text-sm">{value.name}</div>

            <Tooltip.Provider delayDuration={100}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button>
                    <AppIcon id="help" className="text-secondary size-5" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="w-64 rounded-md bg-zinc-200 px-4 py-2 text-xs text-zinc-800"
                    sideOffset={5}
                  >
                    {value.description}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className="rounded-md bg-zinc-500 bg-opacity-5 p-2 dark:bg-opacity-10">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="text-secondary size-4" />
                <div className="text-sm">{value.requirements.power}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="speed" className="text-secondary size-4" />
                <div className="text-sm">{value.speed}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.ship?.reactor, {
    id: 'reactor',
    header: () => <Translation>{(t) => <div className="text-right">{t('general.header.reactor')}</div>}</Translation>,
    cell: ({ getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return (
        <div className="h-full space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="text-center text-sm">{value.name}</div>

            <Tooltip.Provider delayDuration={100}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button>
                    <AppIcon id="help" className="text-secondary size-5" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="w-64 rounded-md bg-zinc-200 px-4 py-2 text-xs text-zinc-800"
                    sideOffset={5}
                  >
                    {value.description}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className="rounded-md bg-zinc-500 bg-opacity-5 p-2 dark:bg-opacity-10">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="text-secondary size-4" />
                <div className="text-sm">{value.powerOutput}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.ship?.purchasePrice, {
    id: 'purchase_price',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.purchase_price')}</div>}</Translation>
          <div>
            <Sort column={column} type="numeric" />
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return <BuyShip ship={row.original.ship} />
    },
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    minSize: 20,
    maxSize: 20,
  }),
]
