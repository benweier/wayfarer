import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { WaypointNavigation, WaypointNavigationFallback } from '@/features/waypoint/navigation'
import { type ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitNavigate = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal size="xl" closeable trigger={<Modal.Trigger>{trigger}</Modal.Trigger>}>
      <div className="space-y-8">
        <h3 className="text-title">
          Navigate Ship: <span className="font-normal">{ship.symbol}</span>
        </h3>

        <QuerySuspenseBoundary fallback={<WaypointNavigationFallback />}>
          <WaypointNavigation ship={ship} />
        </QuerySuspenseBoundary>
      </div>
    </Modal>
  )
}
