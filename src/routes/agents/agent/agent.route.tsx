import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { ROUTES } from '@/config/routes'
import { LeaderboardAgent } from '@/features/leaderboard/agent'

export const AgentRouteComponent = () => {
  const { t } = useTranslation()
  const { agentSymbol } = useParams()

  if (!agentSymbol) return <Navigate to={ROUTES.LEADERBOARD} replace />

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">
        {t('agent.label')}: <span className="font-normal">{agentSymbol.toUpperCase()}</span>
      </h1>

      <QuerySuspenseBoundary>
        <LeaderboardAgent agentSymbol={agentSymbol} />
      </QuerySuspenseBoundary>
    </div>
  )
}

export const Route = withQSB()(AgentRouteComponent)
