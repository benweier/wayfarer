import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Pagination } from '@/components/pagination'
import { ROUTES } from '@/config/routes'
import { getShipsList, getSystemsList } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'
import { SystemItem } from '../item'
import { type SystemListProps } from './system-list.types'

const WAYPOINT_TYPE_STYLES: Record<string, string> = {
  MOON: 'bg-slate-500 text-slate-50',
  GAS_GIANT: 'bg-orange-700 text-orange-50',
  NEBULA: 'bg-amber-400 text-amber-950',
  ASTEROID_FIELD: 'bg-lime-300 text-lime-950',
  PLANET: 'bg-emerald-600 text-emerald-50',
  DEBRIS_FIELD: 'bg-teal-300 text-teal-950',
  ORBITAL_STATION: 'bg-fuchsia-600 text-fuchsia-50',
  JUMP_GATE: 'bg-gray-50 text-gray-950',
  GRAVITY_WELL: 'bg-gray-950 text-gray-50',
}

const getPageNumber = (page: string | null) => {
  const pageNumber = parseInt(page ?? '1')

  return Number.isNaN(pageNumber) ? 1 : Math.max(1, pageNumber)
}

export const SystemList = ({ System = SystemItem }: SystemListProps) => {
  const [limit] = useState(20)
  const [params, setParams] = useSearchParams({ page: '1' })
  const page = getPageNumber(params.get('page'))

  const systemsListQuery = useQuery({
    queryKey: ['systems', page, limit],
    queryFn: ({ signal }) => getSystemsList({ params: { page, limit } }, { signal }),
    keepPreviousData: true,
  })
  const fleetQuery = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
    select: (response) => {
      return response.data.reduce<Set<string>>((result, ship) => {
        result.add(ship.nav.systemSymbol)
        result.add(ship.nav.waypointSymbol)
        return result
      }, new Set())
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [systemsListQuery.data?.meta.page])

  useEffect(() => {
    if (!systemsListQuery.data?.meta) return

    const max = Math.ceil(systemsListQuery.data.meta.total / limit)

    if (page > max) setParams({ page: max.toString() })
  }, [limit, systemsListQuery.data?.meta, page, setParams])

  if (!systemsListQuery.isSuccess) return null

  const systems = systemsListQuery.data.data
  const meta = systemsListQuery.data.meta
  const results = {
    from: page * limit + 1 - limit,
    to: page * limit - limit + systems.length,
  }

  return (
    <div className={cx('relative grid gap-4', { 'opacity-30': systemsListQuery.isFetching })}>
      <div
        className={cx('absolute inset-0 backdrop-blur-xs transition-opacity duration-100 ease-in-out', {
          'pointer-events-none opacity-0': !systemsListQuery.isFetching,
          'pointer-events-auto opacity-100': systemsListQuery.isFetching,
        })}
      />

      <div className="flex items-center justify-center gap-2 text-sm">
        {systemsListQuery.isFetching ? (
          <div>...</div>
        ) : (
          <>
            <div>
              {results.from} - {results.to}
            </div>
            <div className="text-secondary">of</div>
            <div>{meta.total}</div>
          </>
        )}
      </div>

      <div className="grid gap-1">
        {systems.map((system) => {
          return (
            <System key={system.symbol} system={system}>
              <ul className="relative isolate flex items-center -space-x-2">
                {system.waypoints.map((waypoint) => {
                  const hasShipPresence = fleetQuery.data?.has(waypoint.symbol)
                  return (
                    <li
                      key={waypoint.symbol}
                      className={cx(
                        'overflow-hidden rounded-full border-2 transition duration-100 ease-in-out hover:z-0 hover:scale-125',
                        {
                          'border-zinc-50 dark:border-zinc-800': !hasShipPresence,
                          'border-blue-500': hasShipPresence,
                        },
                      )}
                    >
                      <Link
                        className={cx('flex h-8 w-8 items-center justify-center', WAYPOINT_TYPE_STYLES[waypoint.type])}
                        to={`${ROUTES.SYSTEMS}/${system.symbol}/waypoint/${waypoint.symbol}`}
                      >
                        <span className="font-black" aria-hidden>
                          {waypoint.type.charAt(0)}
                        </span>
                        <span className="sr-only">{waypoint.symbol}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </System>
          )
        })}
      </div>

      <div className="row grid items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          {systemsListQuery.isFetching ? (
            <div>...</div>
          ) : (
            <>
              <div>
                {results.from} - {results.to}
              </div>
              <div className="text-secondary">of</div>
              <div>{meta.total}</div>
            </>
          )}
        </div>
        <Pagination
          current={meta.page}
          total={Math.ceil(meta.total / limit)}
          length={5}
          onChange={(page) => {
            setParams({ page: page.toString() })
          }}
        />
      </div>
    </div>
  )
}
