import { Menu, Transition } from '@headlessui/react'
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { type WaypointResponse } from '@/types/spacetraders'
import { FilterColumn } from './filter-column.component'

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
const columnHelper = createColumnHelper<{ waypoint: WaypointResponse; presence?: boolean }>()
const columns = [
  columnHelper.accessor((row) => row.waypoint.symbol, {
    id: 'symbol',
    header: ({ column }) => (
      <div className="flex items-center justify-start gap-2 text-right">
        <div>Symbol</div>
        <div>
          <Button
            intent={column.getIsSorted() === false ? 'dim' : 'primary'}
            kind="flat"
            size="small"
            onClick={column.getToggleSortingHandler()}
          >
            <AppIcon id="arrow:up-down" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
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
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor((row) => `${row.waypoint.x}, ${row.waypoint.y}`, {
    id: 'coordinates',
    header: () => <div className="text-left">Coordinates</div>,
    cell: ({ getValue }) => {
      return <div className="text-secondary text-left text-sm">{getValue()}</div>
    },
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor((row) => row.waypoint.type, {
    id: 'type',
    header: ({ column }) => {
      const values: string[] = Array.from(column.getFacetedUniqueValues().keys()).sort()

      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <div>Type</div>
          <div>
            <Button
              intent={column.getIsSorted() === false ? 'dim' : 'primary'}
              kind={column.getIsSorted() === false ? undefined : 'flat'}
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id="arrow:up-down" className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <FilterColumn
              selected={column.getFilterValue() as string[] | undefined}
              options={values}
              onChange={(value) => {
                column.setFilterValue(value)
              }}
            />
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
    filterFn: 'arrIncludesSome',
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor((row) => row.waypoint.traits, {
    id: 'traits',
    header: ({ column }) => (
      <div className="flex items-center justify-end gap-2 text-right">
        <div>Traits</div>
        <div>
          <Button intent={column.getIsFiltered() ? 'primary' : 'dim'} kind="flat" size="small">
            <AppIcon id="filter" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
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
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor((row) => row.waypoint.modifiers, {
    id: 'modifiers',
    header: () => <div className="text-right">Modifiers</div>,
    cell: ({ getValue }) => {
      const modifiers = getValue()

      return (
        <div className="flex flex-wrap items-center justify-end gap-2">
          {modifiers.map((modifier) => (
            <Badge key={modifier.symbol}>{modifier.name}</Badge>
          ))}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  }),
]

export const WaypointListTable = ({ data }: { data: Array<{ waypoint: WaypointResponse; presence?: boolean }> }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'symbol', desc: false }])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
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
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnVisibility, columnFilters },
    enableHiding: true,
    enableFilters: true,
    enableColumnFilters: true,
  })

  return (
    <div className="max-w-screen space-y-4 overflow-x-scroll">
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              Columns
              <AppIcon
                id="chevron:up-down"
                className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <Menu.Item key={column.id}>
                        {({ active }) => (
                          <button
                            className={cx('group flex w-full items-center rounded-md px-2 py-2 text-sm', {
                              'bg-violet-500 text-white': active,
                              'text-gray-900': !active,
                            })}
                            onClick={() => {
                              column.toggleVisibility(!column.getIsVisible())
                            }}
                          >
                            {column.id}
                          </button>
                        )}
                      </Menu.Item>
                    )
                  })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="overflow-hidden rounded-xl">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-950">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-primary px-3 py-3.5 text-sm font-semibold"
                    style={{ width: `${100 / headerGroup.headers.length}%` }}
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
