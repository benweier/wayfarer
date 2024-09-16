export const WaypointShipyardNotAvailable = () => {
  return (
    <div className="space-y-4">
      <div className="typography-lg text-center">No Shipyard Available</div>
      <div className="text-center text-foreground-secondary">
        This waypoint does not have a shipyard. You can only buy and sell ships at a waypoint with a shipyard.
      </div>
    </div>
  )
}
