import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ShipIcon } from '@/components/icons'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ShipControls } from '@/features/ship/item/ship-item.controls'
import { useShipTransit } from '@/features/ship/transit'
import { type ShipResponse } from '@/types/spacetraders'

const TransitStatusPreview = ({ ship }: { ship: ShipResponse }) => {
  const transit = useShipTransit(ship)

  if (ship.nav.status !== 'IN_TRANSIT') return null

  return (
    <div className="h-0.5 grow rounded-full bg-zinc-200 dark:bg-zinc-600">
      <div className="h-full rounded-full bg-green-500" style={{ width: `${transit.progress}%` }} />
    </div>
  )
}
const columnHelper = createColumnHelper<{ ship: ShipResponse }>()
const columns = [
  columnHelper.accessor((row) => row.ship.symbol, {
    id: 'symbol',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.symbol')}</Translation>
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
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.system')}</Translation>
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
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.waypoint')}</Translation>
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
            {SHIP_NAV_STATUS.get(row.original.ship.nav.status)}
          </div>
          <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
            {SHIP_NAV_FLIGHT_MODE.get(row.original.ship.nav.flightMode)}
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
    header: () => {
      return (
        <div className="text-right">
          <Translation>{(t) => t('general.header.fuel')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const fuel = getValue()

      return (
        <div className="flex items-center justify-end gap-1">
          <ShipIcon id="fuel" className="h-4 w-4 text-teal-500" />
          <div className="text-sm">
            {fuel.current} / {fuel.capacity}
          </div>
        </div>
      )
    },
    enableSorting: true,
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => row.ship.cargo, {
    id: 'cargo',
    header: () => {
      return (
        <div className="text-right">
          <Translation>{(t) => t('general.header.cargo')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const cargo = getValue()

      return (
        <div className="flex items-center justify-end gap-2">
          <ShipIcon id="cargo" className="h-4 w-4 text-fuchsia-500" />
          <div className="text-sm">
            {cargo.units} / {cargo.capacity}
          </div>
        </div>
      )
    },
    enableSorting: true,
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
        <>
          <ShipControls ship={row.original.ship} />
        </>
      )
    },
    minSize: 5,
    maxSize: 5,
  }),
]

export const ShipListTable = ({ data }: { data: Array<{ ship: ShipResponse }> }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="max-w-screen space-y-4">
      <div className="overflow-hidden rounded-xl">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-950">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-primary px-3 py-3.5 text-sm font-semibold"
                    style={{ width: `${header.getSize()}%` }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-zinc-100/50 dark:divide-zinc-950 dark:bg-zinc-800/50">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-zinc-200/10 dark:even:bg-zinc-700/10">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="h-14 whitespace-nowrap p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
