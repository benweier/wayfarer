import { useSuspenseQuery } from '@tanstack/react-query'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'

export const LeaderboardAgent = ({ agentSymbol }: { agentSymbol: string }) => {
  const { data } = useSuspenseQuery({
    queryKey: getAgentBySymbolQuery.getQueryKey({ agentSymbol }),
    queryFn: getAgentBySymbolQuery.queryFn,
  })

  const agent = data.data

  return (
    <div className="mx-auto grid w-full max-w-xs gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">Credits:</span> {agent.credits}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">Headquarters:</span> {agent.headquarters}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">Starting Faction:</span> {agent.startingFaction}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">Total Ship Count:</span> {agent.shipCount}
      </div>
      <div></div>
    </div>
  )
}
