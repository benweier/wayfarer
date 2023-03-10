import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Pagination } from '@/components/Pagination'
import { SYSTEM_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { getShipsList, getSystemsList } from '@/services/api/spacetraders'
import { SystemWaypoint, SystemsResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

export const ListSystems = () => {
  const [limit] = useState(10)
  const [params, setParams] = useSearchParams({ page: '1' })
  const page = parseInt(params.get('page') ?? '1')

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

    const max = Math.ceil(systemsListQuery.data?.meta.total / limit)

    if (page > max) setParams({ page: max.toString() })
  }, [limit, systemsListQuery.data?.meta, page, setParams])

  if (!systemsListQuery.isSuccess) return null

  const systems = systemsListQuery.data.data
  const meta = systemsListQuery.data.meta

  return (
    <>
      <div className={cx('relative grid gap-4', { 'opacity-30': systemsListQuery.isFetching })}>
        <div
          className={cx('absolute inset-0 backdrop-blur-xs transition-opacity duration-100 ease-in-out', {
            'pointer-events-none opacity-0': !systemsListQuery.isFetching,
            'pointer-events-auto opacity-100': systemsListQuery.isFetching,
          })}
        />
        {meta && (
          <div className="flex items-center justify-center gap-2 text-sm">
            {systemsListQuery.isFetching ? (
              <div>...</div>
            ) : (
              <>
                <div>
                  {page * limit + 1 - limit} - {page * limit - limit + systems.length}
                </div>
                <div className="text-secondary">of</div>
                <div>{meta.total}</div>
              </>
            )}
          </div>
        )}
        <div className="grid gap-1">
          {systems.map((system) => {
            return (
              <System key={system.symbol} system={system} hasShipPresence={fleetQuery.data?.has(system.symbol)}>
                <ul className="relative isolate flex items-center -space-x-2">
                  {system.waypoints.map((waypoint) => {
                    return (
                      <li key={waypoint.symbol} className="hover:z-0">
                        <Waypoint
                          systemID={system.symbol}
                          waypoint={waypoint}
                          hasShipPresence={fleetQuery.data?.has(waypoint.symbol)}
                        />
                      </li>
                    )
                  })}
                </ul>
              </System>
            )
          })}
        </div>
        {meta && (
          <div className="row grid items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-2 text-sm">
              {systemsListQuery.isFetching ? (
                <div>...</div>
              ) : (
                <>
                  <div>
                    {page * limit + 1 - limit} - {page * limit - limit + systems.length}
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
              onChange={(page) => setParams({ page: page.toString() })}
            />
          </div>
        )}
      </div>
    </>
  )
}

const System = ({
  system,
  hasShipPresence = false,
  children,
}: WithChildren<{ system: SystemsResponse; hasShipPresence?: boolean }>) => {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-between gap-2 rounded border-2 bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25 md:flex-row md:flex-wrap',
        {
          'border-transparent': !hasShipPresence,
          'border-blue-500': hasShipPresence,
        },
      )}
    >
      <div className="flex gap-1">
        <div className="text-lg font-black leading-none">
          <Link className="link" to={`${ROUTES.SYSTEMS}/${system.symbol}`}>
            {system.symbol}
          </Link>
          <div className="text-base">
            <span className="font-medium">{SYSTEM_TYPE[system.type]}</span>{' '}
            <span className="font-light">
              ({system.x}, {system.y})
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

const Waypoint = ({
  systemID,
  waypoint,
  hasShipPresence = false,
}: {
  systemID: string
  waypoint: SystemWaypoint
  hasShipPresence?: boolean
}) => {
  return (
    <Link
      className={cx(
        'flex h-8 w-8 items-center justify-center rounded-full border-2 transition duration-100 ease-in-out hover:scale-125',
        {
          'border-zinc-50 dark:border-zinc-800': !hasShipPresence,
          'border-blue-500': hasShipPresence,
        },
        {
          'bg-slate-500 text-slate-50': waypoint.type === 'MOON',
          'bg-orange-500 text-orange-50': waypoint.type === 'GAS_GIANT',
          'bg-yellow-300 text-yellow-900': waypoint.type === 'NEBULA',
          'bg-lime-300 text-lime-900': waypoint.type === 'ASTEROID_FIELD',
          'bg-emerald-500 text-emerald-50': waypoint.type === 'PLANET',
          'bg-cyan-300 text-cyan-900': waypoint.type === 'DEBRIS_FIELD',
          'bg-fuchsia-600 text-fuchsia-50': waypoint.type === 'ORBITAL_STATION',
          'bg-zinc-100 text-zinc-900': waypoint.type === 'JUMP_GATE',
          'bg-zinc-900 text-zinc-50': waypoint.type === 'GRAVITY_WELL',
        },
      )}
      to={`${ROUTES.SYSTEMS}/${systemID}/waypoint/${waypoint.symbol}`}
    >
      <span className="font-black" aria-hidden>
        {waypoint.type.charAt(0)}
      </span>
      <span className="sr-only">{waypoint.symbol}</span>
    </Link>
  )
}
