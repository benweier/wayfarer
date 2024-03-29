export const WaypointShipyardNotAvailable = () => {
  return (
    <div className="space-y-4">
      <div className="text-headline text-center">No Shipyard Available</div>
      <div className="text-secondary text-center">
        This waypoint does not have a shipyard. You can only buy and sell ships at a waypoint with a shipyard.
      </div>
    </div>
  )
}
