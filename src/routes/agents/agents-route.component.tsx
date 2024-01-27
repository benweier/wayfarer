import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ROUTES } from '@/config/routes'
import { AgentList, AgentListFallback } from '@/features/agent/list'

const api = getRouteApi(ROUTES.AGENTS)

export const AgentsRoute = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { page } = api.useSearch()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('agents.label')}</h1>

      <QuerySuspenseBoundary fallback={<AgentListFallback />}>
        <AgentList
          page={page}
          setPage={(page) => {
            void navigate({ to: '/agents', search: { page } })
          }}
        />
      </QuerySuspenseBoundary>
    </div>
  )
}
