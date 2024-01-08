import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { AgentList, AgentListFallback } from '@/features/agent/list'
import { agentsIndexRoute } from './agents.route'

export const AgentsRoute = () => {
  const { t } = useTranslation()
  const navigate = useNavigate({ from: agentsIndexRoute.id })
  const { page } = agentsIndexRoute.useSearch()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('agents.label')}</h1>

      <QuerySuspenseBoundary fallback={<AgentListFallback />}>
        <AgentList
          page={page}
          setPage={(page) => {
            void navigate({ search: { page } })
          }}
        />
      </QuerySuspenseBoundary>
    </div>
  )
}
