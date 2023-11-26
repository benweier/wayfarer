import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { SystemTag } from '@/components/system/tag'
import { SYSTEM_TYPE } from '@/config/constants'
import { WAYPOINT_TYPE_STYLES } from '@/config/waypoint.styles'
import { type SystemWaypoint, type SystemsResponse } from '@/types/spacetraders'

const EXCLUDED_WAYPOINTS = new Set(['ASTEROID', 'ENGINEERED_ASTEROID'])
const columnHelper = createColumnHelper<{ system: SystemsResponse; presence?: boolean }>()
const columns = [
  columnHelper.accessor((row) => row.system.symbol, {
    id: 'symbol',
    header: () => {
      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <div>Symbol</div>
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
    size: 100,
  }),
  columnHelper.accessor((row) => row.system.type, {
    id: 'type',
    header: () => {
      return (
        <div className="flex items-center justify-start gap-2 text-right">
          <div>Type</div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="flex justify-start">
          <SystemTag type={value}>{SYSTEM_TYPE.get(value)}</SystemTag>
        </div>
      )
    },
    size: 100,
  }),
  columnHelper.accessor((row) => `${row.system.x}, ${row.system.y}`, {
    id: 'coordinates',
    header: () => {
      return (
        <div className="flex items-center justify-start gap-2 text-left">
          <div>Coordinates</div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      return <div className="text-secondary text-left text-sm">{getValue()}</div>
    },
    size: 100,
  }),

  columnHelper.accessor((row) => row.system.waypoints, {
    id: 'waypoints',
    header: () => {
      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <div>Waypoints</div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const values = getValue().reduce<{ waypoints: SystemWaypoint[]; extra: number }>(
        (result, waypoint) => {
          if (EXCLUDED_WAYPOINTS.has(waypoint.type)) {
            result.extra += 1

            return result
          }

          result.waypoints.push(waypoint)

          return result
        },
        { waypoints: [], extra: 0 },
      )

      return (
        <ul className="relative isolate flex list-none items-center justify-end -space-x-2">
          {values.waypoints.map((waypoint) => {
            return (
              <li
                key={waypoint.symbol}
                className="list-none overflow-hidden rounded-full border-2 border-zinc-50 transition duration-100 ease-in-out hover:z-0 hover:scale-125 dark:border-zinc-800"
              >
                <Link
                  className={cx('flex h-6 w-6 items-center justify-center', WAYPOINT_TYPE_STYLES[waypoint.type])}
                  to={`/systems/${row.original.system.symbol}/waypoint/${waypoint.symbol}`}
                >
                  <span className="text-sm font-medium" aria-hidden>
                    {waypoint.type.charAt(0)}
                  </span>
                  <span className="sr-only">{waypoint.symbol}</span>
                </Link>
              </li>
            )
          })}
          {values.extra > 0 && (
            <li className="list-none overflow-hidden rounded-full border-2 border-zinc-50 transition duration-100 ease-in-out hover:z-0 hover:scale-125 dark:border-zinc-800">
              <Link
                className={cx('flex h-6 w-6 items-center justify-center', WAYPOINT_TYPE_STYLES.ASTEROID)}
                to={`/systems/${row.original.system.symbol}`}
              >
                <span className="text-sm font-medium" aria-hidden>
                  {`${values.extra}`}
                </span>
              </Link>
            </li>
          )}
        </ul>
      )
    },
  }),
]

export const SystemListTable = ({ data }: { data: Array<{ system: SystemsResponse; presence?: boolean }> }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                  <td key={cell.id} className="h-14 whitespace-nowrap p-3">
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
