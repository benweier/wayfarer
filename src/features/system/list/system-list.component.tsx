import { useSuspenseQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useEffect } from 'react'
import { Pagination, usePagination } from '@/components/pagination'
import { useFleetResponse } from '@/context/fleet.context'
import { getSystemListQuery } from '@/services/api/spacetraders'
import { formatNumber } from '@/utilities/number'
import { SystemListTable } from './system-table.component'

export const SystemList = () => {
  const { page, limit, setPage } = usePagination()
  const systemsListQuery = useSuspenseQuery({
    queryKey: getSystemListQuery.getQueryKey({ page, limit }),
    queryFn: getSystemListQuery.queryFn,
  })
  const ships = useFleetResponse()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [systemsListQuery.data.meta.page])

  useEffect(() => {
    const max = Math.ceil(systemsListQuery.data.meta.total / limit)

    if (page > max) setPage(page)
  }, [limit, systemsListQuery.data.meta, page, setPage])

  const systems = systemsListQuery.data.data
  const presence = new Map(
    ships.reduce((result, ship) => {
      const { systemSymbol } = ship.nav

      if (result.has(systemSymbol)) {
        result.set(systemSymbol, (result.get(systemSymbol) ?? 0) + 1)
      }

      result.set(systemSymbol, 1)

      return result
    }, new Map<string, number>()),
  )
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

      <SystemListTable data={systems.map((system) => ({ system, presence: presence.get(system.symbol) ?? 0 }))} />

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
