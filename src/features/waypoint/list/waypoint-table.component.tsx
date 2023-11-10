import { Listbox } from '@headlessui/react'
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
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { WaypointTag } from '@/components/waypoint/tag'
import { WAYPOINT_TYPE } from '@/config/constants'
import { type WaypointResponse, type WaypointTrait } from '@/types/spacetraders'
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
      const facets: string[] = Array.from(column.getFacetedUniqueValues().keys()).sort()
      const selected = column.getFilterValue() as Array<{ id: string; value: string }> | undefined
      const options = facets.map((value) => ({
        id: value,
        value: WAYPOINT_TYPE.get(value) ?? value,
      }))

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
              selected={selected}
              options={options}
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
    header: ({ column }) => {
      const facets: WaypointTrait[] = Array.from(column.getFacetedUniqueValues().keys()).flat()
      const filterValues = column.getFilterValue() as WaypointTrait[] | undefined
      const selected = filterValues?.map((value) => ({
        id: value.symbol,
        value: value.name,
      }))
      const options = facets
        .filter((value, index, self) => index === self.findIndex((trait) => trait.symbol === value.symbol))
        .map((value) => ({
          id: value.symbol,
          value: value.name,
        }))

      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <div>Traits</div>
          <div>
            <FilterColumn
              selected={selected}
              options={options}
              onChange={(value) => {
                column.setFilterValue(value)
              }}
            />
          </div>
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
    filterFn: (row, _id, filterValue: Array<{ id: string; value: string }> = []) => {
      if (filterValue.length === 0) return true

      const matchedTraits = filterValue.filter((value) =>
        row.original.waypoint.traits.some((trait) => trait.symbol === value.id),
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
const COLUMN_FILTERS: Record<string, string> = {
  coordinates: 'Coordinates',
  type: 'Type',
  traits: 'Traits',
  // 'modifiers': 'Modifiers',
}

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
    enableGlobalFilter: true,
  })
  const columnVisibilityOptions = table.getAllColumns().filter((column) => column.getCanHide())
  const types = table.getColumn('type')
  const facetedValues: Map<string, number> | undefined = types?.getFacetedUniqueValues()
  const filterValues = (types?.getFilterValue() as string[] | undefined) ?? []
  const filterOptions: string[] = facetedValues === undefined ? [] : Array.from(facetedValues.keys()).sort()

  return (
    <div className="max-w-screen space-y-4">
      <div className="flex gap-4">
        <Listbox
          as="div"
          className="relative"
          value={filterValues}
          onChange={(value) => {
            table.getColumn('type')?.setFilterValue(value)
          }}
          multiple
        >
          <Listbox.Button className="select pr-8">
            <>
              <label className="block truncate">
                Type {`(${filterValues.length === 0 ? 'All' : filterValues.length})`}
              </label>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <AppIcon id="chevron:up-down" className="h-4 w-4 text-zinc-400" aria-hidden="true" />
              </span>
            </>
          </Listbox.Button>

          {filterOptions.length > 0 && (
            <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-auto overflow-auto rounded-md border-2 border-zinc-100 bg-white/90 text-sm outline-none backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
              {filterOptions.map((option) => {
                return (
                  <Listbox.Option key={option} value={option}>
                    {({ selected }) => {
                      return (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center px-4">
                            <AppIcon
                              id="check"
                              aria-hidden="true"
                              className={cx('h-5 w-5', {
                                'text-emerald-500': selected,
                                'text-zinc-500': !selected,
                              })}
                            />
                          </span>
                          <span
                            className={cx(
                              'relative block cursor-default select-none truncate rounded py-2 pl-12 pr-4 transition-colors duration-100 ease-in-out',
                            )}
                          >
                            {WAYPOINT_TYPE.get(option)} {`(${facetedValues?.get(option) ?? 0})`}
                          </span>
                        </div>
                      )
                    }}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          )}
        </Listbox>
        <Listbox
          as="div"
          className="relative"
          value={Object.keys(columnVisibility)}
          onChange={(value) => {
            table.setColumnVisibility(value.reduce((acc, key) => ({ ...acc, [key]: false }), {}))
          }}
          multiple
        >
          <Listbox.Button className="select pr-8">
            <>
              <label className="block truncate">Columns</label>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <AppIcon id="chevron:up-down" className="h-4 w-4 text-zinc-400" aria-hidden="true" />
              </span>
            </>
          </Listbox.Button>

          {columnVisibilityOptions.length > 0 && (
            <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-auto overflow-auto rounded-md border-2 border-zinc-100 bg-white/90 text-sm outline-none backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
              {columnVisibilityOptions.map((column) => {
                return (
                  <Listbox.Option key={column.id} value={column.id}>
                    <div className="relative p-1">
                      {table.getColumn(column.id)?.getIsVisible() && (
                        <span className="absolute inset-y-0 left-0 flex items-center px-4">
                          <AppIcon id="check" aria-hidden="true" className="h-5 w-5 text-emerald-500" />
                        </span>
                      )}
                      <span
                        className={cx(
                          'relative block cursor-default select-none truncate rounded py-2 pl-12 pr-4 transition-colors duration-100 ease-in-out',
                        )}
                      >
                        {COLUMN_FILTERS[column.id]}
                      </span>
                    </div>
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          )}
        </Listbox>
      </div>
      <div className="overflow-hidden rounded-xl">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-950">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-primary px-3 py-3.5 text-sm font-semibold"
                    style={{ width: `${100 / group.headers.length}%` }}
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
