import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'
import { formatNumber } from '@/utilities/number'

export const AgentDetail = ({ agentSymbol }: { agentSymbol: string }) => {
  const { t } = useTranslation()
  const { data } = useSuspenseQuery(getAgentBySymbolQuery({ agentSymbol }))
  const agent = data.data

  return (
    <div className="max-w-md space-y-2">
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
    </div>
  )
}
