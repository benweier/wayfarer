export const WaypointMarketNotAvailable = () => {
  return (
    <div className="flex flex-col gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
      <div className="text-headline text-center">No Market Available</div>
      <div className="text-secondary text-center">
        This waypoint does not have a market. You can only buy and sell cargo at a waypoint with a market.
      </div>
    </div>
  )
}
