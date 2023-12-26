import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ShipIcon } from '@/components/icons'
import { SystemTag } from '@/components/system/tag'
import { ShipPresence } from '@/features/ship/presence'
import { SystemWaypointsCell } from '@/features/system/list/waypoints-cell.component'
import { type SystemListTableSchema } from './system-list.types'

const columnHelper = createColumnHelper<SystemListTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.system.symbol, {
    id: 'symbol',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.symbol')}</Translation>
        </div>
      )
    },
    cell: ({ row, getValue }) => {
      return (
        <Link className="link" to={`/systems/${row.original.system.symbol}`}>
          {getValue()}
        </Link>
      )
    },
    minSize: 25,
    maxSize: 25,
  }),
  columnHelper.display({
    id: 'presence',
    minSize: 10,
    maxSize: 10,
    cell: ({ row }) =>
      row.original.presence > 0 && (
        <ShipPresence label="system.presence" count={row.original.presence} symbol={row.original.system.symbol}>
          <ShipIcon id="anchor" className="size-5" />
        </ShipPresence>
      ),
  }),
  columnHelper.accessor((row) => row.system.type, {
    id: 'type',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.type')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex justify-start">
          <SystemTag type={value}>
            <Translation ns="spacetraders.system_type">{(t) => t(value)}</Translation>
          </SystemTag>
        </div>
      )
    },
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => `${row.system.x}, ${row.system.y}`, {
    id: 'coordinates',
    header: () => {
      return (
        <div className="text-left">
          <Translation>{(t) => t('general.header.coordinates')}</Translation>
        </div>
      )
    },
    cell: ({ getValue }) => {
      return <div className="text-secondary text-left text-sm">{getValue()}</div>
    },
    minSize: 20,
    maxSize: 20,
  }),

  columnHelper.accessor((row) => row.system.waypoints, {
    id: 'waypoints',
    header: () => {
      return (
        <div className="text-right">
          <Translation>{(t) => t('general.header.waypoints')}</Translation>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const waypoints = getValue()

      return <SystemWaypointsCell systemSymbol={row.original.system.symbol} waypoints={waypoints} />
    },
    minSize: 30,
    maxSize: 30,
  }),
]
