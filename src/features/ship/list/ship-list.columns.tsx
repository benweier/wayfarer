import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@/components/button'
import { AppIcon, ShipIcon } from '@/components/icons'
import { ShipControls } from '@/features/ship/list/ship-list-item.controls'
import { useShipTransit } from '@/features/ship/transit'
import { type ShipResponse } from '@/types/spacetraders'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { type ShipListTableSchema } from './ship-list.types'

const TransitStatusPreview = ({ ship }: { ship: ShipResponse }) => {
  const transit = useShipTransit(ship)

  if (ship.nav.status !== 'IN_TRANSIT') return null

  return (
    <div className="h-0.5 grow rounded-full bg-zinc-200 dark:bg-zinc-600">
      <div className="h-full rounded-full bg-green-500" style={{ width: `${transit.progress}%` }} />
    </div>
  )
}
const columnHelper = createColumnHelper<ShipListTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.ship.symbol, {
    id: 'symbol',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2">
          <Translation>{(t) => <div>{t('general.header.symbol')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'alpha')} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const symbol = getValue()

      return (
        <div className="text-lg">
          <Link className="link" to={`/fleet/ship/${symbol}`}>
            {symbol}
          </Link>
        </div>
      )
    },
    enableSorting: true,
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor((row) => row.ship.nav.systemSymbol, {
    id: 'systemSymbol',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2">
          <Translation>{(t) => <div>{t('general.header.system')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'alpha')} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const systemSymbol = getValue()

      return (
        <Link className="link" to={`/systems/${row.original.ship.nav.systemSymbol}`}>
          {systemSymbol}
        </Link>
      )
    },
    enableSorting: true,
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => row.ship.nav.waypointSymbol, {
    id: 'waypointSymbol',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2">
          <Translation>{(t) => <div>{t('general.header.waypoint')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'alpha')} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const waypointSymbol = getValue()

      return (
        <Link
          className="link"
          to={`/systems/${row.original.ship.nav.systemSymbol}/waypoint/${row.original.ship.nav.waypointSymbol}`}
        >
          {waypointSymbol}
        </Link>
      )
    },
    enableSorting: true,
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.display({
    id: 'status',
    header: () => {
      return <></>
    },
    cell: ({ row }) => {
      return (
        <div className="relative flex gap-x-1">
          <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
            <Translation ns="spacetraders.nav_status">{(t) => t(row.original.ship.nav.status)}</Translation>
          </div>
          <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
            <Translation ns="spacetraders.flight_mode">{(t) => t(row.original.ship.nav.flightMode)}</Translation>
          </div>
          <div className="absolute inset-x-0 -bottom-1">
            <TransitStatusPreview ship={row.original.ship} />
          </div>
        </div>
      )
    },
    minSize: 25,
    maxSize: 25,
  }),
  columnHelper.accessor((row) => row.ship.fuel, {
    id: 'fuel',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-end gap-2">
          <Translation>{(t) => <div>{t('general.header.fuel')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'numeric')} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const fuel = getValue()

      return (
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-end gap-2">
            <ShipIcon id="fuel" className="h-4 w-4 text-teal-500" />
            <div className="text-sm font-semibold">
              {fuel.current} / {fuel.capacity}
            </div>
          </div>
          <div className="h-1 w-full max-w-[100px] rounded-full bg-teal-900/20 dark:bg-teal-900/40">
            <div
              className="h-1 rounded-full bg-teal-500/80"
              style={{ width: `${(fuel.current / fuel.capacity) * 100}%` }}
            />
          </div>
        </div>
      )
    },
    sortingFn: (a, b) => {
      if (a.original.ship.fuel.capacity === 0) return 1

      const fuelA = a.original.ship.fuel.current + 1 / a.original.ship.fuel.capacity + 1
      const fuelB = b.original.ship.fuel.current + 1 / b.original.ship.fuel.capacity + 1
      const diff = fuelA - fuelB

      if (diff === 0) {
        return a.original.ship.fuel.capacity - b.original.ship.fuel.capacity
      }

      return diff
    },
    invertSorting: true,
    enableSorting: true,
    sortDescFirst: true,
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => row.ship.cargo, {
    id: 'cargo',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-end gap-2">
          <Translation>{(t) => <div>{t('general.header.cargo')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'numeric')} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const cargo = getValue()

      return (
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-end gap-2">
            <ShipIcon id="cargo" className="h-4 w-4 text-fuchsia-500" />
            <div className="text-sm font-semibold">
              {cargo.units} / {cargo.capacity}
            </div>
          </div>
          <div className="h-1 w-full max-w-[100px] rounded-full bg-fuchsia-900/20 dark:bg-fuchsia-900/40">
            <div
              className="h-1 rounded-full bg-fuchsia-500/80"
              style={{ width: `${(cargo.units / cargo.capacity) * 100}%` }}
            />
          </div>
        </div>
      )
    },
    sortingFn: (a, b) => {
      if (a.original.ship.cargo.capacity === 0) return 1

      const cargoA = a.original.ship.cargo.units + 1 / a.original.ship.cargo.capacity + 1
      const cargoB = b.original.ship.cargo.units + 1 / b.original.ship.cargo.capacity + 1
      const diff = cargoA - cargoB

      if (diff === 0) {
        return a.original.ship.cargo.capacity - b.original.ship.cargo.capacity
      }

      return diff
    },
    invertSorting: true,
    enableSorting: true,
    sortDescFirst: true,
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => {
      return <></>
    },
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <ShipControls ship={row.original.ship} />
        </div>
      )
    },
    minSize: 5,
    maxSize: 5,
  }),
]
