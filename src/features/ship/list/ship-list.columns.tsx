import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { AppIcon, ShipIcon } from '@/components/icons'
import { Sort } from '@/components/table'
import { useShipTransit } from '@/features/ship/transit'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipListTableSchema } from './ship-list.types'

const TransitStatusPreview = ({ ship }: { ship: ShipResponse }) => {
  const transit = useShipTransit(ship)

  if (ship.nav.status !== 'IN_TRANSIT') return null

  return (
    <div className="bg-background-tertiary h-1 grow rounded-full">
      <div className="bg-background-success-secondary h-full rounded-full" style={{ width: `${transit.progress}%` }} />
    </div>
  )
}
const columnHelper = createColumnHelper<ShipListTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.ship.symbol, {
    id: 'symbol',
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
    cell: ({ getValue, row }) => {
      const symbol = getValue()

      return (
        <div className="flex items-center gap-4">
          <Link to="/fleet/$shipSymbol" params={{ shipSymbol: symbol }} className="link typography-lg font-bold">
            {symbol}
          </Link>
          <Badge>
            <Translation>{(t) => t(row.original.ship.frame.symbol, { ns: 'spacetraders.frame_type' })}</Translation>
          </Badge>
        </div>
      )
    },
    enableSorting: true,
    minSize: 30,
    maxSize: 30,
  }),
  columnHelper.accessor((row) => row.ship.nav.systemSymbol, {
    id: 'system',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <Translation>{(t) => <div>{t('general.header.system')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const systemSymbol = getValue()

      return (
        <Link
          to="/systems/$systemSymbol"
          params={{ systemSymbol: row.original.ship.nav.systemSymbol }}
          className="link"
        >
          {systemSymbol}
        </Link>
      )
    },
    enableSorting: true,
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.ship.nav.waypointSymbol, {
    id: 'waypoint',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <Translation>{(t) => <div>{t('general.header.waypoint')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      const waypointSymbol = getValue()

      return (
        <Link
          to="/systems/$systemSymbol/waypoint/$waypointSymbol"
          params={{
            systemSymbol: row.original.ship.nav.systemSymbol,
            waypointSymbol: row.original.ship.nav.waypointSymbol,
          }}
          className="link"
        >
          {waypointSymbol}
        </Link>
      )
    },
    enableSorting: true,
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.display({
    id: 'status',
    header: () => {
      return <></>
    },
    cell: ({ row }) => {
      return (
        <div className="relative flex gap-x-1">
          <Badge>
            <Translation ns="spacetraders.nav_status">{(t) => t(row.original.ship.nav.status)}</Translation>
          </Badge>
          <Badge>
            <Translation ns="spacetraders.flight_mode">{(t) => t(row.original.ship.nav.flightMode)}</Translation>
          </Badge>
          <div className="absolute inset-x-0 -bottom-1">
            <TransitStatusPreview ship={row.original.ship} />
          </div>
        </div>
      )
    },
    minSize: 25,
    maxSize: 25,
  }),
  columnHelper.accessor((row) => row.ship.fuel, {
    id: 'fuel',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-end gap-2">
          <Translation>{(t) => <div>{t('general.header.fuel')}</div>}</Translation>
          <div>
            <Sort column={column} type="numeric" />
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const fuel = getValue()

      return (
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-end gap-2">
            <ShipIcon id="fuel" className="text-foreground-fuel size-4" />
            <div className="typography-sm font-semibold">
              {fuel.capacity === 0 ? (
                <AppIcon id="infinity" className="size-5" aria-label="Infinite" />
              ) : (
                `${fuel.current} / ${fuel.capacity}`
              )}
            </div>
          </div>
          <div className="bg-background-fuel/30 h-1 w-full max-w-[100px] rounded-full">
            <div
              className="bg-foreground-fuel h-1 rounded-full"
              style={{ width: `${(fuel.current / fuel.capacity) * 100}%` }}
            />
          </div>
        </div>
      )
    },
    sortingFn: (a, b) => {
      if (a.original.ship.fuel.capacity === 0) return 1

      const fuelA = a.original.ship.fuel.current + 1 / a.original.ship.fuel.capacity + 1
      const fuelB = b.original.ship.fuel.current + 1 / b.original.ship.fuel.capacity + 1
      const diff = fuelA - fuelB

      if (diff === 0) {
        return a.original.ship.fuel.capacity - b.original.ship.fuel.capacity
      }

      return diff
    },
    invertSorting: true,
    enableSorting: true,
    sortDescFirst: true,
    minSize: 10,
    maxSize: 10,
  }),
  columnHelper.accessor((row) => row.ship.cargo, {
    id: 'cargo',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-end gap-2">
          <Translation>{(t) => <div>{t('general.header.cargo')}</div>}</Translation>
          <div>
            <Sort column={column} type="numeric" />
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const cargo = getValue()

      return (
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-end gap-2">
            <ShipIcon id="cargo" className="size-4 text-fuchsia-500" />
            <div className="typography-sm font-semibold">
              {cargo.units} / {cargo.capacity}
            </div>
          </div>
          <div className="bg-background-cargo/30 h-1 w-full max-w-[100px] rounded-full">
            <div
              className="bg-foreground-cargo h-1 rounded-full"
              style={{ width: `${(cargo.units / cargo.capacity) * 100}%` }}
            />
          </div>
        </div>
      )
    },
    sortingFn: (a, b) => {
      if (a.original.ship.cargo.capacity === 0) return 1

      const cargoA = a.original.ship.cargo.units + 1 / a.original.ship.cargo.capacity + 1
      const cargoB = b.original.ship.cargo.units + 1 / b.original.ship.cargo.capacity + 1
      const diff = cargoA - cargoB

      if (diff === 0) {
        return a.original.ship.cargo.capacity - b.original.ship.cargo.capacity
      }

      return diff
    },
    invertSorting: true,
    enableSorting: true,
    sortDescFirst: true,
    minSize: 10,
    maxSize: 10,
  }),
]
