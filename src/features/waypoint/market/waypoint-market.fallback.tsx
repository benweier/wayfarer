import { WaypointMarketLayout } from './waypoint-market.layout'

export const WaypointMarketFallback = () => {
  return (
    <WaypointMarketLayout
      imports={<div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>}
      exports={<div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>}
      exchange={<div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>}
    />
  )
}
