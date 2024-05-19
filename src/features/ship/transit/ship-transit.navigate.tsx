import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ShipNavStatus } from '@/config/spacetraders'
import { useShipResponse } from '@/context/ship.context'
import { WaypointNavigation, WaypointNavigationFallback } from '@/features/waypoint/navigation'
import type { ShipTransitActionProps } from './ship-transit.types'

export const ShipTransitNavigate = ({ trigger }: ShipTransitActionProps) => {
  const ship = useShipResponse()

  return (
    <Modal
      size="xl"
      close={<Modal.Close />}
      trigger={<Modal.Trigger disabled={ship.nav.status !== ShipNavStatus.InOrbit}>{trigger}</Modal.Trigger>}
    >
      <Modal.Header>
        <Modal.Title>
          Navigate Ship: <span className="font-normal">{ship.symbol}</span>
        </Modal.Title>
      </Modal.Header>

      <QuerySuspenseBoundary fallback={<WaypointNavigationFallback />}>
        <WaypointNavigation ship={ship} />
      </QuerySuspenseBoundary>
    </Modal>
  )
}
