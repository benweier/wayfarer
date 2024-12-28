import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'

export const AgentDetail = ({ agentSymbol }: { agentSymbol: string }) => {
  const { t } = useTranslation()
  const { data } = useSuspenseQuery(getAgentBySymbolQuery({ agentSymbol }))
  const agent = data.data
  const [sector, system, waypoint] = agent.headquarters.split('-')

  return (
    <div className="max-w-md space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">
          {t('agent.credits')}
          :
        </span>
        {' '}
        {t('formatter.number', { value: agent.credits })}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">
          {t('agent.headquarters')}
          :
        </span>
        <Link
          to="/systems/$systemSymbol/waypoint/$waypointSymbol"
          params={{ systemSymbol: `${sector}-${system}`, waypointSymbol: `${sector}-${system}-${waypoint}` }}
          className="link"
        >
          {agent.headquarters}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">
          {t('agent.starting_faction')}
          :
        </span>
        {' '}
        {agent.startingFaction}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">
          {t('agent.total_ship_count')}
          :
        </span>
        {' '}
        {t('formatter.number', { value: agent.shipCount })}
      </div>
    </div>
  )
}
