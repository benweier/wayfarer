import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ROUTES } from '@/config/routes'
import { AgentDetail } from '@/features/agent/detail'
import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const api = getRouteApi(ROUTES.AGENT)

export const AgentRoute = () => {
  const { t } = useTranslation()
  const { agentSymbol } = api.useParams()

  return (
    <div className="space-y-4 p-4">
      <h1 className="display-md font-bold">
        {t('agent.label')}: <span className="font-normal">{agentSymbol}</span>
      </h1>

      <QuerySuspenseBoundary>
        <AgentDetail agentSymbol={agentSymbol} />
      </QuerySuspenseBoundary>
    </div>
  )
}
