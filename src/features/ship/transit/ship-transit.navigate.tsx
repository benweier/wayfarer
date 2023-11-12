import { useSuspenseQuery } from '@tanstack/react-query'
import {
  type ColumnFiltersState,
  type SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon, ShipIcon } from '@/components/icons'
import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { useShipResponse } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { type ShipResponse, type WaypointResponse } from '@/types/spacetraders'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { type ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitNavigate = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal size="lg" closeable trigger={<Modal.Trigger>{trigger}</Modal.Trigger>}>
      <div className="space-y-8">
        <h3 className="text-title">
          Navigate Ship: <span className="font-normal">{ship.symbol}</span>
        </h3>
        <QuerySuspenseBoundary
          fallback={
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mx-auto h-3 w-4/5 animate-pulse rounded-full bg-white/5" />
              ))}
            </div>
          }
        >
          <Navigate ship={ship} />
        </QuerySuspenseBoundary>
      </div>
    </Modal>
  )
}

const columnHelper = createColumnHelper<{
  waypoint: WaypointResponse
  ship: ShipResponse
  activeWaypoint?: WaypointResponse
}>()
const columns = [
  columnHelper.accessor((row) => row.waypoint.symbol, {
    id: 'symbol',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <div>Waypoint</div>
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
      return (
        <Link
          className="link"
          to={`/systems/${row.original.waypoint.systemSymbol}/waypoint/${row.original.waypoint.symbol}`}
        >
          {getValue()}
        </Link>
      )
    },
    sortingFn: 'alphanumeric',
    enableSorting: true,
    enableHiding: false,
    size: 200,
  }),
  columnHelper.accessor(
    (row) => {
      const ad = Math.sqrt(row.waypoint.x * row.waypoint.x + row.waypoint.y * row.waypoint.y)

      if (row.activeWaypoint) {
        const bd = Math.sqrt(row.activeWaypoint.x * row.activeWaypoint.x + row.activeWaypoint.y * row.activeWaypoint.y)

        return Math.abs(ad - bd).toFixed(3)
      }

      return Math.sqrt(row.waypoint.x * row.waypoint.x + row.waypoint.y * row.waypoint.y).toFixed(3)
    },
    {
      id: 'distance',
      header: ({ column }) => {
        const sorted = column.getIsSorted()

        return (
          <div className="flex items-center justify-start gap-2 text-left">
            <div>Distance</div>
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
        return <div className="text-secondary text-left text-sm">{getValue()}</div>
      },
      sortingFn: 'alphanumeric',
      enableSorting: true,
      enableHiding: true,
      size: 200,
    },
  ),
  columnHelper.accessor((row) => row.waypoint.type, {
    id: 'type',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <div>Type</div>
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
      const value = getValue()

      return (
        <div className="flex justify-start">
          <WaypointTag type={value}>{WAYPOINT_TYPE.get(value)}</WaypointTag>
        </div>
      )
    },
    filterFn: (row, _id, filterValue: string[] = []) => {
      if (filterValue.length === 0) return true

      return filterValue.includes(row.original.waypoint.type)
    },
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    size: 200,
  }),
  columnHelper.accessor((row) => row.waypoint.traits, {
    id: 'traits',
    header: () => {
      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <div>Traits</div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const traits = getValue().filter((trait) => {
        return ['MARKETPLACE', 'SHIPYARD'].includes(trait.symbol)
      })

      return (
        <div className="flex flex-wrap items-center justify-end gap-1">
          {traits.map((trait) => (
            <Badge key={trait.symbol}>{trait.name}</Badge>
          ))}
        </div>
      )
    },
    filterFn: (row, _id, filterValue: Array<{ symbol: string; value: string }> = []) => {
      if (filterValue.length === 0) return true

      const matchedTraits = filterValue.filter((value) =>
        row.original.waypoint.traits.some((trait) => trait.symbol === value.symbol),
      )

      return matchedTraits.length > 0
    },
    enableSorting: false,
    enableHiding: true,
    enableGlobalFilter: true,
    size: 200,
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <ShipActions.Navigate ship={row.original.ship} waypointSymbol={row.original.waypoint.symbol}>
            {row.original.ship.nav.waypointSymbol !== row.original.waypoint.symbol
              ? (props) => (
                  <Button intent="confirm" kind="flat" {...props}>
                    <ShipIcon id="navigate" className="h-4 w-4" aria-hidden />
                    <span className="sr-only">
                      Navigate ship {row.original.ship.symbol} to waypoint {row.original.waypoint.symbol}
                    </span>
                  </Button>
                )
              : () => (
                  <Button disabled>
                    <ShipIcon id="pin" className="h-4 w-4" aria-hidden />
                    <span className="sr-only">
                      Ship {row.original.ship.symbol} is already at waypoint {row.original.waypoint.symbol}
                    </span>
                  </Button>
                )}
          </ShipActions.Navigate>
        </div>
      )
    },
    size: 100,
  }),
]
const WaypointTable = ({
  data,
}: {
  data: Array<{ waypoint: WaypointResponse; ship: ShipResponse; activeWaypoint?: WaypointResponse }>
}) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'symbol', desc: false }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
    enableHiding: true,
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
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
                    style={{ width: `${header.getSize()}px` }}
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
                  <td key={cell.id} className="whitespace-nowrap p-3">
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
const Navigate = ({ ship }: { ship: ShipResponse }) => {
  const { data } = useSuspenseQuery({
    queryKey: getWaypointListQuery.getQueryKey({ systemSymbol: ship.nav.systemSymbol }),
    queryFn: getWaypointListQuery.queryFn,
  })
  const waypoints = data.data
  const activeWaypoint = waypoints.find((waypoint) => waypoint.symbol === ship.nav.waypointSymbol)

  return <WaypointTable data={waypoints.map((waypoint) => ({ waypoint, ship, activeWaypoint }))} />
}
