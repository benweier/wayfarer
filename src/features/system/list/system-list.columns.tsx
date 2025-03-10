import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import { Trans, Translation } from 'react-i18next'
import { ShipIcon } from '@/components/icons'
import { Tooltip } from '@/components/tooltip'
import { SystemTag } from '@/features/system/tag'
import { SystemWaypointsCell } from './waypoints-cell.component'
import type { SystemListTableSchema } from './system-list.types'

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
    cell: ({ getValue }) => {
      const systemSymbol = getValue()

      return (
        <Link to="/systems/$systemSymbol" params={{ systemSymbol }} className="link">
          {systemSymbol}
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
        <Tooltip trigger={<ShipIcon id="anchor" className="size-5" />}>
          <Trans
            i18nKey="system.presence"
            values={{ count: row.original.presence, symbol: row.original.system.symbol }}
          />
        </Tooltip>
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
      return <div className="text-sm text-left text-foreground-secondary">{getValue()}</div>
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
