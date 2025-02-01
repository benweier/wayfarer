import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Pagination, usePaginationCommands } from '@/components/pagination'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'
import { AgentListTable } from './agent-list.table'
import type { AgentListProps } from './agent-list.types'

export const AgentList = ({ page = 1, limit = 20, setPage }: AgentListProps) => {
  const { t } = useTranslation()
  const agentsListQuery = useSuspenseQuery(getAgentListQuery({ page, limit }))
  const agents = agentsListQuery.data.data
  const meta = agentsListQuery.data.meta
  const results = {
    from: page * limit + 1 - limit,
    to: page * limit - limit + agents.length,
    total: meta.total,
  }
  const max = Math.ceil(meta.total / limit)

  usePaginationCommands({ min: 1, max })

  return (
    <div className="space-y-4">
      <AgentListTable data={agents.map((agent) => ({ agent }))} />

      <div className="grid items-center justify-center gap-4">
        <div className="text-sm flex items-center justify-center gap-2">
          {agentsListQuery.isFetching ? (
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
