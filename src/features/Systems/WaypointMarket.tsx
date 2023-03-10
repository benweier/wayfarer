import { useQuery } from '@tanstack/react-query'
import { getMarket } from '@/services/api/spacetraders'

export const WaypointMarket = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['system', systemID, waypointID, 'market'],
    queryFn: ({ signal }) => getMarket({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const market = data.data

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Imports</div>
        <div className="flex flex-col gap-2">
          {market.imports.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypointID}</span> does not list any imports
              </div>
            </div>
          )}
          {market.imports.map((item) => {
            return (
              <div
                key={item.symbol}
                className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10"
              >
                <div className="font-semibold">{item.name}</div>
                <div className="text-secondary text-sm">{item.description}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Exports</div>
        <div className="flex flex-col gap-2">
          {market.exports.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypointID}</span> does not list any exports
              </div>
            </div>
          )}
          {market.exports.map((item) => {
            return (
              <div
                key={item.symbol}
                className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10"
              >
                <div className="font-semibold">{item.name}</div>
                <div className="text-secondary text-sm">{item.description}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Exchange</div>
        <div className="flex flex-col gap-2">
          {market.exchange.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypointID}</span> does not list any exchanges
              </div>
            </div>
          )}
          {market.exchange.map((item) => {
            return (
              <div
                key={item.symbol}
                className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10"
              >
                <div className="font-semibold">{item.name}</div>
                <div className="text-secondary text-sm">{item.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
