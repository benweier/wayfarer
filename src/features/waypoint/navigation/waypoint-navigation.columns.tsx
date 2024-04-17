import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { ShipIcon } from '@/components/icons'
import { Sort } from '@/components/table'
import { WaypointTypeFilter } from '@/components/waypoint/filters'
import { WaypointTag } from '@/components/waypoint/tag'
import { WaypointTraits } from '@/config/spacetraders'
import { WaypointNavigationActionContext } from '@/context/waypoint-navigation-action.context'
import { type WaypointTrait } from '@/types/spacetraders'
import { getNavigationDuration } from '@/utilities/get-navigation-duration.helper'
import { type WaypointNavigationTableSchema } from './waypoint-navigation.types'

const FILTER_TRAITS = new Set<WaypointTraits>([
  WaypointTraits.Stripped,
  WaypointTraits.Shipyard,
  WaypointTraits.Marketplace,
])
const SORT_ORDER = Array.from(FILTER_TRAITS)
const sortTraitsFn = (a: WaypointTrait, b: WaypointTrait) => SORT_ORDER.indexOf(a.symbol) - SORT_ORDER.indexOf(b.symbol)
const columnHelper = createColumnHelper<WaypointNavigationTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.waypoint.symbol, {
    id: 'symbol',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.waypoint')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      return (
        <Link
          to="/systems/$systemSymbol/waypoint/$waypointSymbol"
          params={{
            systemSymbol: row.original.waypoint.systemSymbol,
            waypointSymbol: row.original.waypoint.symbol,
          }}
          className="link"
        >
          {getValue()}
        </Link>
      )
    },
    sortingFn: 'alphanumeric',
    enableSorting: true,
    minSize: 25,
    maxSize: 25,
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
      id: 'distance_time',
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-start gap-2 text-left">
            <Translation>{(t) => <div>{t('general.header.distance_time')}</div>}</Translation>
            <div>
              <Sort column={column} type="numeric" />
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
          <div className="typography-sm text-left">
            {distance} <span className="text-foreground-secondary">({duration}s)</span>
          </div>
        )
      },
      sortDescFirst: false,
      enableSorting: true,
      minSize: 20,
      maxSize: 20,
    },
  ),
  columnHelper.accessor((row) => row.waypoint.type, {
    id: 'type',
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
              onChange={(value) => table.getColumn('type')?.setFilterValue(value)}
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
    enableColumnFilter: true,
    minSize: 15,
    maxSize: 15,
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
      const traits = getValue()
        .filter((trait) => {
          return FILTER_TRAITS.has(trait.symbol)
        })
        .toSorted(sortTraitsFn)

      return (
        <div className="flex flex-wrap items-center justify-end gap-1">
          {traits.map((trait) => {
            switch (trait.symbol) {
              case WaypointTraits.Shipyard:
                return <Badge key={trait.symbol}>Shipyard</Badge>

              case WaypointTraits.Marketplace:
                return <Badge key={trait.symbol}>Marketplace</Badge>

              default:
                return (
                  <Badge key={trait.symbol}>
                    <Translation>{(t) => t(trait.symbol, { ns: 'spacetraders.waypoint_trait' })}</Translation>
                  </Badge>
                )
            }
          })}
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
    minSize: 30,
    maxSize: 30,
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const distance: number = row.getValue('distance_time')

      return (
        <div className="flex justify-end">
          <WaypointNavigationActionContext.Consumer>
            {(ctx) =>
              ctx.Navigate && (
                <ctx.Navigate ship={row.original.ship} waypoint={row.original.waypoint} distance={distance} />
              )
            }
          </WaypointNavigationActionContext.Consumer>
        </div>
      )
    },
    minSize: 10,
    maxSize: 10,
  }),
]
