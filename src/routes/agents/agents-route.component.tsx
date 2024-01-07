import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { AgentList, AgentListFallback } from '@/features/agent/list'

export const AgentsRoute = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('agents.label')}</h1>

      <QuerySuspenseBoundary fallback={<AgentListFallback />}>
        <AgentList />
      </QuerySuspenseBoundary>
    </div>
  )
}
