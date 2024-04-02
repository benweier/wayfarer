import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Pagination } from '@/components/pagination'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'
import { formatNumber } from '@/utilities/number.helper'
import { AgentListTable } from './agent-list.table'
import { type AgentListProps } from './agent-list.types'

export const AgentList = ({ page = 1, limit = 20, setPage }: AgentListProps) => {
  const agentsListQuery = useSuspenseQuery(getAgentListQuery({ page, limit }))

  useEffect(() => {
    const max = Math.ceil(agentsListQuery.data.meta.total / limit)

    if (page > max) setPage(page)
  }, [limit, agentsListQuery.data.meta, page, setPage])

  const agents = agentsListQuery.data.data
  const meta = agentsListQuery.data.meta
  const results = {
    from: formatNumber(page * limit + 1 - limit),
    to: formatNumber(page * limit - limit + agents.length),
    total: formatNumber(meta.total),
  }

  return (
    <div className="space-y-4">
      <AgentListTable data={agents.map((agent) => ({ agent }))} />

      <div className="grid items-center justify-center gap-4">
        <div className="typography-sm flex items-center justify-center gap-2">
          {agentsListQuery.isFetching ? (
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
