import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Pagination, usePaginationCommands } from '@/components/pagination'
import { useFleetResponse } from '@/context/fleet.context'
import { getShipPresence } from '@/features/ship/utilities/get-ship-presence.helper'
import { getSystemListQuery } from '@/services/api/spacetraders/systems'
import { SystemListTable } from './system-list.table'
import type { SystemListProps } from './system-list.types'

export const SystemList = ({ page = 1, limit = 20, setPage }: SystemListProps) => {
  const { t } = useTranslation()
  const systemsListQuery = useSuspenseQuery(getSystemListQuery({ page, limit }))
  const ships = useFleetResponse()
  const presence = getShipPresence(ships, 'systemSymbol')
  const systems = systemsListQuery.data.data
  const meta = systemsListQuery.data.meta
  const results = {
    from: page * limit + 1 - limit,
    to: page * limit - limit + systems.length,
    total: meta.total,
  }
  const max = Math.ceil(meta.total / limit)

  usePaginationCommands({ min: 1, max })

  return (
    <div className="space-y-4">
      <SystemListTable data={systems.map((system) => ({ system, presence: presence.get(system.symbol) ?? 0 }))} />

      <div className="row grid items-center justify-center gap-4">
        <div className="text-sm flex items-center justify-center gap-2">
          {systemsListQuery.isFetching ? (
            <div>...</div>
          ) : (
            <>
              <div>
                {t('general.number', { value: results.from })} - {t('general.number', { value: results.to })}
              </div>
              <div className="text-foreground-secondary">of</div>
              <div>{t('general.number', { value: results.total })}</div>
            </>
          )}
        </div>

        <Pagination current={meta.page} max={max} length={5} onChange={setPage} />
      </div>
    </div>
  )
}
