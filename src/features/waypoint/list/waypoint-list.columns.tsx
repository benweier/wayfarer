import { Badge } from '@/components/badge'
import { AppIcon, ShipIcon } from '@/components/icons'
import { Sort } from '@/components/table'
import { Tooltip } from '@/components/tooltip'
import { WaypointTraits } from '@/config/spacetraders'
import { WaypointTypeFilter } from '@/features/waypoint/filters'
import { WaypointTag } from '@/features/waypoint/tag'
import type { WaypointTrait } from '@/types/spacetraders'
import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import { Trans, Translation } from 'react-i18next'
import type { WaypointListTableSchema } from './waypoint-list.types'

const FILTERED_TRAITS = new Set<WaypointTraits>([
  WaypointTraits.Uncharted,
  WaypointTraits.Stripped,
  WaypointTraits.Shipyard,
  WaypointTraits.Marketplace,
])
const SORT_ORDER = Array.from(FILTERED_TRAITS)
const sortTraitsFn = (a: WaypointTrait, b: WaypointTrait) => SORT_ORDER.indexOf(a.symbol) - SORT_ORDER.indexOf(b.symbol)
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
        <Tooltip trigger={<ShipIcon id="anchor" className="size-5" />}>
          <Trans
            i18nKey="waypoint.presence"
            values={{ count: row.original.presence, symbol: row.original.waypoint.symbol }}
          />
        </Tooltip>
      ),
  }),
  columnHelper.accessor((row) => ({ x: row.waypoint.x, y: row.waypoint.y }), {
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

          <Tooltip trigger={<AppIcon id="help" className="size-5 text-foreground-secondary" />}>
            <Translation>{(t) => t('waypoint.sort_coordinates_tooltip')}</Translation>
          </Tooltip>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const { x, y } = getValue()
      return <div className="typography-sm text-left text-foreground-secondary">{`${x}, ${y}`}</div>
    },
    sortingFn: (a, b) => {
      const ad = a.original.waypoint.x ** 2 + a.original.waypoint.y ** 2
      const bd = b.original.waypoint.x ** 2 + b.original.waypoint.y ** 2

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
              value={filterValues}
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
      const traits = getValue()
        .filter((trait) => {
          return FILTERED_TRAITS.has(trait.symbol)
        })
        .toSorted(sortTraitsFn)

      return (
        <div className="flex flex-wrap items-center justify-end gap-1">
          {traits.map((trait) => (
            <Badge key={trait.symbol}>
              <Translation>{(t) => t(trait.symbol, { ns: 'spacetraders.waypoint_trait' })}</Translation>
            </Badge>
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
