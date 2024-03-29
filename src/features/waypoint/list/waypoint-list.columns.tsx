import * as Tooltip from '@radix-ui/react-tooltip'
import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { AppIcon, ShipIcon } from '@/components/icons'
import { Sort } from '@/components/table'
import { WaypointTypeFilter } from '@/components/waypoint/filters'
import { WaypointTag } from '@/components/waypoint/tag'
import { type WaypointListTableSchema } from './waypoint-list.types'

const FILTERED_TRAITS = new Set(['UNCHARTED', 'MARKETPLACE', 'SHIPYARD', 'STRIPPED'])
const columnHelper = createColumnHelper<WaypointListTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.waypoint.symbol, {
    id: 'symbol',
    minSize: 25,
    maxSize: 25,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <Translation>{(t) => <div>{t('general.header.symbol')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
          </div>
        </div>
      )
    },
    cell: ({ row, getValue }) => {
      return (
        <Link
          to="/systems/$systemSymbol/waypoint/$waypointSymbol"
          params={{ systemSymbol: row.original.waypoint.systemSymbol, waypointSymbol: row.original.waypoint.symbol }}
          className="link"
        >
          {getValue()}
        </Link>
      )
    },
    sortingFn: 'alphanumeric',
    enableSorting: true,
    enableHiding: false,
    sortDescFirst: false,
  }),
  columnHelper.display({
    id: 'presence',
    minSize: 10,
    maxSize: 10,
    cell: ({ row }) =>
      row.original.presence > 0 && (
        <Translation>
          {(t) => {
            const title = t('waypoint.presence', { count: row.original.presence, symbol: row.original.waypoint.symbol })

            return (
              <span title={title}>
                <ShipIcon id="anchor" className="size-5" />
              </span>
            )
          }}
        </Translation>
      ),
  }),
  columnHelper.accessor((row) => `${row.waypoint.x}, ${row.waypoint.y}`, {
    id: 'coordinates',
    minSize: 20,
    maxSize: 20,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2 text-left">
          <Translation>{(t) => <div>{t('general.header.coordinates')}</div>}</Translation>
          <div>
            <Sort column={column} type="numeric" />
          </div>

          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button>
                  <AppIcon id="help" className="text-secondary size-5" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="w-64 rounded-md bg-zinc-200 py-2 px-4 text-xs text-zinc-800" sideOffset={5}>
                  <Translation>{(t) => t('waypoint.sort_coordinates_tooltip')}</Translation>
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
      const types = table.getColumn('type')
      const facetedValues: Map<string, number> | undefined = types?.getFacetedUniqueValues()
      const filterValues = types?.getFilterValue() as string[] | undefined

      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.type')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
          </div>
          <div>
            <WaypointTypeFilter
              values={filterValues}
              facets={facetedValues}
              onChange={(value) => types?.setFilterValue(value)}
            />
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
    enableHiding: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor((row) => row.waypoint.traits, {
    id: 'traits',
    minSize: 25,
    maxSize: 25,
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
