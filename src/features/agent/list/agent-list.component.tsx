import { useIsFetching, useSuspenseQuery } from '@tanstack/react-query'
import { cx } from 'class-variance-authority'
import { useEffect } from 'react'
import { Pagination, usePagination } from '@/components/pagination'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'
import { formatNumber } from '@/utilities/number'
import { AgentListTable } from './agent-list.table'

export const AgentList = () => {
  const { page, limit, setPage } = usePagination()
  const agentsListQuery = useSuspenseQuery({
    queryKey: getAgentListQuery.getQueryKey({ page, limit }),
    queryFn: getAgentListQuery.queryFn,
  })
  const isFetching = useIsFetching({ queryKey: getAgentListQuery.getQueryKey() }) > 0

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [agentsListQuery.data.meta.page])

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
      <div className={cx('relative duration-75 ease-linear', { 'opacity-30': isFetching })}>
        <div
          className={cx('absolute inset-0 z-10 duration-75 ease-linear', {
            'pointer-events-auto backdrop-blur-xs': isFetching,
            'pointer-events-none': !isFetching,
          })}
        />

        <AgentListTable data={agents.map((agent) => ({ agent }))} />
      </div>

      <div className="grid items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          {agentsListQuery.isFetching ? (
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