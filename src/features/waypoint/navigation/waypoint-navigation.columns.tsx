import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { Sort } from '@/components/table'
import { WaypointTag } from '@/components/waypoint/tag'
import { WaypointNavigationActionContext } from '@/context/waypoint-navigation-action.context'
import { getNavigationDuration } from '@/utilities/get-navigation-duration.helper'
import { type WaypointNavigationTableSchema } from './waypoint-navigation.types'

const FILTER_TRAITS = ['MARKETPLACE', 'SHIPYARD', 'STRIPPED']
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
          className="link"
          to={`/systems/${row.original.waypoint.systemSymbol}/waypoint/${row.original.waypoint.symbol}`}
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
          <div className="text-left text-sm">
            {distance} <span className="text-secondary">({duration}s)</span>
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
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.type')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
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
      const traits = getValue().filter((trait) => {
        return FILTER_TRAITS.includes(trait.symbol)
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
    minSize: 30,
    maxSize: 30,
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const distance: number = row.getValue('distance')

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
