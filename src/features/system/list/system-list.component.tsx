import { Pagination } from '@/components/pagination'
import { useFleetResponse } from '@/context/fleet.context'
import { getShipPresence } from '@/features/ship/utilities/get-ship-presence.helper'
import { getSystemListQuery } from '@/services/api/spacetraders'
import { formatNumber } from '@/utilities/number.helper'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SystemListTable } from './system-list.table'
import type { SystemListProps } from './system-list.types'

export const SystemList = ({ page = 1, limit = 20, setPage }: SystemListProps) => {
  const systemsListQuery = useSuspenseQuery(getSystemListQuery({ page, limit }))
  const ships = useFleetResponse()

  useEffect(() => {
    const max = Math.ceil(systemsListQuery.data.meta.total / limit)

    if (page > max) setPage(max)
  }, [limit, systemsListQuery.data.meta, page, setPage])

  const systems = systemsListQuery.data.data
  const presence = getShipPresence(ships, 'systemSymbol')
  const meta = systemsListQuery.data.meta
  const results = {
    from: formatNumber(page * limit + 1 - limit),
    to: formatNumber(page * limit - limit + systems.length),
    total: formatNumber(meta.total),
  }

  return (
    <div className="space-y-4">
      <SystemListTable data={systems.map((system) => ({ system, presence: presence.get(system.symbol) ?? 0 }))} />

      <div className="row grid items-center justify-center gap-4">
        <div className="typography-sm flex items-center justify-center gap-2">
          {systemsListQuery.isFetching ? (
            <div>...</div>
          ) : (
            <>
              <div>
                {results.from} - {results.to}
              </div>
              <div className="text-foreground-secondary">of</div>
              <div>{results.total}</div>
            </>
          )}
        </div>

        <Pagination current={meta.page} total={Math.ceil(meta.total / limit)} length={5} onChange={setPage} />
      </div>
    </div>
  )
}
