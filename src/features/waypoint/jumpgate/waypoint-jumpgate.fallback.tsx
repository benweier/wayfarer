import { WaypointJumpGateLayout } from './waypoint-jumpgate.layout'

export const WaypointJumpGateFallback = () => {
  return (
    <WaypointJumpGateLayout>
      <div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
      <div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
      <div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
    </WaypointJumpGateLayout>
  )
}
