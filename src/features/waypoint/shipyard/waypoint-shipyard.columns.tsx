import * as Tooltip from '@radix-ui/react-tooltip'
import { createColumnHelper } from '@tanstack/react-table'
import { type PropsWithChildren } from 'react'
import { Button } from '@/components/button'
import { AppIcon, ShipIcon } from '@/components/icons'
import { ShipyardPurchaseShip } from '@/components/shipyard/purchase-ship'
import { useWaypointResponse } from '@/context/waypoint.context'
import { type ShipyardShip } from '@/types/spacetraders'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { formatNumber } from '@/utilities/number'

const BuyCell = ({ ship, children }: PropsWithChildren<{ ship: ShipyardShip }>) => {
  const waypoint = useWaypointResponse()

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="text-right text-sm">{children}</div>
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
const columnHelper = createColumnHelper<ShipyardShip>()

export const columns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <div>Ship Type</div>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'alpha')} className="size-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const value = getValue()

      return (
        <div className="space-y-2">
          <div>{value}</div>
          <div className="text-secondary whitespace-break-spaces text-sm">{row.original.description}</div>
        </div>
      )
    },
    sortingFn: 'alphanumeric',
    enableSorting: true,
    enableHiding: false,
    minSize: 35,
    maxSize: 35,
  }),
  columnHelper.accessor((row) => row.frame, {
    id: 'frame',
    header: () => <div className="text-right">Frame</div>,
    cell: ({ getValue }) => {
      const { name, description, fuelCapacity, moduleSlots, mountingPoints, requirements } = getValue()

      return (
        <div className="absolute inset-3 space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="text-center text-sm">{name}</div>

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
                    {description}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className="rounded-md bg-zinc-500 bg-opacity-5 p-2 dark:bg-opacity-10">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="text-secondary size-4" />
                <div className="text-sm">{requirements.power}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="fuel" className="text-secondary size-4" />
                <div className="text-sm">{fuelCapacity}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="modules" className="text-secondary size-4" />
                <div className="text-sm">{moduleSlots}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="mounts" className="text-secondary size-4" />
                <div className="text-sm">{mountingPoints}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.engine, {
    id: 'engine',
    header: () => <div className="text-right">Engine</div>,
    cell: ({ getValue }) => {
      const { name, description, speed, requirements } = getValue()

      return (
        <div className="absolute inset-3 space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="text-center text-sm">{name}</div>

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
                    {description}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className="rounded-md bg-zinc-500 bg-opacity-5 p-2 dark:bg-opacity-10">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="text-secondary size-4" />
                <div className="text-sm">{requirements.power}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="speed" className="text-secondary size-4" />
                <div className="text-sm">{speed}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.reactor, {
    id: 'reactor',
    header: () => <div className="text-right">Reactor</div>,
    cell: ({ getValue }) => {
      const { name, description, powerOutput } = getValue()

      return (
        <div className="absolute inset-3 space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="text-center text-sm">{name}</div>

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
                    {description}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className="rounded-md bg-zinc-500 bg-opacity-5 p-2 dark:bg-opacity-10">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="text-secondary size-4" />
                <div className="text-sm">{powerOutput}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.purchasePrice, {
    id: 'purchase_price',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <div>Price</div>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'numeric')} className="size-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const value = getValue()

      return <BuyCell ship={row.original}>{formatNumber(value)}</BuyCell>
    },
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    minSize: 20,
    maxSize: 20,
  }),
]
