import { useQuery } from '@tanstack/react-query'
import { getMarket } from '@/services/api/spacetraders'

export const WaypointMarket = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['market', systemID, waypointID],
    queryFn: ({ signal }) => getMarket({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const market = data.data

  return (
    <div className="grid gap-8">
      <div>
        <div className="text-headline">Imports</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {market.imports.map((item) => {
            return <div key={item.symbol}>{item.name}</div>
          })}
        </div>
      </div>
      <div>
        <div className="text-headline">Exports</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {market.exports.map((item) => {
            return <div key={item.symbol}>{item.name}</div>
          })}
        </div>
      </div>
    </div>
  )
}
