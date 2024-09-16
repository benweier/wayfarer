import { Button } from '@/components/button'
import { AppIcon, ShipIcon } from '@/components/icons'
import { ShipyardPurchaseShip } from '@/components/shipyard/purchase-ship'
import { Sort } from '@/components/table'
import { Tooltip } from '@/components/tooltip'
import { useWaypointResponse } from '@/context/waypoint.context'
import type { ShipyardShip } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number.helper'
import { createColumnHelper } from '@tanstack/react-table'
import type { PropsWithChildren } from 'react'
import { Translation } from 'react-i18next'
import type { WaypointShipyardTableSchema } from './waypoint-shipyard.types'

const BuyShip = ({ ship }: PropsWithChildren<{ ship?: ShipyardShip }>) => {
  const waypoint = useWaypointResponse()

  if (!ship) return

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="typography-sm text-right">{formatNumber(ship.purchasePrice)}</div>
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
            <div className="typography-sm whitespace-break-spaces text-foreground-secondary">
              {row.original.ship.description}
            </div>
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
        return <div className="typography-sm text-right text-foreground-secondary">-</div>
      }

      return (
        <div className="h-full space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="typography-sm text-center">{value.name}</div>

            <Tooltip trigger={<AppIcon id="help" className="size-5 text-foreground-secondary" />}>
              {value.description}
            </Tooltip>
          </div>
          <div className="rounded-md bg-zinc-500/10 p-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="size-4 text-foreground-secondary" />
                <div className="typography-sm">{value.requirements.power}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="fuel" className="size-4 text-foreground-secondary" />
                <div className="typography-sm">{value.fuelCapacity}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="modules" className="size-4 text-foreground-secondary" />
                <div className="typography-sm">{value.moduleSlots}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="mounts" className="size-4 text-foreground-secondary" />
                <div className="typography-sm">{value.mountingPoints}</div>
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
        return <div className="typography-sm text-right text-foreground-secondary">-</div>
      }

      return (
        <div className="h-full space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="typography-sm text-center">{value.name}</div>

            <Tooltip trigger={<AppIcon id="help" className="size-5 text-foreground-secondary" />}>
              {value.description}
            </Tooltip>
          </div>

          <div className="rounded-md bg-zinc-500/10 p-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="size-4 text-foreground-secondary" />
                <div className="typography-sm">{value.requirements.power}</div>
              </div>
              <div className="flex items-center gap-2">
                <ShipIcon id="speed" className="size-4 text-foreground-secondary" />
                <div className="typography-sm">{value.speed}</div>
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
        return <div className="typography-sm text-right text-foreground-secondary">-</div>
      }

      return (
        <div className="h-full space-y-2">
          <div className="flex items-center justify-end gap-2">
            <div className="typography-sm text-center">{value.name}</div>

            <Tooltip trigger={<AppIcon id="help" className="size-5 text-foreground-secondary" />}>
              {value.description}
            </Tooltip>
          </div>

          <div className="rounded-md bg-zinc-500/10 p-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShipIcon id="power" className="size-4 text-foreground-secondary" />
                <div className="typography-sm">{value.powerOutput}</div>
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
        return <div className="typography-sm text-right text-foreground-secondary">-</div>
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
