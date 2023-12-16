import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'
import { formatNumber } from '@/utilities/number'

export const LeaderboardAgent = ({ agentSymbol }: { agentSymbol: string }) => {
  const { t } = useTranslation()
  const { data } = useSuspenseQuery({
    queryKey: getAgentBySymbolQuery.getQueryKey({ agentSymbol }),
    queryFn: getAgentBySymbolQuery.queryFn,
  })
  const agent = data.data

  return (
    <div className="mx-auto grid w-full max-w-xs gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">{t('agent.credits')}:</span> {formatNumber(agent.credits)}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">{t('agent.headquarters')}:</span> {agent.headquarters}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">{t('agent.starting_faction')}:</span> {agent.startingFaction}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">{t('agent.total_ship_count')}:</span> {formatNumber(agent.shipCount)}
      </div>
      <div></div>
    </div>
  )
}
