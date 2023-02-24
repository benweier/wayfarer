import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Pagination } from '@/components/Pagination'
import { SYSTEM_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { getShipsList, getSystemsList } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'

export const ListSystems = () => {
  const [limit] = useState(24)
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
        return result
      }, new Set())
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [systemsListQuery.data?.meta.page])

  useEffect(() => {
    if (systemsListQuery.data?.meta) {
      const max = Math.ceil(systemsListQuery.data?.meta.total / limit)

      if (page > max) setParams({ page: max.toString() })
    }
  }, [limit, systemsListQuery.data?.meta, page, setParams])

  if (!systemsListQuery.isSuccess) return null

  const systems = systemsListQuery.data.data
  const meta = systemsListQuery.data.meta

  return (
    <>
      <div className="relative grid gap-4">
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
                <div className="opacity-50">of</div>
                <div>{meta.total}</div>
              </>
            )}
          </div>
        )}
        <div className={cx('grid gap-1 md:grid-cols-2 lg:grid-cols-4')}>
          {systems.map((system) => {
            return (
              <div
                key={system.symbol}
                className={cx('flex flex-col gap-2 rounded border-2 bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25', {
                  'border-transparent': !fleetQuery.data?.has(system.symbol),
                  'border-blue-500': fleetQuery.data?.has(system.symbol),
                })}
              >
                <div className="grid gap-1">
                  <div className="text-center text-lg font-black leading-none">
                    <Link className="link" to={`${ROUTES.SYSTEMS}/${system.symbol}`}>
                      {system.symbol}
                    </Link>
                  </div>
                  <div className="text-center text-xs">
                    <span className="font-medium">{SYSTEM_TYPE[system.type]}</span>{' '}
                    <span className="font-light">
                      ({system.x}, {system.y})
                    </span>
                  </div>
                </div>
              </div>
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
                  <div className="opacity-50">of</div>
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
