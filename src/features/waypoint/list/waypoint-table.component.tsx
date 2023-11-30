import * as Tooltip from '@radix-ui/react-tooltip'
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
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon, ShipIcon } from '@/components/icons'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { ShipPresence } from '@/features/ship/presence'
import { type WaypointResponse } from '@/types/spacetraders'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { TypeFilter } from './type-filter.component'

const FILTERED_TRAITS = new Set([
  'UNCHARTED',
  'MARKETPLACE',
  'SHIPYARD',
  'MINERAL_DEPOSITS',
  'COMMON_METAL_DEPOSITS',
  'PRECIOUS_METAL_DEPOSITS',
  'RARE_METAL_DEPOSITS',
  'METHANE_POOLS',
  'ICE_CRYSTALS',
  'EXPLOSIVE_GASES',
])
const columnHelper = createColumnHelper<{ waypoint: WaypointResponse; presence: number }>()
const columns = [
  columnHelper.accessor((row) => row.waypoint.symbol, {
    id: 'symbol',
    minSize: 25,
    maxSize: 25,
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
    cell: ({ row, getValue }) => {
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
  }),
  columnHelper.display({
    id: 'presence',
    minSize: 10,
    maxSize: 10,
    cell: ({ row }) =>
      row.original.presence > 0 && (
        <ShipPresence label="waypoint.presence" count={row.original.presence} symbol={row.original.waypoint.symbol}>
          <ShipIcon id="anchor" className="h-5 w-5" />
        </ShipPresence>
      ),
  }),
  columnHelper.accessor((row) => `${row.waypoint.x}, ${row.waypoint.y}`, {
    id: 'coordinates',
    minSize: 20,
    maxSize: 20,
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2 text-left">
          <Translation>{(t) => <div>{t('general.header.coordinates')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind={sorted === false ? undefined : 'flat'}
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'numeric')} className="h-4 w-4" />
            </Button>
          </div>

          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button>
                  <AppIcon id="help" className="text-secondary h-5 w-5" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="w-64 rounded-md bg-zinc-200 px-4 py-2 text-xs text-zinc-800" sideOffset={5}>
                  Sort coordinates by their distance from the system origin (0, 0).
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      )
    },
    cell: ({ getValue }) => {
      return <div className="text-secondary text-left text-sm">{getValue()}</div>
    },
    sortingFn: (a, b) => {
      const ad = Math.pow(a.original.waypoint.x, 2) + Math.pow(a.original.waypoint.y, 2)
      const bd = Math.pow(b.original.waypoint.x, 2) + Math.pow(b.original.waypoint.y, 2)

      return ad - bd
    },
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor((row) => row.waypoint.type, {
    id: 'type',
    minSize: 20,
    maxSize: 20,
    header: ({ column, table }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.type')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind={sorted === false ? undefined : 'flat'}
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'alpha')} className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <TypeFilter table={table} />
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
  }),
  columnHelper.accessor((row) => row.waypoint.traits, {
    id: 'traits',
    minSize: 30,
    maxSize: 30,
    header: () => {
      return (
        <div className="text-right">
          <Translation>{(t) => t('general.header.traits')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const traits = getValue().filter((trait) => {
        return FILTERED_TRAITS.has(trait.symbol)
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
  }),
  // columnHelper.accessor((row) => row.waypoint.modifiers, {
  //   id: 'modifiers',
  //   header: () => <div className="text-right">Modifiers</div>,
  //   cell: ({ getValue }) => {
  //     const modifiers = getValue()
  //
  //     return (
  //       <div className="flex flex-wrap items-center justify-end gap-2">
  //         {modifiers.map((modifier) => (
  //           <Badge key={modifier.symbol}>{modifier.name}</Badge>
  //         ))}
  //       </div>
  //     )
  //   },
  //   enableSorting: false,
  //   enableHiding: true,
  // }),
]

export const WaypointListTable = ({ data }: { data: Array<{ waypoint: WaypointResponse; presence: number }> }) => {
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
