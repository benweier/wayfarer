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
import * as ShipActions from '@/features/ship/actions'
import { getFuelConsumption } from '@/utilities/get-fuel-consumption.helper'
import { getNavigationDuration } from '@/utilities/get-navigation-duration.helper'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { type NavigationTableRow, type WaypointNavigationTableProps } from './waypoint-navigation.types'

const columnHelper = createColumnHelper<NavigationTableRow>()
const columns = [
  columnHelper.accessor((row) => row.waypoint.symbol, {
    id: 'symbol',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2 text-right">
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
    size: 200,
  }),
  columnHelper.accessor(
    (row) => {
      if (!row.activeWaypoint) {
        return Number(Math.sqrt(Math.pow(row.waypoint.x, 2) + Math.pow(row.waypoint.y, 2)).toFixed(3))
      }

      const xd = row.activeWaypoint.x - row.waypoint.x
      const yd = row.activeWaypoint.y - row.waypoint.y

      return Number(Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2)).toFixed(3))
    },
    {
      id: 'distance',
      header: ({ column }) => {
        const sorted = column.getIsSorted()

        return (
          <div className="flex items-center justify-start gap-2 text-left">
            <Translation>{(t) => <div>{t('general.header.distance_time')}</div>}</Translation>
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
      cell: ({ getValue, row }) => {
        const distance = getValue()
        const duration = getNavigationDuration(
          distance,
          row.original.ship.engine.speed,
          row.original.ship.nav.flightMode,
        )

        return (
          <div className="text-left text-sm">
            {distance} <span className="text-secondary">({duration}s)</span>
          </div>
        )
      },
      sortDescFirst: false,
      enableSorting: true,
      size: 200,
    },
  ),
  columnHelper.accessor((row) => row.waypoint.type, {
    id: 'type',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.type')}</div>}</Translation>
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
          <WaypointTag type={value}>
            <Translation ns="spacetraders.waypoint_type">{(t) => t(value)}</Translation>
          </WaypointTag>
        </div>
      )
    },
    filterFn: (row, _id, filterValue: string[] = []) => {
      if (filterValue.length === 0) return true

      return filterValue.includes(row.original.waypoint.type)
    },
    enableSorting: true,
    enableColumnFilter: true,
    size: 200,
  }),
  columnHelper.accessor((row) => row.waypoint.traits, {
    id: 'traits',
    header: () => {
      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.traits')}</div>}</Translation>
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
    size: 200,
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const distance: number = row.getValue('distance')

      return (
        <div className="flex justify-end">
          {row.original.ship.nav.waypointSymbol !== row.original.waypoint.symbol ? (
            <ShipActions.Navigate
              disabled={
                getFuelConsumption(distance, row.original.ship.nav.flightMode) > row.original.ship.fuel.current &&
                row.original.ship.fuel.capacity > 0
              }
              ship={row.original.ship}
              waypointSymbol={row.original.waypoint.symbol}
            >
              {(props) => (
                <Button intent="confirm" kind="flat" {...props}>
                  <ShipIcon id="navigate" className="h-4 w-4" aria-hidden />
                  <span className="sr-only">
                    <Translation>
                      {(t) =>
                        t('waypoint.navigate_ship_to_waypoint', {
                          shipSymbol: row.original.ship.symbol,
                          waypointSymbol: row.original.waypoint.symbol,
                        })
                      }
                    </Translation>
                  </span>
                </Button>
              )}
            </ShipActions.Navigate>
          ) : (
            <Button disabled>
              <ShipIcon id="pin" className="h-4 w-4" aria-hidden />
              <span className="sr-only">
                <Translation>
                  {(t) =>
                    t('waypoint.ship_at_waypoint', {
                      shipSymbol: row.original.ship.symbol,
                      waypointSymbol: row.original.waypoint.symbol,
                    })
                  }
                </Translation>
              </span>
            </Button>
          )}
        </div>
      )
    },
    size: 100,
  }),
]

export const WaypointNavigationTable = ({ data }: WaypointNavigationTableProps) => {
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
