import { WaypointShipyardLayout } from './waypoint-shipyard.layout'

export const WaypointShipyardFallback = () => {
  return (
    <WaypointShipyardLayout>
      <div className="flex animate-pulse flex-col gap-2">
        <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
        <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
        <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
      </div>
    </WaypointShipyardLayout>
  )
}
