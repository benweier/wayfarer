import { useSuspenseQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, usePagination } from '@/components/pagination'
import { ROUTES } from '@/config/routes'
import { WAYPOINT_TYPE_STYLES } from '@/config/waypoint.styles'
import { getShipListQuery, getSystemListQuery } from '@/services/api/spacetraders'
import { formatNumber } from '@/utilities/number'
import { SystemItem } from '../item'
import { type SystemListProps } from './system-list.types'

export const SystemList = ({ System = SystemItem }: SystemListProps) => {
  const { page, limit, setPage } = usePagination()
  const systemsListQuery = useSuspenseQuery({
    queryKey: getSystemListQuery.getQueryKey({ page, limit }),
    queryFn: getSystemListQuery.queryFn,
  })
  const fleetQuery = useSuspenseQuery({
    queryKey: getShipListQuery.getQueryKey(),
    queryFn: getShipListQuery.queryFn,
    staleTime: Infinity,
    gcTime: Infinity,
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
  }, [systemsListQuery.data.meta.page])

  useEffect(() => {
    const max = Math.ceil(systemsListQuery.data.meta.total / limit)

    if (page > max) setPage(page)
  }, [limit, systemsListQuery.data.meta, page, setPage])

  const systems = systemsListQuery.data.data
  const meta = systemsListQuery.data.meta
  const results = {
    from: formatNumber(page * limit + 1 - limit),
    to: formatNumber(page * limit - limit + systems.length),
    total: formatNumber(meta.total),
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
            <div>{results.total}</div>
          </>
        )}
      </div>

      <div className="grid gap-2">
        {systems.map((system) => {
          return (
            <System key={system.symbol} system={system}>
              <ul className="relative isolate flex list-none items-center -space-x-2">
                {system.waypoints
                  .filter((waypoint) => !waypoint.type.includes('ASTEROID'))
                  .map((waypoint) => {
                    const hasShipPresence = fleetQuery.data.has(waypoint.symbol)

                    return (
                      <li
                        key={waypoint.symbol}
                        className={cx(
                          'list-none overflow-hidden rounded-full border-2 transition duration-100 ease-in-out hover:z-0 hover:scale-125',
                          {
                            'border-zinc-50 dark:border-zinc-800': !hasShipPresence,
                            'border-blue-500': hasShipPresence,
                          },
                        )}
                      >
                        <Link
                          className={cx(
                            'flex h-8 w-8 items-center justify-center',
                            WAYPOINT_TYPE_STYLES[waypoint.type],
                          )}
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
              <div>{results.total}</div>
            </>
          )}
        </div>
        <Pagination current={meta.page} total={Math.ceil(meta.total / limit)} length={5} onChange={setPage} />
      </div>
    </div>
  )
}
